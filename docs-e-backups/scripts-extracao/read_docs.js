import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const docDir = 'C:/Users/vinad/Downloads/DOCUME~1/DOCUME~1';

console.log("=== FILES IN DOC DIR ===");
const files = fs.readdirSync(docDir);
console.log(files);

// Let's inspect orientaçoes.docx by extracting word/document.xml
const filesInDocDir = fs.readdirSync(docDir);
const docxFile = filesInDocDir.find(f => f.toLowerCase().includes('orienta'));

if (docxFile) {
  const fullPath = path.join(docDir, docxFile);
  console.log("\nFound docx:", fullPath);
  try {
    // We can use powershell to unzip or node zlib/zip
    const text = execSync(`powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${fullPath}').Entries | Where-Object { $_.FullName -eq 'word/document.xml' } | ForEach-Object { (New-Object System.IO.StreamReader($_.Open())).ReadToEnd() }"`).toString();
    // strip xml tags
    const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log("\n=== TEXT FROM ORIENTAÇÕES.DOCX ===");
    console.log(cleanText.substring(0, 3000));
  } catch(e) {
    console.error("Error reading docx:", e.message);
  }
}
