/* emerveillees.js - Scripts spécifiques à la page Émerveillée(s) */

// Gestionnaire de galeries multiples
const galleriesManager = {
    galleries: {},
    
    init: function() {
        // Initialiser toutes les galeries
        const galleries = document.querySelectorAll('.gallery-slideshow');
        galleries.forEach(gallery => {
            const id = gallery.id;
            this.galleries[id] = {
                currentSlide: 1,
                totalSlides: gallery.querySelectorAll('.gallery-slide').length
            };
            this.showSlide(id, 1);
        });
    },

    showSlide: function(galleryId, slideNumber) {
        const gallery = document.getElementById(galleryId);
        const slides = gallery.querySelectorAll('.gallery-slide');
        const dots = gallery.parentElement.querySelectorAll('.dot');
        
        if (slideNumber > this.galleries[galleryId].totalSlides) {
            this.galleries[galleryId].currentSlide = 1;
        }
        if (slideNumber < 1) {
            this.galleries[galleryId].currentSlide = this.galleries[galleryId].totalSlides;
        }
        
        // Cacher toutes les slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Désactiver tous les dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Afficher la slide courante
        slides[this.galleries[galleryId].currentSlide - 1].classList.add('active');
        
        // Activer le dot correspondant
        if (dots.length > 0) {
            dots[this.galleries[galleryId].currentSlide - 1].classList.add('active');
        }
    },

    changeSlide: function(galleryId, direction) {
        this.galleries[galleryId].currentSlide += direction;
        this.showSlide(galleryId, this.galleries[galleryId].currentSlide);
    },

    goToSlide: function(galleryId, slideNumber) {
        this.galleries[galleryId].currentSlide = slideNumber;
        this.showSlide(galleryId, slideNumber);
    }
};

// Gestionnaire de menu dropdown
const menuManager = {
    init: function() {
        const dropdowns = document.querySelectorAll('.ui.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });

        // Fermer les dropdowns en cliquant ailleurs
        document.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    galleriesManager.init();
    menuManager.init();
});


// emerveillees-video.js - Gestion du lecteur vidéo Émerveillées
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const playButton = document.getElementById('playButton');
    const vimeoPlayer = document.getElementById('vimeoPlayer');
    const closeVideo = document.getElementById('closeVideo');
    
    // Vérifier que tous les éléments existent
    if (videoContainer && videoThumbnail && playButton && vimeoPlayer && closeVideo) {
        
        // Fonction pour ouvrir la vidéo
        function openVideo() {
            videoThumbnail.style.display = 'none';
            playButton.style.display = 'none';
            vimeoPlayer.classList.add('active');
            closeVideo.classList.add('active');
            
            // Démarrer la vidéo automatiquement
            const iframe = vimeoPlayer.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                if (src.indexOf('autoplay=1') === -1) {
                    iframe.src = src + '&autoplay=1';
                }
            }
        }
        
        // Fonction pour fermer la vidéo
        function closeVideoPlayer() {
            videoThumbnail.style.display = 'block';
            playButton.style.display = 'flex';
            vimeoPlayer.classList.remove('active');
            closeVideo.classList.remove('active');
            
            // Arrêter la vidéo
            const iframe = vimeoPlayer.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src.replace('&autoplay=1', '');
            }
        }
        
        // Événements de clic
        videoThumbnail.addEventListener('click', openVideo);
        playButton.addEventListener('click', openVideo);
        closeVideo.addEventListener('click', closeVideoPlayer);
        
        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && vimeoPlayer.classList.contains('active')) {
                closeVideoPlayer();
            }
        });
    }
});
