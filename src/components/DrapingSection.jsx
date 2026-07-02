import { useReveal } from '../hooks/useReveal'
import { drapeData } from '../data/drapeData'

const DISPLAY = [
  { img: '/assets/product_crimson.png', alt: 'Crimson Banarasi',    num: '01', name: 'Crimson Banarasi',    tag: 'Pure Silk Handloom',    occ: 'Banarasi',   lvl: 'Classic',  cls: 'easy'   },
  { img: '/assets/product_gold.png',    alt: 'Golden Kanjeevaram', num: '02', name: 'Golden Kanjeevaram', tag: 'Metallic Tissue Silk',   occ: 'Kanjeevaram', lvl: 'Royal',    cls: 'easy'   },
  { img: '/assets/scroll_red.png',      alt: 'Royal Red Silk',      num: '03', name: 'Royal Red Silk',      tag: 'Bridal Heirloom',        occ: 'Bridal',      lvl: 'Exclusive', cls: 'medium' },
  { img: '/assets/product_black.png',   alt: 'Black Organza',       num: '04', name: 'Black Organza',       tag: 'Hand-Embroidered',       occ: 'Organza',     lvl: 'Modern Noir', cls: 'hard' },
  { img: '/assets/product_chanderi.png',alt: 'Maroon Chanderi',     num: '05', name: 'Maroon Chanderi',     tag: 'Brocade Saree',          occ: 'Chanderi',    lvl: 'Heritage', cls: 'medium' },
  { img: '/assets/scroll_maroon.png',   alt: 'Deep Maroon Classic', num: '06', name: 'Deep Maroon Classic', tag: 'Minimalist Elegance',    occ: 'Silk',        lvl: 'Signature', cls: 'medium' },
]

function DrapeCard({ item, index, onViewSteps }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`draping-img-card${visible ? ' active' : ''}`}
      data-drape={index}
      style={{ transitionDelay: visible ? `${index * 0.1}s` : '0s' }}
    >
      <div className="draping-img-wrapper">
        <img src={item.img} alt={item.alt} loading="lazy" />
        <div className="draping-img-overlay">
          <span className="drape-style-num">{item.num}</span>
          <h3 className="drape-style-name">{item.name}</h3>
          <p className="drape-style-tag">{item.tag}</p>
          <div className="drape-badges-row">
            <span className="drape-badge-occ">{item.occ}</span>
            <span className={`drape-badge-lvl ${item.cls}`}>{item.lvl}</span>
          </div>
          <button className="btn-drape-view" onClick={() => onViewSteps(index)}>
            <i className="fa-solid fa-eye" /> View Draping Guide
          </button>
        </div>
      </div>
    </div>
  )
}

function DrapingSection({ onViewSteps }) {
  const [hdrRef, hdrVisible] = useReveal()

  return (
    <section className="draping-section" id="draping">
      <div
        ref={hdrRef}
        className={`section-header${hdrVisible ? ' active' : ''}`}
      >
        <span className="subtitle">THE ART OF DRAPING</span>
        <h2 className="title">One Saree, Many Looks</h2>
        <p className="draping-intro">
          Discover six timeless ways to drape your saree — from classic elegance to contemporary flair.
        </p>
        <div className="header-divider" />
      </div>

      <div className="draping-img-grid">
        {DISPLAY.map((item, i) => (
          <DrapeCard key={i} item={item} index={i} onViewSteps={onViewSteps} />
        ))}
      </div>
    </section>
  )
}

export default DrapingSection
