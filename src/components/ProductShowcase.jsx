import { products } from '../data/products'
import ProductCard from './ProductCard'

function ProductShowcase({ onQuickView }) {
  return (
    <section className="product-showcase" id="showcase">
      <div className="section-header">
        <span className="subtitle">THE COLLECTION</span>
        <h2 className="title">Handcrafted Masterpieces</h2>
        <div className="header-divider" />
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductShowcase
