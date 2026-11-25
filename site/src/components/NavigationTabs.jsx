import React from 'react';
import { 
  Sparkles, Trees, Compass, Ticket, Utensils, Percent, MapPin, HelpCircle,
  Music, Drama, Calendar, Building2, Beer, Hotel 
} from 'lucide-react';
import { UNIFIED_NAV_ITEMS } from '../data/attractions';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  Sparkles,
  Trees,
  Compass,
  Music,
  Drama,
  Calendar,
  Ticket,
  Utensils,
  Beer,
  Building2,
  Hotel,
  Percent,
  MapPin,
  HelpCircle
};

export default function NavigationTabs({ activeTab, onSelectTab }) {
  const { t } = useLanguage();

  return (
    <nav style={{ 
      backgroundColor: '#0f172a', 
      borderBottom: '1px solid #1e293b', 
      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
      width: '100%',
      padding: '8px 0'
    }}>
      <div 
        className="hide-scrollbar nav-mobile-scroll"
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 16px'
        }}
      >
        {UNIFIED_NAV_ITEMS.map((item) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;
          const isActive = activeTab === item.id;
          const translatedLabel = t(`nav.${item.id}`) || item.label;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '40px',
                minHeight: '40px',
                padding: '0 16px',
                fontSize: '13px',
                fontWeight: isActive ? '800' : '600',
                color: isActive ? '#ffffff' : '#cbd5e1',
                backgroundColor: isActive ? '#00a896' : 'rgba(255, 255, 255, 0.07)',
                borderRadius: '9999px',
                border: isActive ? '1px solid #00a896' : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: isActive ? '0 4px 12px rgba(0, 168, 150, 0.35)' : 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }
              }}
              title={item.desc}
            >
              <IconComp size={15} style={{ flexShrink: 0 }} color={isActive ? '#ffffff' : '#00a896'} />
              <span style={{ whiteSpace: 'nowrap' }}>{translatedLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
