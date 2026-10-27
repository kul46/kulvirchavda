document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
function closeMenu(returnFocus = false) {
  menu?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu +';
  if (returnFocus) menuButton?.focus();
}
menuButton?.addEventListener('click', () => {
  const opened = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.textContent = opened ? 'Close −' : 'Menu +';
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const cards = [...document.querySelectorAll('.project-card[data-category]')];
  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter); });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('.filter-count').textContent = `${count} ${count === 1 ? 'entry' : 'entries'} shown`;
  }));
}

const viewer = document.querySelector('#image-viewer');
let imageTrigger;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    const image = viewer.querySelector('img');
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    viewer.querySelector('#image-caption').textContent = button.dataset.caption;
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
viewer?.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer?.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const box = viewer.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
});
viewer?.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  imageTrigger?.focus();
});

document.querySelectorAll('.video-panel').forEach(panel => {
  const video = panel.querySelector('video');
  const button = panel.querySelector('.video-play');
  const status = panel.querySelector('.video-status');
  if (!button || !video) return;
  const title = video.getAttribute('aria-label');
  button.hidden = false;
  const update = () => {
    const action = video.paused ? 'Play' : 'Pause';
    button.textContent = `${action} video`;
    button.setAttribute('aria-label', `${action} ${title}`);
  };
  update();
  button.addEventListener('click', async () => {
    if (!video.paused) { video.pause(); return; }
    try { status.textContent = ''; await video.play(); }
    catch { status.textContent = 'Playback could not start. Try the video’s play control.'; }
  });
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
    update();
  });
  video.addEventListener('pause', update);
  video.addEventListener('ended', update);
  video.addEventListener('error', () => { status.textContent = 'The video could not load. Please reload the page and try again.'; });
});

document.querySelectorAll('.copy-email').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const status = button.closest('.contact').querySelector('.contact-status');
    try {
      await navigator.clipboard.writeText('chavdakulvir@gmail.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Email: chavdakulvir@gmail.com';
    }
  });
});
