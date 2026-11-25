import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/attractions';

export default function HeroCarousel({ onSelectAttraction }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div style={{ maxWidth: '1280px', margin: '16px auto 0', padding: '0 16px' }}>
      <div 
        className="mobile-hero-container"
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          minHeight: '280px',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          backgroundColor: '#0f172a'
        }}
      >
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.8s ease-in-out',
          filter: 'brightness(0.65)'
        }} />

        {/* Gradient Overlay for Text Clarity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.55) 60%, rgba(15, 23, 42, 0.15) 100%)'
        }} />

        {/* Content Box */}
        <div 
          className="mobile-hero-padding"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '28px 36px',
            maxWidth: '640px',
            color: '#ffffff'
          }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            padding: '3px 10px',
            borderRadius: '6px',
            marginBottom: '10px',
            textTransform: 'uppercase',
            boxShadow: '0 2px 6px rgba(37,99,235,0.4)'
          }}>
            {slide.badge}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '26px',
            fontWeight: '800',
            lineHeight: '1.25',
            marginBottom: '8px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '14px',
            color: '#cbd5e1',
            marginBottom: '16px',
            lineHeight: '1.5',
            maxWidth: '520px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {slide.tagline || slide.description}
          </p>

          {/* CTA Button */}
          {slide.ctaText && (
            <button
              onClick={() => {
                if (onSelectAttraction) onSelectAttraction(slide);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '38px',
                padding: '0 18px',
                borderRadius: '10px',
                backgroundColor: '#00a896',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,168,150,0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#028090'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00a896'}
            >
              <span>{slide.ctaText}</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.45)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.45)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
        >
          <ChevronRight size={20} />
        </button>

        {/* Pagination Dots */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '24px',
          display: 'flex',
          gap: '6px',
          zIndex: 20
        }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: idx === currentSlide ? '20px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: idx === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
