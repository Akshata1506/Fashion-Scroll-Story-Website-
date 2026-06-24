import { useReveal } from '../hooks/useReveal'

function ProductCard({ product, index, onQuickView }) {
  const [cardRef, cardVisible] = useReveal()
  const delay = index * 0.15

  return (
    <div
      ref={cardRef}
      className={`product-card${cardVisible ? ' active' : ''}`}
      style={{ transitionDelay: cardVisible ? `${delay}s` : '0s' }}
    >
      <div className="product-image-container">
        <img
          src={product.images[0].src}
          alt={product.name}
          className="product-image"
        />
        {product.badge && (
          <div className="product-badge">{product.badge}</div>
        )}
        <div className="product-hover-overlay">
          <button
            className="btn-card-action"
            onClick={() => onQuickView(product)}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price}</p>
        <span className="product-category">{product.category}</span>
        <a href="#" className="btn-collection">
          View Collection&nbsp;<i className="fa-solid fa-chevron-right" />
        </a>
      </div>
    </div>
  )
}

export default ProductCard
