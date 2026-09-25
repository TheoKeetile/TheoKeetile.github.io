# theokeetile.github.io

Personal portfolio site for Theo Keetile, mechatronic engineer and data scientist.

Live at **https://theokeetile.github.io** once GitHub Pages is enabled.

## Publishing

1. Create a **public** repository on GitHub named exactly `TheoKeetile.github.io`. The name must match the account name for a user site.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/TheoKeetile/TheoKeetile.github.io.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. The site is usually live within a minute or two.

To update it later, edit the files and push again. There is no build step.

## Structure

```
index.html              Home
about.html              Background, skills, leadership
projects.html           Nine projects, grouped engineering / data science
certifications.html     Full academic record and short courses
karate.html             Karate record, coaching, gallery, certificate and reference
contact.html            Contact details and CV download
assets/css/style.css    All styling
assets/js/site.js       Navigation, image lightbox and scroll reveals
assets/img/             Portrait, dashboard screenshots, RoadAid app screens, karate photos
assets/video/           RoadAid demonstration video and its poster frame
assets/docs/            CV, project reports, certificates and the karate reference
```

Plain HTML and CSS with no framework, no build step and no dependencies beyond the Inter webfont from Google Fonts. Every page works standalone if opened directly from disk.

## Editing notes

- The navigation appears in each HTML file. Changing a nav item means changing it in all six.
- `aria-current="page"` marks the active nav link on each page. Keep it pointing at the right one.
- Project entries on `projects.html` are `<article class="project">` blocks. Copy an existing one to add another.
- Attached PDFs live in `assets/docs/` and are linked with `<a class="link-chip">`.
