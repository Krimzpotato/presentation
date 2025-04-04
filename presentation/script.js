document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const slideNumber = document.getElementById('slide-number');
    const fullscreenBtn = document.getElementById('fullscreen');
    const printBtn = document.getElementById('print');
    const controls = document.querySelector('.controls');
    

    const bottomHoverArea = document.createElement('div');
    bottomHoverArea.className = 'bottom-hover-area';
    document.body.appendChild(bottomHoverArea);

    document.body.insertBefore(bottomHoverArea, controls);
    
    let currentSlide = 0;
    let isAnimating = false;
    

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
    

    function prepareSlideElementsForAnimation(slide) {

        if (slide.classList.contains('image-slide')) {
            return;
        }
        

        const heading = slide.querySelector('h1');
        if (heading) {
            heading.style.opacity = '0';
            heading.style.transform = 'translateY(-20px)';
        }
        

        const defBox = slide.querySelector('.definition-box');
        if (defBox) {
            defBox.style.opacity = '0';
            defBox.style.transform = 'scale(0.95)';
        }
        
        
        const imgContainer = slide.querySelector('.image-container');
        if (imgContainer && !imgContainer.classList.contains('intro-animation')) {
            imgContainer.style.opacity = '0';
            imgContainer.style.transform = 'translateY(20px)';
        }
        
        
        const listItems = slide.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
        });
        
        
        const table = slide.querySelector('table');
        if (table) {
            table.style.opacity = '0';
            
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.opacity = '0';
            });
        }
        
        
        const timelineItems = slide.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    }
    
    
    function animateSlideElements(slide) {
        
        if (slide.classList.contains('image-slide')) {
            return;
        }
        
        
        const heading = slide.querySelector('h1');
        if (heading) {
            setTimeout(() => {
                heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                heading.style.opacity = '1';
                heading.style.transform = 'translateY(0)';
            }, 100);
        }
        
        
        const defBox = slide.querySelector('.definition-box');
        if (defBox) {
            setTimeout(() => {
                defBox.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
                defBox.style.opacity = '1';
                defBox.style.transform = 'scale(1)';
            }, 100);
        }
        
        
        const imgContainer = slide.querySelector('.image-container');
        if (imgContainer && !imgContainer.classList.contains('intro-animation')) {
            setTimeout(() => {
                imgContainer.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
                imgContainer.style.opacity = '1';
                imgContainer.style.transform = 'translateY(0)';
            }, 100);
        }
        
        
        const listItems = slide.querySelectorAll('li');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = `opacity 0.3s ease ${0.3 + (index * 0.1)}s, transform 0.3s ease ${0.3 + (index * 0.1)}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        });
        
        
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
        
        
        const timelineItems = slide.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = `opacity 0.5s ease ${0.2 + (index * 0.2)}s, transform 0.5s ease ${0.2 + (index * 0.2)}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    
    function updateSlideNumber() {
        slideNumber.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
    
   
    function showSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
            
            const animatedElements = slide.querySelectorAll('h1, .definition-box, .image-container:not(.intro-animation), li, table, tr, .timeline-item');
            animatedElements.forEach(el => {
                el.style.opacity = '';
                el.style.transform = '';
                el.style.transition = '';
            });
            
            if (index === currentSlide) {
                slide.style.display = 'flex';
                slide.classList.add('active');
                
                if (index === 0) {
                    applyIntroAnimations();
                } else {
                    
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
    
    
    function nextSlide() {
        if (currentSlide < slides.length - 1 && !isAnimating) {
            isAnimating = true;
            
           
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide + 1) {
                    slide.style.display = 'none';
                }
            });
            
           
            prepareSlideElementsForAnimation(slides[currentSlide + 1]);
            
            
            slides[currentSlide].classList.add('slide-right-out');
            slides[currentSlide + 1].style.display = 'flex';
            slides[currentSlide + 1].classList.add('active', 'slide-right-in');
            
            
            animateSlideElements(slides[currentSlide + 1]);
            
            
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
    
    
    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            isAnimating = true;
            
            
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide - 1) {
                    slide.style.display = 'none';
                }
            });
            
           
            if (currentSlide - 1 === 0) {
                
            } else {
                prepareSlideElementsForAnimation(slides[currentSlide - 1]);
            }
            
            
            slides[currentSlide].classList.add('slide-left-out');
            slides[currentSlide - 1].style.display = 'flex';
            slides[currentSlide - 1].classList.add('active', 'slide-left-in');
            
            
            if (currentSlide - 1 === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[currentSlide - 1]);
            }
            
            
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
    
    
    function goToSlide(index) {
        if (index >= 0 && index < slides.length && !isAnimating && index !== currentSlide) {
            isAnimating = true;
            
            
            const goingRight = index > currentSlide;
            
           
            slides.forEach((slide, i) => {
                if (i !== currentSlide && i !== index) {
                    slide.style.display = 'none';
                }
            });
            
           
            if (index === 0) {
                
            } else {
                prepareSlideElementsForAnimation(slides[index]);
            }
            
            
            if (goingRight) {
                slides[currentSlide].classList.add('slide-left-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-right-in');
            } else {
                slides[currentSlide].classList.add('slide-right-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-left-in');
            }
            
            
            if (index === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[index]);
            }
            
           
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
    
  
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { 
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { 
                document.documentElement.msRequestFullscreen();
            }
            fullscreenBtn.textContent = 'Exit Fullscreen';
        } else {
            
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { 
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
            }
            fullscreenBtn.textContent = 'Fullscreen';
        }
    }
    
    
    let autoSlideInterval = null;
    
    function startAutoSlide(interval = 8000) {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                
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
    
    
    function toggleAutoSlide() {
        if (autoSlideInterval) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
    
    
    function createPrintableVersion() {
        
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
        
        
        printWindow.document.write(`
            <div style="text-align: center; padding: 50px; margin-bottom: 50px;">
                <h1 style="font-size: 36pt; color: #003366; margin-bottom: 30px;">Computer Types</h1>
                <h2 style="font-size: 24pt; color: #004c99; margin-bottom: 50px;">Supercomputers, Mainframes, Minicomputers, and Microcomputers</h2>
                <p style="font-size: 14pt; margin-top: 50px;">Presented by: Team Member 1, Team Member 2, Team Member 3, Team Member 4</p>
                <p style="font-size: 12pt; margin-top: 100px; color: #666;">Generated from HTML presentation</p>
            </div>
        `);
        
        
        slides.forEach((slide, index) => {
           
            if (index === 0) return;
            
            const clonedSlide = slide.cloneNode(true);
            clonedSlide.classList.remove('active', 'slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
            clonedSlide.classList.add('slide');
            clonedSlide.style.display = 'block';
            printWindow.document.body.appendChild(clonedSlide);
        });
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
        };
    }
    
    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
    });
    
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
   
    printBtn.addEventListener('click', createPrintableVersion);
    
   
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
          
            stopAutoSlide();
            const slideIndex = parseInt(e.key) - 1;
            if (slideIndex < slides.length) {
                goToSlide(slideIndex);
            }
        } else if (e.key === 'a') {
          
            toggleAutoSlide();
        } else if (e.key === 'p') {
          
            createPrintableVersion();
        }
    });
    
   
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        
        stopAutoSlide();
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
           
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          
            prevSlide();
        }
    }
    
   
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.setAttribute('title', `Slide ${i+1}`);
            if (i === 0) dot.classList.add('active');
            
           
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
            });
            
            progressContainer.appendChild(dot);
        }
        
        document.body.appendChild(progressContainer);
        return progressContainer;
    }
    
  
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
    
    
    const progressIndicator = createProgressIndicator();
    
   
    const slideObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target.classList.contains('active')) {
                updateProgressIndicator();
            }
        });
    });
    
    
    slides.forEach(slide => {
        slideObserver.observe(slide, { attributes: true });
    });
    
    
    if (slides.length > 0) {
        prepareSlideElementsForAnimation(slides[0]);
        applyIntroAnimations();
        updateSlideNumber();
    }

   
    let scrollStep = 100; 
    let fastScrollStep = 300;

    function handleKeyboardScroll(e) {
        const currentSlideElement = slides[currentSlide];
        if (!currentSlideElement) return;

       
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (e.ctrlKey || e.shiftKey) {
                    currentSlideElement.scrollBy({ top: fastScrollStep, behavior: 'smooth' });
                } else {
                    currentSlideElement.scrollBy({ top: scrollStep, behavior: 'smooth' });
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (e.ctrlKey || e.shiftKey) {
                    currentSlideElement.scrollBy({ top: -fastScrollStep, behavior: 'smooth' });
                } else {
                    currentSlideElement.scrollBy({ top: -scrollStep, behavior: 'smooth' });
                }
                break;
            case 'PageDown':
                e.preventDefault();
                currentSlideElement.scrollBy({ 
                    top: currentSlideElement.clientHeight * 0.9, 
                    behavior: 'smooth' 
                });
                break;
            case 'PageUp':
                e.preventDefault();
                currentSlideElement.scrollBy({ 
                    top: -currentSlideElement.clientHeight * 0.9, 
                    behavior: 'smooth' 
                });
                break;
            case 'Home':
                e.preventDefault();
                currentSlideElement.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                currentSlideElement.scrollTo({ 
                    top: currentSlideElement.scrollHeight, 
                    behavior: 'smooth' 
                });
                break;
            case ' ':
               
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                    e.preventDefault();
                    if (e.shiftKey) {
                        currentSlideElement.scrollBy({ 
                            top: -currentSlideElement.clientHeight * 0.75, 
                            behavior: 'smooth' 
                        });
                    } else {
                        currentSlideElement.scrollBy({ 
                            top: currentSlideElement.clientHeight * 0.75, 
                            behavior: 'smooth' 
                        });
                    }
                }
                break;
        }
    }

   
    document.addEventListener('keydown', handleKeyboardScroll);
}); 