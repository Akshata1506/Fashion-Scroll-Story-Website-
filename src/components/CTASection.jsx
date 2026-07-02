import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function CTASection() {
  const [ref, visible] = useReveal(0.2)
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="cta-section">
      <div className="cta-bg-overlay" />
      <div
        ref={ref}
        className={`cta-content${visible ? ' active' : ''}`}
      >
        <span className="cta-eyebrow">EMBARK ON THE JOURNEY</span>
        <h2 className="cta-title">Discover Your Style</h2>
        <p className="cta-desc">
          Explore the full range of artisanal sarees. Experience luxury, redefined.
        </p>
        <a href="#showcase" className="btn-primary">View Entire Collection</a>
      </div>
    </section>
  )
}

export default CTASection
