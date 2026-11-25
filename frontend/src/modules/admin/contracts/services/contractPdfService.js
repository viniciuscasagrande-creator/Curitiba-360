import { jsPDF } from 'jspdf';

function sanitizeText(value, maxLength = 5000) {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function addWrappedText(
  document,
  text,
  x,
  y,
  maxWidth,
  lineHeight = 6
) {
  const safeText = sanitizeText(text);
  const lines = document.splitTextToSize(safeText, maxWidth);

  document.text(lines, x, y);

  return y + lines.length * lineHeight;
}

function ensurePageSpace(document, currentY, requiredSpace = 35) {
  if (currentY + requiredSpace <= 275) {
    return currentY;
  }

  document.addPage();
  return 25;
}

export function generateContractPdf({
  contract,
  partner,
  attraction,
  template,
  commercialCondition,
  financialInformation
}) {
  const document = new jsPDF({
    unit: 'mm',
    format: 'a4'
  });

  const marginX = 20;
  const maxWidth = 170;

  let currentY = 22;

  document.setFont('helvetica', 'bold');
  document.setFontSize(16);

  currentY = addWrappedText(
    document,
    template?.title || 'CONTRATO',
    marginX,
    currentY,
    maxWidth,
    8
  );

  currentY += 6;

  document.setFont('helvetica', 'normal');
  document.setFontSize(10);

  document.text(
    `Contrato: ${sanitizeText(contract.contractNumber || 'Rascunho')}`,
    marginX,
    currentY
  );

  currentY += 6;

  document.text(
    `Parceiro: ${sanitizeText(partner?.name || '-')}`,
    marginX,
    currentY
  );

  currentY += 6;

  document.text(
    `Atração: ${sanitizeText(attraction?.name || '-')}`,
    marginX,
    currentY
  );

  currentY += 10;

  currentY = addWrappedText(
    document,
    template?.introduction || '',
    marginX,
    currentY,
    maxWidth
  );

  currentY += 8;

  template?.clauses?.forEach((clause, index) => {
    currentY = ensurePageSpace(document, currentY, 40);

    document.setFont('helvetica', 'bold');
    document.setFontSize(11);

    currentY = addWrappedText(
      document,
      `${index + 1}. ${clause.title}`,
      marginX,
      currentY,
      maxWidth
    );

    currentY += 2;

    document.setFont('helvetica', 'normal');
    document.setFontSize(10);

    currentY = addWrappedText(
      document,
      clause.content,
      marginX,
      currentY,
      maxWidth
    );

    currentY += 7;
  });

  currentY = ensurePageSpace(document, currentY, 55);

  document.setFont('helvetica', 'bold');
  document.setFontSize(11);

  document.text('Informações do parceiro', marginX, currentY);

  currentY += 7;

  document.setFont('helvetica', 'normal');
  document.setFontSize(10);

  const companyInformation = [
    `Razão social: ${contract.company.legalName || '-'}`,
    `CNPJ: ${contract.company.cnpj || '-'}`,
    `Endereço: ${contract.company.address || '-'}`,
    `Cidade/UF: ${contract.company.city || '-'} / ${contract.company.state || '-'}`
  ];

  companyInformation.forEach((line) => {
    currentY = addWrappedText(
      document,
      line,
      marginX,
      currentY,
      maxWidth
    );

    currentY += 2;
  });

  currentY += 6;
  currentY = ensurePageSpace(document, currentY, 45);

  document.setFont('helvetica', 'bold');
  document.text('Condições comerciais', marginX, currentY);

  currentY += 7;

  document.setFont('helvetica', 'normal');

  currentY = addWrappedText(
    document,
    commercialCondition
      ? `${commercialCondition.name}. Taxa de serviço de ${commercialCondition.serviceFee}% e prazo de repasse de ${commercialCondition.paymentTermDays} dias.`
      : 'Condição comercial não informada.',
    marginX,
    currentY,
    maxWidth
  );

  currentY += 7;

  document.setFont('helvetica', 'bold');
  document.text('Informações financeiras', marginX, currentY);

  currentY += 7;

  document.setFont('helvetica', 'normal');

  currentY = addWrappedText(
    document,
    financialInformation?.description ||
      'Informações financeiras não informadas.',
    marginX,
    currentY,
    maxWidth
  );

  if (contract.additionalInformation) {
    currentY += 8;
    currentY = ensurePageSpace(document, currentY, 35);

    document.setFont('helvetica', 'bold');
    document.text('Informações adicionais', marginX, currentY);

    currentY += 7;

    document.setFont('helvetica', 'normal');

    addWrappedText(
      document,
      contract.additionalInformation,
      marginX,
      currentY,
      maxWidth
    );
  }

  const filename = `contrato-${
    sanitizeText(contract.contractNumber || 'preview', 50)
      .replace(/\s+/g, '-')
      .toLowerCase()
  }.pdf`;

  document.save(filename);
}

export default generateContractPdf;
