import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Check, ShoppingCart, Share2, Heart } from 'lucide-react';
import AttractionCard from './AttractionCard';

export default function AttractionDetailModal({ attraction, allAttractions, onClose, onAddToCart }) {
  if (!attraction) return null;

  const [ticketType, setTicketType] = useState('adulto');
  const [quantity, setQuantity] = useState(1);
  const [activePhoto, setActivePhoto] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const ticketPrices = {
    adulto: attraction.price,
    meia: attraction.price > 0 ? Number((attraction.price / 2).toFixed(2)) : 0,
    infantil: 0
  };

  const currentPrice = ticketPrices[ticketType];
  const totalAmount = currentPrice * quantity;

  const gallery = attraction.gallery && attraction.gallery.length > 0 
    ? attraction.gallery 
    : [attraction.image];

  const handleAdd = () => {
    const item = {
      id: attraction.id,
      title: attraction.title,
      image: attraction.image,
      ticketType: ticketType === 'adulto' ? 'Adulto' : ticketType === 'meia' ? 'Estudante / Meia' : 'Infantil',
      unitPrice: currentPrice,
      price: currentPrice,
      quantity,
      location: attraction.location
    };
    onAddToCart(item);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const similarAttractions = allAttractions.filter(a => a.id !== attraction.id).slice(0, 3);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 2000,
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      padding: '24px 16px'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '1100px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto 0'
      }}>
        
        {/* Top Header Bar inside Modal */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#334155',
              fontWeight: '700',
              fontSize: '14px',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            <span>Voltar para as atrações</span>
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => alert("Link da atração copiado para a área de transferência!")}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Share2 size={16} />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

        {/* Modal Main Grid (Left Details + Right Checkout Widget) */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 380px', gap: '32px' }}>
          
          {/* Left Column: Media & Details */}
          <div>
            {/* Title Block */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px' }}>
                  {attraction.category ? attraction.category.toUpperCase() : 'TURISMO'}
                </span>
                {attraction.discount && (
                  <span style={{ backgroundColor: '#ea580c', color: '#ffffff', fontSize: '12px', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>
                    {attraction.discount}
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '8px' }}>
                {attraction.title}
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={16} color="#f59e0b" fill="#f59e0b" />
                  <strong style={{ color: '#0f172a' }}>{attraction.rating}</strong>
                  <span>({attraction.reviewsCount} avaliações)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={16} color="#00a896" />
                  <span>{attraction.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={16} color="#64748b" />
                  <span>{attraction.duration}</span>
                </div>
              </div>
            </div>

            {/* Main Image Gallery Display */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ height: '360px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
                <img 
                  src={gallery[activePhoto]} 
                  alt={attraction.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      style={{
                        width: '80px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: idx === activePhoto ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        opacity: idx === activePhoto ? 1 : 0.7,
                        cursor: 'pointer'
                      }}
                    >
                      <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                Sobre esta atração
              </h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {attraction.description}
              </p>

              {/* Features List */}
              {attraction.features && attraction.features.length > 0 && (
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {attraction.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#16a34a" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended / You might also like */}
            {similarAttractions.length > 0 && (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
                  Você também pode gostar
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {similarAttractions.map(sim => (
                    <AttractionCard 
                      key={sim.id} 
                      attraction={sim} 
                      onClickDetail={() => {}} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Ticket Booking Widget */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: '90px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
                Selecionar Ingressos
              </h3>

              {/* Ticket Type Select */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  TIPO DO INGRESSO
                </label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#0f172a',
                    backgroundColor: '#f8fafc',
                    outline: 'none'
                  }}
                >
                  <option value="adulto">Adulto - R$ {ticketPrices.adulto.toFixed(2).replace('.', ',')}</option>
                  <option value="meia">Estudante / Meia - R$ {ticketPrices.meia.toFixed(2).replace('.', ',')}</option>
                  <option value="infantil">Infantil (até 5 anos) - Grátis</option>
                </select>
              </div>

              {/* Quantity Counter */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  QUANTIDADE
                </label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontWeight: '800', fontSize: '18px', color: '#334155', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontWeight: '800', fontSize: '18px', color: '#334155', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'block' }}>Valor Total</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '800', color: '#2563eb' }}>
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>({quantity}x ingressos)</span>
                </div>
                <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600', display: 'block', marginTop: '4px' }}>
                  {attraction.paymentTerms || '12x Sem Juros'}
                </span>
              </div>

              {/* Success Feedback Banner */}
              {addedSuccess && (
                <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={18} />
                  <span>Item adicionado ao seu carrinho!</span>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                <ShoppingCart size={20} />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
