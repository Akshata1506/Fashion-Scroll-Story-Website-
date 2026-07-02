import { useEffect } from 'react'
import { drapeData } from '../data/drapeData'

function DrapingPopup({ index, onClose }) {
  const drape = index !== null ? drapeData[index] : null

  // Escape key closes popup
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!drape) return null

  const levelClass =
    drape.levelKey === 'easy'   ? 'easy'   :
    drape.levelKey === 'medium' ? 'medium' : 'hard'

  return (
    <div
      className="drape-popup-overlay active"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="drape-popup-modal">
        <button className="drape-popup-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="drape-popup-body">
          {/* Image panel */}
          <div className="drape-popup-img-panel">
            <img src={drape.img} alt={drape.name} />
          </div>

          {/* Info panel */}
          <div className="drape-popup-info-panel">
            <span className="drape-popup-num">{drape.num}</span>
            <h2 className="drape-popup-title">{drape.name}</h2>
            <p className="drape-popup-tagline">{drape.tagline}</p>

            <div className="drape-popup-meta">
              <span className="drape-badge-occ">{drape.occasion}</span>
              <span className={`drape-badge-lvl ${levelClass}`}>{drape.level}</span>
            </div>

            <div className="drape-popup-divider" />

            <h4 className="drape-steps-heading">
              <i className="fa-solid fa-list-ol" /> Step-by-Step Guide
            </h4>

            <ol className="drape-popup-steps">
              {drape.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <div className="drape-popup-tip">
              <i className="fa-solid fa-lightbulb" /> {drape.tip}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrapingPopup
