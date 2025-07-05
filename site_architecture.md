# Architecture du site bou.zone

## Structure générale du projet

```
bou.zone/
├── index.html                    # Page d'accueil (blog)
├── README.md                     # Documentation du projet
├── 
├── pages/
│   ├── emerveillees.html         # Événement "Émerveillée(s)"
│   ├── helene-bou-bio.html       # Biographie / Who's Bou?
│   ├── dedale.html               # Spectacle "Dédale"
│   ├── tresses.html              # Spectacle "TresseS"
│   ├── quinn.html                # Archive "Quinn"
│   ├── opsis.html                # Archive "Opsis"
│   ├── videos.html               # Galerie vidéos
│   ├── echappees.html            # Réflexions / Échappées
│   ├── contact.html              # Page de contact
│   └── credits.html              # Crédits
├── 
├── css/
│   ├── bouzone.css               # Styles globaux
│   └── pages/
│       ├── index.css             # Styles spécifiques à l'accueil
│       ├── tresses.css           # Styles spécifiques au spectacle TresseS
│       ├── emerveillees.css      # Styles spécifiques à l'événement Émerveillée(s)
│	├── echappees.css         # Styles spécifiques à la galerie Échappées
│       └── videos.css            # Styles spécifiques à la galerie vidéos
├── 
├── js/
│   ├── bouzone.js                # Scripts JavaScript globaux
│   └── pages/
│       ├── videos.js             # Scripts spécifiques à la galerie vidéos
│       └── emerveillees.js       # Scripts spécifiques à l'événement Émerveillée(s)
├── 
├── images/
│   ├── dedale/                   # Images du spectacle Dédale
│   │ 
│   ├── tresses/                  # Images du spectacle TresseS
│   ├── emerveillees/             # Images de l'événement Émerveillée(s)
│   │
│   ├── quinn/                    # Images de l'archive Quinn
│   │
│   ├── Opsis			  # Images de l'archive Opsis
│   └── echappees                 # Image pour la galerie Échappées
├── 
├── favicon.svg                   # Favicon SVG
├── favicon.png                   # Favicon PNG
├── apple-touch-icon.png          # Icône Apple Touch
└── site.webmanifest              # Manifest pour PWA
```

## Structure de navigation

### Navigation principale
- **Accueil** (`emerveillees.html`) - Page d'accueil avec événement principal
- **Who's Bou?** (`helene-bou-bio.html#art`) - Biographie de l'artiste
- **Spectacles en cours** :
  - **Dédale** (`dedale.html#art`) - Spectacle principal
  - **TresseS** (`tresses.html#art`) - Spectacle principal
- **Archives** (menu déroulant) :
  - **Quinn** (`quinn.html#art`) - Ancienne création
  - **Opsis** (`opsis.html#art`) - Ancienne création
- **Vidéos** (`videos.html#art`) - Galerie multimédia
- **Échappées** (`echappees.html#art`) - Réflexions artistiques
- **Contact** (`contact.html`) - Informations de contact

### Pages secondaires
- **Crédits** (`credits.html`) - Mentions légales et crédits

## Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styling avec Semantic UI
- **JavaScript** - Interactivité (jQuery + Semantic UI)

### Frameworks/Librairies
- **Semantic UI 2.4.1** - Framework CSS via CDN
- **jQuery 3.6.0** - Manipulation DOM via CDN

### Optimisations
- **SEO** - Métadonnées complètes, Open Graph, Twitter Cards
- **Performance** - Preconnect, preload des ressources critiques
- **Accessibility** - Navigation ARIA, textes alternatifs
- **Schema.org** - Données structurées pour le blog

## Fonctionnalités identifiées

### Interface utilisateur
- Design responsive avec grille portfolio adaptative
- Navigation avec menu déroulant
- Retour en haut de page
- Icônes Semantic UI pour l'interface

### Contenus
- **Portfolio grid** - Présentation des spectacles et créations
- **Métadonnées riches** - Dates, durées, catégories
- **Intégration multimédia** - Images, vidéos
- **Liens externes** - Réseaux sociaux, sites partenaires

### Réseaux sociaux
- **Facebook** - Profil artiste
- **Vimeo** - Galerie vidéos
- **Email** - Contact direct

## Hébergement GitHub Pages

### Configuration requise
- Repository public sur GitHub
- Branche `main` ou `gh-pages` pour le déploiement
- Domaine personnalisé configuré : `bou.zone`

### Fichiers de configuration
- `site.webmanifest` - Configuration PWA
- `CNAME` - Configuration domaine personnalisé (à ajouter)

## Notes techniques

### Optimisations SEO
- Métadonnées multilingues (fr_FR)
- Structured data JSON-LD
- Balises meta Open Graph et Twitter Card
- URLs sémantiques avec ancres (#art)

### Performance
- CDN Cloudflare pour les ressources externes
- Préchargement des CSS critiques
- Optimisation des images (formats et tailles)

### Accessibilité
- Navigation ARIA
- Textes de remplacement pour les images
- Contraste et lisibilité optimisés
- Support clavier et lecteurs d'écran
