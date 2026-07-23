import React from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import SuperAppHeader from "../components/SuperAppHeader";
import HomeGreeting from "../components/HomeGreeting";
import QuickActionGrid from "../components/QuickActionGrid";
import WalletBalanceCard from "../components/WalletBalanceCard";
import CityAlertCard from "../components/CityAlertCard";
import EventCard from "../components/EventCard";
import AttractionCard from "../components/AttractionCard";
import { useSuperAppHome } from "../hooks/useSuperAppHome";
import { useSuperWallet } from "../hooks/useSuperWallet";

export default function SuperAppHomePage() {
  const { data, loading, error, reload } = useSuperAppHome();
  const { addFunds } = useSuperWallet();

  if (loading || !data) {
    return (
      <SuperAppLayout>
        <div className="flex items-center justify-center h-screen text-slate-500">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-2" />
          Carregando Super App...
        </div>
      </SuperAppLayout>
    );
  }

  return (
    <SuperAppLayout>
      <SuperAppHeader
        unreadNotifications={data.summary.unreadNotifications}
        alertsCount={data.alerts.length}
      />
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        <HomeGreeting
          fullName={data.user.fullName}
          loyaltyLevel={data.user.loyaltyLevel}
        />

        <WalletBalanceCard
          balance={data.wallet.availableBalance}
          cashback={data.wallet.cashbackBalance}
          points={data.wallet.loyaltyPoints}
          onAddFunds={async (amount) => {
            await addFunds(amount);
            reload();
          }}
        />

        <QuickActionGrid actions={data.quickActions} />

        {data.alerts.map((al) => (
          <CityAlertCard key={al.id} alert={al} />
        ))}

        {data.nextEvent && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Próximo Evento</h3>
            <EventCard event={data.nextEvent} />
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Recomendações para Você</h3>
          <div className="grid grid-cols-2 gap-3">
            {data.recommendations.map((rec) => (
              <AttractionCard key={rec.id} attraction={rec} />
            ))}
          </div>
        </div>
      </div>
    </SuperAppLayout>
  );
}
