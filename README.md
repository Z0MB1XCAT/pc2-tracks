# PC2 Tracks

Download page for my Assetto Corsa track conversions for Project CARS 2. The site lives in `docs/` and is served by
GitHub Pages. The track zips themselves are not in this repo, they are attached to GitHub Releases (one release per
track version), because the files are far bigger than git allows.

## Preview the site on your PC

```
node serve.mjs
```

Then open http://localhost:3000. Opening `docs/index.html` straight from disk won't load the track list, so use the server.

`node screenshot.mjs http://localhost:3000 [label] [width] [height]` saves a screenshot to `temporary screenshots/`
(phone widths like 390 work too, as long as `serve.mjs` is running).

## Adding a track or a new version

1. Zip the track package and create a release for it, for example:
   ```
   gh release create spa-v1.0 Spa-for-PC2-v1.0.zip --title "Spa v1.0" --notes "Install: unzip, run Install.bat, activate in JSGME."
   ```
2. Make the web images and the circuit outline with `scripts/site_assets.py` from the conversion project:
   ```
   python scripts/site_assets.py <track>.aiw <menu photo>.png "C:\Users\dexte\Documents\pc2-tracks\docs" <slug>
   ```
   It writes `docs/images/<slug>-1920.jpg` and `-960.jpg` and prints the `outline` block for `tracks.json`.
3. Add an entry to `docs/tracks.json` (copy the Hungaroring one). `tag` and `file` must match the release exactly,
   and `sizeMB` is the zip size.
4. Commit and push. The page updates by itself a minute or two later.

For a new version of an existing track, make a new release with a new tag (for example `hungaroring-v1.3`) and change
`version`, `released`, `tag`, `file` and `sizeMB` in its entry.

## Files

- `docs/index.html`: the page (Tailwind from its CDN, fonts from Google Fonts, no build step)
- `docs/tracks.json`: the track list, plus `repo`, which the download links are built from
- `docs/images/`: track photos
- `docs/.nojekyll`: tells GitHub Pages to serve the files as they are
- `serve.mjs`, `screenshot.mjs`: local preview tools, not used by the live site
