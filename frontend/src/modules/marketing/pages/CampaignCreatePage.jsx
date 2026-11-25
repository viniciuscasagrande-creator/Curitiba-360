import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { createCampaignRepository } from "../repositories/marketingRepository";

export default function CampaignCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await createCampaignRepository({
      name,
      description: desc,
      type: "discount",
    });
    setSuccess(true);
    setTimeout(() => {
      navigate("/parceiro/marketing");
    }, 2000);
  };

  if (success) {
    return (
      <PartnerLayout>
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm select-none">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle size={36} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-955 my-0">Campanha Criada!</h2>
          <p className="mt-2 text-sm text-slate-655 my-0">
            A campanha foi adicionada ao seu painel e está pronta para publicação.
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
            to="/parceiro/marketing"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Marketing
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Nova Campanha
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome da Campanha</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Descrição</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm border-none cursor-pointer transition"
          >
            Criar Campanha
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
