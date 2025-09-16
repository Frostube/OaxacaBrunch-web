// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Intersection Observer for advanced animations
const observerOptions = {
    threshold: [0.1, 0.3, 0.5],
    rootMargin: '0px 0px -10% 0px'
};

const animationTypes = [
    'fade-in-up', 'fade-in-left', 'fade-in-right', 
    'slide-in-scale', 'bounce-in'
];

// Performance-optimized animation observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            const element = entry.target;
            
            // Add appropriate animation class based on element type and position
            if (element.classList.contains('menu-grid')) {
                element.classList.add('stagger-animation', 'animate');
            } else if (element.classList.contains('story-image')) {
                element.classList.add('fade-in-left');
            } else if (element.classList.contains('story-text')) {
                element.classList.add('fade-in-right');
            } else if (element.classList.contains('review-card')) {
                // Skip animation here - will be handled by initGentleReviewAnimations
            } else {
                element.classList.add('fade-in-up');
            }
            
            // Unobserve after animation to optimize performance
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Parallax effect removed per user request

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMenuFilters();
    initGallery();
    initLanguageToggle();
    initSmoothScroll();
    initAnimations();
    initCurrentTime();
    initMicroInteractions();
    initAdvancedScrollEffects();
    initVideoPlayer();
    
    // Initialize gentle review animations
    if (typeof initGentleReviewAnimations === 'function') {
        initGentleReviewAnimations();
    }
    
    // Performance: Preload critical images
    preloadCriticalImages();
    
    // Add loading animation
    addLoadingAnimations();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Sticky navbar with scroll effect
    const handleScroll = debounce(() => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        let isMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu visibility
            navLinks.classList.toggle('active', isMenuOpen);
            mobileMenuBtn.classList.toggle('active', isMenuOpen);
            
            // Update ARIA attributes
            mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen.toString());
            
            // Prevent body scroll when menu is open
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking nav links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navbar.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Close menu on window resize (if desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        function closeMenu() {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
}

// ===== MENU FILTERS =====
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter menu items with animation
            menuItems.forEach(item => {
                const tags = item.dataset.tags;
                const shouldShow = filter === 'all' || tags.includes(filter);
                
                if (shouldShow) {
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    item.offsetHeight;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

// ===== 3D CAROUSEL GALLERY =====
function initGallery() {
    const carouselContainer = document.getElementById('gallery-carousel');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    
    if (!carouselContainer || !carouselTrack || !carouselItems.length) return;
    
    // Carousel configuration
    const DRAG_BUFFER = 0;
    const VELOCITY_THRESHOLD = 5000;
    const GAP = 16;
    const AUTOPLAY_DELAY = 8000;
    
    let currentIndex = 0;
    let currentImageIndex = 0;
    let itemWidth = 368;
    let trackItemOffset = itemWidth + GAP;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTransform = 0;
    let autoplayTimer = null;
    let isHovered = false;
    
    // Calculate responsive sizes
    function calculateSizes() {
        const containerWidth = carouselContainer.offsetWidth - 32; // Account for padding
        
        if (window.innerWidth >= 1024) {
            itemWidth = 568;
        } else if (window.innerWidth >= 768) {
            itemWidth = 468;
        } else {
            // Mobile: ensure items fit properly and are centered
            itemWidth = Math.min(containerWidth, 340);
        }
        
        trackItemOffset = itemWidth + GAP;
        
        // Update item widths
        carouselItems.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });
    }
    
    // Update carousel position with 3D transforms
    function updateCarouselPosition(smooth = true) {
        let translateX = -(currentIndex * trackItemOffset);
        
        // On mobile, add centering offset
        if (window.innerWidth < 768) {
            const containerWidth = carouselContainer.offsetWidth - 32; // Account for padding
            const centerOffset = (containerWidth - itemWidth) / 2;
            translateX += centerOffset;
        }
        
        if (smooth) {
            carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            carouselTrack.style.transition = 'none';
        }
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Apply 3D rotation to items
        carouselItems.forEach((item, index) => {
            const offset = index - currentIndex;
            const rotateY = offset * 15; // 15 degrees per step
            const scale = Math.max(0.8, 1 - Math.abs(offset) * 0.1);
            const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.3);
            
            item.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = Math.max(1, 10 - Math.abs(offset));
        });
        
        updateIndicators();
    }
    
    // Create and update indicators
    function createIndicators() {
        if (!indicatorsContainer) return;
        
        indicatorsContainer.innerHTML = '';
        
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        updateIndicators();
    }
    
    function updateIndicators() {
        const indicators = indicatorsContainer?.querySelectorAll('.carousel-indicator');
        if (!indicators) return;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navigation functions
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(carouselItems.length - 1, index));
        updateCarouselPosition();
        // resetAutoplay(); // Disabled with autoplay
    }
    
    function nextSlide() {
        const nextIndex = currentIndex >= carouselItems.length - 1 ? 0 : currentIndex + 1;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = currentIndex <= 0 ? carouselItems.length - 1 : currentIndex - 1;
        goToSlide(prevIndex);
    }
    
    // Touch and drag handling
    function handleStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        currentX = startX;
        
        const currentTransform = carouselTrack.style.transform;
        const match = currentTransform.match(/translateX\((.+?)px\)/);
        initialTransform = match ? parseFloat(match[1]) : 0;
        
        carouselTrack.style.transition = 'none';
        carouselTrack.style.cursor = 'grabbing';
        
        // iOS Safari touch optimization
        if (e.type === 'touchstart') {
            // Prevent default iOS scroll behavior during drag
            e.preventDefault();
        }
        
        // pauseAutoplay(); // Disabled with autoplay
    }
    
    function handleMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = currentX - startX;
        const newTransform = initialTransform + deltaX;
        
        carouselTrack.style.transform = `translateX(${newTransform}px)`;
    }
    
    function handleEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
        
        const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const velocity = Math.abs(deltaX) / (Date.now() - startTime);
        
        if (Math.abs(deltaX) > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD / 1000) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            updateCarouselPosition();
        }
        
        // resumeAutoplay(); // Disabled with autoplay
    }
    
    let startTime = Date.now();
    
    // Event listeners for drag functionality
    carouselTrack.addEventListener('mousedown', (e) => {
        startTime = Date.now();
        handleStart(e);
    });
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startTime = Date.now();
        handleStart(e);
    }, { passive: false }); // Changed to false to allow preventDefault for iOS
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    
    // Autoplay functionality
    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
    
    function pauseAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    function resumeAutoplay() {
        if (!isHovered) {
            startAutoplay();
        }
    }
    
    function resetAutoplay() {
        pauseAutoplay();
        resumeAutoplay();
    }
    
    // Hover pause functionality (disabled with autoplay)
    // carouselContainer.addEventListener('mouseenter', () => {
    //     isHovered = true;
    //     pauseAutoplay();
    // });
    
    // carouselContainer.addEventListener('mouseleave', () => {
    //     isHovered = false;
    //     resumeAutoplay();
    // });
    
    // Lightbox functionality for images
    carouselItems.forEach((item, index) => {
        const img = item.querySelector('img');
        
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    function openLightbox(src, alt) {
        if (!lightbox) return;
        
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxClose.focus();
        
        document.body.style.overflow = 'hidden';
        // pauseAutoplay(); // Disabled with autoplay
        
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
    
    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            // resumeAutoplay(); // Disabled with autoplay
        }, 200);
    }
    
    function showNextLightboxImage() {
        currentImageIndex = (currentImageIndex + 1) % carouselItems.length;
        const nextImg = carouselItems[currentImageIndex].querySelector('img');
        lightboxImg.src = nextImg.src;
        lightboxImg.alt = nextImg.alt;
    }
    
    function showPrevLightboxImage() {
        currentImageIndex = (currentImageIndex - 1 + carouselItems.length) % carouselItems.length;
        const prevImg = carouselItems[currentImageIndex].querySelector('img');
        lightboxImg.src = prevImg.src;
        lightboxImg.alt = prevImg.alt;
    }
    
    // Lightbox event listeners
    if (lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxBackdrop.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextLightboxImage);
        lightboxPrev.addEventListener('click', showPrevLightboxImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    showNextLightboxImage();
                    break;
                case 'ArrowLeft':
                    showPrevLightboxImage();
                    break;
            }
        } else {
            // Carousel keyboard navigation
            switch (e.key) {
                case 'ArrowRight':
                    if (e.target.closest('.carousel-container')) {
                        e.preventDefault();
                        nextSlide();
                    }
                    break;
                case 'ArrowLeft':
                    if (e.target.closest('.carousel-container')) {
                        e.preventDefault();
                        prevSlide();
                    }
                    break;
            }
        }
    });
    
    // Initialize
    calculateSizes();
    createIndicators();
    updateCarouselPosition(false);
    // startAutoplay(); // Disabled
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        calculateSizes();
        updateCarouselPosition(false);
    }, 250));
}

