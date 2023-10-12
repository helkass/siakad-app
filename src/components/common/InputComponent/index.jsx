import { useEffect, useState } from "react";
import apiClient from "../../../api/apiClient";
import { useFetch } from "../../../helpers";

import {
   FormLabel,
   FormControl,
   FormHelperText,
   Input,
   Select,
} from "@chakra-ui/react";

export function InputComponent(props) {
   return (
      <FormControl isRequired={props.required}>
         <FormLabel htmlFor={props.id} fontSize={"sm"}>
            {props.label}
         </FormLabel>
         <Input {...props} />
         <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
   );
}

export function InputSelects({ data, ...props }) {
   const [options, setOptions] = useState(null);

   const fetchOptions = (url) => {
      apiClient
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
               setOptions(res.data.data);
            }
         })
         .catch((err) => alert(err.response.data.error));
   };

   useEffect(() => {
      if (data.toLowerCase() === "kelas") {
         fetchOptions("/kelas");
      } else if (data.toLowerCase() === "jurusan") {
         fetchOptions("/jurusan");
      } else if (data.toLowerCase() === "bank") {
         fetchOptions("/bank");
      }
   }, [data]);
   return (
      <FormControl>
         <FormLabel fontSize={"sm"}>{props.label}</FormLabel>
         <Select defaultValue={props.defaultValue} {...props}>
            <option disabled>{props.defaultValue}</option>
            {options !== null &&
               options.map((item) => (
                  <option
                     key={item.id}
                     value={
                        data.toLowerCase() === "bank" ? item.id : item.name
                     }>
                     {item.name}
                     {data.toLowerCase() === "bank" && "  -  " + item.bank_name}
                  </option>
               ))}
         </Select>
      </FormControl>
   );
}

// select options tahun dan semester
export function InputSelectStudi({ setSemester, setYear }) {
   const year = useFetch();

   useEffect(() => {
      year.get("/tahun");
   }, []);
   return (
      <>
         <Select
            isRequired
            name="semester"
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Select Semester">
            <option value="ganjil">Ganjil</option>
            <option value="genap">Genap</option>
         </Select>
         {!year.isLoading && year.data !== null && (
            <Select
               isRequired
               name="tahun"
               placeholder="Select Tahun"
               onChange={(e) => setYear(e.target.value)}>
               {year.data.map((th) => (
                  <option key={th.id} value={th.id}>
                     {th.tahun_mulai}/{th.tahun_akhir}
                  </option>
               ))}
            </Select>
         )}
      </>
   );
}

export const ListValRead = ({ label, value, ...props }) => {
   return (
      <FormControl isReadOnly={props.isReadOnly || true}>
         <FormLabel htmlFor={props.id}>{label}</FormLabel>
         <Input value={value} {...props} />
      </FormControl>
   );
};
