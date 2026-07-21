import React, { useState, useEffect } from 'react';

export default function ProductDetailPage({ productId, products, setActivePage, setSelectedProductId, onTriggerInquiry }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find current product details
  const product = products.find(p => p.id === productId);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('overview');
  }, [productId]);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h2 className="heading-sm">Product Not Found</h2>
        <p style={{ margin: '16px 0', color: 'var(--color-text-muted)' }}>
          The product you are looking for does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => setActivePage('category')}>
          Back to Catalog
        </button>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleRelatedClick = (id) => {
    setSelectedProductId(id);
    // Component will scroll to top automatically due to useEffect
  };

  return (
    <div className="pdp-section">
      <div className="container">
        {/* Breadcrumbs */}
        <nav style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Home</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <a href="#category" onClick={(e) => { e.preventDefault(); setActivePage('category'); }} style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Products</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
        </nav>

        {/* PDP Layout Grid */}
        <div className="pdp-grid">
          {/* Left Gallery */}
          <div className="pdp-gallery">
            <div className="pdp-main-img-wrapper">
              <img 
                src={`/images/${product.imageName}`} 
                alt={product.name} 
                className="pdp-main-img"
                onError={(e) => {
                  e.target.src = product.category === 'oils' 
                    ? "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80"
                    : "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80";
                }}
              />
              {product.spiceLevel && product.spiceLevel !== 'none' && (
                <span className="product-spice-badge" style={{ top: '20px', right: '20px', fontSize: '14px' }}>
                  🔥 Spice Heat: <strong style={{ textTransform: 'capitalize', marginLeft: '4px' }}>{product.spiceLevel}</strong>
                </span>
              )}
            </div>
            
            {/* Simple static thumbnails representing packaging options */}
            <div className="pdp-thumb-list">
              <div className="pdp-thumb-item active">
                <img 
                  src={`/images/${product.imageName}`} 
                  alt={product.name} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src = product.category === 'oils' 
                      ? "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80"
                      : "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=100&q=80";
                  }}
                />
              </div>
              <div className="pdp-thumb-item">
                <span style={{ fontSize: '24px' }}>📦</span>
              </div>
              <div className="pdp-thumb-item">
                <span style={{ fontSize: '24px' }}>🧪</span>
              </div>
            </div>
          </div>

          {/* Right Info */}
          <div className="pdp-details-info">
            <span className="badge pdp-category-badge">{product.category}</span>
            <h1 className="pdp-title">{product.name}</h1>
            
            <div className="pdp-rating">
              <span style={{ color: 'var(--color-accent)', fontSize: '18px' }}>★★★★★</span>
              <span>4.9 / 5.0 (TradeIndia Verified Supplier)</span>
            </div>

            <div className="pdp-price-guide">
              <span style={{ fontSize: '12px', fontWeight: 500, display: 'block', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.8, marginBottom: '2px' }}>
                Estimated Trade Price Guidance
              </span>
              {product.priceGuidance}
            </div>

            <p className="pdp-description">{product.description}</p>

            <div className="pdp-spec-meta">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="pdp-spec-row">
                  <span className="pdp-spec-label">{key}</span>
                  <span className="pdp-spec-value">{value}</span>
                </div>
              ))}
            </div>

            <div className="pdp-action-area">
              <button 
                className="btn btn-primary"
                onClick={() => onTriggerInquiry('product', product.name, product.category)}
                style={{ flex: 1, padding: '16px 28px' }}
              >
                Inquire For Bulk Pricing / Quotes
              </button>
            </div>
          </div>
        </div>

        {/* specifications Tabs */}
        <div className="pdp-tabs">
          <ul className="pdp-tabs-nav">
            <li>
              <button 
                className={`pdp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Origin & Packaging
              </button>
            </li>
            <li>
              <button 
                className={`pdp-tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Health Benefits
              </button>
            </li>
            <li>
              <button 
                className={`pdp-tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                Recipes & Culinary Uses
              </button>
            </li>
          </ul>

          <div className="pdp-tab-content">
            {activeTab === 'overview' && (
              <div>
                <h3 className="heading-sm" style={{ color: 'var(--color-text)' }}>Sourcing & Sowing Origin</h3>
                <p style={{ marginBottom: '20px' }}>
                  This product is manufactured under rigid GMP conditions in our plant located at <strong>{product.origin}</strong>. We check each raw batch for pesticide residues and purity before accepting it into production.
                </p>
                <h3 className="heading-sm" style={{ color: 'var(--color-text)' }}>Available Packaging Units</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                  {product.packagingOptions.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="heading-sm" style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Nutritional Advantages</h3>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'recipes' && (
              <div>
                <h3 className="heading-sm" style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Recommended Culinary Application</h3>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.recipes.map((recipe, i) => (
                    <li key={i}>{recipe}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '1px solid var(--color-border)', paddingTop: '60px' }}>
            <h2 className="heading-sm" style={{ marginBottom: '32px', textAlign: 'center' }}>Related Products in {product.category}</h2>
            <div className="grid grid-3">
              {relatedProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrapper" onClick={() => handleRelatedClick(p.id)} style={{ cursor: 'pointer' }}>
                    <img 
                      src={`/images/${p.imageName}`} 
                      alt={p.name} 
                      className="product-img"
                      onError={(e) => {
                        e.target.src = p.category === 'oils' 
                          ? "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80"
                          : "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <span className="product-category-label">{p.category}</span>
                    <h3 className="product-name-heading" onClick={() => handleRelatedClick(p.id)} style={{ cursor: 'pointer' }}>
                      {p.name}
                    </h3>
                    <p className="product-desc-short">{p.description}</p>
                    <div className="product-meta">
                      <span className="product-price">{p.priceGuidance}</span>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleRelatedClick(p.id)} style={{ padding: '8px 16px', fontSize: '13px' }}>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
