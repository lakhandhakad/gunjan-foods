import React, { useState } from 'react';

export default function Header({ activePage, setActivePage, onOpenInquiry }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="container header-container">
        <a 
          href="#home" 
          className="logo-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <span className="logo-icon">🫗</span>
          <span className="logo-text">GUNJAN FOODS</span>
        </a>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              className={`nav-link ${activePage === 'category' || activePage === 'pdp' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('category');
              }}
            >
              Our Products
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              Our Heritage
            </a>
          </li>
          <li className="mobile-only-cta" style={{ display: 'none' }}>
            <button 
              className="btn btn-primary"
              onClick={() => {
                onOpenInquiry();
                setIsMenuOpen(false);
              }}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Contact Us
            </button>
          </li>
        </ul>

        <div className="header-cta">
          <button 
            className="btn btn-primary"
            onClick={() => onOpenInquiry()}
          >
            Inquire Now
          </button>
        </div>
      </div>
      
      {/* Mobile styles patch for display check */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-only-cta {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
