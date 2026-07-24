import {
  BadgeDollarSign,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Edit3,
  FileText,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  PauseCircle,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react';

import {
  useEffect,
} from 'react';

import {
  formatDateTime,
} from '../../shared/utils/partnerFormatters';

import AgencyDetailsSection from './AgencyDetailsSection';
import AgencyDocumentList from './AgencyDocumentList';
import AgencyHistoryTimeline from './AgencyHistoryTimeline';
import AgencyInformationItem from './AgencyInformationItem';
import AgencyStatusBadge from './AgencyStatusBadge';

export default function AgencyDetailsDrawer({
  open,
  agency,
  isMutating = false,

  onClose,
  onEdit,
  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onReactivate,
  onDelete,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open, onClose]);

  if (!open || !agency) {
    return null;
  }

  const pending =
    agency.status ===
    'Pendente de Aprovação';

  const suspended =
    agency.status === 'Suspensa';

  const inactive =
    agency.status === 'Inativa';

  const bankAccount =
    agency.bankAccount ?? {};

  const managers =
    agency.managers ?? [];

  const attractions =
    agency.attractions ?? [];

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-xs"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[780px] flex-col bg-slate-50 shadow-2xl text-left">
        <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
                <Building2 size={20} />
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="truncate text-xl font-black text-slate-900">
                    {agency.tradeName}
                  </h2>

                  <AgencyStatusBadge
                    status={agency.status}
                  />
                </div>

                <p className="mt-1 truncate text-xs font-medium text-slate-500">
                  {agency.corporateName}
                </p>

                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
                  Código #{agency.id}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <DrawerActionButton
              icon={Edit3}
              label="Editar"
              disabled={isMutating}
              onClick={() =>
                onEdit?.(agency)
              }
            />

            {pending && (
              <>
                <DrawerActionButton
                  icon={CheckCircle2}
                  label="Aprovar"
                  disabled={isMutating}
                  onClick={() =>
                    onApprove?.(agency)
                  }
                  className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                />

                <DrawerActionButton
                  icon={XCircle}
                  label="Rejeitar"
                  disabled={isMutating}
                  onClick={() =>
                    onReject?.(agency)
                  }
                  className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                />
              </>
            )}

            {!pending &&
              !suspended &&
              !inactive && (
                <>
                  <DrawerActionButton
                    icon={PauseCircle}
                    label="Suspender"
                    disabled={isMutating}
                    onClick={() =>
                      onSuspend?.(agency)
                    }
                    className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  />

                  <DrawerActionButton
                    icon={ShieldCheck}
                    label="Inativar"
                    disabled={isMutating}
                    onClick={() =>
                      onInactivate?.(
                        agency,
                      )
                    }
                  />
                </>
              )}

            {(suspended || inactive) && (
              <DrawerActionButton
                icon={CheckCircle2}
                label="Reativar"
                disabled={isMutating}
                onClick={() =>
                  onReactivate?.(agency)
                }
                className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              />
            )}

            <DrawerActionButton
              icon={Trash2}
              label="Excluir"
              disabled={isMutating}
              onClick={() =>
                onDelete?.(agency)
              }
              className="border-red-200 text-red-700 hover:bg-red-50"
            />
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          <AgencyDetailsSection
            title="Dados da empresa"
            description="Informações cadastrais e comerciais"
            icon={Building2}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <AgencyInformationItem
                label="Nome fantasia"
                value={agency.tradeName}
                icon={Building2}
              />

              <AgencyInformationItem
                label="Razão social"
                value={
                  agency.corporateName
                }
                icon={Building2}
              />

              <AgencyInformationItem
                label="CNPJ"
                value={agency.cnpj}
                icon={ClipboardList}
              />

              <AgencyInformationItem
                label="Inscrição estadual"
                value={
                  agency.stateRegistration
                }
                icon={ClipboardList}
              />

              <AgencyInformationItem
                label="Tipo de empresa"
                value={agency.companyType}
                icon={Building2}
              />

              <AgencyInformationItem
                label="Site"
                value={agency.site}
                icon={Globe2}
              />

              <AgencyInformationItem
                label="Telefone comercial"
                value={
                  agency.commercialPhone
                }
                icon={Phone}
              />

              <AgencyInformationItem
                label="Data de cadastro"
                value={formatDateTime(
                  agency.createdAt,
                )}
                icon={CalendarDays}
              />
            </div>
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Responsável"
            description="Pessoa responsável pela agência"
            icon={User}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <AgencyInformationItem
                label="Nome completo"
                value={
                  agency.responsibleName
                }
                icon={User}
              />

              <AgencyInformationItem
                label="CPF"
                value={
                  agency.responsibleCpf
                }
                icon={ClipboardList}
              />

              <AgencyInformationItem
                label="E-mail"
                value={agency.email}
                icon={Mail}
              />

              <AgencyInformationItem
                label="Telefone"
                value={
                  agency.responsiblePhone
                }
                icon={Phone}
              />
            </div>
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Endereço"
            description="Localização cadastral da empresa"
            icon={MapPin}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <AgencyInformationItem
                label="CEP"
                value={agency.zipCode}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="Logradouro"
                value={agency.street}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="Número"
                value={agency.number}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="Complemento"
                value={agency.complement}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="Bairro"
                value={agency.district}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="Cidade/UF"
                value={[
                  agency.city,
                  agency.state,
                ]
                  .filter(Boolean)
                  .join('/')}
                icon={MapPin}
              />

              <AgencyInformationItem
                label="País"
                value={agency.country}
                icon={Globe2}
                fullWidth
              />
            </div>
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Dados bancários"
            description="Conta utilizada para pagamentos e repasses"
            icon={Landmark}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <AgencyInformationItem
                label="Banco"
                value={[
                  bankAccount.bankCode,
                  bankAccount.bankName,
                ]
                  .filter(Boolean)
                  .join(' - ')}
                icon={Landmark}
              />

              <AgencyInformationItem
                label="Tipo de conta"
                value={
                  bankAccount.accountType
                }
                icon={Banknote}
              />

              <AgencyInformationItem
                label="Agência bancária"
                value={bankAccount.agency}
                icon={Landmark}
              />

              <AgencyInformationItem
                label="Número da conta"
                value={bankAccount.account}
                icon={Banknote}
              />

              <AgencyInformationItem
                label="Titular"
                value={bankAccount.holder}
                icon={User}
              />

              <AgencyInformationItem
                label="Documento do titular"
                value={
                  bankAccount.holderDocument
                }
                icon={ClipboardList}
              />

              <AgencyInformationItem
                label="Chave Pix"
                value={bankAccount.pixKey}
                icon={BadgeDollarSign}
              />

              <AgencyInformationItem
                label="Tipo da chave"
                value={
                  bankAccount.pixKeyType
                }
                icon={BadgeDollarSign}
              />
            </div>
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Gestores da conta"
            description="Usuários responsáveis pela administração"
            icon={Users}
          >
            {managers.length === 0 ? (
              <EmptyInformation
                title="Nenhum gestor cadastrado"
                description="Os gestores da conta aparecerão nesta seção."
              />
            ) : (
              <div className="space-y-3">
                {managers.map(
                  (manager) => (
                    <article
                      key={manager.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                          <User size={17} />
                        </span>

                        <div>
                          <strong className="block text-sm font-black text-slate-700">
                            {manager.name}
                          </strong>

                          <span className="mt-1 block text-xs font-medium text-slate-500">
                            {manager.email}
                          </span>

                          <span className="mt-1 block text-xs font-medium text-slate-400">
                            {manager.phone ||
                              'Telefone não informado'}
                          </span>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Agentes vinculados"
            description="Quantidade de agentes associados à agência"
            icon={Users}
          >
            <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-5 text-white">
              <div>
                <span className="text-xs font-bold text-slate-400">
                  Total de agentes
                </span>

                <strong className="mt-2 block text-3xl font-black">
                  {Number(
                    agency.agentsCount ?? 0,
                  )}
                </strong>
              </div>

              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Users size={23} />
              </span>
            </div>
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Atrações vinculadas"
            description="Produtos e atrações liberados para a agência"
            icon={Globe2}
          >
            {attractions.length === 0 ? (
              <EmptyInformation
                title="Nenhuma atração vinculada"
                description="A agência ainda não possui atrações associadas."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {attractions.map(
                  (attraction) => (
                    <article
                      key={attraction.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                    >
                      <strong className="block text-sm font-black text-slate-700">
                        {attraction.name}
                      </strong>

                      <span className="mt-2 text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Código{' '}
                        {attraction.id}
                      </span>
                    </article>
                  ),
                )}
              </div>
            )}
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Documentos"
            description="Arquivos e comprovantes enviados"
            icon={FileText}
          >
            <AgencyDocumentList
              documents={
                agency.documents ?? []
              }
            />
          </AgencyDetailsSection>

          <AgencyDetailsSection
            title="Histórico"
            description="Últimas movimentações do cadastro"
            icon={ClockIcon}
          >
            <AgencyHistoryTimeline
              agency={agency}
            />
          </AgencyDetailsSection>
        </div>
      </aside>
    </div>
  );
}

function DrawerActionButton({
  icon: Icon,
  label,
  disabled,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40',
        className,
      ].join(' ')}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function EmptyInformation({
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
      <strong className="block text-sm font-black text-slate-600">
        {title}
      </strong>

      <p className="mt-1 text-xs font-medium text-slate-400">
        {description}
      </p>
    </div>
  );
}

function ClockIcon(props) {
  return (
    <CalendarDays {...props} />
  );
}
