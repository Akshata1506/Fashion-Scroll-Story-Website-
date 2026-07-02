import { useState, useEffect, useRef, useCallback } from 'react'
import Header from './components/Header'
import CustomCursor from './components/CustomCursor'
import HeroSection from './components/HeroSection'
import ScrollStorySection from './components/ScrollStorySection'
import ParallaxSection from './components/ParallaxSection'
import ProductShowcase from './components/ProductShowcase'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import DrapingSection from './components/DrapingSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import QuickViewModal from './components/QuickViewModal'
import DrapingPopup from './components/DrapingPopup'

function App() {
  // ── Scroll state ──────────────────────────────────────────────
  const [isScrolled,      setIsScrolled]      = useState(false)
  const [heroZoom,        setHeroZoom]        = useState(1)
  const [heroOpacity,     setHeroOpacity]     = useState(1)
  const [parallaxOffset,  setParallaxOffset]  = useState(0)
  const [activeStoryStep, setActiveStoryStep] = useState(0)
  const [scrollProgress,  setScrollProgress]  = useState(0)

  // ── Modal state ───────────────────────────────────────────────
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [drapePopupIndex,  setDrapePopupIndex]  = useState(null)

  // ── Section refs ──────────────────────────────────────────────
  const scrollStoryRef = useRef(null)
  const parallaxRef    = useRef(null)

  // ── Main scroll handler ───────────────────────────────────────
  const handleScroll = useCallback(() => {
    const scrollY      = window.scrollY
    const winH         = window.innerHeight
    const docH         = document.documentElement.scrollHeight - winH

    // Progress bar
    setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0)

    // Header
    setIsScrolled(scrollY > 50)

    // Hero zoom + fade
    if (scrollY <= winH) {
      const p = Math.min(1, Math.max(0, scrollY / winH))
      setHeroZoom(1 + p * 0.15)
      setHeroOpacity(Math.max(0, 1 - p * 1.3))
    }

    // Scroll story steps
    if (scrollStoryRef.current) {
      const storyTop    = scrollStoryRef.current.offsetTop
      const storyHeight = scrollStoryRef.current.offsetHeight - winH
      if (scrollY >= storyTop && scrollY <= storyTop + storyHeight) {
        const p = (scrollY - storyTop) / storyHeight
        if      (p < 0.25) setActiveStoryStep(0)
        else if (p < 0.5)  setActiveStoryStep(1)
        else if (p < 0.75) setActiveStoryStep(2)
        else               setActiveStoryStep(3)
      } else if (scrollY < storyTop) {
        setActiveStoryStep(0)
      } else {
        setActiveStoryStep(3)
      }
    }

    // Parallax
    if (parallaxRef.current) {
      const rect = parallaxRef.current.getBoundingClientRect()
      if (rect.top < winH && rect.bottom > 0) {
        const p = (winH - rect.top) / (winH + rect.height)
        setParallaxOffset((p - 0.5) * -120)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  // ── Body scroll lock when modal is open ───────────────────────
  useEffect(() => {
    document.body.style.overflow =
      quickViewProduct !== null || drapePopupIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [quickViewProduct, drapePopupIndex])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        id="scrollProgressBar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom magnetic cursor */}
      <CustomCursor />

      {/* Page sections */}
      <Header isScrolled={isScrolled} />
      <HeroSection heroZoom={heroZoom} heroOpacity={heroOpacity} />
      <ScrollStorySection
        sectionRef={scrollStoryRef}
        activeStep={activeStoryStep}
      />
      <ParallaxSection
        sectionRef={parallaxRef}
        parallaxOffset={parallaxOffset}
      />
      <ProductShowcase onQuickView={setQuickViewProduct} />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <DrapingSection onViewSteps={setDrapePopupIndex} />
      <CTASection />
      <Footer />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <DrapingPopup
        index={drapePopupIndex}
        onClose={() => setDrapePopupIndex(null)}
      />
    </>
  )
}

export default App
