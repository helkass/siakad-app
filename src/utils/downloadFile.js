/**
 *
 * @param {base64} base64 original base64 string
 * @param {fileName} fileName fileName string
 * @param {extention file} ext pdf
 */
export const downloadBase64File = (base64, fileName, ext) => {
   const name = `${fileName}.${ext}`;
   const link = window.document.createElement("a");

   link.href = base64;
   link.download = name;
   link.click();
};
