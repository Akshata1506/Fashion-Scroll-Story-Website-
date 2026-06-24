function HeroSection({ heroZoom, heroOpacity }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-wrapper">
        <img
          src="/assets/hero_saree.png"
          alt="Luxury Saree Model"
          className="hero-bg-image"
          style={{ transform: `scale(${heroZoom})` }}
        />
        <div className="hero-overlay" />
      </div>

      <div
        className="hero-content"
        style={{
          opacity:   heroOpacity,
          transform: `translateY(${(1 - heroOpacity) * 50}px)`,
        }}
      >
        <span className="hero-subtitle">HAUTE COUTURE</span>
        <h1 className="hero-title">
          Elegance in<br />
          <span className="highlight">Every Thread</span>
        </h1>
        <p className="hero-description">
          Immerse yourself in a narrative of timeless silk, heritage weaving, and modern majesty.
        </p>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll to Explore</span>
          <div className="scroll-arrow">
            <span className="arrow-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
