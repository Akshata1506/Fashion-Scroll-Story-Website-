import { useReveal } from '../hooks/useReveal'

function ParallaxSection({ sectionRef, parallaxOffset }) {
  const [cardRef, cardVisible] = useReveal()

  return (
    <section className="parallax-section" id="parallax" ref={sectionRef}>
      <div className="parallax-bg-wrapper">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600"
          alt="Indian Palace Courtyard"
          className="parallax-bg-image"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="parallax-overlay" />
      </div>

      <div className="parallax-container">
        <div ref={cardRef} className={`parallax-card${cardVisible ? ' active' : ''}`}>
          <span className="card-subtitle">THE HERITAGE</span>
          <h2 className="card-title">Crafting the Legacy</h2>
          <p className="card-desc">
            Every weave takes weeks of design, mathematical accuracy on the loom, and the
            precision of multi-generational artisans. We honor this process, restoring the
            status of the Indian saree on the world stage.
          </p>
          <div className="gold-line" />
        </div>
      </div>
    </section>
  )
}

export default ParallaxSection
