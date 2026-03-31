// import fs from "fs";

// export function loadText(path) {
//   const text = fs.readFileSync(path, "utf-8");
//   return text;
// }
import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function loadText(path) {
  const data = new Uint8Array(fs.readFileSync(path));

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items.map((item) => item.str).join(" ");

    text += pageText + "\n";
  }

  return text;
}
// import fs from "fs";
// import pdf from "pdf-parse";

// export async function loadText(path) {
//   const data = fs.readFileSync(path);

//   const result = await pdf(data);

//   return result.text;
// }
