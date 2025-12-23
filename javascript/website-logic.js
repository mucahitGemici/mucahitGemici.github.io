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
            
            // NEW: Stop video on this slide before hiding it
            stopMedia(slide);

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
    slides.forEach(slide => {
        // NEW: Stop video if this slide was active
        if (slide.classList.contains('active')) {
            stopMedia(slide);
        }
        slide.classList.remove('active');
    });

    dots.forEach(dot => dot.classList.remove('active'));

    // Activate selected
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

// 4. HELPER: STOP MEDIA (VIDEOS & IFRAMES)
function stopMedia(slide) {
    if (!slide) return;

    // A. Pause HTML5 Videos (<video>)
    const videos = slide.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });

    // B. Stop YouTube/Vimeo Iframes
    // The simplest way to stop an iframe video without an API is to re-assign its source.
    const iframes = slide.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const currentSrc = iframe.src;
        iframe.src = currentSrc; 
    });
}

// Function to handle the Success Card auto-rotation
function startSuccessCarousels() {
    const carousels = document.querySelectorAll('.auto-success-card');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.success-slide');
        if (slides.length <= 1) return; // No need to rotate if only 1 image

        let currentIndex = 0;

        setInterval(() => {
            // Remove active class from current
            slides[currentIndex].classList.remove('active');

            // Calculate next index
            currentIndex = (currentIndex + 1) % slides.length;

            // Add active class to next
            slides[currentIndex].classList.add('active');
        }, 5000); 
    });
}

// Start the carousels when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startSuccessCarousels();
});

function toggleUpdates() {
    const hiddenDiv = document.getElementById('older-updates');
    const btn = document.getElementById('toggle-updates-btn');

    if (hiddenDiv.style.display === "block") {
        // Hide them
        hiddenDiv.style.display = "none";
        btn.innerHTML = 'Show More <i class="fas fa-chevron-down"></i>';
    } else {
        // Show them
        hiddenDiv.style.display = "block";
        btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    }
}

/* =========================================
   MEDIA TOGGLE LOGIC (Video <-> Images)
   ========================================= */
   function switchMediaView(btn, viewType) {
    // 1. Find the parent slide
    // We traverse up to find the '.slide-gallery' container
    const galleryContainer = btn.closest('.slide-gallery');
    
    // 2. Get the containers
    const videoView = galleryContainer.querySelector('.video-view');
    const imageView = galleryContainer.querySelector('.image-view');
    
    // 3. Get the buttons
    const btnGroup = btn.parentElement;
    const allBtns = btnGroup.querySelectorAll('.media-toggle-btn');

    // 4. RESET: Remove active class from all buttons
    allBtns.forEach(b => b.classList.remove('active'));
    // Set clicked button to active
    btn.classList.add('active');

    // 5. TOGGLE LOGIC
    if (viewType === 'video') {
        // Show Video, Hide Images
        if(videoView) videoView.classList.remove('hidden-view');
        if(imageView) imageView.classList.add('hidden-view');
    } else {
        // Show Images, Hide Video
        if(imageView) imageView.classList.remove('hidden-view');
        if(videoView) videoView.classList.add('hidden-view');

        // IMPORTANT: Pause the video if we switch to images
        if(videoView) {
            const video = videoView.querySelector('video');
            const iframe = videoView.querySelector('iframe');
            if(video) video.pause();
            if(iframe) {
                // Reset src to stop youtube video
                const src = iframe.src;
                iframe.src = src; 
            }
        }
    }
}