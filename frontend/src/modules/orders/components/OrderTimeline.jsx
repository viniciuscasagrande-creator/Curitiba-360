import React from "react";
import { Check } from "lucide-react";

export default function OrderTimeline({ status, createdAt, payment = {} }) {
  const steps = [
    {
      label: "Pedido Criado",
      description: "Recebemos sua solicitação de compra.",
      date: createdAt,
      active: true,
    },
    {
      label: "Pagamento Aprovado",
      description: payment.status === "approved" ? "Transação confirmada." : "Aguardando aprovação do pagamento.",
      date: payment.paidAt,
      active: payment.status === "approved" || status === "completed" || status === "confirmed",
    },
    {
      label: "Ingressos Emitidos",
      description: "Seus ingressos estão prontos para uso.",
      date: payment.paidAt,
      active: status === "confirmed" || status === "completed",
    },
    {
      label: "Experiência Realizada",
      description: "Obrigado por utilizar o Curitiba 360!",
      date: null,
      active: status === "completed",
    },
  ];

  if (status === "cancelled" || status === "refunded") {
    steps.push({
      label: status === "cancelled" ? "Pedido Cancelado" : "Pedido Reembolsado",
      description: status === "cancelled" ? "A compra foi cancelada." : "O valor da compra foi estornado.",
      date: new Date().toISOString(),
      active: true,
      isDanger: true,
    });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <h2 className="text-base font-bold text-slate-900 my-0">
        Status do Pedido
      </h2>

      <div className="mt-6 relative border-l border-slate-100 ml-4 pl-6 space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Indicator Circle */}
            <div
              className={`absolute -left-[35px] top-0 flex h-6.5 w-6.5 items-center justify-center rounded-full border text-white ${
                step.isDanger
                  ? "bg-red-600 border-red-200"
                  : step.active
                  ? "bg-emerald-600 border-emerald-200"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              {step.active && !step.isDanger ? (
                <Check size={12} className="stroke-[3]" />
              ) : step.isDanger ? (
                <span className="text-[10px] font-bold">!</span>
              ) : (
                <span className="text-[10px] font-bold">{idx + 1}</span>
              )}
            </div>

            <div>
              <h3 className={`text-xs font-bold my-0 uppercase tracking-wider ${step.isDanger ? "text-red-700" : step.active ? "text-slate-900" : "text-slate-400"}`}>
                {step.label}
              </h3>
              <p className="mt-1 text-xs text-slate-500 my-0">
                {step.description}
              </p>
              {step.active && step.date && (
                <span className="mt-1 inline-block text-[10px] font-semibold text-slate-400">
                  {new Date(step.date).toLocaleDateString("pt-BR")} às {new Date(step.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
