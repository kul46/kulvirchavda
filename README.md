# Kulvir Chavda - personal website

A responsive, static portfolio for **kulvirchavda.com**, designed for GitHub Pages. No framework, package installation, database, or build step is required.

## Preview locally

From this folder, run:

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

Then open http://127.0.0.1:4174. If Python is not on PATH, use the Python executable installed with Codex. Opening `index.html` directly also works for reviewing the site; copying an email address may require localhost or HTTPS.

## Where to edit

| File | Purpose |
| --- | --- |
| `index.html` | Homepage and project highlights |
| `nomora.html` | Current CMU research, concept diagram, and high-level brief |
| `projects.html` | Seven expandable engineering projects, each with one full description |
| `research.html` | Prior research, publication, and demonstration video |
| `work.html` | Industry experience and mentorship |
| `education.html` | About, education, skills, and awards |
| `css/style.css` | Shared design, layout, responsive styles, and reduced-motion support |
| `css/portfolio.css` | Project galleries, video layout, terrain accents, and phone refinements |
| `css/night.css` | Dark palette, orbital and terrain layers, project register, and media strips |
| `css/motion.css` | Vector icons, iOS control styling, full image boards, and the scroll-driven vehicle illustration |
| `css/precision.css` | Black palette, project hover illumination, subtle page lighting, full research images, and refined schematic rendering |
| `js/script.js` | Mobile navigation, project expansion, media strips/viewer, scroll motion, and email copying |
| `files/cv.pdf` | Supplied August 2026 CV |
| `images/optimized/` | Smaller WebP copies of existing portfolio photographs |
| `videos/optimized/` | Browser-compatible MP4 videos and mobile playback sources |

The HTML files are the source of truth. Navigation and footer are deliberately static, so they remain usable without JavaScript; update all six pages if their shared links or contact details change. Project entries and media strips work with native disclosure and scrolling. JavaScript adds direct-link expansion, media controls, an image viewer, and scroll-linked background movement. Reduced-motion preferences disable the decorative movement.

The fonts load from Google Fonts with local serif/sans-serif fallbacks. There are no analytics, tracking scripts, form services, or embedded third-party media. Original photos, project boards, and videos remain available in the repository.

## Content and privacy

- Past roles, dates, awards, and metrics use the August 2026 CV and retained portfolio material.
- CMU enrollment and the current research direction were confirmed by Kulvir on October 27, 2026.
- NOMORA has only a short, high-level public introduction and a conceptual illustration. Research methods, implementation details, and development plans are intentionally omitted.
- All 15 earlier projects and roles remain represented alongside NOMORA. Research, experience, and projects each have one primary location. The homepage provides short entry points; the Projects page no longer repeats a card index before full descriptions.
- The supplied August 2026 CV download is unchanged and labeled by date.
- Videos use H.264/AAC MP4 copies with fast-start metadata for inline playback. Originals are retained.
- Caption-free media strips are visible within each entry. Images expand in a viewer with previous/next buttons, arrow keys, Escape, and focus return. The descriptions accompanying the media remain in the project text.
- L1 rocket, indoor skydiving robot, Falcon 9 CAD, and home solar use their complete image boards as primary media, with single-image zoom. Cosmological uses its logo as the primary image. Header images are omitted from their accompanying media strips.
- Navigation and structured metadata omit the GitHub profile. Arrow icons are inline SVG paths so their rendering does not depend on platform emoji fonts.
- The homepage illustration morphs a shared SVG silhouette across three conceptual engineering interests. Native scrolling drives the geometry. Reduced-motion preferences and short landscape viewports use selectable static stages instead of a pinned sequence.

## Validation

```powershell
python scripts/check_site.py
node --check js/script.js
python scripts/check_illustration.py
```

The Python check verifies local assets, path capitalization for Linux/GitHub Pages, fragments, duplicate IDs, image alt attributes, basic metadata, and the custom domain. Also review the site in a browser at phone and desktop sizes after layout changes.

The October 27 revision was checked at 320, 360, 390, 430, 768, and 1280 CSS pixels across all six pages. Browser checks covered all seven project filters, mobile menu navigation and Escape, in-page galleries and focus return, email copying, and playback of all six videos. This is browser-based responsive testing, not certification on physical iOS or Android devices.

The October 28 dark revision was checked across all six pages at 320, 390, 768, and 1280 CSS pixels. Phone interaction checks covered the expandable project register, media-strip controls, viewer next/previous, Escape, and menu navigation. The Parkland qualification now explicitly says Licensed Private Pilot, and the bio identifies flying planes.

The later motion revision was checked on all six pages at 320, 390, 430, 768, 1024, 1280, and 1920 CSS pixels. Browser interactions verified the three distinct SVG hull shapes, phone stage selection, 844×390 landscape fallback, full project-board images, single-image zoom, and menu colors. Physical iPhone Safari was not available for testing; the platform-specific text arrows were replaced with SVG and native button appearance was explicitly reset.

The precision pass uses mirrored top-down vehicle assemblies. The hull check samples 202 intermediate outlines for bilateral symmetry, closure, and intersecting edges. Responsive checks also verify that the aircraft fits inside the illustration area at all seven widths. Closed project entries use text, discipline labels, and hover illumination with the standard system cursor. N-ACXIS and trajectory modelling display complete primary images. Secondary pages have restrained scroll-linked lighting that shifts from green and warm tones toward slate blue; the homepage retains its existing lighting. Reduced-motion preferences keep the lighting static.

## Publishing on the existing GitHub Pages site

Develop updates on a branch and review the local preview before publishing. Commit and push the branch, open a pull request, and merge the approved changes into the branch configured in **GitHub → Settings → Pages**. GitHub Pages then publishes the update. The initial redesign branch is `redesign/portfolio-2026`. Keep the existing DNS and `CNAME` configuration.

Keep `CNAME` set to `kulvirchavda.com`. The existing `.html` URLs are preserved. `.nojekyll` allows direct static serving. The canonical URLs, sitemap, and robots file use the existing apex domain. GitHub Pages can serve this design without a hosting migration.

## Public repository vs. editing permission

Public visibility means people can read the repository and make copies. It does not grant them permission to push changes. The owner and authorized collaborators control changes; other people can propose pull requests.

The repository metadata confirmed public visibility and admin/push permission for the connected account. The full collaborator list, deploy keys, installed apps, and branch protection rules have not been audited.

Inspect access at https://github.com/kul46/kulvirchavda/settings/access and Pages configuration at https://github.com/kul46/kulvirchavda/settings/pages. On GitHub Free, making the repository private can unpublish the Pages site. Keep the present setup unless intentionally changing the hosting plan.

References: [GitHub personal repository permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository), [repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).
