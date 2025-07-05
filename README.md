# bou.zone

Site web officiel de l'artiste Hélène Bou - Spectacles vivants et créations artistiques.

🌐 **Site en ligne** : [bouzone.github.io](https://bouzone.github.io)

## À propos

Site vitrine présentant les spectacles, créations et réflexions artistiques d'Hélène Bou. Le site met en avant les spectacles en cours, les archives des créations passées, ainsi qu'une galerie multimédia et des galeries artistiques.

## Structure du site

### Pages principales
- **Accueil** - Événement principal "Émerveillée(s)"
- **Who's Bou?** - Biographie de l'artiste
- **Spectacles en cours** :
  - **Dédale** - Spectacle principal
  - **TresseS** - Spectacle principal
- **Archives** - Créations passées (Quinn, Opsis)
- **Vidéos** - Galerie multimédia
- **Échappées** - Galeries artistiques
- **Contact** - Informations de contact

### Organisation des fichiers
```
bou.zone/
├── index.html                    # Page d'accueil
├── pages/                        # Pages du site
│   ├── emerveillees.html
│   ├── helene-bou-bio.html
│   ├── dedale.html
│   ├── tresses.html
│   ├── quinn.html
│   ├── opsis.html
│   ├── videos.html
│   ├── echappees.html
│   ├── contact.html
│   └── credits.html
├── css/                          # Styles
│   ├── bouzone.css
│   └── pages/
├── js/                           # Scripts JavaScript
│   ├── bouzone.js
│   └── pages/
├── images/                       # Images par projet
│   ├── dedale/
│   ├── tresses/
│   ├── emerveillees/
│   ├── quinn/
│   ├── opsis/
│   └── echappees/
└── favicon.svg                   # Icônes et manifest
```

## Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styling responsive
- **JavaScript** - Interactivité
- **Semantic UI 2.4.1** - Framework CSS
- **jQuery 3.6.0** - Manipulation DOM

## Fonctionnalités

### Interface utilisateur
- ✅ Design responsive avec grille portfolio adaptative
- ✅ Navigation avec menu déroulant
- ✅ Retour en haut de page
- ✅ Interface accessible (ARIA, support clavier)

### Contenu
- ✅ Portfolio grid pour les spectacles
- ✅ Métadonnées riches (dates, durées, catégories)
- ✅ Intégration multimédia (images, vidéos)
- ✅ Liens vers réseaux sociaux et sites partenaires

### Optimisations
- ✅ SEO optimisé (métadonnées, Open Graph, Twitter Cards)
- ✅ Performance (préchargement, CDN)
- ✅ Accessibilité (ARIA, textes alternatifs)
- ✅ Données structurées Schema.org

## Hébergement GitHub Pages

### Configuration actuelle
- Repository public sur GitHub
- Déploiement automatique depuis la branche `main`
- URL : `https://bouzone.github.io`

### Fichiers de configuration
- `site.webmanifest` - Configuration PWA

## Développement local

### Prérequis
- Navigateur web moderne
- Serveur local (optionnel, pour éviter les problèmes CORS)

### Installation
```bash
# Cloner le repository
git clone https://github.com/bouzone/bouzone.github.io.git
cd bouzone.github.io

# Servir localement (optionnel)
python -m http.server 8000
# ou
npx serve .
```

### Modification du contenu
1. Éditer les fichiers HTML dans `pages/`
2. Ajouter les images dans le dossier `images/` approprié
3. Modifier les styles dans `css/` si nécessaire
4. Tester localement
5. Commit et push vers GitHub

## Réseaux sociaux

- **Facebook** - Profil artiste
- **Vimeo** - Galerie vidéos
- **Email** - Contact direct

## Maintenance

Ce site est maintenu exclusivement par l'artiste Hélène Bou.

Pour toute suggestion ou signalement d'erreur, merci de contacter directement via la page contact du site.

## Licence

© Hélène Bou - Tous droits réservés. Le contenu artistique et les images sont protégés par le droit d'auteur.

---

**Note technique** : Ce site utilise GitHub Pages pour l'hébergement gratuit et le déploiement automatique. Toute modification sur la branche `main` déclenche automatiquement la mise à jour du site en ligne.
