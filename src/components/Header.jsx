function Header({ isScrolled }) {
  return (
    <header className={`luxury-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="header-container">
        <a href="#" className="logo">VANYA</a>
        <nav className="nav-links">
          <a href="#story"    className="nav-item">The Story</a>
          <a href="#parallax" className="nav-item">Heritage</a>
          <a href="#showcase" className="nav-item">Collection</a>
          <a href="#draping"  className="nav-item">Draping Guide</a>
          <a href="#about"    className="nav-item">Artisans</a>
        </nav>
        <div className="header-actions">
          <a href="#" aria-label="Search"><i className="fa-solid fa-magnifying-glass"></i></a>
          <a href="#" aria-label="Cart"><i className="fa-solid fa-bag-shopping"></i></a>
        </div>
      </div>
    </header>
  )
}
export default Header
