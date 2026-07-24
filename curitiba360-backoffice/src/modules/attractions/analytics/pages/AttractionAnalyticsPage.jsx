import { useMemo, useState } from 'react';
import {
  Clock3,
  Eye,
  MousePointerClick,
  Percent,
  TicketCheck,
  Users,
  WalletCards,
} from 'lucide-react';

import AnalyticsHeader from '../components/AnalyticsHeader';
import AnalyticsFilters from '../components/AnalyticsFilters';
import AnalyticsKpiCard from '../components/AnalyticsKpiCard';
import AnalyticsChartCard from '../components/AnalyticsChartCard';

import {
  AnalyticsEmpty,
  AnalyticsError,
  AnalyticsLoading,
} from '../components/AnalyticsFeedback';

import {
  accessAge,
  accessByHour,
  accessFunnel,
  analyticsSummary,
  citiesChart,
  deviceChart,
  genderChart,
  paymentChart,
  salesAndVisitsChart,
  statesChart,
  ticketsChart,
  trafficSources,
  visitsChart,
} from '../data/analyticsMock';

const ANALYTICS_DATA = {
  accessAge,
  accessByHour,
  accessFunnel,
  analyticsSummary,
  citiesChart,
  deviceChart,
  genderChart,
  paymentChart,
  salesAndVisitsChart,
  statesChart,
  ticketsChart,
  trafficSources,
  visitsChart,
};

