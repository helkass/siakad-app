export const onChange = (e) => {
   const files = e.target.files;
   const file = files[0];
   getBase64(file);
};

export const onLoad = (fileString) => {
   console.log(fileString);
};

export const getBase64 = (file, cb) => {
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => {
      cb(reader.result);
   };
};
