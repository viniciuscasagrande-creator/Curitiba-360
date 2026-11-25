import React, { useState, useEffect } from "react";
import { maskCPF } from "../utils/masks";
import { validateCPF } from "../utils/validators";

export default function ParticipantsForm({ cart, buyer, initialValues = [], onBack, onSubmit }) {
  const totalTickets = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const [participants, setParticipants] = useState(() => {
    if (initialValues.length > 0) return initialValues;
    return Array.from({ length: totalTickets }).map(() => ({
      name: "",
      cpf: "",
      birthDate: "",
      email: "",
    }));
  });

  const [useBuyerData, setUseBuyerData] = useState(false);

  useEffect(() => {
    if (useBuyerData && buyer) {
      setParticipants((prev) => {
        const next = [...prev];
        next[0] = {
          name: `${buyer.name} ${buyer.surname}`,
          cpf: buyer.cpf,
          birthDate: "",
          email: buyer.email,
        };
        return next;
      });
    }
  }, [useBuyerData, buyer]);

  const handleChange = (index, field, value) => {
    setParticipants((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const handleCPFChange = (index, value) => {
    handleChange(index, "cpf", maskCPF(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation before submitting
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name || !p.cpf || !p.birthDate || !p.email) {
        window.alert(`Por favor, preencha todos os campos do Ingresso ${i + 1}.`);
        return;
      }
      if (!validateCPF(p.cpf)) {
        window.alert(`O CPF informado no Ingresso ${i + 1} é inválido.`);
        return;
      }
    }
    onSubmit(participants);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-950 my-0">
          Dados dos Participantes
        </h3>
        {totalTickets > 0 && (
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={useBuyerData}
              onChange={(e) => setUseBuyerData(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
            />
            Utilizar dados do comprador no 1º ingresso
          </label>
        )}
      </div>

      <div className="space-y-6 divide-y divide-slate-100">
        {participants.map((participant, index) => (
          <div key={index} className={index > 0 ? "pt-5 space-y-4" : "space-y-4"}>
            <h4 className="text-sm font-bold text-slate-800 my-0">
              Ingresso #{index + 1}
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={participant.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Nome do portador"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">CPF</label>
                <input
                  type="text"
                  required
                  value={participant.cpf}
                  onChange={(e) => handleCPFChange(index, e.target.value)}
                  placeholder="000.000.000-00"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  required
                  value={participant.birthDate}
                  onChange={(e) => handleChange(index, "birthDate", e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={participant.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                  placeholder="email@participante.com"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition cursor-pointer"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 text-sm font-bold text-white transition border-none cursor-pointer"
        >
          Avançar
        </button>
      </div>
    </form>
  );
}
