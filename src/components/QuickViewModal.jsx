import { useState, useEffect } from 'react'

function QuickViewModal({ product, onClose }) {
  const [activeThumb, setActiveThumb] = useState(0)
  const [imgStyle,    setImgStyle]    = useState({ opacity: 1, transform: 'scale(1)' })
  const [wishlisted,  setWishlisted]  = useState(false)

  // Reset state whenever a new product is opened
  useEffect(() => {
    if (product) {
      setActiveThumb(0)
      setWishlisted(false)
      setImgStyle({ opacity: 1, transform: 'scale(1)' })
    }
  }, [product])

  // Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleThumb = (index) => {
    setImgStyle({ opacity: 0, transform: 'scale(1.04)', transition: 'all 0.2s ease' })
    setTimeout(() => {
      setActiveThumb(index)
      setImgStyle({ opacity: 1, transform: 'scale(1)', transition: 'all 0.3s ease' })
    }, 200)
  }

  if (!product) return null

  return (
    <div
      className="quickview-overlay active"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="quickview-modal">
        <button className="quickview-close" id="quickviewClose" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="quickview-grid">
          {/* Gallery */}
          <div className="quickview-gallery">
            <div className="quickview-main-image">
              <img
                src={product.images[activeThumb].src}
                alt={product.name}
                id="quickviewMainImg"
                style={imgStyle}
              />
            </div>
            <div className="quickview-thumbnails" id="quickviewThumbs">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`quickview-thumb${activeThumb === i ? ' active' : ''}`}
                  title={img.label}
                  onClick={() => handleThumb(i)}
                >
                  <img src={img.src} alt={img.label} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="quickview-info">
            {product.badge && (
              <span className="quickview-badge" id="quickviewBadge">{product.badge}</span>
            )}
            <span className="quickview-category" id="quickviewCategory">{product.category}</span>
            <h2 className="quickview-title" id="quickviewTitle">{product.name}</h2>
            <p className="quickview-price"  id="quickviewPrice">{product.price}</p>
            <div className="quickview-divider" />
            <p className="quickview-desc"   id="quickviewDesc">{product.description}</p>

            <div className="quickview-features">
              {[
                ['fa-hand-sparkles', 'Master Woven — 45 Days Craftsmanship'],
                ['fa-leaf',          '100% Pure Silk — GI Tagged'],
                ['fa-truck',         'Free Shipping & White-Glove Delivery'],
                ['fa-rotate-left',   '15-Day Easy Returns'],
              ].map(([icon, text]) => (
                <div className="feature-item" key={icon}>
                  <i className={`fa-solid ${icon}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="quickview-actions">
              <button
                className={`btn-wishlist${wishlisted ? ' wishlisted' : ''}`}
                id="quickviewWishlist"
                onClick={() => setWishlisted(w => !w)}
              >
                <i className={`fa-${wishlisted ? 'solid' : 'regular'} fa-heart`} />
                {wishlisted ? 'Wishlisted!' : 'Add to Wishlist'}
              </button>
              <a href="#" className="btn-view-full">
                View Full Details&nbsp;<i className="fa-solid fa-arrow-right-long" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
