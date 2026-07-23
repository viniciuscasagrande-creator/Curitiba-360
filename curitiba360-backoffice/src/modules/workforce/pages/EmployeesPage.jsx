import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";

export default function EmployeesPage() {
  const { employees, saveEmployee, loading } = useWorkforceDashboard();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employmentType, setEmploymentType] = useState("employee");
  const [workModel, setWorkModel] = useState("on_site");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    saveEmployee({
      name,
      email,
      employmentType,
      workModel
    });
    setName("");
    setEmail("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando colaboradores...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fichas de Colaboradores</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Adicione novos colaboradores na base unificada ou altere contratos vigentes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755" /> Admitir Colaborador
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Alberto"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">E-mail Corporativo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: carlos@curitiba360.com.br"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Tipo Contrato</label>
                <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="employee">CLT / Efetivo</option>
                  <option value="temporary">Temporário</option>
                  <option value="contractor">Prestador PJ</option>
                  <option value="intern">Estagiário</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Modelo de Trabalho</label>
                <select value={workModel} onChange={(e) => setWorkModel(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="on_site">Presencial</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="remote">Remoto</option>
                </select>
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Cadastro
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Colaborador admitido!</span>}
          </form>

          {/* List of employees */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Profissionais Cadastrados</h3>
            <div className="divide-y divide-slate-100">
              {employees.map(emp => (
                <div key={emp.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <Link to={`/admin/workforce/employees/${emp.id}`} className="text-slate-900 text-sm font-bold block hover:text-purple-700 hover:underline">
                      {emp.name}
                    </Link>
                    <span className="text-[10px] text-slate-400 block font-mono">Registro: {emp.registrationNumber} | Contrato: {emp.employmentType} | Modelo: {emp.workModel} | Admissão: {emp.admissionDate}</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${emp.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
