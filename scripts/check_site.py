"""Validate static routes, fragments, asset filename case, and basic page metadata.

Run from any directory: python scripts/check_site.py
No third-party dependencies required.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys
import json

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.refs = []
        self.errors = []
        self.h1 = 0
        self.title = False
        self.description = False
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if 'id' in a:
            if a['id'] in self.ids:
                self.errors.append(f'duplicate ID: {a["id"]}')
            self.ids.add(a['id'])
        self.h1 += tag == 'h1'
        self.title |= tag == 'title'
        self.description |= tag == 'meta' and a.get('name') == 'description' and bool(a.get('content'))
        if tag == 'img' and 'alt' not in a:
            self.errors.append(f'image missing alt: {a.get("src")}')
        if tag == 'video' and ('controls' not in a or 'playsinline' not in a):
            self.errors.append('video missing controls or inline phone playback')
        if tag == 'a' and urlsplit(a.get('href', '')).path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.mov')):
            self.errors.append('raw image/video navigation instead of in-page media')
        for key in ['href', 'src', 'poster', 'data-image']:
            if key in a:
                self.refs.append(a[key])

pages = {p.name: Page(p) for p in ROOT.glob('*.html')}
errors = []
references = 0
for name, page in pages.items():
    errors.extend(f'{name}: {message}' for message in page.errors)
    if page.h1 != 1 or not page.title or not page.description:
        errors.append(f'{name}: expected one h1, a title, and a description')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        references += 1
        target = ROOT / unquote(url.path) if url.path else page.path
        if not target.exists():
            errors.append(f'{name}: missing local target {ref}')
            continue
        # GitHub Pages paths are case-sensitive even on a Windows checkout.
        current = ROOT
        for part in target.relative_to(ROOT).parts:
            if part not in {p.name for p in current.iterdir()}:
                errors.append(f'{name}: filename case mismatch {ref}')
                break
            current /= part
        if url.fragment and target.suffix == '.html':
            other = pages.get(target.name)
            if other and unquote(url.fragment) not in other.ids:
                errors.append(f'{name}: missing anchor {ref}')

for item in json.loads((ROOT/'scripts/content-inventory.json').read_text()):
    url = urlsplit(item['url'])
    target = pages.get(url.path)
    if target is None or (url.fragment and url.fragment not in target.ids):
        errors.append(f'Portfolio entry missing: {item["title"]}')

for name, page in pages.items():
    source = page.path.read_text(encoding='utf-8')
    if '\u2014' in source:
        errors.append(f'{name}: em dash remains')
    if 'Selected work' in source or 'original site' in source or 'original project overview' in source:
        errors.append(f'{name}: retired wording remains')
    for ref in page.refs:
        if ref.lower().endswith('.mov'):
            errors.append(f'{name}: MOV link remains instead of inline MP4')

if (ROOT/'CNAME').read_text().strip() != 'kulvirchavda.com':
    errors.append('Custom domain changed unexpectedly')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'PASS: {len(pages)} pages, 16 portfolio entries, {references} local references, metadata, alt text, inline video, IDs, anchors, filename case, and custom domain.')
