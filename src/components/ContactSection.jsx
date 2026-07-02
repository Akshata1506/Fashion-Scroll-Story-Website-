import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function ContactSection() {
  const [hdrRef,  hdrVisible]  = useReveal()
  const [infoRef, infoVisible] = useReveal()
  const [mapRef,  mapVisible]  = useReveal()

  const [padOpen, setPadOpen] = useState(null) // 'phone' | 'whatsapp' | null

  const togglePad = (type) => setPadOpen(prev => prev === type ? null : type)

  return (
    <section className="contact-section" id="contact">
      <div
        ref={hdrRef}
        className={`section-header${hdrVisible ? ' active' : ''}`}
      >
        <span className="subtitle">VISIT US</span>
        <h2 className="title">Find VANYA</h2>
        <div className="header-divider" />
      </div>

      <div className="contact-wrapper">

        {/* Info panel */}
        <div
          ref={infoRef}
          className={`contact-info-panel${infoVisible ? ' active' : ''}`}
          data-origin="left"
        >
          {/* Address */}
          <div className="contact-card">
            <div className="contact-icon"><i className="fa-solid fa-location-dot" /></div>
            <div className="contact-card-text">
              <h4>Our Boutique</h4>
              <p>24-B Janpath Market, Connaught Place<br />New Delhi — 110001</p>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="maps-link">
                View on Google Maps <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div className="contact-card">
            <div className="contact-icon"><i className="fa-solid fa-phone" /></div>
            <div className="contact-card-text">
              <h4>Call / WhatsApp</h4>
              <div className="contact-actions-container" style={{ position: 'relative' }}>
                <button
                  className="contact-action-btn phone-btn"
                  aria-label="Phone Call"
                  onClick={() => togglePad('phone')}
                >
                  <i className="fa-solid fa-phone" />
                </button>
                <button
                  className="contact-action-btn whatsapp-btn"
                  aria-label="WhatsApp Chat"
                  onClick={() => togglePad('whatsapp')}
                >
                  <i className="fa-brands fa-whatsapp" />
                </button>

                {padOpen && (
                  <div className="contact-pad-popup" style={{ display: 'block' }}>
                    <div className="contact-pad-arrow" />
                    <div className="contact-pad-header">
                      {padOpen === 'phone' ? '📞 Call Us' : '💬 WhatsApp Us'}
                    </div>
                    <div className="contact-pad-body">
                      {padOpen === 'phone' ? (
                        <a href="tel:+919876543210" className="pad-link">
                          <i className="fa-solid fa-phone" /> +91 98765 43210
                        </a>
                      ) : (
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pad-link"
                        >
                          <i className="fa-brands fa-whatsapp" /> Chat Now
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon"><i className="fa-regular fa-envelope" /></div>
            <div className="contact-card-text">
              <h4>Email</h4>
              <a href="mailto:hello@vanyacouture.in" className="contact-phone">
                hello@vanyacouture.in
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="contact-card">
            <div className="contact-icon"><i className="fa-regular fa-clock" /></div>
            <div className="contact-card-text">
              <h4>Store Hours</h4>
              <p>Mon – Sat: <strong>10:00 AM – 8:00 PM</strong></p>
              <p>Sunday: <strong>11:00 AM – 6:00 PM</strong></p>
            </div>
          </div>
        </div>

        {/* Map panel */}
        <div
          ref={mapRef}
          className={`contact-map-panel${mapVisible ? ' active' : ''}`}
          data-origin="right"
        >
          <div className="map-placeholder">
            <div className="map-bg-pattern" />
            <div className="map-pin-anim">
              <i className="fa-solid fa-location-dot" />
              <div className="pin-pulse" />
            </div>
            <div className="map-info-card">
              <strong>VANYA Boutique</strong>
              <span>Connaught Place, New Delhi</span>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps"
              >
                <i className="fa-brands fa-google" /> Open in Google Maps
              </a>
            </div>
            <div className="map-whatsapp-cta">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
