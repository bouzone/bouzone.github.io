/* emerveillees.js - Scripts spécifiques à la page Émerveillée(s) */

// Gestionnaire de galeries multiples
const galleriesManager = {
    galleries: {},
    focusedGallery: null,
    
    init: function() {
        // Initialiser toutes les galeries
        const galleries = document.querySelectorAll('.gallery-slideshow');
        console.log('🔍 Initialisation des galeries:', galleries.length);
        
        galleries.forEach(gallery => {
            const id = gallery.id;
            if (!id) {
                console.warn('⚠️ Galerie sans ID détectée:', gallery);
                return;
            }
            
            this.galleries[id] = {
                currentSlide: 1,
                totalSlides: gallery.querySelectorAll('.gallery-slide').length,
                element: gallery
            };
            
            console.log(`✅ Galerie "${id}" initialisée:`, this.galleries[id]);
            this.showSlide(id, 1);
            this.setupGalleryInteraction(id);
        });
        
        // Configurer la navigation clavier globale
        this.setupKeyboardNavigation();
    },

    setupGalleryInteraction: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        
        const self = this;
        
        // Rendre la galerie focusable
        gallery.setAttribute('tabindex', '0');
        
        // Événements de focus/click sur la galerie
        gallery.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur les boutons de navigation
            if (e.target.closest('.gallery-nav') || 
                e.target.closest('.gallery-dots') ||
                e.target.classList.contains('gallery-prev') ||
                e.target.classList.contains('gallery-next') ||
                e.target.classList.contains('prev') ||
                e.target.classList.contains('next') ||
                e.target.classList.contains('dot')) {
                return;
            }
            
            self.focusGallery(galleryId);
        });
        
        // Focus au clic sur la galerie
        gallery.addEventListener('focus', function() {
            self.focusGallery(galleryId);
        });
        
        // Perdre le focus
        gallery.addEventListener('blur', function() {
            if (self.focusedGallery === galleryId) {
                self.unfocusGallery();
            }
        });
        
        // Ajouter les contrôles de navigation existants
        this.setupGalleryControls(galleryId);
    },

    setupGalleryControls: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        
        const self = this;
        
        // Boutons précédent/suivant (compatibilité avec les deux formats)
        const prevBtn = gallery.parentElement.querySelector('.gallery-prev') || 
                       gallery.parentElement.querySelector('.prev');
        const nextBtn = gallery.parentElement.querySelector('.gallery-next') || 
                       gallery.parentElement.querySelector('.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                self.changeSlide(galleryId, -1);
                self.focusGallery(galleryId);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                self.changeSlide(galleryId, 1);
                self.focusGallery(galleryId);
            });
        }
        
        // Dots de navigation
        const dots = gallery.parentElement.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                self.goToSlide(galleryId, index + 1);
                self.focusGallery(galleryId);
            });
        });
    },

    focusGallery: function(galleryId) {
        // Défocus la galerie précédente
        if (this.focusedGallery && this.focusedGallery !== galleryId) {
            this.unfocusGallery();
        }
        
        this.focusedGallery = galleryId;
        
        // Ajouter la classe visual
        const gallery = document.getElementById(galleryId);
        if (gallery) {
            gallery.classList.add('keyboard-focused');
            gallery.focus();
        }
        
        console.log(`🎯 Galerie "${galleryId}" active pour la navigation clavier`);
        
        // Afficher un indicateur temporaire
        this.showFocusIndicator(galleryId);
    },

    unfocusGallery: function() {
        if (this.focusedGallery) {
            const gallery = document.getElementById(this.focusedGallery);
            if (gallery) {
                gallery.classList.remove('keyboard-focused');
            }
            
            console.log(`🔄 Galerie "${this.focusedGallery}" désactivée`);
            this.focusedGallery = null;
        }
    },

    showFocusIndicator: function(galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        
        // Créer ou mettre à jour l'indicateur
        let indicator = gallery.querySelector('.focus-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'focus-indicator';
            indicator.innerHTML = '⌨️ Utilisez ← → pour naviguer';
            gallery.appendChild(indicator);
        }
        
        // Afficher l'indicateur
        indicator.style.display = 'block';
        indicator.style.opacity = '1';
        
        // Masquer après 3 secondes
        setTimeout(() => {
            if (indicator) {
                indicator.style.opacity = '0';
                setTimeout(() => {
                    if (indicator) {
                        indicator.style.display = 'none';
                    }
                }, 300);
            }
        }, 3000);
    },

    showSlide: function(galleryId, slideNumber) {
        if (!this.galleries[galleryId]) {
            console.error(`❌ Galerie "${galleryId}" non trouvée`);
            return;
        }
        
        const gallery = document.getElementById(galleryId);
        if (!gallery) {
            console.error(`❌ Élément galerie "${galleryId}" non trouvé dans le DOM`);
            return;
        }
        
        const slides = gallery.querySelectorAll('.gallery-slide');
        const dots = gallery.parentElement.querySelectorAll('.dot');
        
        // Gérer les limites
        if (slideNumber > this.galleries[galleryId].totalSlides) {
            this.galleries[galleryId].currentSlide = 1;
        } else if (slideNumber < 1) {
            this.galleries[galleryId].currentSlide = this.galleries[galleryId].totalSlides;
        } else {
            this.galleries[galleryId].currentSlide = slideNumber;
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
        const currentSlideIndex = this.galleries[galleryId].currentSlide - 1;
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
        }
        
        // Activer le dot correspondant
        if (dots.length > 0 && dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
        
        console.log(`📸 Galerie "${galleryId}" - Slide ${this.galleries[galleryId].currentSlide}/${this.galleries[galleryId].totalSlides}`);
    },

    changeSlide: function(galleryId, direction) {
        if (!this.galleries[galleryId]) {
            console.error(`❌ Impossible de changer slide - galerie "${galleryId}" non trouvée`);
            return;
        }
        
        const newSlide = this.galleries[galleryId].currentSlide + direction;
        this.showSlide(galleryId, newSlide);
    },

    goToSlide: function(galleryId, slideNumber) {
        if (!this.galleries[galleryId]) {
            console.error(`❌ Impossible d'aller à la slide - galerie "${galleryId}" non trouvée`);
            return;
        }
        
        this.showSlide(galleryId, slideNumber);
    },

    // Configuration de la navigation clavier
    setupKeyboardNavigation: function() {
        const self = this;
        
        // Gestionnaire d'événements pour les touches clavier
        document.addEventListener('keydown', function(event) {
            // Vérifier si une galerie est focusée
            if (!self.focusedGallery) {
                return;
            }
            
            // Vérifier si l'utilisateur n'est pas en train de taper dans un champ de saisie
            if (event.target.tagName === 'INPUT' || 
                event.target.tagName === 'TEXTAREA' || 
                event.target.isContentEditable) {
                return;
            }
            
            const galleryId = self.focusedGallery;
            
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    console.log(`⬅️ Navigation gauche sur: ${galleryId}`);
                    self.changeSlide(galleryId, -1);
                    break;
                    
                case 'ArrowRight':
                    event.preventDefault();
                    console.log(`➡️ Navigation droite sur: ${galleryId}`);
                    self.changeSlide(galleryId, 1);
                    break;
                    
                case 'Home':
                    event.preventDefault();
                    console.log(`🏠 Première slide sur: ${galleryId}`);
                    self.goToSlide(galleryId, 1);
                    break;
                    
                case 'End':
                    event.preventDefault();
                    console.log(`🔚 Dernière slide sur: ${galleryId}`);
                    if (self.galleries[galleryId]) {
                        const totalSlides = self.galleries[galleryId].totalSlides;
                        self.goToSlide(galleryId, totalSlides);
                    }
                    break;
                    
                case 'Escape':
                    event.preventDefault();
                    console.log(`🚫 Désactivation du focus sur: ${galleryId}`);
                    self.unfocusGallery();
                    break;
            }
        });
        
        // Clic en dehors d'une galerie pour perdre le focus
        document.addEventListener('click', function(event) {
            const clickedGallery = event.target.closest('.gallery-slideshow');
            if (!clickedGallery && self.focusedGallery) {
                self.unfocusGallery();
            }
        });
        
        console.log('⌨️ Navigation clavier configurée');
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

// Gestionnaire vidéo
const videoManager = {
    init: function() {
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
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation des managers...');
    
    galleriesManager.init();
    menuManager.init();
    videoManager.init();
    
    // Rendre galleriesManager accessible globalement pour les tests
    window.galleriesManager = galleriesManager;
    
    console.log('✅ Initialisation terminée');
    console.log('📝 Cliquez sur une galerie pour l\'activer, puis utilisez les flèches ← →');
    console.log('📝 Utilisez Home/End pour aller à la première/dernière slide');
    console.log('📝 Utilisez Échap pour désactiver le focus');
});

// Fonction de test pour la console
window.testNavigation = function(galleryId) {
    console.log('🧪 Test de navigation...');
    if (window.galleriesManager) {
        const targetGallery = galleryId || Object.keys(window.galleriesManager.galleries)[0];
        if (targetGallery && window.galleriesManager.galleries[targetGallery]) {
            console.log(`📸 Test sur galerie: ${targetGallery}`);
            window.galleriesManager.focusGallery(targetGallery);
            window.galleriesManager.changeSlide(targetGallery, 1);
            console.log('✅ Test terminé');
        } else {
            console.error('❌ Galerie non trouvée:', targetGallery);
        }
    } else {
        console.error('❌ galleriesManager non disponible');
    }
};