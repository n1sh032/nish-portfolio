# Nishanth's portfolio

A static portfolio built with HTML, CSS and JavaScript. Open `index.html` in a browser or serve the folder with a static web server. GitHub Pages publishes the root of `main`.

## File structure

| File | What to change here |
| --- | --- |
| `index.html` | Page sections, navigation, leadership and contact copy |
| `design.css` | Theme colours, font scale, page width, shared grid and motion settings |
| `style.css` | Styles for the workbench, project cards, timeline, and dialogs |
| `script.js` | Project writeups, filters, dialogs, theme preference and basketball demo |

## Design system

- **Colour**. Cream and forest green anchor the page. Apricot highlights selected items, and orange marks keyboard focus. The basketball scene keeps its burnt orange tones. Dark mode uses deeper greens and lighter accents.
- **Typography**. Space Grotesk for headings, DM Sans for reading, and the system monospace font for labels. Hero and section titles scale with the viewport.
- **Layout**. The page caps at 90rem with 6% side gutters. The shared grid defaults to two columns, supports a three column toolkit, and stacks at 650px. Leadership uses a wider first column on larger screens.
- **Motion**. Buttons respond in 200ms, project graphics ease in 300ms, and the basketball demo takes 2.4 seconds. With reduced motion enabled, the demo skips straight to its completion state.

Update shared values in `design.css` first. Keep styles specific to a single component in `style.css`.
