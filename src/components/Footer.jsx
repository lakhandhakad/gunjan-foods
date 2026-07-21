import React from 'react';

export default function Footer({ setActivePage, onOpenInquiry }) {
  const handleFooterLinkClick = (pageId, e) => {
    e.preventDefault();
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            🫗 Gunjan <span>Foods</span>
          </div>
          <p className="footer-description">
            Established in Ratlam, Madhya Pradesh, Gunjan Edible Oil Pvt. Ltd. is a trusted name in high-purity oils, slow-ground spices, and premium grocery products. Bringing purity and authentic taste to Indian households.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home" onClick={(e) => handleFooterLinkClick('home', e)}>
                Home
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleFooterLinkClick('category', e)}>
                Our Products
              </a>
            </li>
            <li>
              <a href="#heritage" onClick={(e) => handleFooterLinkClick('about', e)}>
                Our Heritage
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Products</h4>
          <ul className="footer-links">
            <li>
              <a href="#products" onClick={(e) => handleFooterLinkClick('category', e)}>
                Edible Oils
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleFooterLinkClick('category', e)}>
                Pure Ground Spices
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleFooterLinkClick('category', e)}>
                Traditional Groceries
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Corporate Office</h4>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-icon">📍</span>
              <span>
                <strong>Gunjan Edible Oil Pvt. Ltd.</strong><br />
                Industrial Area, Ratlam,<br />
                Madhya Pradesh - 457001
              </span>
            </li>
            <li>
              <span className="footer-contact-icon">📞</span>
              <span>+91 7412 269015 / +91 94251 00000</span>
            </li>
            <li>
              <span className="footer-contact-icon">✉️</span>
              <span>info@gunjanfoods.com</span>
            </li>
          </ul>
          <button 
            className="btn btn-accent btn-sm" 
            onClick={() => onOpenInquiry()}
            style={{ width: '100%', marginTop: '10px', padding: '10px' }}
          >
            Send Business Query
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gunjan Edible Oil Pvt. Ltd. All rights reserved.</p>
        <p style={{ fontSize: '12px' }}>
          Sourced under compliance with TradeIndia business listings.
        </p>
      </div>
    </footer>
  );
}
