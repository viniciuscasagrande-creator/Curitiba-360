import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttraction } from '../hooks/useAttraction';
import { useReservation } from '../hooks/useReservation';
import ReservationCalendar from '../components/ReservationCalendar';
import ReservationSummary from '../components/ReservationSummary';
import { ArrowLeft, User, Plus, Trash2, ShieldCheck } from 'lucide-react';

export function ReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { attraction, availableDates, availableTimes, loading: loadingAttr } = useAttraction(id || 'att-1');
  const { makeReservation, loading: loadingRes } = useReservation();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState([
    { name: 'Vinicius Casagrande', document: '123.456.789-00' }
  ]);
  const [acceptPolicies, setAcceptPolicies] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  React.useEffect(() => {
    if (availableTimes.length > 0 && !selectedTime) {
      setSelectedTime(availableTimes[0]);
    }
  }, [availableTimes]);

  const addParticipant = () => {
    if (participants.length >= 10) return;
    setParticipants([...participants, { name: '', document: '' }]);
  };

  const removeParticipant = (index) => {
    if (participants.length <= 1) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index, field, value) => {
    setParticipants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const price = attraction?.priceFrom || 0;
  const subtotal = price * participants.length;
  const fees = subtotal > 0 ? Number((subtotal * 0.1).toFixed(2)) : 0;
  const total = subtotal + fees;

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Selecione uma data e horário válidos.');
      return;
    }
    const invalid = participants.some((p) => !p.name || p.name.length < 3);
    if (invalid) {
      setError('Preencha o nome completo de todos os participantes.');
      return;
    }
    if (!acceptPolicies) {
      setError('Você deve aceitar as políticas de visitação para prosseguir.');
      return;
    }

    setError(null);
    try {
      const res = await makeReservation({
        attractionId: attraction.id,
        visitDate: selectedDate,
        visitTime: selectedTime,
        participants
      });
      navigate(`/reservas/${res.id}/confirmacao`);
    } catch (err) {
      setError(err.message || 'Erro ao realizar reserva.');
    }
  };

  if (loadingAttr) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando dados para agendamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(`/turismo/${attraction?.id}`)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar aos detalhes do atrativo
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Agendamento Online</span>
        <h1 className="text-2xl font-extrabold text-white">{attraction?.name}</h1>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          <ReservationCalendar
            availableDates={availableDates}
            availableTimes={availableTimes}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
          />

          {/* Participantes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User size={18} className="text-amber-400" />
                Participantes da Visita ({participants.length})
              </h3>

              <button
                type="button"
                onClick={addParticipant}
                disabled={participants.length >= 10}
                className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 disabled:opacity-40"
              >
                <Plus size={14} />
                Adicionar Pessoa
              </button>
            </div>

            <div className="space-y-3">
              {participants.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Nome completo do visitante *"
                      value={p.name}
                      onChange={(e) => updateParticipant(idx, 'name', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CPF ou Documento (Opcional)"
                      value={p.document}
                      onChange={(e) => updateParticipant(idx, 'document', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 pt-2">
              <input
                type="checkbox"
                checked={acceptPolicies}
                onChange={(e) => setAcceptPolicies(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
              />
              Aceito as regras de visitação e políticas do atrativo.
            </label>
          </div>
        </div>

        {/* Resumo */}
        <div>
          <ReservationSummary
            attraction={attraction}
            visitDate={selectedDate}
            visitTime={selectedTime}
            participantCount={participants.length}
            subtotal={subtotal}
            fees={fees}
            total={total}
            onSubmit={handleSubmit}
            loading={loadingRes}
          />
        </div>
      </div>
    </div>
  );
}
export default ReservationPage;
