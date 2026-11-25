import React, { useState } from 'react';
import { DollarSign, Sliders, Plus, Trash2, CheckCircle2, TrendingUp } from 'lucide-react';

export default function CommissionEditor({ rules = {}, onSaveRules }) {
  const [tipoComissao, setTipoComissao] = useState(rules.tipoComissao || 'percentual');
  const [taxaComissao, setTaxaComissao] = useState(rules.taxaComissao || 5.0);
  const [comissaoFixaPorVenda, setComissaoFixaPorVenda] = useState(rules.comissaoFixaPorVenda || 0.0);
  const [faixas, setFaixas] = useState(rules.faixas || []);
  const [categoriasEspeciais, setCategoriasEspeciais] = useState(rules.categoriasEspeciais || []);

  const handleAddFaixa = () => {
    setFaixas([...faixas, { ate: 50000, taxa: 6.0 }]);
  };

  const handleRemoveFaixa = (index) => {
    setFaixas(faixas.filter((_, i) => i !== index));
  };

  const handleAddCategoria = () => {
    setCategoriasEspeciais([...categoriasEspeciais, { categoria: 'Passeio Náutico', taxa: 8.0 }]);
  };

  const handleRemoveCategoria = (index) => {
    setCategoriasEspeciais(categoriasEspeciais.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRules({
      tipoComissao,
      taxaComissao,
      comissaoFixaPorVenda,
      faixas,
      categoriasEspeciais
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-5 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-600" /> Configuração de Comissionamento Comercial
          </h3>
          <p className="text-[11px] text-slate-500">Defina os parâmetros de remuneração por venda do agente.</p>
        </div>
      </div>

      {/* Seleção do Modelo de Comissão */}
      <div className="space-y-3">
        <label className="block font-bold text-slate-700">Modelo de Comissão</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'percentual', label: 'Percentual Fixo (%)', desc: 'Porcentagem fixa sobre cada venda' },
            { id: 'fixo', label: 'Valor Fixo por Venda (R$)', desc: 'Valor em reais para cada ingresso emitido' },
            { id: 'faixas', label: 'Faixas Escaláveis', desc: 'Aumenta comissao conforme bate metas' }
          ].map((mode) => (
            <div
              key={mode.id}
              onClick={() => setTipoComissao(mode.id)}
              className={`
                p-3 rounded-xl border cursor-pointer transition-all space-y-1
                ${tipoComissao === mode.id 
                  ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold ring-2 ring-purple-500/20' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}
              `}
            >
              <div className="flex items-center justify-between">
                <span>{mode.label}</span>
                {tipoComissao === mode.id && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </div>
              <p className="text-[10px] text-slate-500 font-normal">{mode.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campos por Tipo */}
      {tipoComissao === 'percentual' && (
        <div className="p-4 bg-slate-50 rounded-xl space-y-2 max-w-sm">
          <label className="block font-bold text-slate-700">Taxa de Comissão Padrão (%)</label>
          <div className="relative">
            <input
              type="number"
              step="0.5"
              value={taxaComissao}
              onChange={(e) => setTaxaComissao(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-purple-700"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
          </div>
        </div>
      )}

      {tipoComissao === 'fixo' && (
        <div className="p-4 bg-slate-50 rounded-xl space-y-2 max-w-sm">
          <label className="block font-bold text-slate-700">Valor Fixo por Ingressos Emitidos (R$)</label>
          <div className="relative">
            <input
              type="number"
              step="1.0"
              value={comissaoFixaPorVenda}
              onChange={(e) => setComissaoFixaPorVenda(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-emerald-700"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
          </div>
        </div>
      )}

      {/* Categorias Especiais */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800">Categorias de Atração Especiais</h4>
            <p className="text-[10px] text-slate-500">Sobrescreve a taxa padrão para produtos específicos.</p>
          </div>
          <button
            type="button"
            onClick={handleAddCategoria}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Categoria
          </button>
        </div>

        <div className="space-y-2">
          {categoriasEspeciais.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
              <input
                type="text"
                value={cat.categoria}
                onChange={(e) => {
                  const copy = [...categoriasEspeciais];
                  copy[idx].categoria = e.target.value;
                  setCategoriasEspeciais(copy);
                }}
                className="flex-1 p-2 bg-white border border-slate-200 rounded-md font-medium"
                placeholder="Ex: Gastronomia"
              />
              <input
                type="number"
                step="0.5"
                value={cat.taxa}
                onChange={(e) => {
                  const copy = [...categoriasEspeciais];
                  copy[idx].taxa = parseFloat(e.target.value) || 0;
                  setCategoriasEspeciais(copy);
                }}
                className="w-24 p-2 bg-white border border-slate-200 rounded-md font-bold text-blue-600"
              />
              <span className="text-slate-400 font-bold">%</span>
              <button
                type="button"
                onClick={() => handleRemoveCategoria(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
        <button
          type="submit"
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Sliders className="w-4 h-4" /> Salvar Regras de Comissão
        </button>
      </div>
    </form>
  );
}
