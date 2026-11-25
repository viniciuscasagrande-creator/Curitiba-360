import fs from 'fs';
import path from 'path';

const docDir = 'C:/Users/vinad/Downloads/DOCUME~1/DOCUME~1';

function readPdfStrings(filename) {
  const filePath = path.join(docDir, filename);
  if (!fs.existsSync(filePath)) return;
  
  console.log(`\n========================================`);
  console.log(`READING PDF: ${filename}`);
  console.log(`========================================`);

  const buf = fs.readFileSync(filePath);
  const str = buf.toString('latin1');

  // Extract text chunks from PDF streams
  const matches = str.match(/\(([^)]+)\)\s*Tj/g) || str.match(/T[jJ]\s*\(([^)]+)\)/g) || str.match(/\[([^\]]+)\]\s*TJ/g);

  if (matches) {
    const text = matches.map(m => m.replace(/[\(\)\[\]]/g, '')).join(' ');
    console.log(text.substring(0, 3000));
  } else {
    // Fallback: extract printable strings
    const rawMatches = str.match(/[\x20-\x7E]{4,}/g) || [];
    const text = rawMatches.filter(s => 
      s.includes('Curitiba') || s.includes('360') || s.includes('Requisito') || 
      s.includes('RF-') || s.includes('CU-') || s.includes('cor') || s.includes('Teal') || s.includes('Verde') || s.includes('Azul')
    ).join(' \n');
    console.log(text.substring(0, 3000));
  }
}

readPdfStrings('PJL-Curitiba360.pdf');
readPdfStrings('SRS — Curitiba 360 Portal Público.pdf');
readPdfStrings('SRS — Curitiba 360 Backoffice.pdf');
