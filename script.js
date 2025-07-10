// State management
        let currentPage = 'home-page';
        let currentComic = null;
        let currentChapterIndex = 0;
        let currentPageIndex = 0;
        let searchQuery = '';
        let sortOrder = 'desc'; // 'asc' for ascending, 'desc' for descending
        let darkMode = localStorage.getItem('darkMode') === 'true';

        // DOM Elements
        const pages = {
            home: document.getElementById('home-page'),
            genre: document.getElementById('genre-page'),
            search: document.getElementById('search-page'),
            detail: document.getElementById('detail-page'),
            reader: document.getElementById('reader-page')
        };

        const trendingComics = document.getElementById('trending-comics');
        const newComics = document.getElementById('new-comics');
        const genresContainer = document.getElementById('genres-container');
        const searchResultsContainer = document.getElementById('search-results-container');
        const comicDetail = document.getElementById('comic-detail');
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const navItems = document.querySelectorAll('.nav-item');
        const homeLink = document.getElementById('home-link');
        const closeReaderBtn = document.getElementById('close-reader');
        const prevChapterBtn = document.getElementById('prev-chapter');
        const nextChapterBtn = document.getElementById('next-chapter');
        const chapterTitle = document.getElementById('chapter-title');
        const readerContent = document.getElementById('reader-content');
        const readerLoader = document.getElementById('reader-loader');
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        const viewTrendingBtn = document.getElementById('view-trending');
        const viewNewBtn = document.getElementById('view-new');
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Initialize the app
        function initApp() {
            // Apply saved theme
            applyTheme();
            
            renderTrendingComics();
            renderNewComics();
            renderGenres();
            setupEventListeners();
            setupScrollToTop();
        }

        // Apply theme based on darkMode state
        function applyTheme() {
            if (darkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                themeToggle.title = 'Mode Terang';
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                themeToggle.title = 'Mode Gelap';
            }
        }

        // Toggle dark/light mode
        function toggleTheme() {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            applyTheme();
        }

        // Render trending comics on home page
        function renderTrendingComics() {
            trendingComics.innerHTML = '';
            
            // Sort by rating (descending) and take top 6
            const trending = [...comics]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 10);
            
            trending.forEach(comic => {
                const comicCard = createComicCard(comic);
                trendingComics.appendChild(comicCard);
            });
        }

        // Render new comics on home page
        function renderNewComics() {
            newComics.innerHTML = '';
            
            // Sort by date (descending) and take top 6
            const newComicsList = [...comics]
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 10);
            
            newComicsList.forEach(comic => {
                const comicCard = createComicCard(comic, true);
                newComics.appendChild(comicCard);
            });
        }

        // Create comic card element
        function createComicCard(comic, isNew = false) {
            const comicCard = document.createElement('div');
            comicCard.className = 'comic-card';
            
            // Calculate days since update
            const updatedDate = new Date(comic.updatedAt);
            const today = new Date();
            const diffTime = Math.abs(today - updatedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            comicCard.innerHTML = `
                ${isNew ? `<div class="comic-badge">BARU</div>` : ''}
                <div class="comic-cover" style="background-image: url('${comic.cover}')"></div>
                <div class="comic-origin-flag">
                <img src="assets/flags/${comic.country}.svg" alt="country"></div>
                <div class="comic-info">
                    <div class="comic-title">${comic.title}</div>
                    <div class="comic-author">${comic.author}</div>
                    <div class="comic-rating">
                        <i class="fas fa-star"></i>
                        <span>${comic.rating}</span>
                    </div>
                    <div class="comic-meta">
                        <span>${comic.chapters.length} chapter</span>
                        <span>${diffDays} hari lalu</span>
                    </div>
                </div>
            `;
            
            comicCard.addEventListener('click', () => showComicDetail(comic));
            return comicCard;
        }

        // Render genres on genre page
        function renderGenres() {
            genresContainer.innerHTML = '';
            genres.forEach(genre => {
                const genreCard = document.createElement('div');
                genreCard.className = 'genre-card';
                genreCard.innerHTML = `
                    <i class="${genre.icon}"></i>
                    <span>${genre.name}</span>
                `;
                genreCard.addEventListener('click', () => showGenreComics(genre));
                genresContainer.appendChild(genreCard);
            });
        }

        // Show comic detail page
        function showComicDetail(comic) {
            currentComic = comic;
            sortOrder = 'desc'; // Default: terbaru dulu
            
            // Render comic chapters based on sort order
            renderComicChapters();
            
            showPage('detail-page');
        }
        
        // Render comic chapters with current sort order
        function renderComicChapters() {
            const sortedChapters = [...currentComic.chapters];
            
            if (sortOrder === 'asc') {
                // Ascending: chapter 1, 2, 3, ...
                sortedChapters.sort((a, b) => a.id - b.id);
            } else {
                // Descending: chapter terbaru dulu (chapter 100, 99, 98, ...)
                sortedChapters.sort((a, b) => b.id - a.id);
            }
            
            comicDetail.innerHTML = `
                <div class="detail-header">
                    <div class="detail-cover" style="background-image: url('${currentComic.cover}')"></div>
                    <div class="detail-info">
                        <h2 class="detail-title">${currentComic.title}</h2>
                        <div class="detail-meta">
                        <div class="comic-origin-flag-detail">
                        <img src="assets/flags/${currentComic.country}.svg" alt="country"></div>
                            <span><i class="fas fa-user-pen"></i> Oleh: ${currentComic.author}</span>
                            <span><i class="fas fa-book"></i> ${currentComic.chapters.length} Chapter</span> 
                        </div>
                        <div class="detail-rating">
                            <i class="fas fa-star"></i>
                            <span>${currentComic.rating}</span>
                        </div>
                        <p class="detail-synopsis">${currentComic.synopsis}</p>
                        <div class="detail-genres">
                            ${currentComic.genre.map(g => `<div class="genre-tag">${g}</div>`).join('')}
                        </div>
                        <button class="btn-read" data-chapter="0"><i class="fas fa-book-open"></i> Baca Chapter ${sortOrder === 'desc' ? sortedChapters[0].id : sortedChapters[sortedChapters.length-1].id}</button>
                    </div>
                </div>
                <div class="chapters-container">
                    <div class="chapters-header">
                        <h3 class="section-title">Daftar Chapter</h3>
                        <div class="sort-controls">
                            <button class="sort-btn ${sortOrder === 'desc' ? 'active' : ''}" id="sort-desc">
                                <i class="fas fa-angle-up"></i> Terbaru
                            </button>
                            <button class="sort-btn ${sortOrder === 'asc' ? 'active' : ''}" id="sort-asc">
                                <i class="fas fa-angle-down"></i> Terlama
                            </button>
                        </div>
                    </div>
                    <div class="chapters-grid">
                        ${sortedChapters.map(chapter => 
                            `<div class="chapter-item" data-chapter="${chapter.id - 1}">Chapter ${chapter.id}<br></div>`
                        ).join('')}
                    </div>
                </div>
            
            `;
            
            // Add event listeners to chapter items and read button
            comicDetail.querySelector('.btn-read').addEventListener('click', function() {
                const chapterIndex = sortOrder === 'desc' ? 0 : currentComic.chapters.length - 1;
                showReader(currentComic, chapterIndex);
            });
            
            comicDetail.querySelectorAll('.chapter-item').forEach(item => {
                item.addEventListener('click', function() {
                    const chapterIndex = parseInt(this.dataset.chapter);
                    showReader(currentComic, chapterIndex);
                });
            });
            
            // Add event listeners to sort buttons
            document.getElementById('sort-desc').addEventListener('click', () => {
                sortOrder = 'desc';
                renderComicChapters();
            });
            
            document.getElementById('sort-asc').addEventListener('click', () => {
                sortOrder = 'asc';
                renderComicChapters();
            });
        }

        // Show comics by genre
        function showGenreComics(genre) {
            const genreComics = comics.filter(comic => 
                comic.genre.some(g => g.toLowerCase() === genre.name.toLowerCase())
            );
            
            if (genreComics.length === 0) {
                searchResultsContainer.innerHTML = `
                    <div class="section-title">Komik Genre: ${genre.name}</div>
                    <div class="no-results">
                        <i class="fas fa-book-open"></i>
                        <p>Tidak ada komik dalam genre ini</p>
                    </div>
                `;
                return;
            }
            
            searchResultsContainer.innerHTML = `
                <div class="section-title">Komik Genre: ${genre.name}</div>
                <div class="search-results" id="search-results">
                    ${genreComics.map(comic => createComicCardHTML(comic)).join('')}
                </div>
            `;
            
            // Add event listeners to comic cards
            document.getElementById('search-results').querySelectorAll('.comic-card').forEach((card, index) => {
                card.addEventListener('click', () => showComicDetail(genreComics[index]));
            });
            
            showPage('search-page');
        }

        // Create comic card HTML string
        function createComicCardHTML(comic) {
            const updatedDate = new Date(comic.updatedAt);
            const today = new Date();
            const diffTime = Math.abs(today - updatedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return `
                <div class="comic-card">
                    <div class="comic-cover" style="background-image: url('${comic.cover}')"></div>
                    <div class="comic-origin-flag">
                <img src="assets/flags/${comic.country}.svg" alt="country"></div>
                    <div class="comic-info">
                        <div class="comic-title">${comic.title}</div>
                        <div class="comic-author">${comic.author}</div>
                        <div class="comic-rating">
                            <i class="fas fa-star"></i>
                            <span>${comic.rating}</span>
                        </div>
                        <div class="comic-meta">
                            <span>${comic.chapters.length} chapter</span>
                            <span>${diffDays} hari lalu</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Show all trending comics
        function showAllTrending() {
            // Sort by rating (descending)
            const trending = [...comics].sort((a, b) => b.rating - a.rating);
            
            searchResultsContainer.innerHTML = `
                <div class="view-all-header">
                    <button class="back-button" id="back-from-view-all">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </button>
                    <h2 class="section-title">Semua Komik Terpopuler</h2>
                </div>
                <div class="search-results" id="search-results">
                    ${trending.map(comic => createComicCardHTML(comic)).join('')}
                </div>
            `;
            
            // Add event listeners to comic cards
            document.getElementById('search-results').querySelectorAll('.comic-card').forEach((card, index) => {
                card.addEventListener('click', () => showComicDetail(trending[index]));
            });
            
            // Add event listener to back button
            document.getElementById('back-from-view-all').addEventListener('click', () => {
                showPage('home-page');
            });
            
            showPage('search-page');
        }

        // Show all new comics
        function showAllNew() {
            // Sort by date (descending)
            const newComicsList = [...comics].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            
            searchResultsContainer.innerHTML = `
                <div class="view-all-header">
                    <button class="back-button" id="back-from-view-all">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </button>
                    <h2 class="section-title">Semua Komik Terbaru</h2>
                </div>
                <div class="search-results" id="search-results">
                    ${newComicsList.map(comic => createComicCardHTML(comic)).join('')}
                </div>
            `;
            
            // Add event listeners to comic cards
            document.getElementById('search-results').querySelectorAll('.comic-card').forEach((card, index) => {
                card.addEventListener('click', () => showComicDetail(newComicsList[index]));
            });
            
            // Add event listener to back button
            document.getElementById('back-from-view-all').addEventListener('click', () => {
                showPage('home-page');
            });
            
            showPage('search-page');
        }

        // Show comic reader in vertical layout
        function showReader(comic, chapterIndex) {
            currentComic = comic;
            currentChapterIndex = chapterIndex;
            
            const chapter = comic.chapters[chapterIndex];
            chapterTitle.textContent = `${comic.title} - Chapter ${chapter.id}`;
            
            // Show loading
            readerContent.innerHTML = '';
            readerLoader.classList.add('active');
            
            // Simulate loading delay
            setTimeout(() => {
                renderReaderContent(chapter);
                readerLoader.classList.remove('active');
                
                // Scroll to top after loading
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
            
            showPage('reader-page');
        }

        // Render comic pages in vertical layout
        function renderReaderContent(chapter) {
            readerContent.innerHTML = '';
            
            chapter.images.forEach((img, index) => {
                const pageImg = document.createElement('img');
                pageImg.src = img;
                pageImg.alt = `Halaman ${index + 1}`;
                pageImg.className = 'reader-page';
                pageImg.loading = "lazy";
                readerContent.appendChild(pageImg);
            });
            
            // Update button states
            prevChapterBtn.disabled = currentChapterIndex === 0;
            nextChapterBtn.disabled = currentChapterIndex === currentComic.chapters.length - 1;
        }

        // Navigate to next chapter
        function nextChapter() {
            if (currentChapterIndex < currentComic.chapters.length - 1) {
                currentChapterIndex++;
                showReader(currentComic, currentChapterIndex);
            }
        }

        // Navigate to previous chapter
        function prevChapter() {
            if (currentChapterIndex > 0) {
                currentChapterIndex--;
                showReader(currentComic, currentChapterIndex);
            }
        }

        // Perform search
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            searchQuery = query;
            
            if (query === '') {
                searchResultsContainer.innerHTML = `
                    <div class="section-title">Hasil Pencarian</div>
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>Silakan masukkan kata kunci pencarian</p>
                    </div>
                `;
                showPage('search-page');
                return;
            }
            
            const results = comics.filter(comic => 
                comic.title.toLowerCase().includes(query) || 
                comic.author.toLowerCase().includes(query) ||
                comic.genre.some(g => g.toLowerCase().includes(query))
            );
            
            if (results.length === 0) {
                searchResultsContainer.innerHTML = `
                    <div class="section-title">Hasil Pencarian: ${query}</div>
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>Tidak ada hasil ditemukan untuk "${query}"</p>
                    </div>
                `;
                showPage('search-page');
                return;
            }
            
            searchResultsContainer.innerHTML = `
                <div class="section-title">Hasil Pencarian: ${query}</div>
                <div class="search-results" id="search-results">
                    ${results.map(comic => createComicCardHTML(comic)).join('')}
                </div>
            `;
            
            // Add event listeners to comic cards
            document.getElementById('search-results').querySelectorAll('.comic-card').forEach((card, index) => {
                card.addEventListener('click', () => showComicDetail(results[index]));
            });
            
            showPage('search-page');
        }

        // Show a specific page
        function showPage(pageId) {
            currentPage = pageId;
            Object.values(pages).forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav item
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.page === pageId) {
                    item.classList.add('active');
                }
            });
            
            // Reset search on home
            if (pageId === 'home-page') {
                searchInput.value = '';
            }
        }

        // Set up scroll to top button
        function setupScrollToTop() {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Navigation
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    showPage(item.dataset.page);
                });
            });
            
            // Home link
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPage('home-page');
            });
            
            // Search
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            // Reader navigation
            closeReaderBtn.addEventListener('click', () => {
                showPage('detail-page');
            });
            
            prevChapterBtn.addEventListener('click', prevChapter);
            nextChapterBtn.addEventListener('click', nextChapter);
            
            // View all buttons
            viewTrendingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAllTrending();
            });
            
            viewNewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAllNew();
            });
            
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Keyboard navigation in reader
            document.addEventListener('keydown', (e) => {
                if (currentPage !== 'reader-page') return;
                
                if (e.key === 'ArrowDown') {
                    nextChapter();
                } else if (e.key === 'ArrowUp') {
                    prevChapter();
                }
            });
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);