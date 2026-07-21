import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import About from './pages/About';
import InquiryModal from './components/InquiryModal';
import { getProducts } from './services/productService';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inquiry Modal State
  const [inquiryState, setInquiryState] = useState({
    isOpen: false,
    type: 'general', // 'general' | 'product'
    productName: '',
    category: ''
  });

  // Fetch product catalog on mount
  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Critical: Failed to load product catalog.", error);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  // Dynamic Metadata Handling for SEO
  useEffect(() => {
    let title = "Gunjan Foods | Pure Edible Oils & Aromatic Spices";
    let description = "Official website of Gunjan Edible Oil Pvt. Ltd. (Ratlam, MP). Discover our selection of refined soyabean oil, cold-pressed mustard oil, and stone-ground spices.";

    if (activePage === 'category') {
      title = "Our Product Catalog | Gunjan Foods";
      description = "Browse our premium range of refined soyabean oil, cold-pressed mustard oil, turmeric powder, chilli powder, and other groceries.";
    } else if (activePage === 'about') {
      title = "Our Heritage & Sourcing | Gunjan Foods";
      description = "Learn about the legacy of Gunjan Edible Oil Pvt. Ltd. direct sourcing from Madhya Pradesh farms and traditional slow stone-grinding technology.";
    } else if (activePage === 'pdp' && selectedProductId) {
      const currentProduct = products.find(p => p.id === selectedProductId);
      if (currentProduct) {
        title = `${currentProduct.name} - Specifications & Bulk Query | Gunjan Foods`;
        description = `${currentProduct.description} Sourced from ${currentProduct.origin}. Available packaging: ${currentProduct.packagingOptions.join(', ')}.`;
      }
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [activePage, selectedProductId, products]);

  // Open general inquiry
  const handleOpenGeneralInquiry = () => {
    setInquiryState({
      isOpen: true,
      type: 'general',
      productName: '',
      category: ''
    });
  };

  // Open product specific inquiry
  const handleTriggerProductInquiry = (type, productName, category) => {
    setInquiryState({
      isOpen: true,
      type: 'product',
      productName,
      category
    });
  };

  // Close inquiry modal
  const handleCloseInquiry = () => {
    setInquiryState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenInquiry={handleOpenGeneralInquiry} 
      />

      <main style={{ flexGrow: 1 }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: '16px' }}>
            <div className="spinner"></div>
            <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Loading Gunjan Foods Catalog...</p>
          </div>
        ) : (
          <>
            {activePage === 'home' && (
              <Home 
                setActivePage={setActivePage} 
                setSelectedProductId={setSelectedProductId} 
                products={products} 
              />
            )}
            
            {activePage === 'category' && (
              <CategoryPage 
                products={products} 
                setActivePage={setActivePage} 
                setSelectedProductId={setSelectedProductId} 
                onTriggerInquiry={handleTriggerProductInquiry} 
              />
            )}
            
            {activePage === 'pdp' && (
              <ProductDetailPage 
                productId={selectedProductId} 
                products={products} 
                setActivePage={setActivePage} 
                setSelectedProductId={setSelectedProductId} 
                onTriggerInquiry={handleTriggerProductInquiry} 
              />
            )}
            
            {activePage === 'about' && (
              <About 
                onOpenInquiry={handleOpenGeneralInquiry} 
              />
            )}
          </>
        )}
      </main>

      <Footer 
        setActivePage={setActivePage} 
        onOpenInquiry={handleOpenGeneralInquiry} 
      />

      <InquiryModal 
        isOpen={inquiryState.isOpen} 
        onClose={handleCloseInquiry} 
        type={inquiryState.type} 
        productName={inquiryState.productName} 
        category={inquiryState.category} 
      />
    </div>
  );
}
