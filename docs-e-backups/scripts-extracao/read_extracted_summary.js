import fs from 'fs';

function searchInFile(filename, keywords) {
  if (!fs.existsSync(filename)) return;
  const content = fs.readFileSync(filename, 'utf-8');
  console.log(`\n========================================`);
  console.log(`SUMMARY FOR ${filename}`);
  console.log(`========================================`);

  const lines = content.split('\n');
  const foundLines = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 5) return;
    if (keywords.some(kw => trimmed.toLowerCase().includes(kw.toLowerCase()))) {
      foundLines.push(trimmed.substring(0, 200));
    }
  });

  console.log(`Total matching lines: ${foundLines.length}`);
  console.log(foundLines.slice(0, 50).join('\n'));
}

searchInFile('PJL_text.txt', ['cor', 'teal', 'verde', 'azul', 'paleta', 'identidade', 'logo', 'lerner', 'conceito', 'jaime']);
searchInFile('SRS_Publico_text.txt', ['RF-', 'CU-', 'WF-', 'requisito', 'carrinho', 'pagamento', 'busca', 'filtro', 'favoritos', 'parceiro']);
searchInFile('SRS_Backoffice_text.txt', ['RF-', 'CU-', 'WF-', 'requisito', 'agência', 'parceiro', 'administrador', 'aprovação', 'voucher']);
