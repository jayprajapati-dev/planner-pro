document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    const initializeAnimations = () => {
        const animatedElements = document.querySelectorAll('.fade-in-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.style.transitionDelay = `${Math.random() * 0.5}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    };

    // Parallax Effect for Hero Section
    const initParallax = () => {
        const hero = document.querySelector('.hero-section');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    };

    // Smooth Scroll with Progress Indicator
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                // Create progress indicator
                const progress = document.createElement('div');
                progress.className = 'scroll-progress';
                document.body.appendChild(progress);

                const start = window.pageYOffset;
                const end = target.offsetTop;
                const duration = 1000;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    const easeInOutCubic = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                    window.scrollTo(0, start + (end - start) * easeInOutCubic);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        document.body.removeChild(progress);
                    }
                }

                requestAnimationFrame(animation);
            });
        });
    };

    // Interactive Feature Cards
    const initFeatureCards = () => {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };

    // Floating Animation for Hero Image
    const initFloatingAnimation = () => {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const moveX = (clientX - innerWidth / 2) / 50;
                const moveY = (clientY - innerHeight / 2) / 50;
                
                heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
    };

    // WhatsApp Button Animation
    const initWhatsAppButton = () => {
        const whatsappButtons = document.querySelectorAll('.whatsapp-share, .cta-button');
        whatsappButtons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.transform = 'translateY(-5px) scale(1.05)';
                button.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.3)';
            });

            button.addEventListener('mouseout', () => {
                button.style.transform = 'translateY(0) scale(1)';
                button.style.boxShadow = 'none';
            });

            button.addEventListener('click', () => {
                const message = encodeURIComponent('Check out this amazing Multiple Planner Bundle - 8 Premium Planners for just ₹99!');
                window.open(`https://wa.me/919427415370?text=${message}`, '_blank');
            });
        });
    };

    // Pricing Card Animation
    const initPricingAnimation = () => {
        const pricingCard = document.querySelector('.pricing-card');
        if (pricingCard) {
            pricingCard.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = pricingCard.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;

                const shine = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.2), transparent)`;
                pricingCard.style.backgroundImage = `linear-gradient(135deg, var(--primary-color), var(--secondary-color)), ${shine}`;
            });
        }
    };

    // Limited Offer Timer
    const initOfferTimer = () => {
        const timerElement = document.getElementById('offerTimer');
        if (!timerElement) return;

        // Set end time to 24 hours from now
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);

        const updateTimer = () => {
            const now = new Date();
            const timeDiff = endTime - now;

            if (timeDiff <= 0) {
                timerElement.innerHTML = "Offer Ended!";
                return;
            }

            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            timerElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        };

        // Update timer immediately and then every second
        updateTimer();
        setInterval(updateTimer, 1000);
    };

    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;

    // Optimize animations for mobile
    if (isMobile) {
        // Disable intensive animations on mobile
        const initFeatureCardsMobile = () => {
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach(card => {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'scale(0.98)';
                });
                card.addEventListener('touchend', () => {
                    card.style.transform = 'scale(1)';
                });
            });
        };

        // Simplified floating animation for mobile
        const initFloatingAnimationMobile = () => {
            const heroImage = document.querySelector('.hero-image img');
            if (heroImage) {
                heroImage.style.animation = 'float 3s ease-in-out infinite';
            }
        };

        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Handle scroll events here
                    ticking = false;
                });
                ticking = true;
            }
        });

        initFeatureCardsMobile();
        initFloatingAnimationMobile();
    } else {
        initFeatureCards();
        initFloatingAnimation();
    }

    // Enhanced Mobile Menu Toggle
    const initMobileMenu = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links a');
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        const toggleMenu = () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
            overlay.style.display = nav.classList.contains('nav-active') ? 'block' : 'none';
        };

        burger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
                overlay.style.display = 'none';
            });
        });
    };

    // Initialize all animations
    initializeAnimations();
    initParallax();
    initSmoothScroll();
    initWhatsAppButton();
    initPricingAnimation();
    initOfferTimer();
    initMobileMenu();
});
