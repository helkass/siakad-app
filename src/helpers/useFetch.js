import apiClient from "../api/apiClient";
import { useState } from "react";

export default function useFetch() {
   const [isLoading, setLoading] = useState(false);
   const [data, setData] = useState(null);
   const [isSuccess, setSuccess] = useState(null);
   const [isError, setError] = useState(null);
   const [message, setMessage] = useState("");

   const post = async (url, body) => {
      setLoading(true);
      return apiClient.post(url, body, {
         headers: {
            "Content-Type": "application/json",
            api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
         },
      });
   };

   const get = async (url) => {
      setLoading(true);
      await apiClient
         .get(url, {
            headers: {
               "Content-Type": "application/json",
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setData(res.data.data);
            }

            if (res.data?.error) {
               setError(true);
               setMessage(res.data?.error);
            }
         })
         .catch((err) => {
            setMessage(err.response.data.error);
            setError(true);
         })
         .finally(() => {
            setLoading(false);

            setTimeout(() => {
               setError(null);
               setSuccess(null);
               setMessage("");
            }, 4000);
         });
   };

   const update = async (url, body, refetchUrl) => {
      setLoading(true);
      await apiClient
         .put(url, body, {
            headers: {
               "Content-Type": "application/json",
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setData(res.data.data);
               setError(false);
               setMessage("data berhasil di update");

               setTimeout(() => {
                  if (refetchUrl) {
                     get(refetchUrl);
                  }
               }, 3000);
            }

            if (res.data?.error) {
               setError(true);
               setMessage(res.data?.error);
            }
         })
         .catch((err) => {
            setMessage(err.response.data.error);
            setError(true);
         })
         .finally(() => {
            setLoading(false);

            setTimeout(() => {
               setError(null);
               setSuccess(null);
               setMessage("");
            }, 4000);
         });
   };

   return {
      isLoading,
      setLoading,
      data,
      isSuccess,
      isError,
      post,
      message,
      get,
      update,
   };
}
