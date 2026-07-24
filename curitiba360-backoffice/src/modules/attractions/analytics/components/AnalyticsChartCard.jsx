import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChart3,
  ChartNoAxesCombined,
  CircleDashed,
  MoreHorizontal,
} from 'lucide-react';

const DONUT_COLORS = [
  '#0f172a',
  '#475569',
  '#94a3b8',
  '#cbd5e1',
  '#e2e8f0',
];

export default function AnalyticsChartCard({
  title,
  subtitle,
  type = 'bar',
  data = [],
  className = '',
  valueFormatter,
  showLegend = false,
  height = 290,
}) {
  return (
    <article
      className={[
        'overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div className="flex items-start gap-3 text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600">
            <ChartIcon type={type} />
          </span>

          <div>
            <h2 className="text-sm font-black text-slate-900">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={`Mais opções de ${title}`}
        >
          <MoreHorizontal size={18} />
        </button>
      </header>

      <div className="p-5">
        {data.length === 0 ? (
          <EmptyChart height={height} />
        ) : (
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart({
                type,
                data,
                valueFormatter,
                showLegend,
              })}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </article>
  );
}

function renderChart({
  type,
  data,
  valueFormatter,
  showLegend,
}) {
  if (type === 'horizontal') {
    return (
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 4,
          right: 25,
          bottom: 4,
          left: 20,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          horizontal={false}
          stroke="#e2e8f0"
        />

        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#94a3b8',
            fontSize: 11,
          }}
        />

        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          width={120}
          tick={{
            fill: '#64748b',
            fontSize: 11,
            fontWeight: 600,
          }}
        />

        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={valueFormatter}
            />
          }
          cursor={{
            fill: '#f8fafc',
          }}
        />

        <Bar
          dataKey="value"
          name="Quantidade"
          fill="#475569"
          radius={[0, 8, 8, 0]}
          maxBarSize={26}
        />
      </BarChart>
    );
  }

  if (type === 'donut') {
    return (
      <PieChart>
        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={
                valueFormatter ||
                ((value) => `${value}%`)
              }
            />
          }
        />

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="58%"
          outerRadius="82%"
          paddingAngle={2}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`${entry.name}-${index}`}
              fill={
                DONUT_COLORS[
                  index % DONUT_COLORS.length
                ]
              }
            />
          ))}
        </Pie>

        {showLegend && (
          <Legend
            verticalAlign="bottom"
            content={<CustomLegend />}
          />
        )}
      </PieChart>
    );
  }

  if (type === 'combined') {
    return (
      <ComposedChart
        data={data}
        margin={{
          top: 8,
          right: 14,
          bottom: 0,
          left: -14,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="#e2e8f0"
        />

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#94a3b8',
            fontSize: 11,
          }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#94a3b8',
            fontSize: 11,
          }}
        />

        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={valueFormatter}
            />
          }
          cursor={{
            fill: '#f8fafc',
          }}
        />

        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomLegend />}
        />

        <Bar
          dataKey="tickets"
          name="Ingressos vendidos"
          fill="#94a3b8"
          radius={[7, 7, 0, 0]}
          maxBarSize={34}
        />

        <Line
          type="monotone"
          dataKey="visits"
          name="Acessos"
          stroke="#0f172a"
          strokeWidth={3}
          dot={{
            r: 4,
            fill: '#0f172a',
            strokeWidth: 0,
          }}
          activeDot={{
            r: 6,
            fill: '#0f172a',
            stroke: '#ffffff',
            strokeWidth: 3,
          }}
        />
      </ComposedChart>
    );
  }

  if (type === 'line') {
    return (
      <ComposedChart
        data={data}
        margin={{
          top: 8,
          right: 14,
          bottom: 0,
          left: -14,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="#e2e8f0"
        />

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#94a3b8',
            fontSize: 11,
          }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#94a3b8',
            fontSize: 11,
          }}
        />

        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={valueFormatter}
            />
          }
        />

        <Line
          type="monotone"
          dataKey="value"
          name="Quantidade"
          stroke="#0f172a"
          strokeWidth={3}
          dot={{
            r: 4,
            fill: '#0f172a',
            strokeWidth: 0,
          }}
          activeDot={{
            r: 6,
            fill: '#0f172a',
            stroke: '#ffffff',
            strokeWidth: 3,
          }}
        />
      </ComposedChart>
    );
  }

  return (
    <BarChart
      data={data}
      margin={{
        top: 8,
        right: 14,
        bottom: 0,
        left: -14,
      }}
    >
      <CartesianGrid
        strokeDasharray="4 4"
        vertical={false}
        stroke="#e2e8f0"
      />

      <XAxis
        dataKey="label"
        axisLine={false}
        tickLine={false}
        tick={{
          fill: '#94a3b8',
          fontSize: 11,
        }}
      />

      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{
          fill: '#94a3b8',
          fontSize: 11,
        }}
      />

      <Tooltip
        content={
          <CustomTooltip
            valueFormatter={valueFormatter}
          />
        }
        cursor={{
          fill: '#f8fafc',
        }}
      />

      <Bar
        dataKey="value"
        name="Quantidade"
        fill="#94a3b8"
        radius={[8, 8, 0, 0]}
        maxBarSize={46}
      >
        {data.map((entry, index) => (
          <Cell
            key={`${entry.label}-${index}`}
            fill={
              index === data.length - 1
                ? '#475569'
                : '#94a3b8'
            }
          />
        ))}
      </Bar>
    </BarChart>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
  valueFormatter,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="min-w-44 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl text-left">
      {label && (
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
          {label}
        </p>
      )}

      <div className="space-y-2">
        {payload.map((item) => (
          <div
            key={item.dataKey || item.name}
            className="flex items-center justify-between gap-5 text-left"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    item.color || item.fill,
                }}
              />

              {item.name}
            </span>

            <strong className="text-xs font-black text-slate-900">
              {valueFormatter
                ? valueFormatter(item.value)
                : formatNumber(item.value)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomLegend({ payload }) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {payload.map((item) => (
        <div
          key={item.value}
          className="flex items-center gap-2 text-[11px] font-semibold text-slate-500"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: item.color,
            }}
          />

          {item.value}
        </div>
      ))}
    </div>
  );
}

function ChartIcon({ type }) {
  if (type === 'donut') {
    return <CircleDashed size={18} />;
  }

  if (
    type === 'combined' ||
    type === 'line'
  ) {
    return <ChartNoAxesCombined size={18} />;
  }

  return <BarChart3 size={18} />;
}

function EmptyChart({ height }) {
  return (
    <div
      style={{ height }}
      className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 text-center"
    >
      <BarChart3
        size={28}
        className="text-slate-300"
      />

      <p className="mt-3 text-sm font-black text-slate-600">
        Nenhum dado disponível
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Não existem registros para o período.
      </p>
    </div>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(
    Number(value || 0),
  );
}
