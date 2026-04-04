/* =============================================
   FILTRES DU BLOG — bouzone
   ============================================= */

(function () {
    'use strict';

    function updateGridCount(grid, visibleCount) {
        // Met à jour data-count pour que index.css gère les colonnes
        // On plafonne à 6 car au-delà index.css utilise le même style
        const count = Math.min(visibleCount, 6);
        grid.setAttribute('data-count', count);
    }

    function filterItems(category, grid, items, emptyMsg) {
        let visibleCount = 0;

        items.forEach(function (item) {
            const itemCategory = item.getAttribute('data-category');
            const match = category === 'tout'
                ? itemCategory !== 'archives'  // "Tout" exclut les archives
                : itemCategory === category;

            if (match) {
                item.classList.remove('hidden');
                item.classList.add('appearing');
                visibleCount++;

                item.addEventListener('animationend', function handler() {
                    item.classList.remove('appearing');
                    item.removeEventListener('animationend', handler);
                });
            } else {
                item.classList.add('hidden');
                item.classList.remove('appearing');
            }
        });

        // Mettre à jour data-count → index.css s'occupe du reste
        updateGridCount(grid, visibleCount);

        // Message si aucun résultat
        if (emptyMsg) {
            emptyMsg.classList.toggle('visible', visibleCount === 0);
        }
    }

    function initFilters() {
        const grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        const items = Array.from(grid.querySelectorAll('.portfolio-item:not(.filter-empty)'));
        const filterBtns = document.querySelectorAll('.filter-btn');
        const emptyMsg = grid.querySelector('.filter-empty');

        if (!filterBtns.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const category = btn.getAttribute('data-filter');

                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                filterItems(category, grid, items, emptyMsg);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilters);
    } else {
        initFilters();
    }

})();

