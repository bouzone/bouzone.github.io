/* emerveillees.js - Scripts spécifiques à la page Émerveillée(s) - Version améliorée */

// Gestionnaire de galeries multiples avec focus et navigation clavier
const galleriesManager = {
    galleries: {},
    activeGallery: null,
    keyboardEnabled: true,
    
    init: function() {
        // Initialiser toutes les galeries
        const galleries = document.querySelectorAll('.gallery-slideshow');
        galleries.forEach(gallery => {
            const id = gallery.id;
            this.galleries[id] = {
                currentSlide: 1,
                totalSlides: gallery.querySelectorAll('.gallery-slide').length,
                element: gallery,
                hasFocus: false
            };
            this.showSlide(id, 1);
            this.setupGalleryEvents(id);
        });
        
        // Initialiser la navigation clavier globale
        this.setupKeyboardNavigation();
    },

    setupGalleryEvents: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        const parentContainer = gallery.parentElement;
        
        // Rendre la galerie focusable
        gallery.setAttribute('tabindex', '0');
        
        // Événements de focus
        gallery.addEventListener('focus', () => {
            this.setActiveGallery(galleryId);
        });
        
        gallery.addEventListener('blur', () => {
            this.removeActiveGallery(galleryId);
        });
        
        // Événements de clic pour donner le focus
        gallery.addEventListener('click', (e) => {
            e.preventDefault();
            this.setActiveGallery(galleryId);
            gallery.focus();
        });
        
        // Événements sur les boutons de navigation
        const prevButton = parentContainer.querySelector('.gallery-prev');
        const nextButton = parentContainer.querySelector('.gallery-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.navigateSlide(galleryId, -1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.navigateSlide(galleryId, 1);
            });
        }
        
        // Événements sur les dots
        const dots = parentContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setActiveGallery(galleryId);
                this.goToSlide(galleryId, index + 1);
            });
        });
    },

    setupKeyboardNavigation: function() {
        document.addEventListener('keydown', (e) => {
            if (!this.keyboardEnabled || !this.activeGallery) return;
            
            // Vérifier si on est dans un champ de saisie
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigateSlide(this.activeGallery, -1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateSlide(this.activeGallery, 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(this.activeGallery, 1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.activeGallery, this.galleries[this.activeGallery].totalSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.removeActiveGallery(this.activeGallery);
                    break;
            }
        });
    },

    setActiveGallery: function(galleryId) {
        // Désactiver la galerie précédente
        if (this.activeGallery && this.activeGallery !== galleryId) {
            this.removeActiveGallery(this.activeGallery);
        }
        
        // Activer la nouvelle galerie
        this.activeGallery = galleryId;
        this.galleries[galleryId].hasFocus = true;
        
        // Ajouter une classe visuelle pour indiquer le focus
        const gallery = document.getElementById(galleryId);
        gallery.classList.add('gallery-focused');
        
        // Optionnel: ajouter un indicateur visuel
        this.updateFocusIndicator(galleryId);
    },

    removeActiveGallery: function(galleryId) {
        if (this.galleries[galleryId]) {
            this.galleries[galleryId].hasFocus = false;
        }
        
        if (this.activeGallery === galleryId) {
            this.activeGallery = null;
        }
        
        // Retirer la classe visuelle
        const gallery = document.getElementById(galleryId);
        gallery.classList.remove('gallery-focused');
        gallery.blur();
        
        // Retirer l'indicateur visuel
        this.removeFocusIndicator(galleryId);
    },

    updateFocusIndicator: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        const parentContainer = gallery.parentElement;
        
        // Créer ou mettre à jour l'indicateur de focus
        let indicator = parentContainer.querySelector('.gallery-focus-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'gallery-focus-indicator';
            indicator.innerHTML = '⌨️ Navigation clavier active';
            parentContainer.appendChild(indicator);
        }
        indicator.style.display = 'block';
    },

    removeFocusIndicator: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        const parentContainer = gallery.parentElement;
        const indicator = parentContainer.querySelector('.gallery-focus-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    },

    navigateSlide: function(galleryId, direction) {
        if (!this.galleries[galleryId]) return;
        
        const newSlide = this.galleries[galleryId].currentSlide + direction;
        let targetSlide = newSlide;
        
        // Gestion du bouclage
        if (newSlide > this.galleries[galleryId].totalSlides) {
            targetSlide = 1;
        } else if (newSlide < 1) {
            targetSlide = this.galleries[galleryId].totalSlides;
        }
        
        this.galleries[galleryId].currentSlide = targetSlide;
        this.showSlide(galleryId, targetSlide);
    },

    showSlide: function(galleryId, slideNumber) {
        const gallery = document.getElementById(galleryId);
        const slides = gallery.querySelectorAll('.gallery-slide');
        const parentContainer = gallery.parentElement;
        const dots = parentContainer.querySelectorAll('.dot');
        
        // Validation du numéro de slide
        if (slideNumber > this.galleries[galleryId].totalSlides) {
            this.galleries[galleryId].currentSlide = 1;
        } else if (slideNumber < 1) {
            this.galleries[galleryId].currentSlide = this.galleries[galleryId].totalSlides;
        } else {
            this.galleries[galleryId].currentSlide = slideNumber;
        }
        
        const currentSlide = this.galleries[galleryId].currentSlide;
        
        // Cacher toutes les slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Désactiver tous les dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Afficher la slide courante
        if (slides[currentSlide - 1]) {
            slides[currentSlide - 1].classList.add('active');
        }
        
        // Activer le dot correspondant
        if (dots.length > 0 && dots[currentSlide - 1]) {
            dots[currentSlide - 1].classList.add('active');
        }
        
        // Mettre à jour le compteur si présent
        this.updateSlideCounter(galleryId, currentSlide);
    },

    updateSlideCounter: function(galleryId, currentSlide) {
        const gallery = document.getElementById(galleryId);
        const parentContainer = gallery.parentElement;
        const counter = parentContainer.querySelector('.gallery-counter');
        
        if (counter) {
            counter.textContent = `${currentSlide} / ${this.galleries[galleryId].totalSlides}`;
        }
    },

    goToSlide: function(galleryId, slideNumber) {
        this.galleries[galleryId].currentSlide = slideNumber;
        this.showSlide(galleryId, slideNumber);
    },

    // Méthodes pour désactiver/activer temporairement la navigation clavier
    disableKeyboard: function() {
        this.keyboardEnabled = false;
    },

    enableKeyboard: function() {
        this.keyboardEnabled = true;
    },

    // Méthode pour obtenir des informations sur la galerie active
    getActiveGalleryInfo: function() {
        if (!this.activeGallery) return null;
        
        return {
            id: this.activeGallery,
            currentSlide: this.galleries[this.activeGallery].currentSlide,
            totalSlides: this.galleries[this.activeGallery].totalSlides
        };
    }
};

// Gestionnaire de menu dropdown (inchangé)
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

// Gestionnaire vidéo amélioré pour éviter les conflits
const videoManager = {
    init: function() {
        const videoContainer = document.getElementById('videoContainer');
        const videoThumbnail = document.getElementById('videoThumbnail');
        const playButton = document.getElementById('playButton');
        const vimeoPlayer = document.getElementById('vimeoPlayer');
        const closeVideo = document.getElementById('closeVideo');
        
        if (videoContainer && videoThumbnail && playButton && vimeoPlayer && closeVideo) {
            
            function openVideo() {
                // Désactiver la navigation clavier des galeries pendant la vidéo
                galleriesManager.disableKeyboard();
                
                videoThumbnail.style.display = 'none';
                playButton.style.display = 'none';
                vimeoPlayer.classList.add('active');
                closeVideo.classList.add('active');
                
                const iframe = vimeoPlayer.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    if (src.indexOf('autoplay=1') === -1) {
                        iframe.src = src + '&autoplay=1';
                    }
                }
            }
            
            function closeVideoPlayer() {
                // Réactiver la navigation clavier des galeries
                galleriesManager.enableKeyboard();
                
                videoThumbnail.style.display = 'block';
                playButton.style.display = 'flex';
                vimeoPlayer.classList.remove('active');
                closeVideo.classList.remove('active');
                
                const iframe = vimeoPlayer.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    iframe.src = src.replace('&autoplay=1', '');
                }
            }
            
            videoThumbnail.addEventListener('click', openVideo);
            playButton.addEventListener('click', openVideo);
            closeVideo.addEventListener('click', closeVideoPlayer);
            
            // Gestion spéciale de la touche Échap pour la vidéo
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && vimeoPlayer.classList.contains('active')) {
                    e.preventDefault();
                    closeVideoPlayer();
                }
            });
        }
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    galleriesManager.init();
    menuManager.init();
    videoManager.init();
});

// Exposition des méthodes pour utilisation externe si nécessaire
window.galleriesManager = galleriesManager;