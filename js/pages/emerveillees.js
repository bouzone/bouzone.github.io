/* emerveillees.js - Scripts spécifiques à la page Émerveillée(s) */

// Gestionnaire de galeries multiples
const galleriesManager = {
    galleries: {},
    currentActiveGallery: 'gallery',
    
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
                totalSlides: gallery.querySelectorAll('.gallery-slide').length
            };
            
            console.log(`✅ Galerie "${id}" initialisée:`, this.galleries[id]);
            this.showSlide(id, 1);
        });
        
        // Détecter la galerie active initiale
        this.detectActiveGallery();
        
        // Configurer la navigation clavier
        this.setupKeyboardNavigation();
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

    // Fonction pour détecter quelle galerie est visible/active
    detectActiveGallery: function() {
        const galleries = Object.keys(this.galleries);
        let bestGallery = null;
        let bestScore = -1;
        
        for (let galleryId of galleries) {
            const gallery = document.getElementById(galleryId);
            if (!gallery) continue;
            
            const rect = gallery.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculer le score de visibilité
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(windowHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const score = visibleHeight / windowHeight;
            
            if (score > bestScore && score > 0.1) { // Au moins 10% visible
                bestScore = score;
                bestGallery = galleryId;
            }
        }
        
        if (bestGallery && bestGallery !== this.currentActiveGallery) {
            this.currentActiveGallery = bestGallery;
            console.log(`🎯 Galerie active changée pour: ${bestGallery}`);
            this.highlightActiveGallery();
        }
    },

    // Mettre en surbrillance la galerie active
    highlightActiveGallery: function() {
        const galleries = document.querySelectorAll('.gallery-slideshow');
        galleries.forEach(gallery => {
            gallery.classList.remove('keyboard-active');
        });
        
        const activeGallery = document.getElementById(this.currentActiveGallery);
        if (activeGallery) {
            activeGallery.classList.add('keyboard-active');
        }
    },

    // Configuration de la navigation clavier - VERSION DÉSOLIDARISÉE
    setupKeyboardNavigation: function() {
        const self = this;
        
        // Gestionnaire d'événements pour les touches clavier
        document.addEventListener('keydown', function(event) {
            // Vérifier si l'utilisateur n'est pas en train de taper dans un champ de saisie
            if (event.target.tagName === 'INPUT' || 
                event.target.tagName === 'TEXTAREA' || 
                event.target.isContentEditable) {
                return;
            }
            
            // Pour la navigation clavier, chaque galerie fonctionne indépendamment
            const galleries = Object.keys(self.galleries);
            
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    console.log('⬅️ Navigation gauche sur TOUTES les galeries');
                    // Naviguer dans toutes les galeries vers la gauche
                    galleries.forEach(galleryId => {
                        self.changeSlide(galleryId, -1);
                    });
                    break;
                    
                case 'ArrowRight':
                    event.preventDefault();
                    console.log('➡️ Navigation droite sur TOUTES les galeries');
                    // Naviguer dans toutes les galeries vers la droite
                    galleries.forEach(galleryId => {
                        self.changeSlide(galleryId, 1);
                    });
                    break;
                    
                case 'Home':
                    event.preventDefault();
                    console.log('🏠 Première slide sur TOUTES les galeries');
                    // Aller à la première slide de toutes les galeries
                    galleries.forEach(galleryId => {
                        self.goToSlide(galleryId, 1);
                    });
                    break;
                    
                case 'End':
                    event.preventDefault();
                    console.log('🔚 Dernière slide sur TOUTES les galeries');
                    // Aller à la dernière slide de toutes les galeries
                    galleries.forEach(galleryId => {
                        if (self.galleries[galleryId]) {
                            const totalSlides = self.galleries[galleryId].totalSlides;
                            self.goToSlide(galleryId, totalSlides);
                        }
                    });
                    break;
            }
        });
        
        // Mettre à jour la galerie active lors du scroll (pour l'affichage visuel)
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                self.detectActiveGallery();
            }, 100);
        });
        
        console.log('⌨️ Navigation clavier configurée - MODE DÉSOLIDARISÉ');
        console.log('📝 Les touches clavier agissent maintenant sur TOUTES les galeries simultanément');
    },

    // Fonction pour activer/désactiver le mode désolidarisé
    toggleKeyboardMode: function() {
        // Cette fonction peut être utilisée pour basculer entre les modes
        console.log('🔄 Basculement du mode clavier (non implémenté dans cette version)');
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
    console.log('📝 Utilisez les flèches ← → pour naviguer dans TOUTES les galeries simultanément');
    console.log('📝 Utilisez Home/End pour aller à la première/dernière slide de TOUTES les galeries');
    console.log('📝 Les boutons de navigation restent spécifiques à chaque galerie');
});

// Fonction de test pour la console
window.testNavigation = function() {
    console.log('🧪 Test de navigation...');
    if (window.galleriesManager) {
        const galleries = Object.keys(window.galleriesManager.galleries);
        if (galleries.length > 0) {
            const firstGallery = galleries[0];
            console.log(`📸 Test sur galerie: ${firstGallery}`);
            window.galleriesManager.changeSlide(firstGallery, 1);
            console.log('✅ Test terminé');
        } else {
            console.error('❌ Aucune galerie trouvée');
        }
    } else {
        console.error('❌ galleriesManager non disponible');
    }
};
