export default function AgencyTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: 'todas', label: 'Todas as Agências', count: counts?.todas || 0 },
    { id: 'ativas', label: 'Ativas', count: counts?.ativas || 0 },
    { id: 'pendentes', label: 'Pendentes de Aprovação', count: counts?.pendentes || 0 },
    { id: 'inativas', label: 'Inativas / Suspensas', count: counts?.inativas || 0 },
  ];

  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem', gap: '1rem' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '0.875rem 1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#0f172a' : '#64748b',
              borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.1rem 0.5rem',
              borderRadius: '9999px',
              backgroundColor: isActive ? '#dbeafe' : '#f1f5f9',
              color: isActive ? '#1d4ed8' : '#475569',
              fontWeight: '600'
            }}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
