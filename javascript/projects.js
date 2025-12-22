// 1. MINI PHOTO GALLERY SWITCHER
function switchPhoto(mainImgId, clickedThumb) {
    // Update main image
    const mainImg = document.getElementById(mainImgId);
    mainImg.src = clickedThumb.src;

    // Manage active styling
    const thumbContainer = clickedThumb.parentNode;
    const thumbs = thumbContainer.getElementsByClassName('thumb');

    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove('active');
    }
    clickedThumb.classList.add('active');
}

// 2. MAIN SLIDE MOVER (ARROWS)
function moveSlide(carouselId, direction) {
    const container = document.getElementById(carouselId);
    const slides = container.querySelectorAll('.project-slide');
    const dots = container.querySelectorAll('.dot'); 
    
    let activeIndex = 0;

    // Find current active index
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
            // Hide current slide & dot
            slide.classList.remove('active');
            if (dots[index]) dots[index].classList.remove('active');
        }
    });

    // Calculate next index
    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;        
    if (newIndex < 0) newIndex = slides.length - 1;     

    // Show new slide & dot
    slides[newIndex].classList.add('active');
    if (dots[newIndex]) dots[newIndex].classList.add('active');
}

// 3. DOT NAVIGATION
function currentSlide(carouselId, index) {
    const container = document.getElementById(carouselId);
    const slides = container.querySelectorAll('.project-slide');
    const dots = container.querySelectorAll('.dot');
    
    // Deactivate all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activate selected
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}