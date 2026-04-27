# QR Workshop Generator

A web-based QR code generator workshop built with [`@qr-platform/qr-code.js`](https://qr-platform.github.io/qr-code.js/). The app is designed for GitHub Pages hosting and focuses on obvious, interactive controls so users can shape QR visuals quickly.

## Features

- Live QR preview while editing payload and styling.
- Full style controls for:
  - dot type
  - corner square type
  - corner dot type
  - corner sharpness profile
  - shape (square or circle)
  - color palette
  - optional dot gradient
- Upload and embed custom images/logos.
- Artistic style presets for fast direction changes.
- One-click randomizer for exploratory design.
- Export to `PNG`, `SVG`, `JPEG`, or `WEBP`.

## Project Structure

- `index.html` - UI layout and all workshop controls.
- `styles.css` - Professional, responsive design system.
- `app.js` - QRCode.js integration, state handling, presets, randomizer, and export logic.
- `.github/workflows/deploy-pages.yml` - GitHub Pages deployment pipeline.

## Local Development

1. Clone the repository.
2. Run a static file server from the project root:

```bash
python3 -m http.server 4173
```

3. Open [http://localhost:4173](http://localhost:4173).

## GitHub Pages Deployment

This project is configured to auto-deploy on pushes to `main` via `.github/workflows/deploy-pages.yml`.

1. In GitHub, go to `Settings > Pages`.
2. Set the source to `GitHub Actions`.
3. Push to `main` and wait for the `Deploy GitHub Pages` workflow.

After deployment, the site URL will appear in the workflow output and on the repository Pages settings screen.

## Development Notes

- The app imports the QR library from CDN ESM:
  - `https://cdn.jsdelivr.net/npm/@qr-platform/qr-code.js@latest/+esm`
- The QR instance is created once and updated in place with `qrCode.update(...)` for smooth interactions.
- Image uploads are read via `FileReader` and passed into `QRCodeJs` as a data URL.
- Corner sharpness is implemented as a profile helper that maps slider values to corner style behavior when corner controls are set to `Auto`.
- Gradient rotation is controlled in degrees in the UI and converted to radians for QRCode.js.

## Future Improvements

- Add save/load for style presets using local storage and exportable JSON.
- Add accessibility pass for keyboard-only slider manipulation hints and contrast checks.
- Add QR scan validation inside the browser (decode after render).
- Add guided workshop mode with preset checkpoints and undo/redo history.
- Add CI checks for formatting/linting and visual regression snapshots.
- Add optional PWA packaging so the generator can be used offline in workshops.
