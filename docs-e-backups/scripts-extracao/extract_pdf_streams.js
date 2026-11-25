import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const docDir = 'C:/Users/vinad/Downloads/DOCUME~1/DOCUME~1';

function dumpPdfText(filename, outputFile) {
  const filePath = path.join(docDir, filename);
  if (!fs.existsSync(filePath)) return;

  const buf = fs.readFileSync(filePath);
  let textResult = `=== ${filename} ===\n\n`;

  // Find all stream ... endstream blocks
  let offset = 0;
  while (offset < buf.length) {
    const streamStart = buf.indexOf('stream', offset);
    if (streamStart === -1) break;

    // find stream data start (after \r\n or \n)
    let dataStart = streamStart + 6;
    if (buf[dataStart] === 13) dataStart++;
    if (buf[dataStart] === 10) dataStart++;

    const streamEnd = buf.indexOf('endstream', dataStart);
    if (streamEnd === -1) break;

    const streamData = buf.slice(dataStart, streamEnd);
    try {
      const decompressed = zlib.inflateSync(streamData);
      const str = decompressed.toString('utf-8');

      // extract text in parenthesis (text) or Tj / TJ operators
      const tjMatches = str.match(/\((.*?)\)\s*Tj/g) || str.match(/\((.*?)\)/g);
      if (tjMatches) {
        const cleaned = tjMatches.map(m => m.replace(/[\(\)]/g, '')).join(' ');
        textResult += cleaned + '\n';
      } else {
        // filter printable chars
        const printable = str.replace(/[^\x20-\x7E\xA0-\xFF]/g, ' ');
        if (printable.trim().length > 20) {
          textResult += printable + '\n';
        }
      }
    } catch (e) {
      // not flate stream or error
    }

    offset = streamEnd + 9;
  }

  fs.writeFileSync(outputFile, textResult);
  console.log(`Saved extracted text to ${outputFile} (Length: ${textResult.length})`);
}

dumpPdfText('PJL-Curitiba360.pdf', 'PJL_text.txt');
dumpPdfText('SRS — Curitiba 360 Portal Público.pdf', 'SRS_Publico_text.txt');
dumpPdfText('SRS — Curitiba 360 Backoffice.pdf', 'SRS_Backoffice_text.txt');
