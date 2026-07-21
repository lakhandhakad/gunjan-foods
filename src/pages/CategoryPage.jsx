import React, { useState } from 'react';

export default function CategoryPage({ products, setActivePage, setSelectedProductId, onTriggerInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Handle resets
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSpiceFilter('all');
    setSearchText('');
  };

  const handleProductDetailsClick = (productId) => {
    setSelectedProductId(productId);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter items in real time
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // For spice levels, null means it's not a spice. But let's check matches:
    const matchesSpice = spiceFilter === 'all' || 
                         (spiceFilter === 'none' && (product.spiceLevel === 'none' || product.spiceLevel === null)) ||
                         product.spiceLevel === spiceFilter;
                         
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSpice && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <section className="category-page-header">
        <div className="container">
          <h1 className="heading-md" style={{ color: 'var(--color-primary)' }}>Our Product Catalog</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Browse through our premium selection of oils, spices, and groceries processed at Ratlam, MP.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <div className="container">
        <div className="category-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <div className="filter-section">
              <h4 className="filter-title">Search</h4>
              <input 
                type="text" 
                className="search-box" 
                placeholder="Search products..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Category</h4>
              <div className="filter-options">
                <button 
                  className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'oils' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('oils')}
                >
                  Edible Oils & Fats
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'spices' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('spices')}
                >
                  Spices & Seasonings
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'groceries' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('groceries')}
                >
                  Groceries & Beverages
                </button>
              </div>
            </div>

            {/* Only show spice level filter if we are in Spices or All categories */}
            {(selectedCategory === 'all' || selectedCategory === 'spices') && (
              <div className="filter-section">
                <h4 className="filter-title">Spice Heat Level</h4>
                <div className="spice-selector">
                  <button 
                    className={`spice-chip ${spiceFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setSpiceFilter('all')}
                  >
                    All Heat
                  </button>
                  <button 
                    className={`spice-chip ${spiceFilter === 'none' ? 'active' : ''}`}
                    onClick={() => setSpiceFilter('none')}
                  >
                    Mild / None
                  </button>
                  <button 
                    className={`spice-chip ${spiceFilter === 'medium' ? 'active' : ''}`}
                    onClick={() => setSpiceFilter('medium')}
                  >
                    Medium
                  </button>
                  <button 
                    className={`spice-chip ${spiceFilter === 'hot' ? 'active' : ''}`}
                    onClick={() => setSpiceFilter('hot')}
                  >
                    Hot 🔥
                  </button>
                </div>
              </div>
            )}

            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleResetFilters}
              style={{ width: '100%', padding: '10px', fontSize: '13px' }}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Grid */}
          <main>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 className="heading-sm">No Products Found</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                  We couldn't find any products matching your active filters. Try searching for something else or reset your criteria.
                </p>
                <button className="btn btn-primary" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-3">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="product-card" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div className="product-img-wrapper" onClick={() => handleProductDetailsClick(p.id)} style={{ cursor: 'pointer' }}>
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
                      {p.spiceLevel && p.spiceLevel !== 'none' && (
                        <span className="product-spice-badge">
                          🔥 <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{p.spiceLevel}</span>
                        </span>
                      )}
                    </div>
                    <div className="product-info">
                      <span className="product-category-label">{p.category}</span>
                      <h3 className="product-name-heading" onClick={() => handleProductDetailsClick(p.id)} style={{ cursor: 'pointer' }}>
                        {p.name}
                      </h3>
                      <p className="product-desc-short">{p.description}</p>
                      <div className="product-actions">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleProductDetailsClick(p.id)}
                          style={{ padding: '8px 12px', fontSize: '13px' }}
                        >
                          Details
                        </button>
                        <button 
                          className="btn btn-primary"
                          onClick={() => onTriggerInquiry('product', p.name, p.category)}
                          style={{ padding: '8px 12px', fontSize: '13px' }}
                        >
                          Inquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
