import React, { useState } from 'react';
import Logo from './Logo';
import NavigationTabs from './NavigationTabs';
import { Search, User, ShoppingCart, Sparkles, X, Building2, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ 
  activeTopicTab,
  onSelectTopicTab,
  searchQuery, 
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenAgencyQuote,
  onClearFilters,
  totalResults
}) {
  const { currentLang, setCurrentLang, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const LANGUAGES = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      
      {/* Top Utility Bar */}
      <div style={{ backgroundColor: '#0f172a', color: '#cbd5e1', fontSize: '12px', padding: '8px 20px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ color: '#00a896', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.3px' }}>
              <Sparkles size={14} />
              <span>{t('officialPortal')}</span>
            </span>
            <span style={{ color: '#334155' }}>|</span>
            <a 
              href="#parceiro" 
              onClick={(e) => { e.preventDefault(); onOpenAgencyQuote ? onOpenAgencyQuote('parceiro') : onSelectTopicTab('agencias'); }} 
              style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}
            >
              <Building2 size={14} color="#00a896" />
              <span>{t('partnerLink')}</span>
            </a>
          </div>

          {/* Language Selector Dropdown (Português, Inglês, Espanhol) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              title="Select Language / Selecionar Idioma"
            >
              <Globe size={14} color="#00a896" />
              <span>{activeLangObj.flag} {activeLangObj.label} ({activeLangObj.code.toUpperCase()})</span>
              <ChevronDown size={14} color="#94a3b8" />
            </button>

            {/* Dropdown Menu */}
            {isLangOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '32px',
                  right: 0,
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
                  padding: '6px',
                  zIndex: 3000,
                  minWidth: '160px'
                }}
                className="animate-fade-in"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: currentLang === lang.code ? '800' : '500',
                      color: currentLang === lang.code ? '#ffffff' : '#cbd5e1',
                      backgroundColor: currentLang === lang.code ? '#00a896' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Main Header Tier - Clean Single Tier */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); onClearFilters(); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Logo size="md" />
            </a>
          </div>

          {/* Search Bar */}
          <div style={{ flex: '1', minWidth: '260px', maxWidth: '560px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#00a896' }} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                padding: '0 40px 0 44px',
                borderRadius: '9999px',
                border: '2px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontSize: '13px',
                fontWeight: '500',
                outline: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00a896';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 4px rgba(0,168,150,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* User & Cart Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '42px',
                padding: '0 16px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                color: '#0f172a',
                fontWeight: '700',
                fontSize: '13px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              title={t('cart')}
            >
              <ShoppingCart size={18} color="#00a896" />
              <span>{t('cart')}</span>
              {cartCount > 0 && (
                <span style={{
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '800',
                  borderRadius: '9999px',
                  height: '20px',
                  minWidth: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 6px',
                  boxShadow: '0 2px 6px rgba(234,88,12,0.4)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / Account Button */}
            <button
              onClick={onOpenLogin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '42px',
                padding: '0 18px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                transition: 'all 0.2s ease',
                outline: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <User size={18} />
              <span>{t('loginRegister')}</span>
            </button>

          </div>
        </div>
      </div>

      {/* SINGLE UNIFIED NAVIGATION BAR */}
      <NavigationTabs
        activeTab={activeTopicTab}
        onSelectTab={onSelectTopicTab}
      />

      {/* Active Search / Filter Notification Bar */}
      {searchQuery && (
        <div style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '8px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
            <div>
              <span>{t('searchFilter')}: </span>
              <strong style={{ color: '#2563eb' }}>
                "{searchQuery}"
              </strong>
              <span style={{ marginLeft: '12px', color: '#64748b' }}>
                ({totalResults} {totalResults === 1 ? t('resultCount') : t('resultsCount')})
              </span>
            </div>
            <button
              onClick={onClearFilters}
              style={{
                color: '#dc2626',
                fontWeight: '600',
                fontSize: '12px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {t('clearSearch')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
