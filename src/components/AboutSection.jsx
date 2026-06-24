import { useReveal } from '../hooks/useReveal'

function AboutSection() {
  const [textRef, textVisible] = useReveal()
  const [imgRef,  imgVisible]  = useReveal()

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div
          ref={textRef}
          className={`about-text${textVisible ? ' active' : ''}`}
          data-origin="left"
        >
          <span className="about-subtitle">OUR PHILOSOPHY</span>
          <h2 className="about-title">The Hands Behind the Gold Thread</h2>
          <p className="about-desc">
            Vanya was born from a desire to bridge the fine line between heritage artistry and
            high-fashion modern silhouettes. We work directly with over 150 master weavers
            across Varanasi, Kanchipuram, and Chanderi.
          </p>
          <p className="about-desc">
            Every thread is hand-spun, and every piece undergoes 45 days of craftsmanship.
            By choosing Vanya, you support sustainable handloom practices and help preserve a
            centuries-old cultural treasury.
          </p>
          <div className="about-signature">
            <span className="sig-name">Vanya Dev</span>
            <span className="sig-title">Founder &amp; Creative Director</span>
          </div>
        </div>

        <div
          ref={imgRef}
          className={`about-image-container${imgVisible ? ' active' : ''}`}
          data-origin="right"
        >
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200"
              alt="Embroidering Detail"
              className="about-image"
            />
            <div className="about-image-border" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutSection
