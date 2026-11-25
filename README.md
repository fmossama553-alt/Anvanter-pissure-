# Production & Bagouda — Inventaire

Mini application web de saisie et comparaison des quantités entre Production et Magasin (Bagouda).

## Fonctionnalités
- Saisie indépendante pour Épissure et Fil torsadé dans Production et Bagouda.
- Totaux et écarts calculés automatiquement.
- Sauvegarde locale automatique dans le navigateur (`localStorage`).
- Export du rapport en CSV.
- Impression ou enregistrement du rapport en PDF via la boîte d'impression.
- Interface responsive pour téléphone et PC.

## Lancer localement
Ouvrir `index.html` dans un navigateur. Aucun serveur ou installation nécessaire.

## Publier gratuitement avec GitHub Pages
1. Créez un nouveau repository GitHub (par exemple `production-bagouda-inventory`).
2. Importez les trois fichiers `index.html`, `style.css`, `app.js` et ce `README.md` à la racine du repository.
3. Dans le repository, allez dans **Settings → Pages**.
4. Sous **Build and deployment**, sélectionnez **Deploy from a branch**.
5. Choisissez `main` et `/ (root)`, puis **Save**.
6. Attendez le déploiement. GitHub affichera l'adresse publique du site dans la section Pages.

> Note : les quantités sont sauvegardées localement sur l'appareil et le navigateur utilisés. Elles ne sont pas partagées entre plusieurs téléphones/ordinateurs. Une base de données ou un backend sera nécessaire pour une synchronisation multi-utilisateurs.
