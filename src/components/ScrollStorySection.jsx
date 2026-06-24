const STEPS = [
  {
    num:   'CHAPTER I',
    title: 'Tradition',
    desc:  'Handcrafted crimson weaves representing generations of artistry. Every motif tells a story of royal lineage, hand-loomed to perfection in Varanasi.',
    link:  'Discover Crimson',
    img:   '/assets/scroll_red.png',
    alt:   'Tradition Saree',
  },
  {
    num:   'CHAPTER II',
    title: 'Grace',
    desc:  'Deep maroon silk draping the modern woman in unmatched poise. An intersection of traditional patterns with a fluid, lightweight modern drape.',
    link:  'Discover Maroon',
    img:   '/assets/scroll_maroon.png',
    alt:   'Grace Saree',
  },
  {
    num:   'CHAPTER III',
    title: 'Modern Royalty',
    desc:  'Luminous gold tissue silk echoing the opulence of Indian architecture. A metallic glow designed to make a statement in contemporary celebrations.',
    link:  'Discover Gold',
    img:   '/assets/scroll_gold.png',
    alt:   'Modern Royalty Saree',
  },
  {
    num:   'CHAPTER IV',
    title: 'Timeless Beauty',
    desc:  'Sleek black organza adorned with delicate hand-embroidered border detailing. A minimal yet bold statement of sheer luxury and elegance.',
    link:  'Discover Black',
    img:   '/assets/scroll_black.png',
    alt:   'Timeless Beauty Saree',
  },
]

const DOT_LABELS = ['I', 'II', 'III', 'IV']

function ScrollStorySection({ sectionRef, activeStep }) {
  const scrollToStep = (index) => {
    if (!sectionRef.current) return
    const storyTop    = sectionRef.current.offsetTop
    const storyHeight = sectionRef.current.offsetHeight - window.innerHeight
    window.scrollTo({
      top:      storyTop + index * (storyHeight / 3) + 10,
      behavior: 'smooth',
    })
  }

  return (
    <section className="scroll-story-container" id="story" ref={sectionRef}>
      <div className="story-sticky-wrapper">

        {/* Left — Text */}
        <div className="story-text-pane">
          <div className="story-text-track">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`story-text-step${activeStep === i ? ' active' : ''}`}
                data-step={i}
              >
                <span className="step-num">{step.num}</span>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-desc">{step.desc}</p>
                <a href="#showcase" className="btn-minimal">
                  {step.link}&nbsp;<i className="fa-solid fa-arrow-right-long" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Images */}
        <div className="story-image-pane">
          <div className="image-frame-wrapper">
            {STEPS.map((step, i) => (
              <img
                key={i}
                src={step.img}
                alt={step.alt}
                className={`story-image${activeStep === i ? ' active' : ''}`}
                data-step={i}
              />
            ))}
          </div>
          <div className="image-border-decoration" />
          <div className="luxury-seal">EST. 2026</div>

          <div className="story-dots">
            {DOT_LABELS.map((label, i) => (
              <div
                key={i}
                className={`dot${activeStep === i ? ' active' : ''}`}
                onClick={() => scrollToStep(i)}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ScrollStorySection
