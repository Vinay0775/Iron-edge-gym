/**
 * Before/After Slider Logic
 */

function initSlider() {
    const sliderContainer = document.querySelector('.before-after-slider');
    const sliderHandle = document.querySelector('.slider-handle');
    const imageBeforeWrapper = document.querySelector('.image-before-wrapper');

    if (!sliderContainer || !sliderHandle || !imageBeforeWrapper) return;

    let isSliding = false;

    // Desktop Events
    sliderHandle.addEventListener('mousedown', (e) => {
        isSliding = true;
        sliderContainer.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
        isSliding = false;
        sliderContainer.classList.remove('active');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        handleSliding(e.clientX);
    });

    // Mobile Events
    sliderHandle.addEventListener('touchstart', (e) => {
        isSliding = true;
        sliderContainer.classList.add('active');
    });

    window.addEventListener('touchend', () => {
        isSliding = false;
        sliderContainer.classList.remove('active');
    });

    window.addEventListener('touchmove', (e) => {
        if (!isSliding) return;
        handleSliding(e.touches[0].clientX);
    });

    function handleSliding(clientX) {
        const sliderRect = sliderContainer.getBoundingClientRect();
        
        // Calculate position percentage
        let position = ((clientX - sliderRect.left) / sliderRect.width) * 100;
        
        // Boundary checks
        if (position < 0) position = 0;
        if (position > 100) position = 100;

        // Update DOM
        sliderHandle.style.left = `${position}%`;
        imageBeforeWrapper.style.width = `${position}%`;
    }

    // Fix image-before width for responsive containers
    const imageBefore = document.querySelector('.image-before');
    function resizeImage() {
        if (imageBefore && sliderContainer) {
            imageBefore.style.width = `${sliderContainer.offsetWidth}px`;
        }
    }
    window.addEventListener('resize', resizeImage);
    resizeImage(); // Initialize
}
