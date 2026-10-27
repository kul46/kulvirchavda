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
| `projects.html` | Filterable project index and student project stories |
| `research.html` | Prior research, publication, and demonstration video |
| `work.html` | Industry experience and mentorship |
| `education.html` | About, education, skills, and awards |
| `css/style.css` | Shared design, layout, responsive styles, and reduced-motion support |
| `css/portfolio.css` | Project galleries, video layout, terrain accents, and phone refinements |
| `js/script.js` | Mobile navigation, project filters, media viewers, and email copying |
| `files/cv.pdf` | Supplied August 2026 CV |
| `images/optimized/` | Smaller WebP copies of existing portfolio photographs |
| `videos/optimized/` | Browser-compatible MP4 videos and mobile playback sources |

The HTML files are the source of truth. Navigation and footer are deliberately static, so they remain usable without JavaScript; update all six pages if their shared links or contact details change. Project filters, media viewers, and copy-email buttons progressively enhance the working HTML.

The fonts load from Google Fonts with local serif/sans-serif fallbacks. There are no analytics, tracking scripts, form services, or embedded third-party media. Original photos, project boards, and videos remain available in the repository.

## Content and privacy

- Past roles, dates, awards, and metrics use the August 2026 CV and retained portfolio material.
- CMU enrollment and the current research direction were confirmed by Kulvir on October 27, 2026.
- NOMORA has only a short, high-level public introduction and a conceptual illustration. Research methods, implementation details, and development plans are intentionally omitted.
- All 15 earlier projects and roles are represented, alongside NOMORA. The project index links to full sections rather than image files.
- The supplied August 2026 CV download is unchanged and labeled by date.
- Videos use H.264/AAC MP4 copies with fast-start metadata for inline playback. Originals are retained.
- Image galleries open within the page and support Escape, close controls, and focus return.

## Validation

```powershell
python scripts/check_site.py
node --check js/script.js
```

The Python check verifies local assets, path capitalization for Linux/GitHub Pages, fragments, duplicate IDs, image alt attributes, basic metadata, and the custom domain. Also review the site in a browser at phone and desktop sizes after layout changes.

The October 27 revision was checked at 320, 360, 390, 430, 768, and 1280 CSS pixels across all six pages. Browser checks covered all seven project filters, mobile menu navigation and Escape, in-page galleries and focus return, email copying, and playback of all six videos. This is browser-based responsive testing, not certification on physical iOS or Android devices.

## Publishing on the existing GitHub Pages site

Develop updates on a branch and review the local preview before publishing. Commit and push the branch, open a pull request, and merge the approved changes into the branch configured in **GitHub → Settings → Pages**. GitHub Pages then publishes the update. The initial redesign branch is `redesign/portfolio-2026`. Keep the existing DNS and `CNAME` configuration.

Keep `CNAME` set to `kulvirchavda.com`. The existing `.html` URLs are preserved. `.nojekyll` allows direct static serving. The canonical URLs, sitemap, and robots file use the existing apex domain. GitHub Pages can serve this design without a hosting migration.

## Public repository vs. editing permission

Public visibility means people can read the repository and make copies. It does not grant them permission to push changes. The owner and authorized collaborators control changes; other people can propose pull requests.

The repository metadata confirmed public visibility and admin/push permission for the connected account. The full collaborator list, deploy keys, installed apps, and branch protection rules have not been audited.

Inspect access at https://github.com/kul46/kulvirchavda/settings/access and Pages configuration at https://github.com/kul46/kulvirchavda/settings/pages. On GitHub Free, making the repository private can unpublish the Pages site. Keep the present setup unless intentionally changing the hosting plan.

References: [GitHub personal repository permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository), [repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).
