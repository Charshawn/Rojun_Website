// ========================================
// ROJUN - Interactive Elements & Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // SMOOTH SCROLL FOR "LEARN MORE" BUTTON
    // ========================================

    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const productSection = document.getElementById('product-section');
            if (productSection) {
                productSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all spec items for animation
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach((item, index) => {
        // Stagger the animations
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // ========================================
    // ANIMATED PRODUCT SPEC LINES
    // ========================================

    const productSpecsSection = document.getElementById('product-section');

    if (productSpecsSection) {
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSpecLines();
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        lineObserver.observe(productSpecsSection);
    }

    function animateSpecLines() {
        const lines = document.querySelectorAll('.annotation-line');

        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, 300 + (index * 400));
        });
    }

    // Highlight spec items when hovering over them
    const specItemsWithLines = document.querySelectorAll('.spec-item');

    specItemsWithLines.forEach((item, index) => {
        const lineNumber = index + 1;
        const correspondingLine = document.querySelector(`.spec-line-${lineNumber}`);

        if (correspondingLine) {
            item.addEventListener('mouseenter', () => {
                correspondingLine.style.opacity = '1';
                correspondingLine.style.stroke = '#D4AF37';
                correspondingLine.style.strokeWidth = '3';
            });

            item.addEventListener('mouseleave', () => {
                correspondingLine.style.strokeWidth = '2';
            });
        }
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!email || !validateEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            // In a real implementation, you would send this to a backend server
            simulateFormSubmission(email, message);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function simulateFormSubmission(email, message) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Log to console (in production, this would be sent to your backend)
            console.log('Form submission:', { email, message });
        }, 1500);
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;

            // Auto-hide success message after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // FADE IN ELEMENTS ON SCROLL
    // ========================================

    const fadeElements = document.querySelectorAll('.comparison-card, .win-card, .customer-card, .founder-card');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });

    // ========================================
    // ANIMATE ALLOCATION BARS ON SCROLL
    // ========================================

    const allocationBars = document.querySelectorAll('.allocation-bar');

    if (allocationBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.allocation-bar');
                    bars.forEach((bar, index) => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0%';

                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200 + (index * 200));
                    });
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const capitalSection = document.querySelector('.capital-section');
        if (capitalSection) {
            barObserver.observe(capitalSection);
        }
    }

    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const statValues = document.querySelectorAll('.stat-value');

    if (statValues.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = entry.target.textContent;
                    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

                    if (!isNaN(numericValue)) {
                        const suffix = value.replace(numericValue.toString(), '');
                        entry.target.textContent = '0' + suffix;

                        setTimeout(() => {
                            let current = 0;
                            const increment = numericValue / 60;

                            const counter = setInterval(() => {
                                current += increment;
                                if (current >= numericValue) {
                                    entry.target.textContent = numericValue + suffix;
                                    clearInterval(counter);
                                } else {
                                    entry.target.textContent = Math.floor(current) + suffix;
                                }
                            }, 30);
                        }, 300);
                    }

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // ========================================
    // MOBILE MENU TOGGLE (if needed)
    // ========================================

    // Add a hamburger menu for mobile if viewport is small
    function createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');

        if (window.innerWidth <= 640 && !document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.8rem;
                cursor: pointer;
                color: var(--black);
            `;

            nav.appendChild(hamburger);

            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                if (navMenu.classList.contains('active')) {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'white';
                    navMenu.style.padding = '1rem';
                    navMenu.style.borderRadius = '10px';
                    navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'row';
                    navMenu.style.position = 'static';
                }
            });
        }
    }

    // Check on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // ========================================
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================

    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🍵 Rojun Website Loaded - The Future of Hard Tea');
});
