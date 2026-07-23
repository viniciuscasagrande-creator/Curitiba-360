import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { useDigitalIdentity } from "../hooks/useDigitalIdentity";
import { Link } from "react-router-dom";
import { ArrowLeft, User, ShieldCheck, Accessibility, Settings } from "lucide-react";

export default function ProfilePage() {
  const { identity, loading, updateProfile, verifyIdentity } = useDigitalIdentity();
  const [success, setSuccess] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  React.useEffect(() => {
    if (identity) {
      setFullName(identity.fullName || "");
      setPhone(identity.phone || "");
    }
  }, [identity]);

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await updateProfile({ fullName, phone });
    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <div className="flex items-center justify-between">
          <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Início
          </Link>
          <Link to="/app/settings" className="text-slate-500 hover:text-slate-700">
            <Settings size={18} />
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Perfil Cidadão</h2>
          <p className="text-[10px] text-slate-500 m-0">Gerencie sua identidade digital única governamental.</p>
        </div>

        {loading || !identity ? (
          <div className="text-center py-12 text-slate-400">Carregando perfil...</div>
        ) : (
          <div className="space-y-4">
            {/* Identity level banner */}
            <div className="bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[8px] text-slate-400 font-bold block">NÍVEL DA IDENTIDADE</span>
                <strong className="text-xs text-emerald-400 font-mono flex items-center gap-1 uppercase">
                  <ShieldCheck size={14} /> {identity.identityLevel}
                </strong>
              </div>
              {identity.identityLevel !== "advanced" && (
                <button
                  onClick={verifyIdentity}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] rounded-xl border-none shadow-xs transition cursor-pointer"
                >
                  Avançar Conta
                </button>
              )}
            </div>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-center text-[10px] font-bold">
                Alterações salvas com sucesso!
              </div>
            )}

            {/* Profile fields form */}
            <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block uppercase">Nome Completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block uppercase">E-mail</label>
                <input
                  type="email"
                  value={identity.email}
                  disabled
                  className="w-full pl-3 pr-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block uppercase">Telefone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl border-none shadow-xs transition cursor-pointer font-sans"
              >
                Salvar Alterações
              </button>
            </form>

            {/* Accessibility Preferences */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-2.5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1.5">
                <Accessibility size={14} className="text-emerald-600" /> Acessibilidade
              </h3>
              <div className="space-y-2">
                {identity.accessibilityPreferences.map((pref, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-655 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{pref === "high_contrast" ? "Alto Contraste Ativo" : "Fontes Ampliadas Ativas"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
