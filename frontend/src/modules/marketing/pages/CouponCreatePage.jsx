import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function CouponCreatePage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;
    setSuccess(true);
    setTimeout(() => {
      navigate("/parceiro/marketing/cupons");
    }, 2000);
  };

  if (success) {
    return (
      <PartnerLayout>
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm select-none">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle size={36} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-955 my-0">Cupom Criado!</h2>
          <p className="mt-2 text-sm text-slate-655 my-0">
            O cupom foi criado com sucesso e já está disponível para uso na plataforma.
          </p>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/marketing/cupons"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Marketing
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Novo Cupom
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Código do Cupom (Ex: FESTIVAL10)</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm border-none cursor-pointer transition"
          >
            Criar Cupom
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
