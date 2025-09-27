document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to config
    const currentTheme = localStorage.getItem('theme') || siteConfig.theme;
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Search Bar Toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
        if (searchBar.style.display === 'block') {
            searchBar.querySelector('input').focus();
        }
    });
    
    // Carousel
    const carousel = document.getElementById('videoCarousel');
    if (carousel) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('carouselIndicators');
        const items = document.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        
        // Create indicators
        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = document.querySelectorAll('.indicator');
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto-play carousel
        let carouselInterval = setInterval(nextSlide, siteConfig.carousel_interval);
        
        // Pause carousel when hovering
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, siteConfig.carousel_interval);
        });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Popup Ads
    if (siteConfig.show_ads) {
        const popups = document.querySelectorAll('.popup-ad');
        
        popups.forEach(popup => {
            const showAfter = parseInt(popup.dataset.showAfter) || 5;
            
            setTimeout(() => {
                popup.style.display = 'flex';
            }, showAfter * 1000);
            
            const closeBtn = popup.querySelector('.close-popup');
            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });
            
            // Close popup when clicking outside
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.style.display = 'none';
                }
            });
        });
    }
    
    // Video History and Favorites
    // This will be implemented in detail.php, history.php, and favorite.php
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Sending message...', 'info');
            
            setTimeout(() => {
                // In a real application, you would send the form data to a server here
                showFormMessage('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Load History Videos
    const historyContainer = document.getElementById('historyContainer');
    
    if (historyContainer && typeof videos !== 'undefined') {
        loadHistoryVideos();
    }
    
    function loadHistoryVideos() {
        const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
        
        if (history.length === 0) {
            historyContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-history"></i>
                    <h3>Belum Ada Riwayat</h3>
                    <p>Anda belum menonton video apa pun</p>
                    <a href="${siteConfig.url}/index.php" class="btn">Jelajahi Video</a>
                </div>
            `;
            return;
        }
        
        let html = '<div class="video-grid">';
        
        // Get video details for each history item
        history.forEach(videoId => {
            const video = videos.find(v => v.id === videoId);
            if (video) {
                html += `
                    <div class="video-card">
                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="${video.judul}">
                            <div class="video-overlay">
                                <a href="${siteConfig.url}/detail.php?id=${video.id}" class="play-btn"><i class="fas fa-play"></i></a>
                            </div>
                        </div>
                        <div class="video-info">
                            <h3>${video.judul}</h3>
                            <div class="video-meta">
                                <span class="genre">${video.genre}</span>
                                <span class="date">${video.date}</span>
                            </div>
                            <div class="rating">
                                ${'<i class="fas fa-star"></i>'.repeat(video.rating)}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        historyContainer.innerHTML = html;
    }
    
    // Load Favorite Videos
    const favoriteContainer = document.getElementById('favoriteContainer');
    
    if (favoriteContainer && typeof videos !== 'undefined') {
        loadFavoriteVideos();
    }
    
    function loadFavoriteVideos() {
        const favorites = JSON.parse(localStorage.getItem('videoFavorites')) || [];
        
        if (favorites.length === 0) {
            favoriteContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-heart"></i>
                    <h3>Belum Ada Favorit</h3>
                    <p>Anda belum menambahkan video apa pun ke favorit</p>
                    <a href="${siteConfig.url}/index.php" class="btn">Jelajahi Video</a>
                </div>
            `;
            return;
        }
        
        let html = '<div class="video-grid">';
        
        // Get video details for each favorite item
        favorites.forEach(videoId => {
            const video = videos.find(v => v.id === videoId);
            if (video) {
                html += `
                    <div class="video-card">
                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="${video.judul}">
                            <div class="video-overlay">
                                <a href="${siteConfig.url}/detail.php?id=${video.id}" class="play-btn"><i class="fas fa-play"></i></a>
                            </div>
                        </div>
                        <div class="video-info">
                            <h3>${video.judul}</h3>
                            <div class="video-meta">
                                <span class="genre">${video.genre}</span>
                                <span class="date">${video.date}</span>
                            </div>
                            <div class="rating">
                                ${'<i class="fas fa-star"></i>'.repeat(video.rating)}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        favoriteContainer.innerHTML = html;
    }
    
    // Favorite Button on Detail Page
    const favoriteBtn = document.getElementById('favoriteBtn');
    
    if (favoriteBtn) {
        const videoId = favoriteBtn.dataset.id;
        const favorites = JSON.parse(localStorage.getItem('videoFavorites')) || [];
        
        // Check if video is already in favorites
        if (favorites.includes(videoId)) {
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Hapus dari Favorit';
            favoriteBtn.classList.add('active');
        }
        
        favoriteBtn.addEventListener('click', function() {
            toggleFavorite(videoId);
        });
    }
    
    function toggleFavorite(videoId) {
        let favorites = JSON.parse(localStorage.getItem('videoFavorites')) || [];
        
        if (favorites.includes(videoId)) {
            // Remove from favorites
            favorites = favorites.filter(id => id !== videoId);
            favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Tambah ke Favorit';
            favoriteBtn.classList.remove('active');
        } else {
            // Add to favorites
            favorites.push(videoId);
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Hapus dari Favorit';
            favoriteBtn.classList.add('active');
        }
        
        localStorage.setItem('videoFavorites', JSON.stringify(favorites));
    }
    
    // Add to History when visiting detail page
    const detailPage = document.querySelector('.video-detail');
    
    if (detailPage) {
        const videoId = favoriteBtn ? favoriteBtn.dataset.id : null;
        if (videoId) {
            addToHistory(videoId);
        }
    }
    
    function addToHistory(videoId) {
        let history = JSON.parse(localStorage.getItem('videoHistory')) || [];
        
        // Remove if already exists to avoid duplicates
        history = history.filter(id => id !== videoId);
        
        // Add to beginning of array
        history.unshift(videoId);
        
        // Keep only last 20 videos
        if (history.length > 20) {
            history = history.slice(0, 20);
        }
        
        localStorage.setItem('videoHistory', JSON.stringify(history));
    }
});