// ===== LANGUAGE TOGGLE =====
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Store preference
            localStorage.setItem('preferredLanguage', lang);
            
            // In a real app, this would trigger content translation
            console.log(`Language changed to: ${lang}`);
            
            // Show feedback
            showToast(`Idioma cambiado a ${lang === 'es' ? 'Español' : 'Català'}`);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        const targetBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (targetBtn) {
            langBtns.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
        }
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Only add smooth scroll if user hasn't set reduce motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Only animate if user hasn't set reduce motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const animatedElements = document.querySelectorAll(
            '.section-header, .menu-item, .menu-grid, .story-content, .story-image, .story-text, .hours-card, .gallery-header, .value-card'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== MICRO INTERACTIONS =====
function initMicroInteractions() {
    // Add subtle hover effects to all interactive elements
    const buttons = document.querySelectorAll('button, .btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Add floating elements animation
    initFloatingElements();
}

// ===== ADVANCED SCROLL EFFECTS =====
function initAdvancedScrollEffects() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const navbar = document.querySelector('.navbar');
        const menuSection = document.querySelector('.menu-teaser');
        
        // Enhanced navbar and menu scroll behavior
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateScrollEffects = () => {
            const currentScrollY = window.scrollY;
            
            // Navbar scroll behavior with iOS Safari support
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Scrolling down - hide navbar
                navbar.style.webkitTransform = 'translateY(-100%)';
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.webkitTransform = 'translateY(0)';
                navbar.style.transform = 'translateY(0)';
            }
            
            // Menu 3D effect
            if (menuSection && currentScrollY > 50) {
                menuSection.classList.add('scrolled');
            } else if (menuSection) {
                menuSection.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        // iOS Safari scroll optimization
        window.addEventListener('scroll', onScroll, { 
            passive: true,
            capture: false
        });
    }
}

// ===== VIDEO PLAYER =====
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-player video');
    const playButtonContainer = document.querySelector('.play-button-container');
    
    if (playButton && video) {
        // iOS Safari specific video setup
        video.setAttribute('playsinline', 'true'); // Prevent fullscreen on iOS
        video.setAttribute('webkit-playsinline', 'true'); // Legacy iOS support
        
        playButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (video.paused) {
                // iOS Safari requires user interaction for video play
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        playButtonContainer.style.opacity = '0';
                    }).catch(error => {
                        console.warn('Auto-play prevented:', error);
                        // Fallback: show play button again
                        playButtonContainer.style.opacity = '1';
                    });
                } else {
                    // Older browsers
                    try {
                        video.play();
                        playButtonContainer.style.opacity = '0';
                    } catch (error) {
                        console.warn('Video play failed:', error);
                    }
                }
            } else {
                video.pause();
                playButtonContainer.style.opacity = '1';
            }
        });
        
        // Show controls when video ends
        video.addEventListener('ended', () => {
            playButtonContainer.style.opacity = '1';
        });
        
        // Hide controls when playing
        video.addEventListener('play', () => {
            playButtonContainer.style.opacity = '0';
        });
        
        // Show controls when paused
        video.addEventListener('pause', () => {
            playButtonContainer.style.opacity = '1';
        });
        
        // iOS Safari specific event listeners
        video.addEventListener('loadstart', () => {
            // Ensure video is ready for iOS
            video.load();
        });
        
        // Handle iOS Safari video loading issues
        video.addEventListener('canplaythrough', () => {
            video.setAttribute('data-ready', 'true');
        });
    }
}

