import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useState } from "react";
import { useLocalStorage } from "../contexts/useLocalStorage";

export default function useMahasiswa() {
   const [isLoading, setLoading] = useState(false);
   const [data, setData] = useLocalStorage("mahasiswa", null);
   const [isError, setError] = useState(false);
   const navigated = useNavigate();

   const checkToken = async () => {
      setLoading(true);
      if (!data) {
         navigated(`/login`);
         setLoading(false);
      } else {
         await apiClient
            .post(
               "/mahasiswa/validateToken",
               { token: data.token, id: data.id },
               {
                  headers: {
                     "Content-Type": "application/json",
                  },
               }
            )
            .then((res) => {
               if (res.status === 200) {
                  localStorage.setItem(
                     "api_key_siakad",
                     JSON.stringify(res.data.data.token)
                  );
                  setData(res.data.data);
                  navigated(`/mhs/${res.data.data.nim}`, { replace: true });
               }

               if (res.data?.error || res.status >= 400) {
                  setError(true);
               }
            })
            .catch(() => {
               setError(true);
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   const update = (url, body) => {
      return apiClient.put(url, body, {
         headers: {
            "Content-Type": "application/json",
            api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
         },
      });
   };

   return {
      isLoading,
      data,
      isError,
      checkToken,
      update,
   };
}
