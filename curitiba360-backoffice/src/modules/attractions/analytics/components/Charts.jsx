import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart
} from 'recharts';

// Custom Tooltip estilizado
function CustomTooltip({ active, payload, label, prefix = '', suffix = '' }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-950 p-3 text-white text-xs shadow-xl space-y-1 text-left">
      <p className="font-mono text-[10px] text-slate-400 font-bold">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color || '#fff' }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || '#fff' }} />
            {entry.name}:
          </span>
          <strong className="font-extrabold font-mono">
            {prefix}{Number(entry.value).toLocaleString('pt-BR')}{suffix}
          </strong>
        </div>
      ))}
    </div>
  );
}

// 1. Total de Visitas (AreaChart)
export function VisitsChart({ data = [] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="visits" name="Visitas" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. Total de Ingressos (BarChart agrupado)
export function TicketsChart({ data = [] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="issued" name="Emitidos" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="paid" name="Pagos" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="cancelled" name="Cancelados" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. Funil de Conversão (Horizontal BarChart)
export function AccessFunnelChart({ data = [] }) {
  return (
    <div className="space-y-3 text-left">
      {data.map((item, idx) => {
        const widthPercent = (item.count / (data[0]?.count || 1)) * 100;
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">{item.step}</span>
              <span className="text-slate-900 font-mono font-black">
                {item.count.toLocaleString('pt-BR')} ({item.percent})
              </span>
            </div>
            <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 4. Acessos por Horário (BarChart)
export function AccessByHourChart({ data = [] }) {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" name="Acessos" fill="#06b6d4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 5. Média de Acessos por Idade (BarChart Horizontal / Vertical)
export function AccessByAgeChart({ data = [] }) {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="ageGroup" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Bar dataKey="percent" name="Porcentagem" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 6. Vendas por Tipo de Pagamento (Pie / Donut Chart)
export function PaymentMethodChart({ data = [] }) {
  return (
    <div className="h-60 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 7. Acessos x Ingressos Vendidos (ComposedChart Linha + Barra)
export function SalesAndVisitsChart({ data = [] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="sales" name="Ingressos Vendidos" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="visits" name="Acessos" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 8. Fontes de Tráfego (Horizontal BarChart)
export function TrafficSourcesChart({ data = [] }) {
  return (
    <div className="space-y-2 text-left">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1 text-xs">
          <div className="flex justify-between font-bold">
            <span className="text-slate-700">{item.source}</span>
            <span className="text-slate-900 font-mono">{item.count.toLocaleString('pt-BR')} ({item.percent}%)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${item.percent * 2.5}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// 9. Acessos por Gênero (Donut Chart)
export function GenderChart({ data = [] }) {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-gender-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 10. Dispositivos (Donut Chart)
export function DevicesChart({ data = [] }) {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-dev-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 11. Location Ranking (Estados e Cidades)
export function LocationRankingList({ items = [], title }) {
  return (
    <div className="space-y-3 text-left">
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">{title}</span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 font-extrabold text-[10px] text-slate-600">
              #{idx + 1}
            </span>
            <span className="font-bold text-slate-800">{item.state || item.city}</span>
          </div>
          <div className="text-right">
            <strong className="text-slate-900 font-extrabold">{item.count.toLocaleString('pt-BR')}</strong>
            <span className="ml-1 text-slate-400 text-[10px]">({item.percent}%)</span>
          </div>
        </div>
      ))}
    </div>
  );
}