// ===== LOADING ANIMATIONS =====
function addLoadingAnimations() {
    // Add initial loading state
    document.body.classList.add('loading');
    
    // Remove loading state after content is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Trigger hero animation
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('slide-in-scale');
            }
        }, 100);
    });
}

// ===== RIPPLE EFFECT =====
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.gallery-slide, .menu-item');
    
    floatingElements.forEach((element, index) => {
        // Add subtle floating animation with different delays
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('floating-element');
    });
}

// ===== CURRENT TIME & HOURS =====
function initCurrentTime() {
    updateCurrentDay();
    
    // Update every minute
    setInterval(updateCurrentDay, 60000);
}

function updateCurrentDay() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Remove all current-day classes
    document.querySelectorAll('.hours-item').forEach(item => {
        item.classList.remove('current-day');
    });
    
    // Add current-day class to today's hours
    const isWeekend = currentDay === 0 || currentDay === 6; // Sunday or Saturday
    const hoursItems = document.querySelectorAll('.hours-item');
    
    if (hoursItems.length >= 2) {
        if (isWeekend && hoursItems[1]) {
            hoursItems[1].classList.add('current-day');
            updateOpenStatus(hoursItems[1], currentHour, currentMinute, 9, 17);
        } else if (!isWeekend && hoursItems[0]) {
            hoursItems[0].classList.add('current-day');
            updateOpenStatus(hoursItems[0], currentHour, currentMinute, 8, 16);
        }
    }
}

