lightbox.option({
  'wrapAround': true,
  'alwaysShowNavOnTouchDevices': true,
  'fadeDuration': 600,
  'imageFadeDuration': 600,
  'resizeDuration': 700
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    const contrastToggle = document.getElementById('contrast-toggle');
    
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            
            const isHighContrast = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHighContrast);
        });
    }

    if (document.body.classList.contains('landscape-page')) {
        const landscapeItems = document.querySelectorAll('.landscape-page .gallery-item');
        const featuredDisplay = document.getElementById('featured-display');
        const featuredImg = document.getElementById('featured-img');
        const featuredTitle = document.getElementById('featured-title');
        const featuredText = document.getElementById('featured-text');

        function showFeaturedImage(item) {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            featuredImg.src = img.src;
            featuredImg.alt = img.alt;
            featuredTitle.textContent = title;
            featuredText.textContent = description;

            featuredDisplay.style.display = 'block';
            featuredDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        landscapeItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                showFeaturedImage(this);
            });

            item.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showFeaturedImage(this);
                }
            });
        });
    }
});
