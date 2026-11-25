// frontend/src/components/wf/WfScreensPart2.jsx
// Implementação fiel e funcional das telas WF-012 a WF-025 com logos oficiais do Curitiba 360°
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit3, Trash2, QrCode, Copy, X } from 'lucide-react';
import {
  WfSidebar, WfPagination, WfStatusPill,
  OFFICIAL_LOGO
} from './WfShell';
import { platformSyncService } from '../../services/platformSyncService';
import { freeApisService } from '../../services/freeApisService';

// ============================================================================
// WF-012, WF-013, WF-014, WF-015: GESTÃO DE ATRAÇÕES + WIZARD 1/3, 2/3, 3/3
// ============================================================================
export function Wf012Attractions({ store, updateStore, wizardStep = null }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    parceiro: 'Parque Jaime Lerner',
    nome: 'Rua da Música',
    local: 'Parque Jaime Lerner',
    cep: '80520-000',
    uf: 'PR',
    cidade: 'Curitiba',
    endereco: 'Rua Dois de Janeiro',
    numero: '123',
    complemento: '1000',
    classificacao: '18 anos',
    capacidade: '1000',
    menorAcompanhado: 'SIM',
    data: '25/12/2026',
    horarioInicio: '06:30',
    aberturaPortoes: '06:30',
    banco: 'Banco do Brasil',
    agencia: '3333-1',
    conta: '33333-0',
    beneficiario: 'José da Silva',
    cpfCnpj: '999.999.999-99',
    emailBordero: 'contato@curitiba360.com',
    youtube: 'youtube.com/curitiba360',
    release: 'Atração oficial cadastrada no Backoffice Curitiba 360°.',
    categoriaIngresso: 'Estudante',
    statusIngresso: 'Ativo',
    valorIngresso: '10,00',
    qtdIngresso: '1.000',
    loteIngresso: '001',
    msgCustomizada: 'Estudante',
    expiracaoHoras: '48'
  });

  const handleCepBlur = async () => {
    const res = await freeApisService.lookupCep(form.cep);
    if (res) {
      setForm((prev) => ({
        ...prev,
        endereco: res.street || prev.endereco,
        cidade: res.city || prev.cidade,
        uf: res.state || prev.uf
      }));
    }
  };

  const handleFinalize = () => {
    platformSyncService.addAttraction({
      nome: form.nome,
      local: `${form.local} - ${form.cidade}`,
      parceiro: form.parceiro,
      valor: parseFloat(form.valorIngresso.replace(',', '.')) || 45,
      release: form.release
    });
    updateStore((prev) => ({
      ...prev,
      attractions: [
        {
          id: prev.attractions.length + 1,
          code: 2810 + prev.attractions.length,
          nome: form.nome,
          local: `${form.local} - ${form.cidade}`,
          parceiro: form.parceiro,
          status: 'Ativo',
          dataCriacao: new Date().toLocaleString('pt-BR'),
          vendidos: 0,
          cortesias: 0,
          total: 0,
          receita: 'R$ 0,00'
        },
        ...prev.attractions
      ]
    }));
    navigate('/tela/wf-012-gestao-de-atracoes');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="admin" activeMenu="atracoes" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Atrações</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie as atrações do sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '260px' }}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter search terms" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
            </div>
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-013-gestao-de-atracoes-adicionar-atracao-1')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Atração ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => navigate('/tela/wf-013-gestao-de-atracoes-adicionar-atracao-1')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>✎ Editar</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>🗑 Excluir</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>● Inativar selecionados</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px 14px' }}>ID da Atração ↕</th>
              <th style={{ padding: '12px 14px' }}>Nome ↕</th>
              <th style={{ padding: '12px 14px' }}>Parceiro Comercial ↕</th>
              <th style={{ padding: '12px 14px' }}>Data de criação ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.attractions.map((a, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1', cursor: 'pointer' }} onClick={() => navigate('/tela/wf-003-detalhes-da-atracao-totais-da-atracao')}>
                <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px' }}>{a.code}</td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={OFFICIAL_LOGO} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #475467', padding: 2 }} />
                    <strong style={{ color: '#3b4758' }}>{a.nome}</strong>
                  </div>
                </td>
                <td style={{ padding: '14px' }}><WfStatusPill status={a.parceiro} /></td>
                <td style={{ padding: '14px' }}>{a.dataCriacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WIZARD WF-013 (1/3), WF-014 (2/3), WF-015 (3/3) */}
      {wizardStep && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Nova Atrações {wizardStep}/3</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>
                  {wizardStep === 1 ? 'Insira os dados da atração' : wizardStep === 2 ? 'Insira os dados bancários' : 'Insira os dados do ingresso'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-012-gestao-de-atracoes')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={handleFinalize} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar Rascunho ✓</button>
              </div>
            </div>

            {wizardStep === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={OFFICIAL_LOGO} alt="Curitiba 360°" style={{ width: '78px', height: '78px', borderRadius: '50%', border: '2px solid #475467', padding: '6px' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#3b4758' }}>Foto de principal</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>PNG, JPEG menor que 15MB</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '12.5px' }}>Carregar nova foto ⊕</button>
                    <button style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, fontSize: '12.5px' }}>Apagar 🗑</button>
                  </div>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #cbd5e1' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Parceiro Comercial</label>
                  <select value={form.parceiro} onChange={(e) => setForm({ ...form, parceiro: e.target.value })} style={{ width: '260px', padding: '10px', borderRadius: 8, border: '1.5px solid #475467' }}>
                    <option>Parque Jaime Lerner</option>
                    <option>Serra Verde Express</option>
                    <option>Instituto Jaime Lerner</option>
                  </select>
                </div>

                <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#3b4758', marginBottom: '10px' }}>Dados do Evento</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Nome da Atração</label>
                    <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Local</label>
                    <input value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>CEP (BrasilAPI)</label>
                    <input value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} onBlur={handleCepBlur} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Estado</label>
                    <input value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Cidade</label>
                    <input value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Endereço</label>
                    <input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => navigate('/tela/wf-014-gestao-de-atracoes-adicionar-atracao-2')} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Próximo ›</button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Banco</label>
                    <select value={form.banco} onChange={(e) => setForm({ ...form, banco: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}>
                      <option>Banco do Brasil</option>
                      <option>Itaú Unibanco</option>
                      <option>Caixa Econômica</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Agência</label>
                    <input value={form.agencia} onChange={(e) => setForm({ ...form, agencia: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Conta corrente</label>
                    <input value={form.conta} onChange={(e) => setForm({ ...form, conta: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Beneficiário</label>
                    <input value={form.beneficiario} onChange={(e) => setForm({ ...form, beneficiario: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>CPF/CNPJ</label>
                    <input value={form.cpfCnpj} onChange={(e) => setForm({ ...form, cpfCnpj: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Email para envio de borderô</label>
                    <input value={form.emailBordero} onChange={(e) => setForm({ ...form, emailBordero: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 4 }}>Release da atração (breve descritivo)</label>
                  <textarea value={form.release} onChange={(e) => setForm({ ...form, release: e.target.value })} rows={3} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={() => navigate('/tela/wf-013-gestao-de-atracoes-adicionar-atracao-1')} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>‹ Voltar</button>
                  <button onClick={() => navigate('/tela/wf-015-gestao-de-atracoes-adicionar-atracao-3')} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Próximo ›</button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '22px' }}>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Categoria</label>
                    <select value={form.categoriaIngresso} onChange={(e) => setForm({ ...form, categoriaIngresso: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}>
                      <option>Estudante</option>
                      <option>Adulto</option>
                      <option>Morador Curitiba Adulto</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Status</label>
                    <input value={form.statusIngresso} onChange={(e) => setForm({ ...form, statusIngresso: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Valor (R$)</label>
                    <input value={form.valorIngresso} onChange={(e) => setForm({ ...form, valorIngresso: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Quantidade</label>
                    <input value={form.qtdIngresso} onChange={(e) => setForm({ ...form, qtdIngresso: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Lote</label>
                    <input value={form.loteIngresso} onChange={(e) => setForm({ ...form, loteIngresso: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5 }}>Mensagem customizada</label>
                    <input value={form.msgCustomizada} onChange={(e) => setForm({ ...form, msgCustomizada: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={() => navigate('/tela/wf-014-gestao-de-atracoes-adicionar-atracao-2')} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>‹ Voltar</button>
                  <button onClick={handleFinalize} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Finalizar ✓</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-016: DETALHES DA ATRAÇÃO — CATEGORIAS
// ============================================================================
export function Wf016Categories({ store, updateStore }) {
  const [tab, setTab] = useState('Ativos');
  const [newCatName, setNewCatName] = useState('');

  const addCat = () => {
    const name = newCatName.trim() || window.prompt('Nome da nova categoria:', 'Meia-Entrada Cultural');
    if (!name) return;
    updateStore((prev) => ({
      ...prev,
      categories: [{ id: Math.floor(2810 + Math.random() * 500), nome: name, status: 'Ativo' }, ...prev.categories]
    }));
    setNewCatName('');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="categorias" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Categorias</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie as categorias da atração</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={addCat} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Categoria ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px 14px' }}>ID ↕</th>
              <th style={{ padding: '12px 14px' }}>Categoria ↕</th>
              <th style={{ padding: '12px 14px' }}>Status ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.categories.map((cat, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px' }}>{cat.id}</td>
                <td style={{ padding: '14px', fontWeight: 700, color: '#3b4758' }}>{cat.nome}</td>
                <td style={{ padding: '14px' }}><WfStatusPill status={cat.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>
    </div>
  );
}

// ============================================================================
// WF-017 & WF-018: PESQUISAR INGRESSO + DETALHE DO INGRESSO
// ============================================================================
export function Wf017TicketSearch({ store, showDetailModal = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [search, setSearch] = useState('');
  const vouchers = store.liveVouchers || [];

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="attraction" activeMenu="pesquisar" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Pesquisar Ingresso</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os ingressos emitidos</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter search terms" style={{ width: '260px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        {/* Action bar */}
        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => navigate('/tela/wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>🎟 Validar ingresso</button>
          <button onClick={() => alert('Ingresso reenviado para o e-mail do cliente!')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>➤ Reenviar ingresso</button>
          <button onClick={() => navigate('/tela/wf-022-detalhes-da-atracao-gestao-de-cupons-gerar-qr-code')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>▣ Visualizar QR Code</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>🗑 Cancelar</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px' }}>ID ↕</th>
              <th style={{ padding: '12px' }}>Código ↕</th>
              <th style={{ padding: '12px' }}>Status ↕</th>
              <th style={{ padding: '12px' }}>Atração ↕</th>
              <th style={{ padding: '12px' }}>Categoria ↕</th>
              <th style={{ padding: '12px' }}>Localização ↕</th>
              <th style={{ padding: '12px' }}>Data Hora Pedido ↕</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((v, idx) => (
              <tr
                key={idx}
                onClick={() => navigate('/tela/wf-018-detalhes-da-atracao-pesquisar-ingresso-detalhe-do-ingresso')}
                style={{ borderBottom: '1px solid #cbd5e1', cursor: 'pointer' }}
              >
                <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px' }}>{v.id}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{v.codigo}</td>
                <td style={{ padding: '14px' }}><WfStatusPill status={v.status} /></td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{v.atracao}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{v.categoria}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{v.localizacao}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{v.dataHora}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-018: DETALHES DO INGRESSO */}
      {showDetailModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '880px', padding: '32px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <button onClick={() => navigate('/tela/wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador')} style={{ position: 'absolute', right: 24, top: 24, width: 32, height: 32, borderRadius: '50%', border: 'none', backgroundColor: '#eef1f5', cursor: 'pointer', fontWeight: 700 }}>✕</button>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', textAlign: 'center', margin: '0 0 24px 0' }}>
              Detalhes do ingresso código 1234567890
            </h2>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3b4758', marginBottom: '8px' }}>Pedido</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 10 }}>Código ↕</th><th style={{ padding: 10 }}>Status ↕</th><th style={{ padding: 10 }}>Forma de pagamento ↕</th><th style={{ padding: 10 }}>Vendedor ↕</th><th style={{ padding: 10 }}>Data Hora Pedido ↕</th><th style={{ padding: 10 }}>Obs ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>1234567890</td>
                  <td style={{ padding: 12 }}><WfStatusPill status="Finalizado" /></td>
                  <td style={{ padding: 12, fontWeight: 700 }}>Cortesia</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>Parque Jaime Lerner</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>01/10/2026 10:00</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>Pedido de morador de Curitiba</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3b4758', marginBottom: '8px' }}>Dados do cliente</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 10 }}>Nome ↕</th><th style={{ padding: 10 }}>Email ↕</th><th style={{ padding: 10 }}>CPF/CNPJ ↕</th><th style={{ padding: 10 }}>Telefone ↕</th><th style={{ padding: 10 }}>Celular ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>João da Silva</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>joao@gmail.com</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>12341234-12</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>41 3030-3030</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>41 99999-9999</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3b4758', marginBottom: '8px' }}>Dados do Ingresso</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 10 }}>Status ↕</th><th style={{ padding: 10 }}>Data Criação ↕</th><th style={{ padding: 10 }}>Data Impressão ↕</th><th style={{ padding: 10 }}>Valor ↕</th><th style={{ padding: 10 }}>Taxa Administrativa ↕</th><th style={{ padding: 10 }}>Valor Total ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: 12 }}><WfStatusPill status="Vendido" /></td>
                  <td style={{ padding: 12, fontWeight: 700 }}>01/10/2026 10:00</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>01/10/2026 10:00</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>R$ 10,00</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>R$ 0,50</td>
                  <td style={{ padding: 12, fontWeight: 700 }}>R$ 10,50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-019 & WF-020: GESTÃO DE INGRESSO + ADICIONAR INGRESSO
// ============================================================================
export function Wf019TicketBatches({ store, updateStore, showModal = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [form, setForm] = useState({ categoria: 'Adulto', valor: 'R$ 10,00', lote: '001', quantidade: 50, expiracaoHoras: 4, msgCustomizada: 'Campanha promocional' });

  const handleSave = () => {
    updateStore((prev) => ({
      ...prev,
      ticketBatches: [{ id: Math.floor(2810 + Math.random() * 500), status: 'Ativo', ...form }, ...prev.ticketBatches]
    }));
    navigate('/tela/wf-019-detalhes-da-atracao-gestao-de-ingresso');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="attraction" activeMenu="ingressos" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Ingresso</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os ingressos da atração</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-020-detalhes-da-atracao-gestao-de-ingresso-adicionar-ingresso')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Ingresso ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px' }}>ID ↕</th>
              <th style={{ padding: '12px' }}>Categorias ↕</th>
              <th style={{ padding: '12px' }}>Status ↕</th>
              <th style={{ padding: '12px' }}>Valor ↕</th>
              <th style={{ padding: '12px' }}>Quantidade ↕</th>
              <th style={{ padding: '12px' }}>Lote ↕</th>
              <th style={{ padding: '12px' }}>Msg Customizada ↕</th>
              <th style={{ padding: '12px' }}>Expiração do Pedido (h) ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.ticketBatches.map((b, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px' }}>{b.id}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.categoria}</td>
                <td style={{ padding: '14px' }}><WfStatusPill status={b.status} /></td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.valor}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.quantidade}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.lote}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.msgCustomizada}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{b.expiracaoHoras}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-020: NOVO INGRESSO */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '640px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Novo Ingresso</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Preencha os campos obrigatórios para adicionar um ingresso</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-019-detalhes-da-atracao-gestao-de-ingresso')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar ✓</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Categoria</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                  <option>Adulto</option><option>Estudante</option><option>Morador Curitiba Adulto</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Valor</label>
                <input value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Lote</label>
                <input value={form.lote} onChange={(e) => setForm({ ...form, lote: e.target.value })} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Quantidade</label>
                <input value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Mensagem Customizada</label>
                <input value={form.msgCustomizada} onChange={(e) => setForm({ ...form, msgCustomizada: e.target.value })} style={{ width: '280px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-021, WF-022, WF-023, WF-024: GESTÃO DE CUPONS + QR CODE + NOVO CUPOM / AGÊNCIA
// ============================================================================
export function Wf021Coupons({ store, updateStore, modalMode = null }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="attraction" activeMenu="cupons" />
      <div style={{ flex: 1, padding: '28px 36px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Cupons</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os cupons da atração</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '230px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-024-detalhes-da-atracao-gestao-de-cupons-adicionar-cupom-agencia')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}>Adicionar Cupom Agencia ⊕</button>
            <button onClick={() => navigate('/tela/wf-023-detalhes-da-atracao-gestao-de-cupons-adicionar-cupom')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Cupom ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        {/* Action bar */}
        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => navigate('/tela/wf-022-detalhes-da-atracao-gestao-de-cupons-gerar-qr-code')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>🔗 Gerar link / QR</button>
          <button onClick={() => navigate('/tela/wf-022-detalhes-da-atracao-gestao-de-cupons-gerar-qr-code')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>💬 Compartilhar</button>
          <button onClick={() => navigate('/tela/wf-023-detalhes-da-atracao-gestao-de-cupons-adicionar-cupom')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>✎ Editar</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>🗑 Excluir</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '10px' }}>ID ↕</th>
              <th style={{ padding: '10px' }}>Nome ↕</th>
              <th style={{ padding: '10px' }}>Usuário Relacionado ↕</th>
              <th style={{ padding: '10px' }}>Status ↕</th>
              <th style={{ padding: '10px' }}>Porcentagem/valor ↕</th>
              <th style={{ padding: '10px' }}>Valor ↕</th>
              <th style={{ padding: '10px' }}>Quantidade ↕</th>
              <th style={{ padding: '10px' }}>Link ↕</th>
              <th style={{ padding: '10px' }}>Saldo ↕</th>
              <th style={{ padding: '10px' }}>Dias da semana ↕</th>
              <th style={{ padding: '10px' }}>Categoria ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.coupons.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '12px 10px' }}><input type="checkbox" defaultChecked /></td>
                <td style={{ padding: '12px 10px' }}>{c.id}</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.nome}</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.usuario}</td>
                <td style={{ padding: '12px 10px' }}><WfStatusPill status={c.status} /></td>
                <td style={{ padding: '12px 10px' }}><span style={{ border: '1px solid #475467', borderRadius: 6, padding: '2px 8px' }}>{c.tipo}</span></td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.valor}</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.quantidade}</td>
                <td style={{ padding: '12px 10px' }}>📋 {c.link}</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.saldo}</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>{c.diasSemana}</td>
                <td style={{ padding: '12px 10px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {c.categorias.map((cat, i) => (
                      <span key={i} style={{ backgroundColor: '#eef1f5', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{cat}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-022: QR CODE */}
      {modalMode === 'qrcode' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '340px', padding: '28px', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <button onClick={() => navigate('/tela/wf-021-detalhes-da-atracao-gestao-de-cupons')} style={{ position: 'absolute', right: 18, top: 18, width: 28, height: 28, borderRadius: '50%', border: 'none', backgroundColor: '#eef1f5', cursor: 'pointer' }}>✕</button>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: '0 0 8px 0' }}>QR Code</h2>
            <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '16px' }}>Escaneie o QR Code ou copie o link</p>
            <div style={{ width: '210px', height: '210px', margin: '0 auto 16px auto', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <QrCode size={180} color="#111827" />
              <img src={OFFICIAL_LOGO} alt="" style={{ width: 42, height: 42, position: 'absolute', backgroundColor: '#fff', borderRadius: '50%', padding: 3 }} />
            </div>
            <div style={{ border: '1.5px solid #475467', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', marginBottom: '18px', color: '#3b4758' }}>
              🔗 curitiba360.com/joao10
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => navigate('/tela/wf-021-detalhes-da-atracao-gestao-de-cupons')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Fechar ✕</button>
              <button onClick={() => { navigator.clipboard?.writeText('https://curitiba360.vercel.app/site?ref=hotel-pestana'); alert('Link copiado!'); }} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Copiar 📋</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WF-023 / WF-024: NOVO CUPOM / NOVO CUPOM AGENCIA */}
      {(modalMode === 'cupom' || modalMode === 'cupom-agencia') && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '680px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>
                  {modalMode === 'cupom-agencia' ? 'Novo Cupom Agencia' : 'Novo Cupom'}
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Preencha os campos obrigatórios para adicionar um cupom</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-021-detalhes-da-atracao-gestao-de-cupons')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={() => navigate('/tela/wf-021-detalhes-da-atracao-gestao-de-cupons')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar ✓</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>{modalMode === 'cupom-agencia' ? 'Agencia' : 'Usuário Relacionado'}</label>
                <select style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}>
                  <option>{modalMode === 'cupom-agencia' ? 'Agencia Silva' : 'João da Silva'}</option>
                  <option>Hotel Pestana Curitiba 5★</option>
                  <option>Rota Serra Verde</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Nome do cupom</label>
                <input defaultValue="JOAO10" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Porcentagem/Valor</label>
                <select style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}><option>Porcentagem</option><option>Valor</option></select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Valor</label>
                <input defaultValue="10%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Quantidade</label>
                <input defaultValue="50" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Dias da semana</label>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((d, idx) => (
                    <span key={d} style={{ padding: '6px 8px', borderRadius: '50%', border: idx % 2 === 0 ? '2px solid #3b4758' : '1px solid #cbd5e1', fontSize: 11, fontWeight: 700 }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-025: DETALHES DA ATRAÇÃO — GRÁFICOS ANALYTICS
// ============================================================================
export function Wf025Analytics() {
  const [period, setPeriod] = useState('Tudo');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="analytics" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: '0 0 16px 0' }}>Atração Parque Jaime Lerner</h1>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
          {['Tudo', 'Hoje', '7 Dias', '30 Dias', '📅 Período'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', backgroundColor: period === p ? '#4e5a6b' : '#eef1f5', color: period === p ? '#fff' : '#3b4758', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>{p}</button>
          ))}
        </div>

        {/* Top 3 Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '18px' }}>
          {['Total de visitas', 'Total de ingressos', 'Estatísticas do evento acessos'].map((title, i) => (
            <div key={i} style={{ border: '1.5px solid #64748b', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#3b4758', marginBottom: '14px' }}>{title}</div>
              {i < 2 ? (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '130px', padding: '10px 10px 0 24px', borderBottom: '1px solid #cbd5e1' }}>
                  <div style={{ flex: 1, height: '65%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                  <div style={{ flex: 1, height: '78%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                  <div style={{ flex: 1, height: '90%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                  <div style={{ flex: 1, height: '58%', backgroundColor: '#4e5a6b', borderRadius: '4px 4px 0 0' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div><span>Engajamento (2.000)</span><div style={{ height: 14, width: '90%', backgroundColor: '#4e5a6b', borderRadius: 4, marginTop: 3 }} /></div>
                  <div><span>Acesso à página (1.500)</span><div style={{ height: 14, width: '72%', backgroundColor: '#7c899b', borderRadius: 4, marginTop: 3 }} /></div>
                  <div><span>Adicionado ao carrinho (1.000)</span><div style={{ height: 14, width: '48%', backgroundColor: '#94a0b2', borderRadius: 4, marginTop: 3 }} /></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '14px' }}>
          {[
            { label: 'Número de acessos', val: '3147' },
            { label: 'Usuários únicos', val: '3147' },
            { label: 'Quantidade vendida', val: '3147' },
            { label: 'Tempo médio', val: '16m 44s' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#3b4758', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '22px', color: '#3b4758' }}>{k.val}</strong>
                <span style={{ fontSize: '11.5px', color: '#d97706', fontWeight: 700 }}>↑+8%</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { label: 'Total vendido', val: 'R$ 513.145,00' },
            { label: 'Ticket médio', val: 'R$ 379,98' },
            { label: 'Conversão', val: '100%' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b4758', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '24px', color: '#3b4758' }}>{k.val}</strong>
                <span style={{ fontSize: '11.5px', color: '#d97706', fontWeight: 700 }}>↑+8%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
