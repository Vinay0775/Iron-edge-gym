/**
 * Form and Modal Logic
 */

function initModalEvents() {
    const modal = document.getElementById('lead-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const form = document.getElementById('lead-form');

    if (!modal) return;

    function closeModal() {
        modal.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerHTML = 'Processing...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                btn.innerHTML = 'Success! We will contact you.';
                btn.style.backgroundColor = '#00c853';

                setTimeout(() => {
                    closeModal();
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Exit Intent Logic
    let exitIntentTriggered = false;
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 50 && !exitIntentTriggered && !modal.classList.contains('active')) {
            exitIntentTriggered = true;
            window.openModal();
        }
    });
}
