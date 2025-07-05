/**
 * videos.js - Script pour la page portfolio vidéos
 * Gestion des filtres et de la lecture vidéo en modal
 */


(function() {
    'use strict';
    
    const VideoPortfolioManager = {
        init: function() {
            this.bindFilterEvents();
            this.bindVideoEvents();
        },
        
        bindFilterEvents: function() {
            const filterButtons = document.querySelectorAll('.video-filter-button');
            const portfolioItems = document.querySelectorAll('.video-portfolio-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    portfolioItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        if (filter === 'all' || category === filter) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });
        },
        
        bindVideoEvents: function() {
            const modal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            const closeBtn = document.querySelector('.video-portfolio-modal-close');
            
            // Événements sur les overlays ET les items entiers
            document.querySelectorAll('.video-portfolio-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const overlay = this.querySelector('.video-portfolio-overlay');
                    const videoSrc = overlay.getAttribute('data-video');
                    
                      if (videoSrc && videoSrc !== 'undefined') {
                        // Ajouter autoplay à l'URL
                        let finalVideoSrc = videoSrc;
                        if (videoSrc.includes('vimeo.com')) {
                            finalVideoSrc = videoSrc.includes('?') ? 
                                videoSrc + '&autoplay=1' : 
                                videoSrc + '?autoplay=1';
                        } else if (videoSrc.includes('youtube.com')) {
                            finalVideoSrc = videoSrc.includes('?') ? 
                                videoSrc + '&autoplay=1' : 
                                videoSrc + '?autoplay=1';
                        }
                        
                        modalVideo.src = finalVideoSrc;
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            const closeModal = () => {
                modal.classList.remove('show');
                modalVideo.src = '';
                document.body.style.overflow = '';
            };
            
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            
            // Fermeture en cliquant en dehors
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Fermeture avec Échap
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });
        }
    };
    
    // Initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            VideoPortfolioManager.init();
        });
    } else {
        VideoPortfolioManager.init();
    }
})();

