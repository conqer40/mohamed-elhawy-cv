/* =========================================
   Mohamed Elhawy - Interactive CV
   Enhanced JavaScript with Bilingual Support
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initScrollReveal();
    initSmoothScroll();
    initMenu();
    initHeader();
    initFloatingTags();
    initCounterAnimation();
    initSkillBars();
    initLanguageToggle();
    initParallax();
    initTiltEffect();
    initDarkMode();
    initScrollToTop();
    initTypingAnimation();
    initCopyLink();
    initTimelineAnimation();
    initScrollProgress();
    init3DTiltEffect();
    initButtonRipple();
});

// ============================================
// Language Toggle (Arabic/English)
// ============================================
let currentLang = 'en';

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        updateLanguage();
        updateToggleButton();
    });
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-ar]');

    elements.forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            // Animate the change
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';

            setTimeout(() => {
                el.textContent = text;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200);
        }
    });

    // Update body direction for RTL
    document.body.classList.toggle('rtl', currentLang === 'ar');
    document.documentElement.setAttribute('lang', currentLang);
}

function updateToggleButton() {
    const enSpan = document.querySelector('.lang-en');
    const arSpan = document.querySelector('.lang-ar');

    if (currentLang === 'en') {
        enSpan.classList.add('active');
        arSpan.classList.remove('active');
    } else {
        arSpan.classList.add('active');
        enSpan.classList.remove('active');
    }
}

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Add transition class for smooth color change
        document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';

        // Save preference
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 400);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for children
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// ============================================
// Smooth Scroll Navigation
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // Close menu if open
                const menu = document.getElementById('fullMenu');
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Scroll to target with smooth animation
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const fullMenu = document.getElementById('fullMenu');

    if (!menuToggle || !menuClose || !fullMenu) return;

    menuToggle.addEventListener('click', () => {
        fullMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate menu links
        const menuLinks = fullMenu.querySelectorAll('.menu-link');
        menuLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(30px)';

            setTimeout(() => {
                link.style.transition = 'all 0.4s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 100 + (index * 80));
        });
    });

    menuClose.addEventListener('click', () => {
        closeMenu();
    });

    // Close menu on outside click
    fullMenu.addEventListener('click', (e) => {
        if (e.target === fullMenu) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    function closeMenu() {
        fullMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// Floating Tags Animation Enhancement
// ============================================
function initFloatingTags() {
    const tags = document.querySelectorAll('.tag');

    tags.forEach((tag, index) => {
        // Add slight random delay for more organic feel
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 3 + Math.random() * 2;

        tag.style.animationDelay = `${randomDelay}s`;
        tag.style.animationDuration = `${randomDuration}s`;

        // Add hover sound effect (optional)
        tag.addEventListener('mouseenter', () => {
            tag.style.animationPlayState = 'paused';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.animationPlayState = 'running';
        });
    });
}

// ============================================
// Counter Animation for Stats
// ============================================
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = parseInt(stat.getAttribute('data-count'));
                animateValue(stat, 0, finalValue, 2000);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (range * easeOutQuart));

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}

// ============================================
// Skill Bar Animation
// ============================================
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    skillCards.forEach(card => observer.observe(card));
}

// ============================================
// Parallax Effect
// ============================================
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const floatingStats = document.querySelectorAll('.floating-stat');
    const shapes = document.querySelectorAll('.floating-shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrolled < window.innerHeight) {
            // Hero content parallax
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
            }

            // Hero image parallax (slower)
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }

            // Floating stats parallax
            floatingStats.forEach((stat, index) => {
                const speed = 0.15 + (index * 0.05);
                stat.style.transform = `translateY(${scrolled * speed - 10}px)`;
            });

            // Background shapes parallax
            shapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}

// ============================================
// Tilt Effect for Cards
// ============================================
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// Mouse Trail Effect (Optional)
// ============================================
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(196, 93, 53, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            x += (parseFloat(nextDot.style.left) - x) * 0.3;
            y += (parseFloat(nextDot.style.top) - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// ============================================
// Magnetic Button Effect
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// Text Scramble Effect
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }

        this.el.innerText = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ============================================
// Initialize Optional Effects
// ============================================
// initMouseTrail(); // Uncomment to enable mouse trail
// initMagneticButtons(); // Uncomment to enable magnetic buttons

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero .reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (index * 150));
    });
});

// ============================================
// Resize Handler
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions or reinit effects if needed
    }, 250);
});

// ============================================
// Scroll to Top Button
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Page Preloader
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Hide preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500);
    });
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const text = typingText.getAttribute('data-en');
    let index = 0;
    typingText.textContent = '';

    function typeChar() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 30);
        }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 2000);
}

// ============================================
// Copy Link Button
// ============================================
function initCopyLink() {
    const copyBtn = document.getElementById('copyLink');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        const url = 'https://conqer40.github.io/mohamed-elhawy-cv/';

        navigator.clipboard.writeText(url).then(() => {
            copyBtn.classList.add('copied');
            const icon = copyBtn.querySelector('i');
            icon.classList.remove('fa-link');
            icon.classList.add('fa-check');

            setTimeout(() => {
                copyBtn.classList.remove('copied');
                icon.classList.remove('fa-check');
                icon.classList.add('fa-link');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
}

// ============================================
// Timeline Animation
// ============================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));
}

// ============================================
// Social Share Functions
// ============================================
function getShareUrl() {
    // Use the live site URL
    return 'https://conqer40.github.io/mohamed-elhawy-cv/';
}

function shareToLinkedIn() {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function shareToTwitter() {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent('Check out Mohamed Elhawy\'s CV - Logistics & Supply Chain Specialist');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
}

function shareToFacebook() {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareToWhatsApp() {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent('Check out Mohamed Elhawy\'s CV - Logistics & Supply Chain Specialist - ');
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
}

// ============================================
// Phase 3: New UI Effects
// ============================================

// 1. Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// 2. 3D Tilt Effect for Cards
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card, .service-card, .project-card, .hobby-card, .language-card, .testimonial-card, .experience-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// 3. Button Ripple Effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// Console Message
// ============================================
console.log('%c Mohamed Elhawy CV ', 'background: linear-gradient(135deg, #c45d35, #e87a50); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%c Built with ❤️ ', 'color: #c45d35; font-size: 12px;');
