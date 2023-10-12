export default async function templateHtmlHasilStudi(
   mahasiswa,
   data,
   transkrip
) {
   const totalSks = await data
      .map((item) => item.hasil_studi_matkul)
      .map((mk) => mk.sks)
      .reduce((a, b) => a + b);

   const totalNilai = await data
      .map((item) => item.total)
      .reduce((a, b) => a + b);

   function getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);

      return date.toLocaleString("id-ID", { month: "long" });
   }

   const now = new Date();
   return `
<html>
   <head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <title>Cetak KHS Mahasiswa</title>   
   <style>
         * {
            margin: 0;
            padding: 0;
            text-indent: 0;
         }
         header {
            display: flex;
            gap: 40px;
            justify-content: center;
            align-items: center;
            position: relative;
            border-bottom: 1px solid black;
            margin-bottom: 10px;
         }
         header::after {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: -4%;
            content: "";
            height: 1px;
            background: #000;
         }
         .s1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 15.5pt;
         }
         p {
            color: black;
            font-family: "Trebuchet MS", sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 9pt;
            margin: 0pt;
         }
         .a {
            color: black;
            font-family: "Trebuchet MS", sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 9pt;
         }
         .s2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 12.5pt;
         }
         .s3 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 9pt;
         }
         .s4 {
            color: black;
            font-family: "Trebuchet MS", sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 9pt;
         }
         .s5 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 9pt;
         }
         .s6 {
            color: black;
            font-family: "Arial Nova Light", sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8.5pt;
         }
         .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: underline;
            font-size: 9pt;
         }
         .s8 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: underline;
            font-size: 9pt;
         }
         table,
         tbody {
            vertical-align: top;
            overflow: visible;
         }

         .w-sm {
            width: 25pt;
         }

         .border {
            border: 1px solid black;
         }
      </style>
   </head>
   <body>
      <header>
            <img
               width="80"
               height="80"
               src="data:image/png;base64,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" />
         <div 
            style="
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               max-width: 78%;
            ">
            <p
               class="s1"
               style="
                  padding-top: 4pt;
                  text-indent: 0pt;
                  text-align: center;
               ">
               IAI AL-MUHAMMAD CEPU
            </p>
            <p
               style="
                  text-indent: 0pt;
                  line-height: 17pt;
                  text-align: center;
               ">
               Alamat : Jalan Blora Nomor 151 Cepu - Blora - Jawa Tengah Kodepos :
               58312, Telepon : (0296) 421515
            </p>
            <p
               style="
                  padding-top: 3pt;
                  text-indent: 0pt;
                  text-align: center;
               ">
               <a href="http://www.staiamc.ac.id/" class="a" target="_blank"
                  >Website : </a
               ><a href="mailto:stai_amc@yahoo.co.id" class="a" target="_blank"
                  >www.staiamc.ac.id | Email : </a
               >stai_amc@yahoo.co.id | Faximile : (0296) 425136
            </p>
            <p style="text-indent: 0pt; text-align: left"><br /></p>
            <p
               style="
                  line-height: 2pt;
                  text-align: left;
               " />
            <p style="text-indent: 0pt; text-align: left"><br /></p>
         </div>
      </header>
      <p
         class="s2"
         style="text-indent: 0pt; text-align: center">
         KARTU HASIL STUDI (KHS)
      </p>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <table
         style="border-collapse: collapse; margin-left: 5.5pt"
         cellspacing="0">
         <tr style="height: 11pt">
            <td style="width: 92pt">
               <p
                  class="s3"
                  style="
                     padding-left: 2pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  Nama Mahasiswa
               </p>
            </td>
            <td style="width: 158pt">
               <p
                  class="s3"
                  style="
                     padding-left: 18pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                     text-transform: capitalize;
                  ">
                  : <span class="s4">${mahasiswa.name}</span>
               </p>
            </td>
            <td style="width: 92pt">
               <p
                  class="s3"
                  style="
                     padding-left: 22pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  NIM
               </p>
            </td>
            <td style="width: 114pt">
               <p
                  class="s3"
                  style="
                     padding-left: 38pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  : <span class="s4">${mahasiswa.nim}</span>
               </p>
            </td>
         </tr>
         <tr style="height: 11pt">
            <td style="width: 92pt">
               <p
                  class="s3"
                  style="
                     padding-left: 2pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  Program Studi
               </p>
            </td>
            <td style="width: 158pt">
               <p
                  class="s3"
                  style="
                     padding-left: 18pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  : <span class="s4">${mahasiswa.jurusan}</span>
               </p>
            </td>
            <td style="width: 92pt">
               <p
                  class="s3"
                  style="
                     padding-left: 22pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  Periode
               </p>
            </td>
            <td style="width: 114pt">
               <p
                  class="s3"
                  style="
                     padding-left: 38pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  : <span class="s4">2022/2023 ${
                     mahasiswa.semester % 2 === 0 ? "Genap" : "Ganjil"
                  }</span>
               </p>
            </td>
         </tr>
         <tr style="height: 11pt">
            <td style="width: 92pt">
               <p
                  class="s3"
                  style="
                     padding-left: 2pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  Semester
               </p>
            </td>
            <td style="width: 158pt">
               <p
                  class="s3"
                  style="
                     padding-left: 18pt;
                     text-indent: 0pt;
                     line-height: 10pt;
                     text-align: left;
                  ">
                  : <span class="s4">${mahasiswa.semester}</span>
               </p>
            </td>
            <td style="width: 92pt">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
            </td>
            <td style="width: 114pt">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
            </td>
         </tr>
      </table>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <table
         style="border-collapse: collapse; margin-left: 8.375pt"
         cellspacing="0">
         <tr style="height: 22pt">
            <td class="border w-sm" rowspan="2">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 5pt;
                     text-indent: 0pt;
                     text-align: left;
                  ">
                  No.
               </p>
            </td>
            <td class="border" style="width: 83pt" rowspan="2">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 6pt;
                     text-indent: 0pt;
                     text-align: left;
                  ">
                  Kode Mata Kuliah
               </p>
            </td>
            <td class="border" style="width: 230pt" rowspan="2">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 74pt;
                     padding-right: 74pt;
                     text-indent: 0pt;
                     text-align: center;
                  ">
                  Nama Mata Kuliah
               </p>
            </td>
            <td class="border" style="width: 27pt" rowspan="2">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 5pt;
                     text-indent: 0pt;
                     text-align: left;
                  ">
                  SKS
               </p>
            </td>
            <td class="border" style="width: 109pt" colspan="3">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 44pt;
                     padding-right: 42pt;
                     text-indent: 0pt;
                     text-align: center;
                  ">
                  Nilai
               </p>
            </td>
            <td class="border" style="width: 64pt" rowspan="2">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 6pt;
                     text-indent: 0pt;
                     text-align: left;
                  ">
                  SKS * Indeks
               </p>
            </td>
         </tr>
         <tr style="height: 23pt">
            <td class="border" style="width: 37pt">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 4pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  Angka
               </p>
            </td>
            <td class="border" style="width: 33pt">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-left: 4pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: center;
                  ">
                  Huruf
               </p>
            </td>
            <td class="border" style="width: 39pt">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 4pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  Indeks
               </p>
            </td>
         </tr>
         ${data
            .map(
               (item, i) => `
            <tr style="height: 22pt">
               <td class="border w-sm">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-right: 4pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                     ${i + 1}
                  </p>
               </td>
               <td class="border" style="width: 83pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-left: 26pt;
                     padding-right: 25pt;
                     text-indent: 0pt;
                     text-align: center;
                  ">
                     ${item.hasil_studi_matkul.kode}
                  </p>
               </td>
               <td class="border" style="width: 230pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-left: 5pt;
                     text-indent: 0pt;
                     text-align: left;
                  ">
                     ${item.mata_kuliah}
                  </p>
               </td>
               <td class="border" style="width: 27pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                     ${item.hasil_studi_matkul.sks}
                  </p>
               </td>
               <td class="border" style="width: 37pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                     ${item.angka}
                  </p>
               </td>
               <td class="border" style="width: 33pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-left: 4pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: center;
                  ">
                     ${item.huruf}
                  </p>
               </td>
               <td class="border" style="width: 39pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                     ${item.indeks}
                  </p>
               </td>
               <td class="border" style="width: 64pt">
                  <p
                     class="s4"
                     style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                     ${item.total}
                  </p>
               </td>
            </tr>
         `
            )
            .join("")}
         <tr style="height: 22pt">
            <td class="border" style="width: 338pt" colspan="3">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 4pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  Total SKS
               </p>
            </td>
            <td class="border" style="width: 27pt">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  ${totalSks}
               </p>
            </td>
            <td class="border" style="width: 109pt" colspan="3">
               <p style="text-indent: 0pt; text-align: left"><br /></p>
            </td>
            <td class="border" style="width: 64pt">
               <p
                  class="s4"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  ${totalNilai}
               </p>
            </td>
         </tr>
         <tr style="height: 22pt">
            <td class="border" style="width: 474pt" colspan="7">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  IPS ( Indeks Prestasi Semester )
               </p>
            </td>
            <td class="border" style="width: 64pt">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  ${Number(totalNilai / totalSks).toFixed(2)}
               </p>
            </td>
         </tr>
         <tr style="height: 22pt">
            <td
               style="
                  width: 474pt;
                  border-top-style: solid;
                  border-top-width: 1pt;
                  border-left-style: solid;
                  border-left-width: 1pt;
                  border-bottom-style: solid;
                  border-bottom-width: 1pt;
                  border-right-style: solid;
                  border-right-width: 1pt;
               "
               colspan="7">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  IPK ( Indeks Prestasi Kumulatif )
               </p>
            </td>
            <td
               style="
                  width: 64pt;
                  border-top-style: solid;
                  border-top-width: 1pt;
                  border-left-style: solid;
                  border-left-width: 1pt;
                  border-bottom-style: solid;
                  border-bottom-width: 1pt;
                  border-right-style: solid;
                  border-right-width: 1pt;
               ">
               <p
                  class="s3"
                  style="
                     padding-top: 5pt;
                     padding-right: 3pt;
                     text-indent: 0pt;
                     text-align: right;
                  ">
                  ${transkrip.nilai}
               </p>
            </td>
         </tr>
      </table>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <p
         class="s5"
         style="
            padding-top: 3pt;
            padding-left: 7pt;
            text-indent: 0pt;
            text-align: left;
         ">
         Batas SKS yang bisa diambil di semester berikutnya adalah
         <span class="s6">24 SKS</span>
      </p>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <p
         style="
            padding-top: 4pt;
            padding-left: 350pt;
            text-indent: 0pt;
            text-align: center;
         ">
         Prodi, ${now.getDate()} ${getMonthName(
      now.getMonth()
   )} ${now.getFullYear()}
      </p>
      <p style="padding-left: 350pt; text-indent: 0pt; text-align: center">
         Biro Administras &amp; Akademik (BAAK)
      </p>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <p
         class="s7"
         style="
            padding-top: 7pt;
            padding-left: 350pt;
            text-indent: 0pt;
            text-align: center;
         ">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <span class="s8">MUHAMAD WAHYUDIN &nbsp;&nbsp;&nbsp; </span>
      </p>
      <p style="padding-left: 350pt; text-indent: 0pt; text-align: center">
         2117128303
      </p>
   </body>
</html>
`;
}
