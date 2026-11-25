import { useLiveEvent } from '../../hooks/useLiveEvent'
import { getCheckins } from '../../services/checkinService'
import { useState, useEffect } from 'react'

export default function AccessDashboard() {
  const eventId = 'EVENTO_ATUAL'
  const { checkins: liveCheckins } = useLiveEvent(eventId)
  const [allCheckins, setAllCheckins] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getCheckins()
      setAllCheckins(data)
    }
    load()
  }, [])

  const checkins = liveCheckins.length ? liveCheckins : allCheckins

  const approved = checkins.filter(
    item => item.status === 'approved' || item.status === 'liberado'
  )

  const invalid = checkins.filter(
    item => item.status !== 'approved' && item.status !== 'liberado'
  )

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Operação em Tempo Real 🔴
        </h1>

        <p className="mt-2 text-gray-500">
          Monitoramento de acesso e controle de entradas do evento ao vivo.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Entradas Liberadas</p>
          <strong className="mt-2 block text-4xl font-extrabold text-emerald-600">
            {approved.length}
          </strong>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Tentativas Negadas / Duplicadas</p>
          <strong className="mt-2 block text-4xl font-extrabold text-red-600">
            {invalid.length}
          </strong>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Total de Leituras</p>
          <strong className="mt-2 block text-4xl font-extrabold text-blue-600">
            {checkins.length}
          </strong>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Últimos Acessos Validados
        </h2>

        <div className="divide-y divide-gray-100">
          {checkins
            .slice(-10)
            .reverse()
            .map(checkin => (
              <div
                key={checkin.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="font-mono font-bold text-gray-800">
                  {checkin.ticketCode || checkin.ticketId}
                </span>

                <span
                  className={`font-semibold px-2.5 py-0.5 rounded-full text-xs ${
                    checkin.status === 'approved' || checkin.status === 'liberado'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {checkin.status === 'approved' || checkin.status === 'liberado' ? 'LIBERADO' : checkin.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
