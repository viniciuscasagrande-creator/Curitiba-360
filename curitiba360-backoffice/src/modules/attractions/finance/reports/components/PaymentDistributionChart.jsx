import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { formatCurrency } from '../utils/reportUtils';

const CHART_COLORS = [
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#f59e0b',
  '#06b6d4',
  '#ec4899',
  '#64748b',
  '#cbd5e1',
];

export default function PaymentDistributionChart({
  data,
}) {
  const chartData = data.filter(
    (item) => item.grossValue > 0,
  );

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm text-left">
      <div>
        <h2 className="text-sm font-black text-slate-900">
          Distribuição dos recebimentos
        </h2>

        <p className="mt-1 text-xs font-medium text-slate-500">
          Participação de cada forma de pagamento no valor bruto.
        </p>
      </div>

      {chartData.length > 0 ? (
        <div className="mt-5 h-[360px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="grossValue"
                nameKey="paymentType"
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={115}
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={entry.id}
                      fill={
                        CHART_COLORS[
                          index %
                            CHART_COLORS.length
                        ]
                      }
                    />
                  ),
                )}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value)
                }
                contentStyle={{
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />

              <Legend
                verticalAlign="bottom"
                formatter={(value) => (
                  <span className="text-xs font-bold text-slate-600">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[360px] items-center justify-center text-sm font-bold text-slate-400">
          Nenhum valor disponível para o gráfico.
        </div>
      )}
    </article>
  );
}
