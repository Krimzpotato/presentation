document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const slideNumber = document.getElementById('slide-number');
    const fullscreenBtn = document.getElementById('fullscreen');
    const printBtn = document.getElementById('print');
    const controls = document.querySelector('.controls');
    
    // Create hover area for controls
    const bottomHoverArea = document.createElement('div');
    bottomHoverArea.className = 'bottom-hover-area';
    document.body.appendChild(bottomHoverArea);
    
    // Make sure hover area is inserted right before controls for CSS sibling selector to work
    document.body.insertBefore(bottomHoverArea, controls);
    
    let currentSlide = 0;
    let isAnimating = false;
    
    // Apply intro animations with delay - only for the first slide
    function applyIntroAnimations() {
        if (currentSlide === 0) {
            const introElements = document.querySelectorAll('.intro-animation');
            introElements.forEach((element, index) => {
                element.style.animationDelay = `${0.3 * (index + 1)}s`;
                element.style.animationDuration = '1s';
                element.style.opacity = '0';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            });
        }
    }
    
    // Prepare slide elements for animation (set initial state)
    function prepareSlideElementsForAnimation(slide) {
        // Don't animate image slides
        if (slide.classList.contains('image-slide')) {
            return;
        }
        
        // Set initial state for headings
        const heading = slide.querySelector('h1');
        if (heading) {
            heading.style.opacity = '0';
            heading.style.transform = 'translateY(-20px)';
        }
        
        // Set initial state for definition boxes
        const defBox = slide.querySelector('.definition-box');
        if (defBox) {
            defBox.style.opacity = '0';
            defBox.style.transform = 'scale(0.95)';
        }
        
        // Set initial state for images
        const imgContainer = slide.querySelector('.image-container');
        if (imgContainer && !imgContainer.classList.contains('intro-animation')) {
            imgContainer.style.opacity = '0';
            imgContainer.style.transform = 'translateY(20px)';
        }
        
        // Set initial state for list items
        const listItems = slide.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
        });
        
        // Set initial state for table
        const table = slide.querySelector('table');
        if (table) {
            table.style.opacity = '0';
            
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.opacity = '0';
            });
        }
        
        // Set initial state for timeline items
        const timelineItems = slide.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    }
    
    // Apply animations to elements in the active slide
    function animateSlideElements(slide) {
        // Don't animate image slides
        if (slide.classList.contains('image-slide')) {
            return;
        }
        
        // Animation for headings
        const heading = slide.querySelector('h1');
        if (heading) {
            setTimeout(() => {
                heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                heading.style.opacity = '1';
                heading.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animation for definition boxes
        const defBox = slide.querySelector('.definition-box');
        if (defBox) {
            setTimeout(() => {
                defBox.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
                defBox.style.opacity = '1';
                defBox.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Animation for images
        const imgContainer = slide.querySelector('.image-container');
        if (imgContainer && !imgContainer.classList.contains('intro-animation')) {
            setTimeout(() => {
                imgContainer.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
                imgContainer.style.opacity = '1';
                imgContainer.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animation for list items - staggered
        const listItems = slide.querySelectorAll('li');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = `opacity 0.3s ease ${0.3 + (index * 0.1)}s, transform 0.3s ease ${0.3 + (index * 0.1)}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        });
        
        // Animation for table
        const table = slide.querySelector('table');
        if (table) {
            setTimeout(() => {
                table.style.transition = 'opacity 0.8s ease 0.2s';
                table.style.opacity = '1';
            }, 100);
            
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.style.transition = `opacity 0.5s ease ${0.3 + (index * 0.15)}s`;
                    row.style.opacity = '1';
                }, 100);
            });
        }
        
        // Animation for timeline items
        const timelineItems = slide.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = `opacity 0.5s ease ${0.2 + (index * 0.2)}s, transform 0.5s ease ${0.2 + (index * 0.2)}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Update slide number display
    function updateSlideNumber() {
        slideNumber.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
    
    // Show current slide
    function showSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
            // Reset all element animations
            const animatedElements = slide.querySelectorAll('h1, .definition-box, .image-container:not(.intro-animation), li, table, tr, .timeline-item');
            animatedElements.forEach(el => {
                el.style.opacity = '';
                el.style.transform = '';
                el.style.transition = '';
            });
            
            if (index === currentSlide) {
                slide.style.display = 'flex';
                slide.classList.add('active');
                // Only apply special animations to the intro slide if it's the first load
                if (index === 0) {
                    applyIntroAnimations();
                } else {
                    // Prepare and animate slide elements
                    prepareSlideElementsForAnimation(slide);
                    animateSlideElements(slide);
                }
            } else {
                slide.style.display = 'none';
            }
        });
        updateSlideNumber();
        updateProgressIndicator();
    }
    
    // Go to next slide with animation
    function nextSlide() {
        if (currentSlide < slides.length - 1 && !isAnimating) {
            isAnimating = true;
            
            // Make sure all slides except current and next are hidden
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide + 1) {
                    slide.style.display = 'none';
                }
            });
            
            // Prepare next slide elements for animation
            prepareSlideElementsForAnimation(slides[currentSlide + 1]);
            
            // Animation classes
            slides[currentSlide].classList.add('slide-right-out');
            slides[currentSlide + 1].style.display = 'flex';
            slides[currentSlide + 1].classList.add('active', 'slide-right-in');
            
            // Start animating the content of the next slide as it comes in
            animateSlideElements(slides[currentSlide + 1]);
            
            // After animation completes
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', 'slide-right-out');
                slides[currentSlide].style.display = 'none';
                currentSlide++;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
    // Go to previous slide with animation
    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            isAnimating = true;
            
            // Make sure all slides except current and previous are hidden
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide - 1) {
                    slide.style.display = 'none';
                }
            });
            
            // Prepare previous slide elements for animation
            if (currentSlide - 1 === 0) {
                // Don't prepare first slide, it has special animations
            } else {
                prepareSlideElementsForAnimation(slides[currentSlide - 1]);
            }
            
            // Animation classes
            slides[currentSlide].classList.add('slide-left-out');
            slides[currentSlide - 1].style.display = 'flex';
            slides[currentSlide - 1].classList.add('active', 'slide-left-in');
            
            // Start animating the content of the previous slide as it comes in
            if (currentSlide - 1 === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[currentSlide - 1]);
            }
            
            // After animation completes
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', 'slide-left-out');
                slides[currentSlide].style.display = 'none';
                currentSlide--;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
    // Go to specific slide (for navigation buttons if needed)
    function goToSlide(index) {
        if (index >= 0 && index < slides.length && !isAnimating && index !== currentSlide) {
            isAnimating = true;
            
            // Determine direction
            const goingRight = index > currentSlide;
            
            // Hide all slides except current and target
            slides.forEach((slide, i) => {
                if (i !== currentSlide && i !== index) {
                    slide.style.display = 'none';
                }
            });
            
            // Prepare target slide elements for animation
            if (index === 0) {
                // Don't prepare first slide, it has special animations
            } else {
                prepareSlideElementsForAnimation(slides[index]);
            }
            
            // Set appropriate animation classes
            if (goingRight) {
                slides[currentSlide].classList.add('slide-left-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-right-in');
            } else {
                slides[currentSlide].classList.add('slide-right-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-left-in');
            }
            
            // Start animating the content of the target slide as it comes in
            if (index === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[index]);
            }
            
            // After animation completes
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', goingRight ? 'slide-left-out' : 'slide-right-out');
                slides[currentSlide].style.display = 'none';
                currentSlide = index;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
    // Fullscreen toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                document.documentElement.msRequestFullscreen();
            }
            fullscreenBtn.textContent = 'Exit Fullscreen';
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
            fullscreenBtn.textContent = 'Fullscreen';
        }
    }
    
    // Auto-advance slides (if wanted for a timed presentation)
    let autoSlideInterval = null;
    
    function startAutoSlide(interval = 8000) {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                // Optional: loop back to the beginning
                goToSlide(0);
            }
        }, interval);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Toggle auto-advance (can be triggered by a button if desired)
    function toggleAutoSlide() {
        if (autoSlideInterval) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
    
    // Function to create print version of all slides
    function createPrintableVersion() {
        // Create a new window with all slides visible for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Computer Types Presentation</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; }
            .slide { page-break-after: always; padding: 20px; margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; }
            h1 { color: #003366; font-size: 24pt; margin-bottom: 15px; }
            h2, h3 { color: #004c99; }
            img { max-width: 80%; height: auto; display: block; margin: 15px auto; border: 2px solid #ddd; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #003366; color: white; }
            .definition-box { border-left: 5px solid #003366; padding: 15px; margin: 15px 0; background-color: #f5f5f5; }
            .two-col { display: flex; flex-wrap: wrap; }
            .two-col > div { width: 45%; margin: 10px; }
            .timeline { margin: 20px 0; }
            .timeline-item { margin-bottom: 15px; padding-left: 20px; border-left: 3px solid #003366; }
            .timeline-date { font-weight: bold; color: #003366; }
            .team-members { text-align: center; margin-top: 20px; color: #555; }
            .caption { text-align: center; font-style: italic; color: #666; }
            @media print {
                .slide { page-break-after: always; clear: both; }
                body { font-size: 12pt; }
            }
        `);
        printWindow.document.write('</style></head><body>');
        
        // Title page for the printout
        printWindow.document.write(`
            <div style="text-align: center; padding: 50px; margin-bottom: 50px;">
                <h1 style="font-size: 36pt; color: #003366; margin-bottom: 30px;">Computer Types</h1>
                <h2 style="font-size: 24pt; color: #004c99; margin-bottom: 50px;">Supercomputers, Mainframes, Minicomputers, and Microcomputers</h2>
                <p style="font-size: 14pt; margin-top: 50px;">Presented by: Team Member 1, Team Member 2, Team Member 3, Team Member 4</p>
                <p style="font-size: 12pt; margin-top: 100px; color: #666;">Generated from HTML presentation</p>
            </div>
        `);
        
        // Copy all slides without animation classes
        slides.forEach((slide, index) => {
            // Skip the first slide as we already added a title page
            if (index === 0) return;
            
            const clonedSlide = slide.cloneNode(true);
            clonedSlide.classList.remove('active', 'slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
            clonedSlide.classList.add('slide');
            clonedSlide.style.display = 'block';
            printWindow.document.body.appendChild(clonedSlide);
        });
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
        };
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-advance when manually navigating
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
    });
    
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Add print button functionality
    printBtn.addEventListener('click', createPrintableVersion);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            stopAutoSlide();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
        } else if (e.key === 'f') {
            toggleFullscreen();
        } else if (e.key >= '1' && e.key <= '9') {
            // Navigate to slide 1-9 using number keys
            stopAutoSlide();
            const slideIndex = parseInt(e.key) - 1;
            if (slideIndex < slides.length) {
                goToSlide(slideIndex);
            }
        } else if (e.key === 'a') {
            // 'a' key toggles auto-advance (optional feature)
            toggleAutoSlide();
        } else if (e.key === 'p') {
            // 'p' key for printing
            createPrintableVersion();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        // Stop auto-advance on touch interaction
        stopAutoSlide();
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevSlide();
        }
    }
    
    // Progress indicator creation
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.setAttribute('title', `Slide ${i+1}`);
            if (i === 0) dot.classList.add('active');
            
            // Add click event to go to that slide
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
            });
            
            progressContainer.appendChild(dot);
        }
        
        document.body.appendChild(progressContainer);
        return progressContainer;
    }
    
    // Update progress indicator
    function updateProgressIndicator() {
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Create the progress indicator
    const progressIndicator = createProgressIndicator();
    
    // Observer for slide changes to update progress
    const slideObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target.classList.contains('active')) {
                updateProgressIndicator();
            }
        });
    });
    
    // Observe all slides for class changes
    slides.forEach(slide => {
        slideObserver.observe(slide, { attributes: true });
    });
    
    // For first slide, prepare and animate the first slide
    if (slides.length > 0) {
        prepareSlideElementsForAnimation(slides[0]);
        applyIntroAnimations();
        updateSlideNumber();
    }
}); 