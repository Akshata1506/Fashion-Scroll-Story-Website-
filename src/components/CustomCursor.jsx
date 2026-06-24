import { useEffect, useRef } from 'react'

function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    // Only activate on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) {
      ring.style.display = 'none'
      dot.style.display  = 'none'
      return
    }

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200
    let rafId  = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`
      if (!rafId) rafId = requestAnimationFrame(animateRing)
    }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      rafId = null
      if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
        rafId = requestAnimationFrame(animateRing)
      }
    }

    const onDown = () => {
      ring.classList.add('clicking')
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(0.6)`
    }
    const onUp = () => {
      ring.classList.remove('clicking')
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(1)`
    }
    const onLeave = () => { ring.style.opacity = '0'; dot.style.opacity = '0' }
    const onEnter = () => { ring.style.opacity = '1'; dot.style.opacity = '1' }

    // Hover enlargement on interactive elements
    const targets = document.querySelectorAll(
      'a, button, [role="button"], .dot, .draping-img-card, .product-card, .quickview-thumb'
    )
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'))
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'))
    })

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot"  ref={dotRef}  />
    </>
  )
}

export default CustomCursor
