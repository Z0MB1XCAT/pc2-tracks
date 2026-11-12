# Maintaining PC2 Tracks

How the repo is laid out and how to add a track or a new version. Paths in angle brackets are on your own PC.

## Layout

- `docs/` is the website, served by GitHub Pages (Settings, Pages, branch `main`, folder `/docs`).
  - `index.html` is the page (Tailwind from its CDN, fonts from Google Fonts, no build step).
  - `tracks.json` is the track list. `repo` at the top is what every download link is built from.
  - `images/` holds track photos, gallery crops, the PC2 logo and the favicon.
  - `.nojekyll` tells GitHub Pages to serve the files as they are.
- `.github/` holds the README banner, the social preview image, issue forms and release notes.
- `serve.mjs` and `screenshot.mjs` are local preview tools, not used by the live site.
- Track zips are never committed (`.gitignore` blocks `*.zip`, `*.bff`, `*.dds`). They go on GitHub Releases.

## Preview the site locally

```
node serve.mjs
```

Open http://localhost:3000. Opening `docs/index.html` straight from disk won't load the track list.

`node screenshot.mjs http://localhost:3000 [label] [width] [height]` saves a screenshot to `temporary screenshots/`
using headless Edge or Chrome. Phone widths such as 390 work while `serve.mjs` is running.

## Adding a track or a new version

1. Zip the track package and create a release. Use `<track>-v<version>` as the tag and keep the zip name in the
   same style, then use the matching notes file from `.github/release-notes/`:
   ```
   gh release create spa-v1.0 Spa-for-PC2-v1.0.zip --title "Spa v1.0" --notes-file .github/release-notes/spa-v1.0.md
   ```
2. Make the web images with the scripts in the conversion project:
   ```
   python scripts/site_assets.py <track>.aiw <menu photo>.png <repo>/docs <slug>
   python scripts/site_gallery.py <repo>/docs <slug> "<screenshot>.png|<caption>" "<screenshot>.png|<caption>"
   ```
   `site_assets.py` writes the hero photos and prints the `outline` block. `site_gallery.py` crops cockpit
   screenshots to the windscreen band and prints the `gallery` block (leave `gallery` out to hide the strip).
3. Add an entry to `docs/tracks.json` (copy the Hungaroring one). `tag` and `file` must match the release exactly,
   and `sizeMB` is the zip size.
4. Add the track to the table in `README.md` and to the track dropdown in `.github/ISSUE_TEMPLATE/bug_report.yml`.
5. Commit and push. The site updates a minute or two later.

For a new version of an existing track, make a new release with a new tag (for example `hungaroring-v1.3`) and
update `version`, `released`, `tag`, `file` and `sizeMB` in its `tracks.json` entry and the README table.
