// Activation du sticky menu
$('.ui.sticky').sticky({
    context: '#article-grid'
});

// Activation des dropdowns
$('.ui.dropdown').dropdown({
    on: 'hover'
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Amélioration de l'accessibilité au clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Fermer les menus ouverts si nécessaire
        $('.ui.dropdown').dropdown('hide');
        document.activeElement.blur();
    }
});

// Initialisation des composants Semantic UI
$(document).ready(function() {
    // Sticky navigation
    $('.ui.sticky').sticky();
    
    // Dropdowns si présents
    $('.ui.dropdown').dropdown();
    
    // Mise à jour automatique de l'année
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scroll pour retour en haut
    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
    
    // Amélioration accessibilité liens externes
    $('a[target="_blank"]').attr('rel', 'noopener noreferrer');
});