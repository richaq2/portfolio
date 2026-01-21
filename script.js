/* ============================================
   RICHA KUMARI - PORTFOLIO
   Interactive Animations & Effects
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initMagneticButtons();
    initSmoothScrolling();
    initParallaxEffects();
    initSkillOrbitHover();
    initTimelineProgress();
    initBackToTop();
    initTextSplitting();
    initSkillBars();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.querySelector('.nav-container');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect on nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link based on section
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Update active nav link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-up, .reveal-text-block, .reveal-card, ' +
        '.reveal-skill, .reveal-timeline, .reveal-project, .reveal-contact, ' +
        '.section-header'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const floatingEls = document.querySelectorAll('.float-el');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mouse parallax on hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            floatingEls.forEach((el, index) => {
                const speed = 20 + (index * 10);
                el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

/* ============================================
   SKILL ORBIT HOVER EFFECTS
   ============================================ */
function initSkillOrbitHover() {
    const skillPlanets = document.querySelectorAll('.skill-planet');
    const orbits = document.querySelectorAll('.orbit-ring');
    
    skillPlanets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            // Pause orbit animation
            orbits.forEach(orbit => {
                orbit.style.animationPlayState = 'paused';
            });
            
            // Show tooltip
            const skillName = planet.getAttribute('data-skill');
            showSkillTooltip(planet, skillName);
        });
        
        planet.addEventListener('mouseleave', () => {
            // Resume orbit animation
            orbits.forEach(orbit => {
                orbit.style.animationPlayState = 'running';
            });
            
            hideSkillTooltip();
        });
    });
    
    function showSkillTooltip(element, text) {
        let tooltip = document.querySelector('.skill-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.style.cssText = `
                position: fixed;
                padding: 8px 16px;
                background: rgba(108, 92, 231, 0.9);
                color: white;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                pointer-events: none;
                z-index: 1000;
                transform: translateX(-50%);
                white-space: nowrap;
                box-shadow: 0 4px 20px rgba(108, 92, 231, 0.4);
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 40 + 'px';
        tooltip.style.opacity = '1';
    }
    
    function hideSkillTooltip() {
        const tooltip = document.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
}

/* ============================================
   TIMELINE PROGRESS
   ============================================ */
function initTimelineProgress() {
    const timeline = document.querySelector('.timeline-container');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    if (!timeline || !timelineProgress) return;
    
    window.addEventListener('scroll', () => {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on timeline visibility
        if (rect.top < windowHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const visibleStart = Math.max(0, windowHeight - rect.top);
            const progress = Math.min(100, (visibleStart / totalHeight) * 100);
            
            timelineProgress.style.height = progress + '%';
        }
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   TEXT SPLITTING ANIMATION
   ============================================ */
function initTextSplitting() {
    const splitTexts = document.querySelectorAll('.split-text');
    
    splitTexts.forEach(text => {
        const chars = text.textContent.split('');
        text.innerHTML = chars.map((char, i) => 
            `<span style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        // Add animation class when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(text);
    });
}

/* ============================================
   GSAP-LIKE SCROLL TRIGGER (VANILLA)
   ============================================ */
class ScrollTrigger {
    constructor(options) {
        this.element = options.element;
        this.onEnter = options.onEnter || (() => {});
        this.onLeave = options.onLeave || (() => {});
        this.threshold = options.threshold || 0.2;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.onEnter(entry.target);
                } else {
                    this.onLeave(entry.target);
                }
            });
        }, { threshold: this.threshold });
        
        observer.observe(this.element);
    }
}

/* ============================================
   PROJECT CARD TILT EFFECT
   ============================================ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ============================================
   TYPING EFFECT FOR HERO
   ============================================ */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ============================================
   LOADING ANIMATION
   ============================================ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-content .reveal-up');
    heroElements.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + (i * 200));
    });
});

/* ============================================
   INTERSECTION OBSERVER FOR LAZY LOADING
   ============================================ */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================
   RIPPLE EFFECT ON BUTTONS
   ============================================ */
document.querySelectorAll('.cta-primary, .cta-main, .hire-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .split-text span {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .split-text.animate span {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-tooltip {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function initSkillBars() {
    const skillCircles = document.querySelectorAll('.skill-circle .circle-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const dashArray = circle.getAttribute('stroke-dasharray');
                // Reset and animate
                circle.style.strokeDasharray = '0, 100';
                setTimeout(() => {
                    circle.style.strokeDasharray = dashArray;
                }, 100);
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.3 });
    
    skillCircles.forEach(circle => {
        const originalDash = circle.getAttribute('stroke-dasharray');
        circle.setAttribute('data-dash', originalDash);
        circle.style.strokeDasharray = '0, 100';
        observer.observe(circle);
    });
}

console.log('✨ Portfolio loaded successfully! - Richa Kumari');