export default function AttractionAnalyticsPage() {
  const [period, setPeriod] = useState('all');

  const [customPeriod, setCustomPeriod] =
    useState({
      startDate: '',
      endDate: '',
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] =
    useState(new Date().toISOString());

  const filteredData = useMemo(() => {
    return applyPeriodFactor(
      ANALYTICS_DATA,
      period,
    );
  }, [period]);

  const hasData =
    filteredData.analyticsSummary.totalVisits > 0;

  async function refreshAnalytics() {
    setLoading(true);
    setError('');

    try {
      await wait(900);

      setLastUpdatedAt(
        new Date().toISOString(),
      );
    } catch {
      setError(
        'Ocorreu uma falha ao atualizar os indicadores.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePeriodChange(nextPeriod) {
    setPeriod(nextPeriod);
    setError('');
  }

  function clearPeriod() {
    setPeriod('all');
    setCustomPeriod({
      startDate: '',
      endDate: '',
    });
  }

  function exportCsv() {
    const rows = buildCsvRows(filteredData);
    const csvContent = convertRowsToCsv(rows);

    downloadFile({
      content: csvContent,
      filename: `analytics-curitiba360-${getDateStamp()}.csv`,
      type: 'text/csv;charset=utf-8;',
    });
  }

  function exportJson() {
    downloadFile({
      content: JSON.stringify(
        {
          attraction: {
            name: 'Parque Jaime Lerner',
            city: 'Curitiba',
            state: 'PR',
          },
          period,
          customPeriod,
          generatedAt: new Date().toISOString(),
          data: filteredData,
        },
        null,
        2,
      ),
      filename: `analytics-curitiba360-${getDateStamp()}.json`,
      type: 'application/json;charset=utf-8;',
    });
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto w-full max-w-[1700px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <AnalyticsHeader
            lastUpdatedAt={lastUpdatedAt}
          />

          <AnalyticsFilters
            period={period}
            customPeriod={customPeriod}
            onPeriodChange={handlePeriodChange}
            onCustomPeriodChange={
              setCustomPeriod
            }
            onRefresh={refreshAnalytics}
            onExportCsv={exportCsv}
            onExportJson={exportJson}
            onPrint={() => window.print()}
          />

          <AnalyticsError
            message={error}
            onRetry={refreshAnalytics}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      <main className="mx-auto w-full max-w-[1700px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <AnalyticsHeader
          lastUpdatedAt={lastUpdatedAt}
        />

        <div className="print:hidden">
          <AnalyticsFilters
            period={period}
            customPeriod={customPeriod}
            loading={loading}
            onPeriodChange={handlePeriodChange}
            onCustomPeriodChange={
              setCustomPeriod
            }
            onRefresh={refreshAnalytics}
            onExportCsv={exportCsv}
            onExportJson={exportJson}
            onPrint={() => window.print()}
          />
        </div>

        {loading ? (
          <AnalyticsLoading />
        ) : !hasData ? (
          <AnalyticsEmpty
            onClearFilters={clearPeriod}
          />
        ) : (
          <AnalyticsContent
            data={filteredData}
          />
        )}
      </main>
    </div>
  );
}

function AnalyticsContent({ data }) {
  const {
    analyticsSummary: summary,
  } = data;

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsKpiCard
          title="Número de acessos"
          value={formatNumber(
            summary.totalVisits,
          )}
          variation={8}
          helper="Acessos no período selecionado"
          icon={Eye}
        />

        <AnalyticsKpiCard
          title="Usuários únicos"
          value={formatNumber(
            summary.uniqueUsers,
          )}
          variation={5.4}
          helper="Visitantes não duplicados"
          icon={Users}
        />

        <AnalyticsKpiCard
          title="Quantidade vendida"
          value={formatNumber(
            summary.soldTickets,
          )}
          variation={12.2}
          helper="Ingressos confirmados"
          icon={TicketCheck}
        />

        <AnalyticsKpiCard
          title="Tempo médio"
          value={summary.averageTime}
          variation={2.1}
          helper="Permanência na página"
          icon={Clock3}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AnalyticsChartCard
          title="Total de visitas"
          subtitle="Evolução das visitas à atração"
          type="bar"
          data={data.visitsChart}
        />

        <AnalyticsChartCard
          title="Total de ingressos"
          subtitle="Ingressos emitidos no período"
          type="bar"
          data={data.ticketsChart}
        />

        <AnalyticsChartCard
          title="Funil de acesso"
          subtitle="Avanço do visitante até a compra"
          type="horizontal"
          data={data.accessFunnel}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AnalyticsChartCard
          title="Acessos por horário"
          subtitle="Distribuição por faixa de horário"
          type="bar"
          data={data.accessByHour}
        />

        <AnalyticsChartCard
          title="Média de acessos por idade"
          subtitle="Distribuição por faixa etária"
          type="horizontal"
          data={data.accessAge}
        />

        <AnalyticsChartCard
          title="Vendas por pagamento"
          subtitle="Participação por forma de pagamento"
          type="donut"
          data={data.paymentChart}
          showLegend
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <AnalyticsKpiCard
          title="Total vendido"
          value={formatCurrency(
            summary.revenue,
          )}
          variation={8}
          helper="Receita bruta no período"
          icon={WalletCards}
        />

        <AnalyticsKpiCard
          title="Ticket médio"
          value={formatCurrency(
            summary.averageTicket,
          )}
          variation={6.3}
          helper="Valor médio por pedido"
          icon={MousePointerClick}
        />

        <AnalyticsKpiCard
          title="Conversão"
          value={`${summary.conversion.toLocaleString(
            'pt-BR',
          )}%`}
          variation={5.1}
          helper="Acessos que geraram compra"
          icon={Percent}
        />
      </section>

      <AnalyticsChartCard
        title="Acessos e ingressos vendidos por data"
        subtitle="Comparação entre tráfego e vendas confirmadas"
        type="combined"
        data={data.salesAndVisitsChart}
        height={340}
      />

      <section className="grid gap-5 xl:grid-cols-3">
        <AnalyticsChartCard
          title="Acessos por fontes"
          subtitle="Origem do tráfego da atração"
          type="horizontal"
          data={data.trafficSources}
        />

        <AnalyticsChartCard
          title="Acessos por gênero"
          subtitle="Distribuição declarada dos visitantes"
          type="donut"
          data={data.genderChart}
          showLegend
        />

        <AnalyticsChartCard
          title="Acessos por dispositivo"
          subtitle="Dispositivos utilizados pelos visitantes"
          type="donut"
          data={data.deviceChart}
          showLegend
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <AnalyticsChartCard
          title="Estados com maior acesso"
          subtitle="Ranking geográfico por estado"
          type="horizontal"
          data={data.statesChart}
          height={320}
        />

        <AnalyticsChartCard
          title="Cidades com maior acesso"
          subtitle="Ranking geográfico por cidade"
          type="horizontal"
          data={data.citiesChart}
          height={320}
        />
      </section>
    </>
  );
}

function applyPeriodFactor(data, period) {
  const factors = {
    all: 1,
    today: 0.13,
    '7days': 0.48,
    '30days': 0.78,
    custom: 0.62,
  };

  const factor = factors[period] || 1;

  return {
    ...data,

    analyticsSummary: {
      ...data.analyticsSummary,

      totalVisits: scaleValue(
        data.analyticsSummary.totalVisits,
        factor,
      ),

      totalTickets: scaleValue(
        data.analyticsSummary.totalTickets,
        factor,
      ),

      uniqueUsers: scaleValue(
        data.analyticsSummary.uniqueUsers,
        factor,
      ),

      soldTickets: scaleValue(
        data.analyticsSummary.soldTickets,
        factor,
      ),

      revenue:
        data.analyticsSummary.revenue *
        factor,
    },

    visitsChart: scaleChart(
      data.visitsChart,
      factor,
    ),

    ticketsChart: scaleChart(
      data.ticketsChart,
      factor,
    ),

    accessFunnel: scaleChart(
      data.accessFunnel,
      factor,
    ),

    accessByHour: scaleChart(
      data.accessByHour,
      factor,
    ),

    accessAge: scaleChart(
      data.accessAge,
      factor,
    ),

    salesAndVisitsChart:
      data.salesAndVisitsChart.map((item) => ({
        ...item,
        visits: scaleValue(
          item.visits,
          factor,
        ),
        tickets: scaleValue(
          item.tickets,
          factor,
        ),
      })),

    trafficSources: scaleChart(
      data.trafficSources,
      factor,
    ),

    statesChart: scaleChart(
      data.statesChart,
      factor,
    ),

    citiesChart: scaleChart(
      data.citiesChart,
      factor,
    ),
  };
}

function scaleChart(items, factor) {
  return items.map((item) => ({
    ...item,
    value: scaleValue(item.value, factor),
  }));
}

function scaleValue(value, factor) {
  return Math.round(Number(value || 0) * factor);
}

function buildCsvRows(data) {
  return [
    ['Indicador', 'Valor'],
    [
      'Número de acessos',
      data.analyticsSummary.totalVisits,
    ],
    [
      'Usuários únicos',
      data.analyticsSummary.uniqueUsers,
    ],
    [
      'Ingressos vendidos',
      data.analyticsSummary.soldTickets,
    ],
    [
      'Receita bruta',
      data.analyticsSummary.revenue,
    ],
    [
      'Ticket médio',
      data.analyticsSummary.averageTicket,
    ],
    [
      'Conversão',
      data.analyticsSummary.conversion,
    ],
    [],
    ['Data', 'Acessos', 'Ingressos vendidos'],
    ...data.salesAndVisitsChart.map(
      (item) => [
        item.label,
        item.visits,
        item.tickets,
      ],
    ),
  ];
}

function convertRowsToCsv(rows) {
  const separator = ';';

  return rows
    .map((row) =>
      row
        .map((value) => {
          const normalized = String(
            value ?? '',
          ).replaceAll('"', '""');

          return `"${normalized}"`;
        })
        .join(separator),
    )
    .join('\n');
}

function downloadFile({
  content,
  filename,
  type,
}) {
  const blob = new Blob(
    ['\uFEFF', content],
    {
      type,
    },
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function getDateStamp() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat(
    'pt-BR',
  ).format(Number(value || 0));
}
