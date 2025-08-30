// AnimatedContent.js - Gentle GSAP ScrollTrigger Animation Component
// Based on the React component but adapted for vanilla JavaScript

class AnimatedContent {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      distance: options.distance || 100,
      direction: options.direction || "vertical",
      reverse: options.reverse || false,
      duration: options.duration || 0.8,
      ease: options.ease || "power3.out",
      initialOpacity: options.initialOpacity || 0,
      animateOpacity: options.animateOpacity !== false,
      scale: options.scale || 1,
      threshold: options.threshold || 0.1,
      delay: options.delay || 0,
      onComplete: options.onComplete
    };
    
    this.init();
  }
  
  init() {
    if (!this.element || !window.gsap || !window.ScrollTrigger) {
      console.warn('AnimatedContent: Element or GSAP/ScrollTrigger not found');
      return;
    }
    
    const { 
      distance, 
      direction, 
      reverse, 
      duration, 
      ease, 
      initialOpacity, 
      animateOpacity, 
      scale, 
      threshold, 
      delay,
      onComplete 
    } = this.options;
    
    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;
    
    // Set initial state
    gsap.set(this.element, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    });
    
    // Create animation
    gsap.to(this.element, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: this.element,
        start: `top ${startPct}%`,
        toggleActions: "play none none none",
        once: true,
      },
    });
  }
  
  destroy() {
    if (this.element && window.gsap) {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === this.element) {
          t.kill();
        }
      });
      gsap.killTweensOf(this.element);
    }
  }
}

// Helper function to create gentle animations for review cards
function initGentleReviewAnimations() {
  // Only animate if user hasn't set reduce motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const reviewCards = document.querySelectorAll('.review-card');
  
  reviewCards.forEach((card, index) => {
    new AnimatedContent(card, {
      distance: 50,           // Smaller distance for gentleness
      direction: "vertical",
      reverse: false,
      duration: 1.2,          // Longer duration for gentleness
      ease: "power3.out",     // Gentle easing
      initialOpacity: 0.2,    // Start with slight visibility
      animateOpacity: true,
      scale: 1.02,            // Very subtle scale
      threshold: 0.2,         // Trigger earlier
      delay: index * 0.15,    // Stagger the animations
    });
  });
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnimatedContent, initGentleReviewAnimations };
} else {
  window.AnimatedContent = AnimatedContent;
  window.initGentleReviewAnimations = initGentleReviewAnimations;
}
