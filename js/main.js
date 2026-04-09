/**
 * Main Initialization and Logic for IronEdge Gym
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Components Dynamically
    await loadComponent('navbar-placeholder', 'components/navbar.html');
    await loadComponent('footer-placeholder', 'components/footer.html');
    await loadComponent('modal-placeholder', 'components/modals.html');

    // 2. Initialize Animations (Lenis, GSAP, Preloader)
    initAnimations();

    // 3. Initialize Sliders
    initSlider();

    // 4. Initialize Tabs Logic
    initTabs();

    // 5. Initialize Counters
    initCounters();
});

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger a small GSAP animation on tab change
                gsap.fromTo(targetContent, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    // Use Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2; // seconds
                
                gsap.to(counter, {
                    innerHTML: target,
                    duration: duration,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                    }
                });
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}
