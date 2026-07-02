import { useState } from 'react'

const COLLECTIONS = ['The Varanasi Royal', 'Kanchipuram Silks', 'Contemporary Organzas', 'Chanderi Brocades', 'Bridal Couture']
const MAISON      = ['Our Story', 'Artisan Welfare', 'Craftsmanship', 'Press & Media', 'Careers']
const CARE        = ['Visit Our Store', 'Shipping & Returns', 'Sizing & Care Guide', 'FAQ']

function Footer() {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <footer className="luxury-footer">

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <h3 className="newsletter-title">Join the Inner Circle</h3>
          <p className="newsletter-desc">
            Exclusive previews, artisan stories &amp; curated collections — in your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {sent ? 'Subscribed! ✓' : <>Subscribe <i className="fa-solid fa-arrow-right" /></>}
            </button>
          </form>
        </div>
      </div>

      {/* Footer grid */}
      <div className="footer-grid">

        {/* Brand col */}
        <div className="footer-col brand-col">
          <a href="#" className="footer-logo">VANYA</a>
          <p className="footer-brand-desc">
            High-end luxury Indian fashion weaving together heritage traditions and contemporary sophistication.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest" /></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            <a href="#" aria-label="Youtube"><i className="fa-brands fa-youtube" /></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp" />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div className="footer-col">
          <h4 className="footer-heading">Collections</h4>
          <ul className="footer-links">
            {COLLECTIONS.map((c) => (
              <li key={c}><a href="#showcase">{c}</a></li>
            ))}
          </ul>
        </div>

        {/* The Maison */}
        <div className="footer-col">
          <h4 className="footer-heading">The Maison</h4>
          <ul className="footer-links">
            {MAISON.map((m) => (
              <li key={m}><a href="#about">{m}</a></li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            {CARE.map((c) => (
              <li key={c}><a href="#contact">{c}</a></li>
            ))}
            <li>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                Live Chat (WhatsApp)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <p>&copy; 2026 VANYA Haute Couture. All Rights Reserved. Designed for elegance.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
