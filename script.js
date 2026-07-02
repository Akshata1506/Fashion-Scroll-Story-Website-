// Always start from top on page load / refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const header = document.querySelector('.luxury-header');
    const heroSection = document.getElementById('hero');
    const heroBg = document.querySelector('.hero-bg-image');
    const heroContent = document.querySelector('.hero-content');
    const scrollStory = document.getElementById('story');
    const stickyWrapper = document.querySelector('.story-sticky-wrapper');
    const storyTextPane = document.querySelector('.story-text-pane');
    const storyImages = document.querySelectorAll('.story-image');
    const storyTexts = document.querySelectorAll('.story-text-step');
    const storyDots = document.querySelectorAll('.dot');
    const parallaxSection = document.getElementById('parallax');
    const parallaxBg = document.querySelector('.parallax-bg-image');

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const headerNav     = document.getElementById('headerNav');

    if (mobileMenuBtn && headerNav) {
        // Toggle open/close on hamburger click
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = headerNav.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('open', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            header.classList.toggle('menu-open', isOpen);
        });

        // Close nav when any nav link is clicked (smooth scroll to section)
        headerNav.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                header.classList.remove('menu-open');
            });
        });

        // Close nav when clicking outside the header
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                headerNav.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                header.classList.remove('menu-open');
            }
        });
    }

    // --- State Variables ---
    let windowHeight = window.innerHeight;
    let storyTop = 0;
    let storyHeight = 0;
    let isTicking = false;
    let currentStoryIndex = -1;

    // --- Measure Layout Dimensions ---
    function measureLayout() {
        windowHeight = window.innerHeight;
        if (scrollStory) {
            storyTop = scrollStory.offsetTop;
            storyHeight = scrollStory.offsetHeight - windowHeight;
        }
    }
    
    // Initial measure and bind to resize
    measureLayout();
    window.addEventListener('resize', () => {
        measureLayout();
        updateScrollAnimations();
    });

    // --- Scroll Event Handler (Throttled with requestAnimationFrame) ---
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                updateScrollAnimations();
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // --- Core Animation Controller ---
    function updateScrollAnimations() {
        const scrollY = window.scrollY;

        // 1. Header State Change
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Hero Section Zoom and Fade-out
        if (heroSection && scrollY <= windowHeight) {
            const heroProgress = Math.min(1, Math.max(0, scrollY / windowHeight));
            const zoomVal = 1 + heroProgress * 0.15; // Zoom from 1 to 1.15
            const opacityVal = 1 - heroProgress * 1.3; // Fade out slightly earlier for smooth exit

            heroSection.style.setProperty('--hero-zoom', zoomVal);
            heroSection.style.setProperty('--hero-opacity', Math.max(0, opacityVal));
        }

        // 3. Scroll Story Image/Text Crossfade Logic
        if (scrollStory && scrollY >= storyTop && scrollY <= (storyTop + storyHeight)) {
            const relativeScroll = scrollY - storyTop;
            const progress = relativeScroll / storyHeight; // Goes from 0 to 1

            // Determine active step index (0 to 3)
            let activeIndex = 0;
            if (progress < 0.25) {
                activeIndex = 0;
            } else if (progress >= 0.25 && progress < 0.5) {
                activeIndex = 1;
            } else if (progress >= 0.5 && progress < 0.75) {
                activeIndex = 2;
            } else {
                activeIndex = 3;
            }

            // Sync visual states (images, texts, indicators) only on change
            if (activeIndex !== currentStoryIndex) {
                currentStoryIndex = activeIndex;
                updateStoryStep(activeIndex);
            }
        } else if (scrollStory && scrollY < storyTop) {
            // Hard reset to step 0 when above the section
            if (currentStoryIndex !== 0) {
                currentStoryIndex = 0;
                updateStoryStep(0);
            }
        } else if (scrollStory && scrollY > (storyTop + storyHeight)) {
            // Hard reset to step 3 when below the section
            if (currentStoryIndex !== 3) {
                currentStoryIndex = 3;
                updateStoryStep(3);
            }
        }

        // 4. Parallax Section Translation
        if (parallaxSection) {
            const rect = parallaxSection.getBoundingClientRect();
            // Check if parallax section is inside the viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate scroll ratio (0 to 1) when moving across the viewport
                const parallaxProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                // Translate the image up or down (offset -120px to +120px)
                const offsetVal = (parallaxProgress - 0.5) * -120;
                parallaxSection.style.setProperty('--parallax-offset', `${offsetVal}px`);
            }
        }
    }

    // --- Helper to switch Scroll Story states ---
    function updateStoryStep(index) {
        // Toggle image active state
        storyImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // Toggle text active state
        storyTexts.forEach((text, i) => {
            if (i === index) {
                text.classList.add('active');
            } else {
                text.classList.remove('active');
            }
        });

        // Toggle dot indicator active state
        storyDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // --- Scroll Story Indicator Navigation ---
    storyDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            measureLayout();
            // Scroll to the exact position corresponding to the step
            const targetScroll = storyTop + (index * (storyHeight / 3)) + 10;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });

    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // Run initial scroll function to sync animations on load
    updateScrollAnimations();

    // ============================================
    // PRELOADER LOGIC
    // ============================================
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPct = document.getElementById('preloaderPct');

    if (preloader && preloaderFill && preloaderPct) {
        let pct = 0;
        const interval = setInterval(() => {
            pct += 2;
            if (pct > 100) pct = 100;
            preloaderPct.textContent = `${pct}%`;
            preloaderFill.style.width = `${pct}%`;
            if (pct >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('done');
                    document.body.classList.remove('loading');
                }, 400);
            }
        }, 20);
    } else {
        document.body.classList.remove('loading');
    }

    // ============================================
    // TOAST NOTIFICATIONS ENGINE
    // ============================================
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'info') {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '<i class="fa-solid fa-info-circle"></i>';
        if (type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
        if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger reflow & slide-in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
    window.showToast = showToast;

    // ============================================
    // LIVE PRODUCT SEARCH & FILTERS
    // ============================================
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        let visibleCount = 0;

        productCards.forEach(card => {
            if (card === noResults) return;

            const name = card.getAttribute('data-name') || '';
            const categoryAttr = card.getAttribute('data-category') || '';

            const matchesCategory = (activeCategory === 'all' || categoryAttr.split(' ').includes(activeCategory));
            const matchesSearch = (name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                   categoryAttr.toLowerCase().includes(searchQuery.toLowerCase()));

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
                card.classList.add('active'); // Keep them visible
            } else {
                card.style.display = 'none';
            }
        });

        // Show search result counts
        if (searchResultsInfo) {
            if (searchQuery.trim() !== '') {
                searchResultsInfo.textContent = `Showing ${visibleCount} results for "${searchQuery}"`;
                searchResultsInfo.style.display = 'block';
            } else {
                searchResultsInfo.style.display = 'none';
            }
        }

        // Show "no products found" panel
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'flex';
                noResults.style.opacity = '1';
                noResults.style.pointerEvents = 'auto';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (searchClearBtn) {
                searchClearBtn.style.display = searchQuery ? 'flex' : 'none';
            }
            filterProducts();
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchQuery = '';
            }
            searchClearBtn.style.display = 'none';
            filterProducts();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            filterProducts();
        });
    });

    window.resetFilters = function() {
        if (searchInput) {
            searchInput.value = '';
            searchQuery = '';
        }
        if (searchClearBtn) searchClearBtn.style.display = 'none';

        filterBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');

        activeCategory = 'all';
        filterProducts();
    };

    // ============================================
    // QUICK VIEW MODAL
    // ============================================

    // --- Product data — 8 items covering sarees, kurtis, lehengas ---
    const products = [
        {
            name: 'Crimson Banarasi',
            category: 'Banarasi Silk',
            price: 'Rs. 1,24,000',
            badge: 'Best Seller',
            description: 'Handcrafted crimson weaves representing generations of artistry. Every motif tells a story of royal lineage, hand-loomed to perfection in Varanasi. A timeless heirloom piece worthy of every celebration.',
            images: [
                { src: 'assets/product_crimson.png',  label: 'Crimson Royal' },
                { src: 'assets/scroll_red.png',       label: 'Crimson Heritage' },
                { src: 'assets/scroll_maroon.png',    label: 'Deep Crimson' },
                { src: 'assets/scroll_gold.png',      label: 'Crimson Gold Zari' },
            ]
        },
        {
            name: 'Golden Kanjeevaram',
            category: 'Pure Kanchipuram Silk',
            price: 'Rs. 1,48,000',
            badge: 'Exclusive',
            description: 'Luminous gold tissue silk echoing the opulence of Indian architecture. A metallic glow designed to make a statement in contemporary celebrations and bridal wear.',
            images: [
                { src: 'assets/product_gold.png',     label: 'Gold Signature' },
                { src: 'assets/scroll_gold.png',      label: 'Gold Heritage' },
                { src: 'assets/product_crimson.png',  label: 'Gold-Crimson Blend' },
                { src: 'assets/product_chanderi.png', label: 'Gold Chanderi' },
            ]
        },
        {
            name: 'Royal Chanderi',
            category: 'Chanderi Brocade',
            price: 'Rs. 89,000',
            badge: '',
            description: 'Deep maroon silk draping the modern woman in unmatched poise. An intersection of traditional Chanderi patterns with a fluid, lightweight modern drape. Woven by master artisans in Chanderi, M.P.',
            images: [
                { src: 'assets/product_chanderi.png', label: 'Maroon Classic' },
                { src: 'assets/scroll_maroon.png',    label: 'Maroon Heritage' },
                { src: 'assets/product_black.png',    label: 'Dark Chanderi' },
                { src: 'assets/product_crimson.png',  label: 'Crimson Chanderi' },
            ]
        },
        {
            name: 'Black Organza',
            category: 'Pure Organza Silk',
            price: 'Rs. 95,000',
            badge: 'Modern Noir',
            description: 'Sleek black organza adorned with delicate hand-embroidered gold border detailing. A minimal yet bold statement of sheer luxury and elegance designed for the confident modern woman.',
            images: [
                { src: 'assets/product_black.png',    label: 'Noir Classic' },
                { src: 'assets/scroll_black.png',     label: 'Noir Heritage' },
                { src: 'assets/product_chanderi.png', label: 'Dark Chanderi' },
                { src: 'assets/product_gold.png',     label: 'Gold Organza' },
            ]
        },
        {
            name: 'Ivory Georgette',
            category: 'Pure Georgette',
            price: 'Rs. 72,000',
            badge: 'New Arrival',
            description: 'Intricate hand-embroidered chikankari work from Lucknow on premium georgette fabric. Designed with a contemporary silhouette, perfect for elegant wear.',
            images: [
                { src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=600', label: 'Ivory Classic' },
                { src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600', label: 'Ivory Front' },
                { src: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=600', label: 'Ivory Detail' },
                { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600', label: 'Ivory Style' }
            ]
        }
    ];

    // --- DOM refs ---
    const qvOverlay   = document.getElementById('quickviewOverlay');
    const qvClose     = document.getElementById('quickviewClose');
    const qvMainImg   = document.getElementById('quickviewMainImg');
    const qvThumbs    = document.getElementById('quickviewThumbs');
    const qvBadge     = document.getElementById('quickviewBadge');
    const qvCategory  = document.getElementById('quickviewCategory');
    const qvTitle     = document.getElementById('quickviewTitle');
    const qvPrice     = document.getElementById('quickviewPrice');
    const qvDesc      = document.getElementById('quickviewDesc');
    const qvWishlist  = document.getElementById('quickviewWishlist');
    const qvAvail     = document.getElementById('quickviewAvail');

    // --- Open modal ---
    function openQuickView(index) {
        const p = products[index];
        if (!p) return;

        // Populate text
        if (qvBadge) {
            qvBadge.textContent = p.badge;
            qvBadge.style.display = p.badge ? 'inline-block' : 'none';
        }
        if (qvCategory) qvCategory.textContent = p.category;
        if (qvTitle) qvTitle.textContent = p.name;
        if (qvPrice) qvPrice.textContent = p.price;
        if (qvDesc) qvDesc.textContent = p.description;

        // Reset wishlist button
        if (qvWishlist) {
            qvWishlist.classList.remove('wishlisted');
            qvWishlist.innerHTML = '<i class="fa-regular fa-heart"></i> Add to Wishlist';
        }

        // Set main image
        if (qvMainImg) {
            qvMainImg.src = p.images[0].src;
            qvMainImg.alt = p.name;
        }

        // Build thumbnails
        if (qvThumbs) {
            qvThumbs.innerHTML = '';
            p.images.forEach((img, i) => {
                const thumb = document.createElement('div');
                thumb.className = 'quickview-thumb' + (i === 0 ? ' active' : '');
                thumb.title = img.label;
                thumb.innerHTML = `<img src="${img.src}" alt="${img.label}" loading="lazy">`;
                thumb.addEventListener('click', () => {
                    // Fade image swap
                    qvMainImg.style.opacity = '0';
                    qvMainImg.style.transform = 'scale(1.04)';
                    setTimeout(() => {
                        qvMainImg.src = img.src;
                        qvMainImg.style.opacity = '1';
                        qvMainImg.style.transform = 'scale(1)';
                    }, 200);
                    // Update active thumb
                    document.querySelectorAll('.quickview-thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                qvThumbs.appendChild(thumb);
            });
        }

        // Show overlay
        if (qvOverlay) {
            qvOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // --- Close modal ---
    function closeQuickView() {
        if (qvOverlay) {
            qvOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (qvClose) qvClose.addEventListener('click', closeQuickView);

    if (qvOverlay) {
        qvOverlay.addEventListener('click', (e) => {
            if (e.target === qvOverlay) closeQuickView();
        });
    }

    // --- Wishlist toggle ---
    if (qvWishlist) {
        qvWishlist.addEventListener('click', () => {
            const isWishlisted = qvWishlist.classList.toggle('wishlisted');
            qvWishlist.innerHTML = isWishlisted
                ? '<i class="fa-solid fa-heart"></i> Wishlisted!'
                : '<i class="fa-regular fa-heart"></i> Add to Wishlist';
        });
    }

    // --- Attach Quick View to each card button ---
    document.querySelectorAll('.btn-card-quick').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const prodIndex = parseInt(btn.getAttribute('data-product'), 10);
            if (!isNaN(prodIndex)) {
                openQuickView(prodIndex);
            }
        });
    });

    if (qvAvail) {
        qvAvail.addEventListener('click', () => {
            if (qvTitle) {
                const currentName = qvTitle.textContent;
                closeQuickView();
                window.checkAvailability(currentName);
            }
        });
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.getElementById('scrollProgressBar');

    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorRing = document.getElementById('cursorRing');
    const cursorDot  = document.getElementById('cursorDot');

    if (cursorRing && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = -100, mouseY = -100;
        let ringX  = -100, ringY  = -100;
        let rafId  = null;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
            if (!rafId) {
                rafId = requestAnimationFrame(animateRing);
            }
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
            rafId = null;
            if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
                rafId = requestAnimationFrame(animateRing);
            }
        }

        // Hover state on interactive elements
        function rebindCursorHover() {
            const interactables = document.querySelectorAll('a, button, [role="button"], .dot, .draping-img-card, .product-card, .quickview-thumb');
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', addHoverClass);
                el.removeEventListener('mouseleave', removeHoverClass);
                el.addEventListener('mouseenter', addHoverClass);
                el.addEventListener('mouseleave', removeHoverClass);
            });
        }
        
        function addHoverClass() { cursorRing.classList.add('hovering'); }
        function removeHoverClass() { cursorRing.classList.remove('hovering'); }
        
        rebindCursorHover();
        
        // Check for DOM changes to rebind new elements
        const observer = new MutationObserver(rebindCursorHover);
        observer.observe(document.body, { childList: true, subtree: true });

        // Click state
        document.addEventListener('mousedown', () => {
            cursorRing.classList.add('clicking');
            cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(0.6)`;
        });
        document.addEventListener('mouseup', () => {
            cursorRing.classList.remove('clicking');
            cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(1)`;
        });

        document.addEventListener('mouseleave', () => {
            cursorRing.style.opacity = '0';
            cursorDot.style.opacity  = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorRing.style.opacity = '1';
            cursorDot.style.opacity  = '1';
        });
    } else if (cursorRing && cursorDot) {
        cursorRing.style.display = 'none';
        cursorDot.style.display  = 'none';
    }

    // ============================================
    // DRAPING POPUP MODAL
    // ============================================

    const drapeData = [
        {
            num:      '01',
            name:     'Classic Nivi',
            tagline:  'Traditional Elegance',
            occasion: 'Weddings',
            level:    'Beginner',
            levelKey: 'easy',
            img:      'assets/product_crimson.png',
            steps: [
                'Tuck the plain end of the saree into the petticoat, going around once.',
                'Make 5–7 neat pleats (each ~5 inches wide) and tuck them at the navel.',
                'Bring the remaining fabric around the back and drape over the left shoulder.',
                'Spread the pallu neatly over the shoulder and secure with a pin at the blouse.'
            ],
            tip: 'Best with: Banarasi & Kanjivaram silk'
        },
        {
            num:      '02',
            name:     'Modern Belted',
            tagline:  'Contemporary Fusion',
            occasion: 'Parties',
            level:    'Beginner',
            levelKey: 'easy',
            img:      'assets/product_gold.png',
            steps: [
                'Drape the Classic Nivi style first (see Style 01).',
                'Instead of tucking the pleats tightly, let them fall loosely and naturally.',
                'Cinch a statement belt at the waist over the saree to define the silhouette.',
                'Style the pallu as a half-drape over one shoulder, allowing it to flow freely.'
            ],
            tip: 'Best with: Georgette & Chiffon sarees'
        },
        {
            num:      '03',
            name:     'Lehenga Style',
            tagline:  'Bridal Grandeur',
            occasion: 'Bridal',
            level:    'Intermediate',
            levelKey: 'medium',
            img:      'assets/scroll_red.png',
            steps: [
                'Tuck the plain end fully into the petticoat all the way around.',
                'Make tight, even pleats and spread them like a lehenga skirt for maximum volume.',
                'Bring the remaining fabric to the front and drape it as a dupatta-style pallu.',
                'Pin at the shoulder and let it flow freely — like a bridal dupatta trailing behind.'
            ],
            tip: 'Best with: Heavy Banarasi & Chanderi sarees'
        },
        {
            num:      '04',
            name:     'Dhoti Pants',
            tagline:  'Bold & Edgy',
            occasion: 'Fashion Events',
            level:    'Advanced',
            levelKey: 'hard',
            img:      'assets/product_black.png',
            steps: [
                'Tuck the center of the saree at the back waist, bringing both free ends to the front.',
                'Cross both ends between the legs and tuck each end firmly at the back.',
                'Adjust the fabric evenly on both sides to create a clean dhoti-pant silhouette.',
                'Use the remaining fabric as a draped top or loop it over the shoulder as a pallu.'
            ],
            tip: 'Best with: Lightweight organza & georgette sarees'
        },
        {
            num:      '05',
            name:     'Gown Style',
            tagline:  'Red Carpet Ready',
            occasion: 'Galas',
            level:    'Intermediate',
            levelKey: 'medium',
            img:      'assets/product_chanderi.png',
            steps: [
                'Stitch or pin the saree at the waist all around to form a full flowing skirt.',
                'Bring the remaining fabric upward and drape it over one shoulder only.',
                'Let the pallu fall in a long trailing train behind you for dramatic effect.',
                'Secure at the shoulder with a decorative brooch or pin to keep it in place.'
            ],
            tip: 'Best with: Sheer organza & net sarees'
        },
        {
            num:      '06',
            name:     'Cape Style',
            tagline:  'Modern Royalty',
            occasion: 'Receptions',
            level:    'Intermediate',
            levelKey: 'medium',
            img:      'assets/scroll_maroon.png',
            steps: [
                'Begin with the Classic Nivi drape, tucking the pleats neatly.',
                'Instead of placing the pallu on one shoulder, spread the fabric across both shoulders.',
                'Pin the fabric securely at both shoulders so it falls behind you like a cape.',
                'Let the cape trail elegantly — avoid pinning the back end to keep it flowing.'
            ],
            tip: 'Best with: Tissue silk & Banarasi sarees'
        }
    ];

    const drapeOverlay  = document.getElementById('drapePopupOverlay');
    const drapeClose    = document.getElementById('drapePopupOverlay') ? document.getElementById('drapePopupClose') : null;
    const drapeImg      = document.getElementById('drapePopupImg');
    const drapeNum      = document.getElementById('drapePopupNum');
    const drapeTitle    = document.getElementById('drapePopupTitle');
    const drapeTagline  = document.getElementById('drapePopupTagline');
    const drapeMeta     = document.getElementById('drapePopupMeta');
    const drapeSteps    = document.getElementById('drapePopupSteps');
    const drapeTip      = document.getElementById('drapePopupTip');

    function openDrapePopup(index) {
        const d = drapeData[index];
        if (!d || !drapeOverlay) return;

        // Populate content
        if (drapeImg) {
            drapeImg.src = d.img;
            drapeImg.alt = d.name;
        }
        if (drapeNum) drapeNum.textContent = d.num;
        if (drapeTitle) drapeTitle.textContent = d.name;
        if (drapeTagline) drapeTagline.textContent = d.tagline;

        // Build meta badges
        if (drapeMeta) {
            drapeMeta.innerHTML = `
                <span class="meta-badge occasion">${d.occasion}</span>
                <span class="meta-badge level-${d.levelKey}">${d.level}</span>
            `;
        }

        // Build steps list
        if (drapeSteps) {
            drapeSteps.innerHTML = d.steps
                .map(step => `<li>${step}</li>`)
                .join('');
        }

        // Tip
        if (drapeTip) drapeTip.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${d.tip}`;

        drapeOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrapePopup() {
        if (!drapeOverlay) return;
        drapeOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (drapeClose) drapeClose.addEventListener('click', closeDrapePopup);

    if (drapeOverlay) {
        drapeOverlay.addEventListener('click', (e) => {
            if (e.target === drapeOverlay) closeDrapePopup();
        });
    }

    // Attach to each "View Steps" button in draping image grid
    document.querySelectorAll('.btn-drape-view').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDrapePopup(index);
        });
    });

    // Also clicking the card itself opens popup
    document.querySelectorAll('.draping-img-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openDrapePopup(index);
        });
    });

    // ============================================
    // CLIENT INTERACTION CHAT SIMULATION
    // ============================================
    const chatWidget = document.getElementById('chatWidget');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatPanel = document.getElementById('chatPanel');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatTextInput = document.getElementById('chatTextInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatImageInput = document.getElementById('chatImageInput');
    const chatNotifyBadge = document.getElementById('chatNotifyBadge');
    const cartBadge = document.getElementById('cartBadge');

    let isChatOpen = false;
    let cartCount = 0;

    function toggleChat(forceOpen = null) {
        isChatOpen = (forceOpen !== null) ? forceOpen : !isChatOpen;

        if (isChatOpen) {
            chatPanel.classList.add('active');
            chatWidget.classList.add('active');

            const openIcon = chatToggleBtn.querySelector('.chat-icon-open');
            const closeIcon = chatToggleBtn.querySelector('.chat-icon-close');
            if (openIcon) openIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'block';

            if (chatNotifyBadge) chatNotifyBadge.style.display = 'none';

            scrollToBottom();
            if (chatTextInput) setTimeout(() => chatTextInput.focus(), 300);
        } else {
            chatPanel.classList.remove('active');
            chatWidget.classList.remove('active');

            const openIcon = chatToggleBtn.querySelector('.chat-icon-open');
            const closeIcon = chatToggleBtn.querySelector('.chat-icon-close');
            if (openIcon) openIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        }
    }

    if (chatToggleBtn) chatToggleBtn.addEventListener('click', () => toggleChat());
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => toggleChat(false));

    window.openChat = function() {
        toggleChat(true);
    };

    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function appendMessage(text, sender = 'user', isImage = false) {
        if (!chatMessages) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isImage) {
            bubble.innerHTML = `
                <img src="${text}" alt="Shared Saree Reference" style="max-width:100%; border-radius:8px; display:block; margin-bottom:4px;">
                <span class="bubble-time">${timeStr}</span>
            `;
        } else {
            bubble.innerHTML = `
                <span>${text}</span>
                <span class="bubble-time">${timeStr}</span>
            `;
        }

        chatMessages.appendChild(bubble);
        scrollToBottom();
    }

    function showTypingIndicator() {
        if (!chatMessages) return;
        hideTypingIndicator(); // clear existing

        const typingBubble = document.createElement('div');
        typingBubble.className = 'typing-indicator';
        typingBubble.id = 'chatTypingIndicator';
        typingBubble.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingBubble);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const ind = document.getElementById('chatTypingIndicator');
        if (ind) ind.remove();
    }

    function triggerSellerResponse(userMsg) {
        showTypingIndicator();
        const query = userMsg.toLowerCase();
        let replyText = "Namaste! Thank you for choosing VANYA. A stylist is reviewing your design reference. For quick support, you can also connect on +91 98765 43210.";

        if (query.includes('available') || query.includes('availability') || query.includes('stock')) {
            replyText = "Yes, this design is currently available! Our collection is crafted in limited numbers, so if you are planning to purchase it, we can book it or hold it for you. Would you like to check out?";
        } else if (query.includes('price') || query.includes('cost') || query.includes('how much') || query.includes('pricing')) {
            replyText = "Our luxury sarees range from Rs. 89,000 to Rs. 1,48,000 depending on the level of zari weave (such as pure silver or gold thread). Kurtis start at Rs. 28,500. Let us know which one captures your eye!";
        } else if (query.includes('delivery') || query.includes('ship') || query.includes('shipping')) {
            replyText = "We provide complimentary white-glove insured delivery across India within 3-5 business days. International shipping is also available and takes about 7-10 days.";
        } else if (query.includes('appointment') || query.includes('store') || query.includes('visit') || query.includes('where to buy') || query.includes('location')) {
            replyText = "We would love to invite you to our boutique! We are located at 24-B Janpath Market, Connaught Place, New Delhi. You can visit us from 10:00 AM to 8:00 PM. Contact us at +91 98765 43210 to book a private showing.";
        } else if (query.includes('discount') || query.includes('offer') || query.includes('sale')) {
            replyText = "To maintain our support for our multi-generational artisans and ensure fair wages, VANYA sarees are priced at fixed, honest artisan rates. However, we do offer exclusive previews for new collections to our subscribers!";
        }

        setTimeout(() => {
            hideTypingIndicator();
            appendMessage(replyText, 'seller');

            if (!isChatOpen) {
                if (chatNotifyBadge) {
                    chatNotifyBadge.textContent = '1';
                    chatNotifyBadge.style.display = 'flex';
                }
                showToast('New message from VANYA Concierge', 'info');
            }
        }, 1500);
    }

    function handleChatSend() {
        if (!chatTextInput) return;
        const msg = chatTextInput.value.trim();
        if (!msg) return;

        chatTextInput.value = '';
        appendMessage(msg, 'user');
        triggerSellerResponse(msg);
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', handleChatSend);
    if (chatTextInput) {
        chatTextInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleChatSend();
        });
    }

    window.sendQuickReply = function(text) {
        appendMessage(text, 'user');
        triggerSellerResponse(text);
    };

    if (chatImageInput) {
        chatImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(evt) {
                appendMessage(evt.target.result, 'user', true);
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    appendMessage("Thank you for sharing this image! That is an exquisite reference. We can handloom a custom pattern inspired by this design. Please let us know your shade preference.", 'seller');
                }, 1800);
            };
            reader.readAsDataURL(file);
            chatImageInput.value = '';
        });
    }

    // ============================================
    // GLOBAL PRODUCT ACTIONS
    // ============================================
    window.checkAvailability = function(sareeName) {
        toggleChat(true);
        appendMessage(`🔍 Checking availability for <strong>${sareeName}</strong>`, 'user');
        
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            appendMessage(`Yes, the <strong>${sareeName}</strong> is available! It is a pure handcrafted piece with certified silk quality. Would you like us to place an order or schedule a boutique visit?`, 'seller');
            showToast(`Checked availability for ${sareeName}`, 'success');
        }, 1200);
    };

    window.contactSeller = function(sareeName) {
        toggleChat(true);
        appendMessage(`Namaste, I want to inquire about the <strong>${sareeName}</strong>. Please share details.`, 'user');
        
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            appendMessage(`Namaste! The <strong>${sareeName}</strong> is crafted from organic threads and takes 45 days of artisan loom time. We can modify borders or customize the blouse sizing. You can also message our direct desk at +91 98765 43210.`, 'seller');
            showToast(`Inquired about ${sareeName}`, 'success');
        }, 1200);
    };

    window.addToCart = function(sareeName) {
        cartCount++;
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = 'flex';
            cartBadge.classList.add('bounce');
            setTimeout(() => cartBadge.classList.remove('bounce'), 300);
        }
        showToast(`"${sareeName}" added to your bag.`, 'success');
    };

    // Escape key closes either modal or chat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuickView();
            closeDrapePopup();
            toggleChat(false);
        }
    });

});
