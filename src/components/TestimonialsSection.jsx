import { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const TESTIMONIALS = [
  {
    initials: 'PS',
    name:     'Priya Sharma',
    city:     'Mumbai, Maharashtra',
    stars:    5,
    text:     '"The Crimson Banarasi I ordered for my daughter\'s wedding was breathtaking. The craftsmanship, the weight of the silk, the gold zari — nothing compares. VANYA is in a league of its own."',
  },
  {
    initials: 'MN',
    name:     'Meera Nair',
    city:     'Bangalore, Karnataka',
    stars:    5,
    text:     '"I wore the Golden Kanjeevaram to my sister\'s reception. Every single guest asked me where it was from. The richness of the silk is unmatched. Worth every rupee!"',
  },
  {
    initials: 'AV',
    name:     'Anjali Verma',
    city:     'New Delhi',
    stars:    5,
    text:     '"VANYA\'s white glove delivery and after-care guide made me feel like a true luxury customer. The Black Organza saree is everything I dreamed of for a formal gala."',
  },
  {
    initials: 'RK',
    name:     'Rashida Khan',
    city:     'Hyderabad, Telangana',
    stars:    4.5,
    text:     '"I\'ve been collecting handloom sarees for 20 years, and the Royal Chanderi from VANYA is the most exquisite piece in my collection. The brocade detailing is extraordinary."',
  },
]

function StarRating({ stars }) {
  return (
    <div className="testimonial-stars">
      {[1, 2, 3, 4, 5].map((s) => {
        const icon =
          stars >= s         ? 'fa-star' :
          stars >= s - 0.5   ? 'fa-star-half-stroke' : 'fa-star'
        const type = stars >= s ? 'fa-solid' : stars >= s - 0.5 ? 'fa-regular' : 'fa-regular'
        return <i key={s} className={`${type} ${icon}`} />
      })}
    </div>
  )
}

function TestimonialsSection() {
  const [current, setCurrent]     = useState(0)
  const [hdrRef, hdrVisible]      = useReveal()
  const touchStartX               = useRef(null)

  const goTo = (index) => {
    setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1))
    touchStartX.current = null
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div
        ref={hdrRef}
        className={`section-header${hdrVisible ? ' active' : ''}`}
      >
        <span className="subtitle">CUSTOMER STORIES</span>
        <h2 className="title">Worn with Love</h2>
        <div className="header-divider" />
      </div>

      <div
        className="testimonials-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonials-track">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                opacity:        i === current ? 1 : 0,
                transform:      i === current ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents:  i === current ? 'auto' : 'none',
                position:       i === 0 ? 'relative' : 'absolute',
                top:            0,
                left:           0,
                width:          '100%',
                transition:     'opacity 0.55s ease, transform 0.55s ease',
              }}
            >
              <StarRating stars={t.stars} />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-city">{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-nav">
          <button
            className="testimonial-arrow"
            id="testimonialPrev"
            aria-label="Previous"
            onClick={() => goTo(current - 1)}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className="testimonial-dots" id="testimonialDots">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className={`t-dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            className="testimonial-arrow"
            id="testimonialNext"
            aria-label="Next"
            onClick={() => goTo(current + 1)}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
