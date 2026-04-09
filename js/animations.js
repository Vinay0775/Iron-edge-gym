/**
 * GSAP & Lenis Animations
 */

function initAnimations() {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Preloader Animation
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    
    if (preloader && loaderBar) {
        // Simulate loading time
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) progress = 100;
            
            loaderBar.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    gsap.to(preloader, {
                        y: '-100%',
                        duration: 1,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            preloader.style.display = 'none';
                            playHeroAnimations();
                        }
                    });
                }, 500);
            }
        }, 100);
    } else {
        playHeroAnimations();
    }

    // 3. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        // Add hover effect for interactive elements
        const iteractiveElements = document.querySelectorAll('a, button, .interactive-element');
        iteractiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // 4. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // 5. ScrollTrigger Animations
    initScrollTriggers();
}

function playHeroAnimations() {
    // Reveal hero text
    const words = document.querySelectorAll('.reveal-text .word');
    if (words.length > 0) {
        gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.2
        });
    }
}

function initScrollTriggers() {
    // Fade up sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Parallax Images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        gsap.fromTo(img, 
            { y: '-20%' },
            {
                y: '20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });
}