function updateOpenStatus(element, currentHour, currentMinute, openHour, closeHour) {
    const statusElement = element.querySelector('.status');
    if (!statusElement) return;
    
    const currentTime = currentHour + (currentMinute / 60);
    const isOpen = currentTime >= openHour && currentTime < closeHour;
    
    if (isOpen) {
        statusElement.textContent = 'Abierto ahora';
        statusElement.style.color = 'var(--accent-2)';
    } else {
        if (currentTime < openHour) {
            const hoursUntilOpen = Math.ceil(openHour - currentTime);
            statusElement.textContent = `Abre en ${hoursUntilOpen}h`;
        } else {
            statusElement.textContent = 'Cerrado';
        }
        statusElement.style.color = 'var(--muted)';
    }
}

// ===== UTILITY FUNCTIONS =====
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--accent);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.style.opacity = '1', 10);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== PERFORMANCE MONITORING =====
// Log Core Web Vitals (for development)
if (typeof window !== 'undefined' && window.performance) {
    window.addEventListener('load', () => {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            // Only log CLS if it's above the good threshold (0.1)
            if (clsValue > 0.1) {
                console.warn('CLS (needs improvement):', clsValue);
            } else if (clsValue > 0) {
                console.log('CLS (good):', clsValue);
            }
        }).observe({entryTypes: ['layout-shift']});
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.querySelector('.skip-link')) {
        e.preventDefault();
        document.getElementById('main').focus();
    }
});

// High contrast mode detection
if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
}

// Reduced motion preference
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== SERVICE WORKER REGISTRATION (for PWA features) =====
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
