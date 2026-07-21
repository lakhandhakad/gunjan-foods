import React from 'react';

export default function Home({ setActivePage, setSelectedProductId, products }) {
  // Grab top 3 items to show as featured (Soyabean oil, Mustard oil, Turmeric powder)
  const featuredIds = ['refined-soyabean-oil', 'mustard-oil', 'turmeric-powder'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryName) => {
    // In our category page, we can set a category filter state.
    // For now, redirect to category page
    setActivePage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-subtitle">Taste of Purity</span>
            <h1 className="hero-title">
              Pure Edible Oils & <span>Aromatic Spices</span>
            </h1>
            <p className="hero-desc">
              Gunjan Edible Oil Pvt. Ltd. delivers the finest quality cold-pressed oils, slow stone-ground spices, and high-protein groceries sourced direct from the rich farm belts of Madhya Pradesh.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setActivePage('category')}
              >
                Explore Products
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setActivePage('about')}
              >
                Our Sourcing Story
              </button>
            </div>
          </div>
          <div className="hero-image-container">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero_spices.png`} 
              alt="Authentic Indian Spices and Oils" 
              className="hero-image"
              onError={(e) => {
                // Fallback image URL if generated asset is still loading
                e.target.src = "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80";
              }}
            />
            <div className="hero-badge-floating">
              <span style={{ fontSize: '24px' }}>🌾</span>
              <div>
                <p style={{ margin: 0, fontSize: '11px', textTransform: 'uppercase', tracking: '1px', opacity: 0.8 }}>Quality Assured</p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>100% Pure & Natural</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <span className="badge" style={{ marginBottom: '10px' }}>Our Catalog</span>
            <h2 className="heading-md">Explore Our Product Range</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Handpicked and processed under rigorous quality checks in our state-of-the-art Ratlam plant.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="category-card" onClick={() => handleCategorySelect('oils')}>
              <div className="category-img-container">
                <img 
                  src={`${import.meta.env.BASE_URL}images/category_whole.png`} 
                  alt="Edible Oils" 
                  className="category-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <div className="category-overlay">
                  <h3 className="category-title">Edible Oils & Fats</h3>
                </div>
              </div>
              <div className="category-body">
                <p className="category-desc">
                  From heart-healthy refined soyabean and vegetable oils to high-aroma cold-pressed mustard oil (Kachi Ghani).
                </p>
                <span className="category-link">View Oils &rarr;</span>
              </div>
            </div>

            <div className="category-card" onClick={() => handleCategorySelect('spices')}>
              <div className="category-img-container">
                <img 
                  src={`${import.meta.env.BASE_URL}images/category_ground.png`} 
                  alt="Pure Spices" 
                  className="category-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <div className="category-overlay">
                  <h3 className="category-title">Pure Ground Spices</h3>
                </div>
              </div>
              <div className="category-body">
                <p className="category-desc">
                  Curcumin-rich Turmeric, vibrant Chilli, and citrusy Coriander powders ground slowly to keep natural oils intact.
                </p>
                <span className="category-link">View Spices &rarr;</span>
              </div>
            </div>

            <div className="category-card" onClick={() => handleCategorySelect('groceries')}>
              <div className="category-img-container">
                <img 
                  src={`${import.meta.env.BASE_URL}images/category_blends.png`} 
                  alt="Groceries & Food" 
                  className="category-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <div className="category-overlay">
                  <h3 className="category-title">Groceries & Beverages</h3>
                </div>
              </div>
              <div className="category-body">
                <p className="category-desc">
                  High-protein soft soya chunks and strong, refreshing Assam CTC black tea blends packed for culinary delight.
                </p>
                <span className="category-link">View Groceries &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Highlights */}
      <section className="section-padding" style={{ backgroundColor: '#FAF6F0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <span className="badge" style={{ marginBottom: '10px' }}>Gunjan Standards</span>
            <h2 className="heading-md">Crafting Purity Since Inception</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              How we guarantee taste, nutrition, and safety in every single package.
            </p>
          </div>

          <div className="grid grid-3">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚜</div>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Direct Farm Sourcing</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                We work directly with agricultural co-operatives in Rajasthan and Malwa (MP) to procure high-grade seeds and roots.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥣</div>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Stone-Ground Tech</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                Our spices are milled at low temperatures. Traditional stone grinding prevents heat buildup, preserving volatile aromatic oils.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔬</div>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Double-Stage Testing</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                Raw ingredients and finished batches undergo rigorous lab evaluations to guarantee zero adulteration and premium fatty acid balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <span className="badge" style={{ marginBottom: '10px' }}>Signature Products</span>
            <h2 className="heading-md">Our Customers' Favorites</h2>
          </div>

          <div className="grid grid-3">
            {featuredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-img-wrapper" onClick={() => handleProductClick(p.id)} style={{ cursor: 'pointer' }}>
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${p.imageName}`} 
                    alt={p.name} 
                    className="product-img"
                    onError={(e) => {
                      e.target.src = p.category === 'oils' 
                        ? "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80"
                        : "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                  {p.spiceLevel && (
                    <span className="product-spice-badge">
                      🔥 <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{p.spiceLevel}</span>
                    </span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category-label">{p.category}</span>
                  <h3 className="product-name-heading" onClick={() => handleProductClick(p.id)} style={{ cursor: 'pointer' }}>
                    {p.name}
                  </h3>
                  <p className="product-desc-short">{p.description}</p>
                  <div className="product-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleProductClick(p.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '48px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setActivePage('category')}
            >
              View Full Catalog (&rarr;)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
