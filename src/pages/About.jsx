import React from 'react';

export default function About({ onOpenInquiry }) {
  return (
    <div>
      {/* About Banner */}
      <section className="about-hero">
        <div className="container">
          <h1>Our Heritage & Sourcing</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
            Gunjan Edible Oil Pvt. Ltd. represents the legacy of agricultural processing in Madhya Pradesh, bringing pure, unadulterated oils and spices to Indian tables.
          </p>
        </div>
      </section>

      {/* Sourcing Story */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container about-intro-grid">
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}images/about_heritage.png`} 
              alt="Indian Spice Sourcing Fields" 
              style={{ width: '100%', borderRadius: '12px', border: '6px solid var(--color-bg)', boxShadow: 'var(--shadow-md)' }}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>
          <div>
            <span className="badge" style={{ marginBottom: '12px' }}>Established Legacy</span>
            <h2 className="heading-md" style={{ color: 'var(--color-primary)' }}>Ratlam Sourcing Roots</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.8 }}>
              Nestled in the heart of Malwa region, Ratlam is surrounded by fertile black soil, perfect for cultivating premium oilseeds (mustard, soyabean) and fragrant coriander. At Gunjan Foods, we maintain direct channels with farmers across the Malwa plateau, ensuring we secure only the highest quality crops.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: 1.8 }}>
              Our modern oil extraction mill and spice processing plants combine age-old temperature-sensitive methods with computerized cleaning, grading, and sealing to guarantee that nutrients are never compromised.
            </p>
            <button className="btn btn-primary" onClick={onOpenInquiry}>
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="section-padding" style={{ backgroundColor: '#FAF6F0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="badge" style={{ marginBottom: '10px' }}>Our Mission</span>
            <h2 className="heading-md">What We Stand For</h2>
          </div>

          <div className="about-values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="heading-sm">Farmer Empowerment</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                We practice fair pricing with our farming cooperatives, providing stable incomes that sustain rural farming families in Madhya Pradesh and Rajasthan.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3 className="heading-sm">Adulteration Free</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                Our corporate promise is simple: 100% pure product. We use zero artificial colors, synthetic flavors, or cheap filler oils in any of our batches.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3 className="heading-sm">Eco-Conscious Milling</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                Our oil milling facility recycles soyabean husk as organic animal feed and uses energy-efficient machinery to minimize carbon output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Visual */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container text-center">
          <span className="badge" style={{ marginBottom: '10px' }}>Sourcing Map</span>
          <h2 className="heading-md" style={{ marginBottom: '24px' }}>Our Agricultural Map</h2>
          
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            backgroundColor: '#FAF8F4', 
            border: '1px solid var(--color-border)', 
            borderRadius: '12px', 
            padding: '40px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-primary)' }}>■</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Ratlam Processing HQ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-accent)' }}>■</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Rajasthan Mustard Belt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2E7D32' }}>■</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Assam Tea Gardens</span>
              </div>
            </div>

            <div style={{ 
              height: '300px', 
              border: '2px dashed var(--color-border)', 
              borderRadius: '8px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#ffffff'
            }}>
              <span style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</span>
              <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>Central & East India Sourcing Network</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Ratlam Processing HQ &rarr; Kota Seeds Hub &rarr; Assam Blending Estates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA Form */}
      <section className="section-padding" style={{ backgroundColor: '#FAF6F0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container text-center">
          <h2 className="heading-md" style={{ marginBottom: '16px' }}>Have a Specific Business Inquiry?</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Whether you want to apply for a regional distributorship or seek a bulk price quote, our team is ready to assist.
          </p>
          <button className="btn btn-primary" onClick={onOpenInquiry} style={{ padding: '16px 40px' }}>
            Open Business Form
          </button>
        </div>
      </section>
    </div>
  );
}
