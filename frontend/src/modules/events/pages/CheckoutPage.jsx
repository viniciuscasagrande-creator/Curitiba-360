import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import { ShieldCheck, User, Users, CreditCard, ArrowLeft, ArrowRight, QrCode, Wallet, CheckCircle2 } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    currentStep,
    loading,
    error,
    buyer,
    setBuyer,
    attendees,
    updateAttendee,
    paymentMethod,
    setPaymentMethod,
    cardDetails,
    setCardDetails,
    handleNextStep,
    handlePrevStep,
    submitCheckout
  } = useCheckout();

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center space-y-4">
        <p className="text-slate-400">Seu carrinho está vazio para realizar checkout.</p>
        <button onClick={() => navigate('/events')} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl">
          Ir para Eventos
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Identificação', icon: User },
    { num: 2, title: 'Participantes', icon: Users },
    { num: 3, title: 'Pagamento', icon: CreditCard },
    { num: 4, title: 'Revisão', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate('/events/cart')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para o Carrinho
      </button>

      {/* Stepper */}
      <div className="grid grid-cols-4 gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <div
              key={step.num}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : isDone
                  ? 'bg-slate-800 text-amber-400'
                  : 'text-slate-500'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      {/* Conteúdo da Etapa */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        {/* ETAPA 1: Identificação */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User size={22} className="text-amber-400" />
              Dados do Comprador Titular
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">CPF *</label>
                <input
                  type="text"
                  value={buyer.cpf}
                  onChange={(e) => setBuyer({ ...buyer, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">E-mail *</label>
                <input
                  type="email"
                  value={buyer.email}
                  onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={buyer.phone}
                  onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: Participantes por ingresso */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users size={22} className="text-amber-400" />
                Nominar Ingressos (Participantes)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Preencha os dados do portador de cada ingresso para validação na entrada do evento.
              </p>
            </div>

            <div className="space-y-4">
              {attendees.map((attendee, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400">
                      Ingresso #{index + 1} — {attendee.lotName}
                    </span>
                    <span className="text-[10px] text-slate-500">Nominal</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Nome do Portador *</label>
                      <input
                        type="text"
                        value={attendee.nome}
                        onChange={(e) => updateAttendee(index, 'nome', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">CPF do Portador *</label>
                      <input
                        type="text"
                        value={attendee.cpf}
                        onChange={(e) => updateAttendee(index, 'cpf', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Data de Nascimento</label>
                      <input
                        type="date"
                        value={attendee.birthDate}
                        onChange={(e) => updateAttendee(index, 'birthDate', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 3: Formas de Pagamento */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard size={22} className="text-amber-400" />
              Escolha a Forma de Pagamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Opção PIX */}
              <div
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  paymentMethod === 'pix'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <QrCode size={32} />
                <span className="font-bold text-sm text-slate-100">PIX Instantâneo</span>
                <span className="text-[11px] text-emerald-400 font-semibold">Aprovação em segundos</span>
              </div>

              {/* Opção Cartão */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard size={32} />
                <span className="font-bold text-sm text-slate-100">Cartão de Crédito</span>
                <span className="text-[11px] text-slate-400">Até 12x no cartão</span>
              </div>

              {/* Opção Carteira */}
              <div
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  paymentMethod === 'wallet'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Wallet size={32} />
                <span className="font-bold text-sm text-slate-100">Carteira Curitiba 360</span>
                <span className="text-[11px] text-amber-400 font-semibold">Usar Saldo Interno</span>
              </div>
            </div>

            {/* Formulário Cartão se selecionado */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-slate-200">Dados do Cartão de Crédito</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-slate-400">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-400">Nome Impresso no Cartão</label>
                    <input
                      type="text"
                      placeholder="NOME COMO NO CARTAO"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-400">Validade (MM/AA)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-400">CVV (Código de Segurança)</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ETAPA 4: Revisão */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck size={22} className="text-emerald-400" />
              Revisão Final do Pedido
            </h2>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Titular do Pedido:</span>
                <span className="font-bold text-slate-200">{buyer.name} ({buyer.cpf})</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Forma de Pagamento:</span>
                <span className="font-bold text-amber-400 uppercase">{paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Total de Ingressos:</span>
                <span className="font-bold text-slate-200">{attendees.length} ingressos</span>
              </div>
            </div>
          </div>
        )}

        {/* Navegação entre Etapas */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Etapa Anterior
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors flex items-center gap-2"
            >
              Próxima Etapa
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submitCheckout}
              disabled={loading}
              className="px-8 py-3.5 text-sm font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              {loading ? 'Processando Pagamento...' : 'Finalizar e Concluir Pedido'}
              <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
