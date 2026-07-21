import React, { useState, useEffect } from 'react';
import { submitInquiry } from '../services/inquiryService';

export default function InquiryModal({ isOpen, onClose, type, productName, category }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packaging: '',
    inquiryReason: 'Distributorship / Dealership',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens or shifts type
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        packaging: category === 'oils' ? '15 Liter Tin' : category === 'spices' ? '500g Pouch' : 'Consumer Pack',
        inquiryReason: 'Distributorship / Dealership',
        message: type === 'product' 
          ? `We are interested in raising an inquiry about ${productName}. Please share price quotes and delivery terms.`
          : ''
      });
      setErrors({});
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen, type, productName, category]);

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const subject = type === 'product' 
        ? `Quote Request: ${productName}` 
        : `General Inquiry: ${formData.inquiryReason}`;

      const dataToSubmit = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject,
        packaging: type === 'product' ? formData.packaging : undefined,
        inquiryReason: type === 'general' ? formData.inquiryReason : undefined,
        message: formData.message
      };

      const result = await submitInquiry(dataToSubmit);
      if (result.success) {
        setIsSuccess(true);
      } else {
        throw new Error(result.message || "Failed to submit.");
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: err.message || "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="heading-sm" style={{ margin: 0, color: 'var(--color-primary)' }}>
            {type === 'product' ? `Inquiry: ${productName}` : 'Business Inquiry'}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {isLoading && (
            <div className="modal-loading-overlay">
              <div className="spinner"></div>
              <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Submitting Inquiry...</p>
            </div>
          )}

          {isSuccess ? (
            <div className="success-screen">
              <div className="success-icon">✓</div>
              <h2 className="heading-sm" style={{ color: 'var(--color-success)' }}>Thank You!</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Your inquiry has been successfully transmitted. Our corporate team from Ratlam will review your query and contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> shortly.
              </p>
              <button className="btn btn-primary" onClick={onClose}>Close Window</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>
                  {errors.form}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  placeholder="e.g. Rajesh Kumar" 
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="grid grid-2" style={{ gap: '16px', marginBottom: '0px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="e.g. rajesh@gmail.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className="form-control" 
                    placeholder="e.g. 9876543210" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>
              </div>

              {type === 'product' ? (
                <div className="form-group">
                  <label className="form-label">Preferred Packaging Option *</label>
                  <select 
                    name="packaging" 
                    className="form-control"
                    value={formData.packaging}
                    onChange={handleChange}
                  >
                    {category === 'oils' && (
                      <>
                        <option value="1 Liter Pouch">1 Liter Pouch</option>
                        <option value="1 Liter Bottle">1 Liter Bottle</option>
                        <option value="5 Liter Can">5 Liter Can</option>
                        <option value="15 Liter Tin">15 Liter Tin</option>
                        <option value="Bulk Tanker">Bulk Tanker (Industrial)</option>
                      </>
                    )}
                    {category === 'spices' && (
                      <>
                        <option value="100g Pouch">100g Consumer Pouch</option>
                        <option value="200g Pouch">200g Consumer Pouch</option>
                        <option value="500g Pouch">500g Kitchen Pack</option>
                        <option value="25 Kg Bulk Bag">25 Kg Bulk Gunny Bag</option>
                      </>
                    )}
                    {category !== 'oils' && category !== 'spices' && (
                      <>
                        <option value="Consumer Pack">Standard Retail Pack</option>
                        <option value="Bulk Pack">Bulk Commercial Pack</option>
                      </>
                    )}
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Inquiry Reason *</label>
                  <select 
                    name="inquiryReason" 
                    className="form-control"
                    value={formData.inquiryReason}
                    onChange={handleChange}
                  >
                    <option value="Distributorship / Dealership">Become a Distributor / Dealer</option>
                    <option value="Bulk Retail Ordering">Bulk Procurement (Stores/Supermarkets)</option>
                    <option value="Export Opportunities">International Export Queries</option>
                    <option value="General Feedback & Support">General Sourcing / Feedback</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea 
                  name="message" 
                  className="form-control" 
                  placeholder={type === 'product' 
                    ? "Enter details about estimated quantity requirements, delivery location, etc."
                    : "Describe your query or business proposition in detail..."
                  }
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <div style={{ marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Business Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
