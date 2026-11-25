// frontend/src/components/wf/WfScreensPart4.jsx
// Implementação fiel e funcional das telas WF-048 a WF-064 com logos oficiais do Curitiba 360°
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WfSidebar, WfPagination, WfStatusPill,
  OFFICIAL_LOGO
} from './WfShell';
import { freeApisService } from '../../services/freeApisService';

// ============================================================================
// WF-048 (4 VARIAÇÕES) & WF-049 (ETAPAS 1, 2 e 3): GESTÃO E CADASTRO DE AGÊNCIAS
// ============================================================================
export function Wf048Agencies({ store, updateStore, initialTab = 'Ativas', isPartnerView = false, showSuspendModal = false, wizardStep = null }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(initialTab);
  const [cep, setCep] = useState('80010-010');
  const [logradouro, setLogradouro] = useState('Rua XV de Novembro');

  const handleCep = async () => {
    const res = await freeApisService.lookupCep(cep);
    if (res?.street) setLogradouro(res.street);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar
        mode={isPartnerView ? 'partner' : 'admin'}
        activeMenu="agencias"
        userName={isPartnerView ? 'Maria Oliveira' : 'João da Silva'}
        userRole={isPartnerView ? 'Parceiro Comercial' : 'Administrador'}
      />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Agências</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie as agências de turismo cadastradas no sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Agência ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativas', 'Aguardando Contrato', 'Pendente de Aprovação', 'Suspensas', 'Inativas', 'Todas'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer', fontSize: 13 }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          {tab === 'Pendente de Aprovação' ? (
            <>
              <button onClick={() => alert('Agências aprovadas com sucesso!')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>☑ Aprovar selecionadas</button>
              <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>🗑 Rejeitar selecionadas</button>
            </>
          ) : isPartnerView ? (
            <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', color: '#94a3b8' }}>🔗 Editar</button>
          ) : (
            <>
              <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>🔗 Editar</button>
              <button onClick={() => navigate('/tela/wf-048-gestao-de-agencias-estado-9-modal-suspender-selecionadas-motivo-opcional')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>☍ Suspender selecionadas</button>
              <button style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>☑ Inativar selecionadas</button>
              <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>🗑 Excluir</button>
            </>
          )}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px' }}>ID ↕</th>
              <th style={{ padding: '12px' }}>Nome Fantasia ↕</th>
              <th style={{ padding: '12px' }}>CNPJ ↕</th>
              <th style={{ padding: '12px' }}>E-mail Responsável ↕</th>
              <th style={{ padding: '12px' }}>Status ↕</th>
              <th style={{ padding: '12px' }}>Qtd Agentes ↕</th>
              <th style={{ padding: '12px' }}>Data de Cadastro ↕</th>
              <th style={{ padding: '12px' }}>Cidade/UF ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.agencies.map((ag, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px 12px' }}>{ag.id}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{ag.nomeFantasia}</td>
                <td style={{ padding: '14px 12px' }}>{ag.cnpj}</td>
                <td style={{ padding: '14px 12px' }}>{ag.email}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={tab === 'Pendente de Aprovação' ? 'Pendente' : 'Ativa'} /></td>
                <td style={{ padding: '14px 12px' }}>{ag.qtdAgentes}</td>
                <td style={{ padding: '14px 12px' }}>{ag.dataCadastro}</td>
                <td style={{ padding: '14px 12px' }}>{ag.cidadeUf}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-048 ESTADO 9: SUSPENDER SELECIONADAS */}
      {showSuspendModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '480px', padding: '28px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <button onClick={() => navigate('/tela/wf-048-gestao-de-agencias')} style={{ position: 'absolute', right: 20, top: 20, width: 28, height: 28, borderRadius: '50%', border: 'none', backgroundColor: '#eef1f5', cursor: 'pointer' }}>✕</button>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: '0 0 12px 0' }}>Suspender agências selecionadas</h2>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
              Você está prestes a suspender 3 agências. Os agentes vinculados serão bloqueados e não poderão realizar vendas até a reativação.
            </p>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#3b4758', display: 'block', marginBottom: 6 }}>Motivo (opcional)</label>
            <input placeholder="Descreva o motivo da suspensão" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid #475467', marginBottom: '20px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => navigate('/tela/wf-048-gestao-de-agencias')} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => { alert('Agências suspensas!'); navigate('/tela/wf-048-gestao-de-agencias'); }} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Suspender</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WF-049: CADASTRO DE AGÊNCIA (1/3, 2/3, 3/3) */}
      {wizardStep && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Cadastro de Agência {wizardStep}/3</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>
                  {wizardStep === 1 ? 'Insira os dados da empresa' : wizardStep === 2 ? 'Insira os dados do responsável' : 'Insira os dados bancários'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-048-gestao-de-agencias')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={() => navigate('/tela/wf-048-gestao-de-agencias')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar Rascunho ✓</button>
              </div>
            </div>

            {/* Stepper Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', fontSize: '12.5px', fontWeight: 700, color: '#475569' }}>
              <span onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa')} style={{ cursor: 'pointer', color: wizardStep === 1 ? '#1e293b' : '#94a3b8' }}>❶ Dados da Empresa</span>
              <div style={{ flex: 1, height: 1, backgroundColor: '#cbd5e1', margin: '0 12px' }} />
              <span onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-2-dados-do-responsavel')} style={{ cursor: 'pointer', color: wizardStep === 2 ? '#1e293b' : '#94a3b8' }}>❷ Dados do Responsável</span>
              <div style={{ flex: 1, height: 1, backgroundColor: '#cbd5e1', margin: '0 12px' }} />
              <span onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-3-dados-bancarios')} style={{ cursor: 'pointer', color: wizardStep === 3 ? '#1e293b' : '#94a3b8' }}>❸ Dados Bancários</span>
            </div>

            {wizardStep === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={OFFICIAL_LOGO} alt="Curitiba 360°" style={{ width: '74px', height: '74px', borderRadius: '50%', border: '2px solid #475467', padding: '5px' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#3b4758' }}>Foto de Perfil / Logo (opcional)</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>PNG/JPG menor que 5 MB</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '12.5px' }}>Carregar nova foto ⊕</button>
                    <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, fontSize: '12.5px' }}>Apagar 🗑</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div><label style={{ fontSize: 11.5 }}>Nome Fantasia</label><input defaultValue="Curitiba Sightseeing" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Razão Social</label><input defaultValue="Curitiba Sightseeing Turismo Ltda" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>CNPJ</label><input defaultValue="12.345.678/0001-90" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>CEP (BrasilAPI)</label><input value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCep} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div style={{ gridColumn: 'span 2' }}><label style={{ fontSize: 11.5 }}>Logradouro</label><input value={logradouro} onChange={(e) => setLogradouro(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-2-dados-do-responsavel')} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Próximo ›</button>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div><label style={{ fontSize: 11.5 }}>Nome Completo do Responsável</label><input defaultValue="João Pereira dos Santos" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>CPF do Responsável</label><input defaultValue="123.456.789-00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>E-mail de Acesso/Contato</label><input defaultValue="joao.santos@curitibasightseeing.com.br" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Telefone Celular</label><input defaultValue="(41) 99999-8888" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Nome do Gestor</label><input defaultValue="Marina Costa Ribeiro" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>E-mail do Gestor</label><input defaultValue="marina.costa@curitibasightseeing.com.br" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa')} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>‹ Voltar</button>
                  <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-3-dados-bancarios')} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Próximo ›</button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div><label style={{ fontSize: 11.5 }}>Banco</label><select style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}><option>Banco do Brasil (001)</option><option>Itaú (341)</option></select></div>
                  <div><label style={{ fontSize: 11.5 }}>Tipo de Conta</label><input defaultValue="Corrente" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Agência</label><input defaultValue="1234-5" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Conta Corrente</label><input defaultValue="12345-6" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Chave Pix</label><input defaultValue="12.345.678/0001-90" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontSize: 11.5 }}>Titular da Conta</label><input defaultValue="Curitiba Sightseeing Turismo Ltda" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button onClick={() => navigate('/tela/wf-049-cadastro-de-agencia-etapa-2-dados-do-responsavel')} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>‹ Voltar</button>
                  <button
                    onClick={() => {
                      updateStore((prev) => ({
                        ...prev,
                        agencies: [{ id: '012', nomeFantasia: 'Curitiba Sightseeing', cnpj: '12.345.678/0001-90', email: 'joao.santos@curitibasightseeing.com.br', status: 'Ativa', qtdAgentes: 2, dataCadastro: new Date().toLocaleString('pt-BR'), cidadeUf: 'Curitiba/PR' }, ...prev.agencies]
                      }));
                      navigate('/tela/wf-048-gestao-de-agencias');
                    }}
                    style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Salvar ✓
                  </button>
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
// WF-050 (3 VARIAÇÕES) & WF-064: GESTÃO DE AGENTES + CADASTRO DE AGENTE
// ============================================================================
export function Wf050Agents({ store, updateStore, initialTab = 'Ativos', isPartnerView = false, showModal = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(initialTab);

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar
        mode={isPartnerView ? 'partner' : 'admin'}
        activeMenu="agentes"
        userName={isPartnerView ? 'Maria Oliveira' : 'João da Silva'}
        userRole={isPartnerView ? 'Parceiro Comercial' : 'Administrador'}
      />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Agentes</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os agentes cadastrados no sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-064-cadastro-de-agente')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Agente ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Pendente de Aprovação', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => navigate('/tela/wf-064-cadastro-de-agente')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>✎ Editar</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>☍ Inativar</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>🗑 Excluir</button>
          <button onClick={() => alert('Agentes transferidos de agência!')} style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>↻ Transferir para outra Agência</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px' }}>ID ↕</th>
              <th style={{ padding: '12px' }}>Nome ↕</th>
              <th style={{ padding: '12px' }}>CPF ↕</th>
              <th style={{ padding: '12px' }}>E-mail ↕</th>
              <th style={{ padding: '12px' }}>Agência Vinculada ↕</th>
              <th style={{ padding: '12px' }}>Qtd Atrações ↕</th>
              <th style={{ padding: '12px' }}>Status ↕</th>
              <th style={{ padding: '12px' }}>Data Cadastro ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.agents.map((ag, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px 12px' }}>{ag.id}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{ag.nome}</td>
                <td style={{ padding: '14px 12px' }}>{ag.cpf}</td>
                <td style={{ padding: '14px 12px' }}>{ag.email}</td>
                <td style={{ padding: '14px 12px' }}>{ag.agencia}</td>
                <td style={{ padding: '14px 12px' }}>{ag.qtdAtracoes}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={tab === 'Pendente de Aprovação' ? 'Pendente' : ag.status} /></td>
                <td style={{ padding: '14px 12px' }}>{ag.dataCadastro}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-064: CADASTRO DE AGENTE */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '720px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Cadastro de Agente</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Preencha os dados do agente</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-050-gestao-de-agentes')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Cancelar 🗑</button>
                <button
                  onClick={() => {
                    updateStore((prev) => ({
                      ...prev,
                      agents: [{ id: '006', nome: 'Carlos Eduardo Mendes', cpf: '987.654.321-00', email: 'carlos.mendes@email.com', agencia: 'Curitiba Sightseeing', qtdAtracoes: 3, status: 'Ativo', dataCadastro: new Date().toLocaleString('pt-BR') }, ...prev.agents]
                    }));
                    navigate('/tela/wf-050-gestao-de-agentes');
                  }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Salvar ✓
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div><label style={{ fontSize: 11.5 }}>Nome completo</label><input defaultValue="Carlos Eduardo Mendes" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>CPF</label><input defaultValue="987.654.321-00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>E-mail</label><input defaultValue="carlos.mendes@email.com" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Telefone</label><input defaultValue="(41) 99876-5432" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Agência Vinculada</label><input defaultValue="Curitiba Sightseeing" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Status</label><input defaultValue="Ativo" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758', marginBottom: 8 }}>Atrações Autorizadas</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '13px' }}>
                <label><input type="checkbox" defaultChecked /> Jardim Botânico</label>
                <label><input type="checkbox" defaultChecked /> Ópera de Arame</label>
                <label><input type="checkbox" /> Museu Oscar Niemeyer</label>
                <label><input type="checkbox" defaultChecked /> Parque Tanguá</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-051 & WF-057: OPERAÇÃO COMERCIAL (E TELA INICIAL POR PERFIL)
// ============================================================================
export function Wf051CommercialOperation({ userName = 'João da Silva' }) {
  const rows = [
    { id: '#10452', data: '02/07/2026 14:32', turista: 'Ana Beatriz Lima', atracao: 'Jardim Botânico', qtd: 2, total: 'R$ 90,00', cupom: 'VERAO10', comissao: 'R$ 9,00 (10%)', status: 'Confirmado' },
    { id: '#10451', data: '02/07/2026 11:20', turista: 'Bruno Carvalho', atracao: 'Ópera de Arame', qtd: 1, total: 'R$ 45,00', cupom: '-', comissao: 'R$ 4,50 (10%)', status: 'Confirmado' },
    { id: '#10448', data: '01/07/2026 18:05', turista: 'Carla Menezes', atracao: 'Museu Oscar Niemeyer', qtd: 4, total: 'R$ 180,00', cupom: 'MON20', comissao: 'R$ 14,40 (8%)', status: 'Canc. Parcial' },
    { id: '#10445', data: '01/07/2026 09:47', turista: 'Diego Santos', atracao: 'Torre Panorâmica', qtd: 2, total: 'R$ 60,00', cupom: '-', comissao: 'R$ 6,00 (10%)', status: 'Reembolsado' },
    { id: '#10440', data: '30/06/2026 16:12', turista: 'Elaine Prado', atracao: 'Bosque Alemão', qtd: 3, total: 'R$ 120,00', cupom: 'PRIMAVERA15', comissao: 'R$ 10,20 (8,5%)', status: 'Canc. Total' }
  ];

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="agency" activeMenu="operacao" userName={userName} userRole="Agência" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Operação Comercial</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir 🖨</button>
            <button onClick={() => alert('CSV exportado!')} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Exportar CSV 📊</button>
            <button onClick={() => window.print()} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Exportar PDF 📄</button>
          </div>
        </div>

        {/* 5 Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '22px' }}>
          {[
            { label: 'Total de Vendas (R$)', val: 'R$ 12.480,00' },
            { label: 'Qtd de Ingressos Vendidos', val: '342' },
            { label: 'Comissão Acumulada', val: 'R$ 1.184,00' },
            { label: 'Cupons Emitidos / Utilizados', val: '48 / 31' },
            { label: 'Qtd Canceladas / Reembolsadas', val: '7' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b4758', marginBottom: '12px' }}>{k.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', textAlign: 'center' }}>{k.val}</div>
            </div>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>ID Pedido ↕</th>
              <th style={{ padding: 12 }}>Data/Hora ↕</th>
              <th style={{ padding: 12 }}>Turista ↕</th>
              <th style={{ padding: 12 }}>Atração ↕</th>
              <th style={{ padding: 12 }}>Qtd Ingressos ↕</th>
              <th style={{ padding: 12 }}>Valor Total ↕</th>
              <th style={{ padding: 12 }}>Cupom ↕</th>
              <th style={{ padding: 12 }}>Comissão ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}>{r.id}</td>
                <td style={{ padding: '14px 12px' }}>{r.data}</td>
                <td style={{ padding: '14px 12px' }}>{r.turista}</td>
                <td style={{ padding: '14px 12px' }}>{r.atracao}</td>
                <td style={{ padding: '14px 12px' }}>{r.qtd}</td>
                <td style={{ padding: '14px 12px' }}>{r.total}</td>
                <td style={{ padding: '14px 12px' }}>{r.cupom}</td>
                <td style={{ padding: '14px 12px' }}>{r.comissao}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={r.status} /></td>
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
// WF-052: COMISSIONAMENTO (AGÊNCIA)
// ============================================================================
export function Wf052Commission({ store }) {
  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="agency" activeMenu="comissionamento" userName="João da Silva" userRole="Agência" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Comissionamento</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => window.print()} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', cursor: 'pointer' }}>🖨</button>
            <button style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', cursor: 'pointer' }}>📊</button>
            <button onClick={() => window.print()} style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', cursor: 'pointer' }}>📄</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '22px' }}>
          {[
            { label: 'Comissão Bruta Acumulada', val: 'R$ 3.240,00' },
            { label: 'Total de Deduções', val: 'R$ 180,00' },
            { label: 'Comissão Líquida a Receber', val: 'R$ 3.060,00' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b4758', marginBottom: '12px' }}>{k.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#3b4758', textAlign: 'center' }}>{k.val}</div>
            </div>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '18px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Período ↕</th>
              <th style={{ padding: 12 }}>Vendas (R$) ↕</th>
              <th style={{ padding: 12 }}>Qtd Ingressos</th>
              <th style={{ padding: 12 }}>Comissão Bruta ↕</th>
              <th style={{ padding: 12 }}>Deduções ↕</th>
              <th style={{ padding: 12 }}>Comissão Líquida</th>
              <th style={{ padding: 12 }}>Status ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.commissions.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}>{c.periodo}</td>
                <td style={{ padding: '14px 12px' }}>{c.vendas}</td>
                <td style={{ padding: '14px 12px' }}>{c.qtdIngressos}</td>
                <td style={{ padding: '14px 12px' }}>{c.bruta}</td>
                <td style={{ padding: '14px 12px' }}>{c.deducoes}</td>
                <td style={{ padding: '14px 12px' }}>{c.liquida}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => alert('Repasse de comissão solicitado!')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>⊕ Solicitar Repasse ⊕</button>
          <button onClick={() => alert('Contestação registrada!')} style={{ padding: '10px 18px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>⊕ Contestar ⊕</button>
        </div>
        <WfPagination />
      </div>
    </div>
  );
}

// ============================================================================
// WF-053: FILA DE REEMBOLSOS
// ============================================================================
export function Wf053RefundQueue({ store, updateStore }) {
  const [tab, setTab] = useState('Pendentes');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="reembolsos" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Fila de Reembolsos · 18 pendentes</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 20px 0' }}>Triagem e processamento manual de solicitações de reembolso (&gt; 7 dias)</p>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Pendentes', 'Em Análise', 'Aprovados', 'Rejeitados', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => alert('Reembolsos selecionados aprovados!')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>✓ Aprovar selecionados</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>☍ Rejeitar selecionados</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>☑ Marcar como Em Análise</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: 12 }}>ID Reemb.</th>
              <th style={{ padding: 12 }}>ID Pedido</th>
              <th style={{ padding: 12 }}>Turista ↕</th>
              <th style={{ padding: 12 }}>Atração ↕</th>
              <th style={{ padding: 12 }}>Valor ↕</th>
              <th style={{ padding: 12 }}>Motivo ↕</th>
              <th style={{ padding: 12 }}>Origem ↕</th>
              <th style={{ padding: 12 }}>Data Compr.</th>
              <th style={{ padding: 12 }}>Data Solic.</th>
              <th style={{ padding: 12 }}>SLA ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.refunds.map((r, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px 12px' }}>{r.id}</td>
                <td style={{ padding: '14px 12px' }}>{r.pedidoId}</td>
                <td style={{ padding: '14px 12px' }}>{r.turista}</td>
                <td style={{ padding: '14px 12px' }}>{r.atracao}</td>
                <td style={{ padding: '14px 12px' }}>{r.valor}</td>
                <td style={{ padding: '14px 12px' }}>{r.motivo}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={r.origem} /></td>
                <td style={{ padding: '14px 12px' }}>{r.dataCompra}</td>
                <td style={{ padding: '14px 12px' }}>{r.dataSolic}</td>
                <td style={{ padding: '14px 12px' }}>{r.sla}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={r.status} /></td>
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
// WF-054 & WF-055: CMS INSTITUCIONAL & CMS HOME E CURADORIA (BANNERS)
// ============================================================================
export function Wf054Cms({ store, mode = 'institucional' }) {
  const [tab, setTab] = useState(mode === 'institucional' ? 'Política de Privacidade' : 'Banners');

  if (mode === 'institucional') {
    return (
      <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
        <WfSidebar mode="admin" activeMenu="cms-institucional" />
        <div style={{ flex: 1, padding: '28px 36px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Conteúdo › Institucional › {tab}</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 20px 0' }}>Editor de conteúdo das páginas institucionais do Portal</p>

          <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
            {['Política de Privacidade', 'Condições de Uso', 'FAQ', 'Sobre Nós'].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{ fontSize: '12.5px', color: '#64748b' }}>Última publicação: 28/06/2026 por João da Silva · ● Rascunho não publicado</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>⊕ Salvar rascunho ⊕</button>
              <button style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>⊕ Pré-visualizar ⊕</button>
              <button onClick={() => alert('Página institucional publicada no Portal!')} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>⊕ Publicar ⊕</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['H1', 'H2', 'H3', 'B', 'I', 'U', '• Lista', '1. Lista', 'Link'].map((b) => (
                  <button key={b} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 700, fontSize: 12 }}>{b}</button>
                ))}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758' }}>{tab}</h2>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#3b4758' }}>1. Coleta de Dados</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                A Curitiba 360 coleta dados pessoais fornecidos pelo turista no momento da compra de ingressos, incluindo nome, e-mail, CPF e informações de pagamento, com a finalidade de processar transações e emitir bilhetes.
              </p>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#3b4758' }}>2. Uso das Informações</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                Os dados coletados são utilizados exclusivamente para a operação do serviço, comunicação transacional e, mediante consentimento (opt-in), envio de comunicações de marketing, conforme a LGPD.
              </p>
            </div>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px' }}>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#3b4758', marginBottom: '4px' }}>Histórico de versões</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>Últimas 20 versões publicadas</div>
              {['28/06/2026 14:32 - João da Silva', '15/06/2026 09:10 - Maria Souza', '02/06/2026 16:45 - João da Silva', '20/05/2026 11:22 - Ana Lima'].map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0', fontSize: '12.5px' }}>
                  <span>{v}</span>
                  <span style={{ color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}>Restaurar</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="cms-home" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Home e Curadoria</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Configure banners, destaques e curadoria da Home do Portal</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => alert('Novo banner adicionado à vitrine do Portal!')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Novo Banner ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Banners', 'Destaques "Imperdíveis"', 'Curadoria Google', 'Outras Atrações'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Ordem ↕</th>
              <th style={{ padding: 12 }}>Pré-visualização ↕</th>
              <th style={{ padding: 12 }}>Título ↕</th>
              <th style={{ padding: 12 }}>CTA ↕</th>
              <th style={{ padding: 12 }}>Período ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.banners.map((b, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}>{b.ordem}</td>
                <td style={{ padding: '14px 12px' }}>{b.arquivo}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{b.titulo}</td>
                <td style={{ padding: '14px 12px' }}>{b.cta}</td>
                <td style={{ padding: '14px 12px' }}>{b.periodo}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={b.status} /></td>
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
// WF-056: CENTRAL DE NOTIFICAÇÕES
// ============================================================================
export function Wf056Notifications({ store }) {
  const [tab, setTab] = useState('Templates');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="notificacoes" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Central de Notificações</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie templates, regras, campanhas e histórico de notificações</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Novo Template ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Templates', 'Regras de Disparo', 'Campanhas', 'Histórico de Envios'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
          {[
            { label: 'Notificações Enviadas (mês)', val: '12.480' },
            { label: 'Taxa de Abertura (E-mail)', val: '42%' },
            { label: 'Taxa de Entrega (Push)', val: '88%' },
            { label: 'Status do Serviço', val: 'Operacional' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b4758', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', textAlign: 'center' }}>{k.val}</div>
            </div>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Nome ↕</th>
              <th style={{ padding: 12 }}>Tipo ↕</th>
              <th style={{ padding: 12 }}>Evento Associado ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
              <th style={{ padding: 12 }}>Última Edição ↕</th>
              <th style={{ padding: 12 }}>Ações ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.notifications.map((n, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{n.nome}</td>
                <td style={{ padding: '14px 12px' }}>{n.tipo}</td>
                <td style={{ padding: '14px 12px' }}>{n.evento}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={n.status} /></td>
                <td style={{ padding: '14px 12px' }}>{n.ultimaEdicao}</td>
                <td style={{ padding: '14px 12px' }}>Editar · Duplicar</td>
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
// WF-058 & WF-059: GESTÃO E CADASTRO DE PARCEIROS COMERCIAIS
// ============================================================================
export function Wf058Partners({ store, updateStore, showModal = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativas');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="admin" activeMenu="parceiros" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Parceiros Comerciais</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os parceiros comerciais cadastrados no sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-059-cadastro-de-parceiro-comercial')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Parceiro ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativas', 'Pendente de Aprovação', 'Suspensas', 'Inativas', 'Todas'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: 12 }}>ID ↕</th>
              <th style={{ padding: 12 }}>Razão Social ↕</th>
              <th style={{ padding: 12 }}>Nome Fantasia ↕</th>
              <th style={{ padding: 12 }}>CNPJ ↕</th>
              <th style={{ padding: 12 }}>E-mail Comercial ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
              <th style={{ padding: 12 }}>Qtd Atrações ↕</th>
              <th style={{ padding: 12 }}>Data de Cadastro ↕</th>
              <th style={{ padding: 12 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {store.partners.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}><input type="checkbox" defaultChecked={idx < 3} /></td>
                <td style={{ padding: '14px 12px' }}>{p.id}</td>
                <td style={{ padding: '14px 12px' }}>{p.razaoSocial}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{p.nomeFantasia}</td>
                <td style={{ padding: '14px 12px' }}>{p.cnpj}</td>
                <td style={{ padding: '14px 12px' }}>{p.email}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={p.status} /></td>
                <td style={{ padding: '14px 12px' }}>{p.qtdAtracoes}</td>
                <td style={{ padding: '14px 12px' }}>{p.dataCadastro}</td>
                <td style={{ padding: '14px 12px' }}>👁</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-059: CADASTRO DE PARCEIRO COMERCIAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '760px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Cadastro de Parceiro Comercial 1/3</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Insira os dados da empresa</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-058-gestao-de-parceiros-comerciais')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={() => navigate('/tela/wf-058-gestao-de-parceiros-comerciais')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar Rascunho ✓</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div><label style={{ fontSize: 11.5 }}>Nome Fantasia</label><input defaultValue="Curitiba Sightseeing" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Razão Social</label><input defaultValue="Curitiba Sightseeing Turismo Ltda" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>CNPJ</label><input defaultValue="12.345.678/0001-90" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Segmento/Tipo de Atração</label><input defaultValue="Museu" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>CEP</label><input defaultValue="80010-010" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Logradouro</label><input defaultValue="Rua XV de Novembro" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Cidade</label><input defaultValue="Curitiba" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>UF</label><input defaultValue="PR" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>E-mail Comercial</label><input defaultValue="contato@parceiroatual.com.br" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => navigate('/tela/wf-058-gestao-de-parceiros-comerciais')} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Próximo ›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-060: PAINEL ANTI-CAMBISTA / CONTROLE DE TRANSFERÊNCIAS
// ============================================================================
export function Wf060AntiCambista({ store, updateStore }) {
  const [limit, setLimit] = useState(store.antiCambista.limiteTransferencias);

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="anticambista" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Painel Anti-Cambista / Controle de Transferências</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 20px 0' }}>Monitoramento e bloqueio de CPFs com volume suspeito de transferências (Admin).</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '18px' }}>
          {[
            { label: 'CPFs no ranking', val: '48', sub: '↑filtro ≥ 3' },
            { label: 'Transferências no período', val: '186', sub: '↑+12%' },
            { label: 'Bloqueios manuais', val: '7', sub: '↑ativos' },
            { label: 'Alertas de limite', val: '3', sub: '↑não lidos' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b4758', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '24px', color: '#3b4758' }}>{k.val}</strong>
                <span style={{ fontSize: '11.5px', color: '#475569' }}>{k.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#eef1f5', border: '1px solid #64748b', borderRadius: '8px', padding: '10px 14px', fontSize: '12.5px', color: '#3b4758', marginBottom: '16px' }}>
          ! Alerta automático: 3 CPFs atingiram o limite configurado de transferências no período. Os dados de transferência são retidos por 24 meses.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
          <strong style={{ fontSize: '13px', color: '#3b4758' }}>Limite de transferências por CPF (período de 12 meses)</strong>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={limit} onChange={(e) => setLimit(e.target.value)} style={{ width: '60px', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #475467' }} />
            <button onClick={() => alert(`Limite de ${limit} transferências por CPF salvo!`)} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar configuração</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>CPF</th>
              <th style={{ padding: 12 }}>Nome do Turista</th>
              <th style={{ padding: 12 }}>Total de transferências</th>
              <th style={{ padding: 12 }}>Eventos/Atrações</th>
              <th style={{ padding: 12 }}>Status da conta</th>
              <th style={{ padding: 12 }}>Última transferência</th>
              <th style={{ padding: 12 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {store.antiCambista.cpfs.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}>{c.cpf}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{c.nome}</td>
                <td style={{ padding: '14px 12px' }}>{c.total}</td>
                <td style={{ padding: '14px 12px' }}>{c.eventos}</td>
                <td style={{ padding: '14px 12px' }}><WfStatusPill status={c.status} /></td>
                <td style={{ padding: '14px 12px' }}>{c.ultima}</td>
                <td style={{ padding: '14px 12px' }}>
                  <button
                    onClick={() => {
                      updateStore((prev) => ({
                        ...prev,
                        antiCambista: {
                          ...prev.antiCambista,
                          cpfs: prev.antiCambista.cpfs.map((item, i) => (i === idx ? { ...item, status: item.status === 'Bloqueada' ? 'Ativa' : 'Bloqueada' } : item))
                        }
                      }));
                    }}
                    style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #475467', backgroundColor: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                  >
                    {c.status === 'Bloqueada' ? 'Desbloquear' : 'Bloquear usuário'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// WF-061 & WF-062: GESTÃO DE PACOTES DE INGRESSOS + ADICIONAR PACOTE
// ============================================================================
export function Wf061Packages({ store, updateStore, showModal = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="admin" activeMenu="pacotes" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Pacotes</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os pacotes de ingressos</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '250px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro</button>
            <button onClick={() => navigate('/tela/wf-062-gestao-de-pacotes-adicionar-pacote')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Pacote ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 4px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: 12 }}><input type="checkbox" /></th>
              <th style={{ padding: 12 }}>ID ↕</th>
              <th style={{ padding: 12 }}>Nome do Pacote ↕</th>
              <th style={{ padding: 12 }}>Atrações ↕</th>
              <th style={{ padding: 12 }}>Preço Original ↕</th>
              <th style={{ padding: 12 }}>Preço do Pacote ↕</th>
              <th style={{ padding: 12 }}>Desconto (%) ↕</th>
              <th style={{ padding: 12 }}>Vigência ↕</th>
              <th style={{ padding: 12 }}>Disponibilidade ↕</th>
              <th style={{ padding: 12 }}>Status ↕</th>
              <th style={{ padding: 12 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {store.packages.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px 12px' }}><input type="checkbox" /></td>
                <td style={{ padding: '14px 12px' }}>{p.id}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{p.nome}</td>
                <td style={{ padding: '14px 12px' }}>{p.atracoes}</td>
                <td style={{ padding: '14px 12px' }}>{p.precoOriginal}</td>
                <td style={{ padding: '14px 12px', fontWeight: 700 }}>{p.precoPacote}</td>
                <td style={{ padding: '14px 12px' }}>{p.desconto}</td>
                <td style={{ padding: '14px 12px' }}>{p.vigencia}</td>
                <td style={{ padding: '14px 12px' }}>{p.disponibilidade}</td>
                <td style={{ padding: '14px 12px' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>{p.status}</span></td>
                <td style={{ padding: '14px 12px' }}>✎ 🗑</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination total={42} />
      </div>

      {/* MODAL WF-062: NOVO PACOTE */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Novo Pacote</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Preencha os dados do pacote, a composição de atrações e a precificação</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-061-gestao-de-pacotes-de-ingressos')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar</button>
                <button onClick={() => navigate('/tela/wf-061-gestao-de-pacotes-de-ingressos')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 0.7fr', gap: '14px', marginBottom: '18px' }}>
              <div><label style={{ fontSize: 11.5 }}>Nome do Pacote</label><input defaultValue="Curitiba Clássica" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Descrição</label><input defaultValue="Atrações de Curitiba em um só ingresso" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Duração</label><input defaultValue="2h 30min" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Preço Original</label><input defaultValue="R$ 240,00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Preço do Pacote</label><input defaultValue="R$ 180,00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
              <div><label style={{ fontSize: 11.5 }}>Desconto (%)</label><input defaultValue="25%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#3b4758', marginBottom: '10px' }}>Composição do Pacote</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', marginBottom: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 10 }}>#</th><th style={{ padding: 10 }}>Atração</th><th style={{ padding: 10 }}>Lote / Tipo</th><th style={{ padding: 10 }}>Qtd</th><th style={{ padding: 10 }}>Preço unit.</th><th style={{ padding: 10 }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 10 }}>1</td><td style={{ padding: 10 }}>Jardim Botânico</td><td style={{ padding: 10 }}>Inteira</td><td style={{ padding: 10 }}>1</td><td style={{ padding: 10 }}>R$ 80,00</td><td style={{ padding: 10 }}>Remover</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 10 }}>2</td><td style={{ padding: 10 }}>Museu Oscar Niemeyer</td><td style={{ padding: 10 }}>Inteira</td><td style={{ padding: 10 }}>1</td><td style={{ padding: 10 }}>R$ 80,00</td><td style={{ padding: 10 }}>Remover</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 10 }}>3</td><td style={{ padding: 10 }}>Ópera de Arame</td><td style={{ padding: 10 }}>Inteira</td><td style={{ padding: 10 }}>1</td><td style={{ padding: 10 }}>R$ 80,00</td><td style={{ padding: 10 }}>Remover</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-063: RELATÓRIOS FINANCEIROS GLOBAIS
// ============================================================================
export function Wf063GlobalFinancialReports() {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState('Vendas');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="relatorios" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Relatórios Financeiros Globais</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir 🖨</button>
            <button onClick={() => alert('Relatório Global XLSX exportado!')} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Download XLSX 📊</button>
            <button onClick={() => navigate('/tela/wf-033-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas')} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Download PDF 📄</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px', marginBottom: '20px', fontSize: '12.5px', flexWrap: 'wrap' }}>
          {['Vendas', 'Abandono de Carrinho', 'Ingresso Detalhado', 'Categorias', 'Cortesias Emitidas', 'Validação', 'Comissões', 'Venda por Pagamentos', 'Borderô Resumido'].map((t) => (
            <button key={t} onClick={() => setSubTab(t)} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', backgroundColor: subTab === t ? '#eef1f5' : 'transparent', fontWeight: subTab === t ? 800 : 500, color: '#3b4758', cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
          {[
            { label: 'Total de vendas', val: 'R$ 195.860', sub: '↑+12%' },
            { label: 'Ingressos vendidos', val: '11.192', sub: '↑+8%' },
            { label: 'Ticket médio', val: 'R$ 17,50', sub: '↑+3%' },
            { label: 'Atrações no escopo', val: '24', sub: '↑Todas' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b4758', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '22px', color: '#3b4758' }}>{k.val}</strong>
                <span style={{ fontSize: '11.5px', color: '#475569' }}>{k.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}>Categoria ↕</th>
              <th style={{ padding: '12px 14px' }}>Quantidade ↕</th>
              <th style={{ padding: '12px 14px' }}>Unitário ↕</th>
              <th style={{ padding: '12px 14px' }}>Total ↕</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cat: 'Adulto', qtd: '2798', unit: 'R$ 17,50', total: 'R$ 48.965,00' },
              { cat: 'Morador Curitiba Adulto', qtd: '2798', unit: 'R$ 17,50', total: 'R$ 48.965,00' },
              { cat: 'Estudante', qtd: '2798', unit: 'R$ 17,50', total: 'R$ 48.965,00' },
              { cat: 'Doador', qtd: '2798', unit: 'R$ 17,50', total: 'R$ 48.965,00' }
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.cat}</td>
                <td style={{ padding: '14px' }}>{r.qtd}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.unit}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.total}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}>
              <td style={{ padding: '14px' }}>Quantidade: 4</td>
              <td style={{ padding: '14px' }}>11.192</td>
              <td style={{ padding: '14px' }}>R$ 70,00</td>
              <td style={{ padding: '14px' }}>Total: R$ 195.860</td>
            </tr>
          </tbody>
        </table>
        <WfPagination />
      </div>
    </div>
  );
}
