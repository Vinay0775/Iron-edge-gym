/**
 * Utility functions for IronEdge Gym
 */

// Function to fetch and inject HTML components
async function loadComponent(elementId, filePath) {
    try {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Could not load ${filePath}`);
        
        const html = await response.text();
        element.innerHTML = html;

        // Re-initialize specific scripts if needed after loading
        if (elementId === 'navbar-placeholder') {
            initNavbar();
        } else if (elementId === 'modal-placeholder') {
            initModalEvents(); // Assuming this function is in form.js
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Navbar specific logic after injection
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-color)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }
}

// Expose openModal to global scope
window.openModal = function() {
    const modal = document.getElementById('lead-modal');
    if (modal) {
        modal.classList.add('active');
    } else {
        console.warn('Modal not loaded yet');
    }
};
