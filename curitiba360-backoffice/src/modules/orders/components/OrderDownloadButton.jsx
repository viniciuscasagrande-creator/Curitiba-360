import React from "react";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

export default function OrderDownloadButton({ order = {} }) {
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.text("CURITIBA 360 - COMPROVANTE OFICIAL", 20, 20);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Código do Pedido: ${order.code}`, 20, 35);
      doc.text(`Status: ${order.status.toUpperCase()}`, 20, 43);
      doc.text(`Data do Pedido: ${new Date(order.createdAt).toLocaleDateString("pt-BR")}`, 20, 51);

      doc.line(20, 58, 190, 58);

      // Customer Info
      doc.setFont("Helvetica", "bold");
      doc.text("DADOS DO CLIENTE", 20, 68);
      doc.setFont("Helvetica", "normal");
      doc.text(`Nome: ${order.customer?.name}`, 20, 76);
      doc.text(`E-mail: ${order.customer?.email}`, 20, 84);
      doc.text(`Documento: ${order.customer?.document}`, 20, 92);

      doc.line(20, 99, 190, 99);

      // Items Info
      doc.setFont("Helvetica", "bold");
      doc.text("ITENS ADQUIRIDOS", 20, 109);
      doc.setFont("Helvetica", "normal");
      let y = 117;
      (order.items || []).forEach((item, index) => {
        doc.text(`${index + 1}. ${item.title} - Qtd: ${item.quantity}`, 20, y);
        doc.text(`   Setor/Tipo: ${item.ticketType} - Valor: R$ ${item.totalPrice.toFixed(2)}`, 20, y + 8);
        y += 18;
      });

      doc.line(20, y, 190, y);
      y += 10;

      // Pricing & Payment Info
      doc.setFont("Helvetica", "bold");
      doc.text("PAGAMENTO", 20, y);
      doc.setFont("Helvetica", "normal");
      doc.text(`Método: ${order.payment?.method}`, 20, y + 8);
      doc.text(`Total Pago: R$ ${order.pricing?.total.toFixed(2)}`, 20, y + 16);

      doc.save(`comprovante-pedido-${order.code}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
      window.alert("Não foi possível gerar o PDF de comprovante.");
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
    >
      <Download size={16} />
      Comprovante PDF
    </button>
  );
}
