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

const viewer = document.querySelector('#image-viewer');
let imageTrigger;
let imageGroup = [];
let imageIndex = 0;
function displayImage() {
  const button = imageGroup[imageIndex];
  const image = viewer.querySelector('img');
  image.src = button.dataset.image;
  image.alt = `Project media, image ${imageIndex + 1} of ${imageGroup.length}`;
  viewer.querySelector('#image-caption').textContent = `${imageIndex + 1} / ${imageGroup.length}`;
  viewer.querySelectorAll('[data-view-step]').forEach(control => { control.disabled = imageGroup.length < 2; });
}
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    imageGroup = [...button.closest('.media-reel').querySelectorAll('[data-image]')];
    imageIndex = imageGroup.indexOf(button);
    displayImage();
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
viewer?.querySelectorAll('[data-view-step]').forEach(button => button.addEventListener('click', () => {
  imageIndex = (imageIndex + Number(button.dataset.viewStep) + imageGroup.length) % imageGroup.length;
  displayImage();
}));
viewer?.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  imageIndex = (imageIndex + (event.key === 'ArrowRight' ? 1 : -1) + imageGroup.length) % imageGroup.length;
  displayImage();
});

document.querySelectorAll('.media-reel').forEach(reel => {
  const track = reel.querySelector('.media-track');
  const items = [...track.children];
  const controls = reel.querySelector('.reel-controls');
  controls.hidden = items.length < 2;
  const update = () => {
    const last = track.scrollWidth - track.clientWidth;
    reel.querySelector('[data-reel-step="-1"]').disabled = track.scrollLeft < 4;
    reel.querySelector('[data-reel-step="1"]').disabled = track.scrollLeft >= last - 4;
    const index = items.reduce((best, item, i) => Math.abs(item.offsetLeft - items[0].offsetLeft - track.scrollLeft) < Math.abs(items[best].offsetLeft - items[0].offsetLeft - track.scrollLeft) ? i : best, 0);
    reel.querySelector('.reel-count').textContent = `${index + 1} / ${items.length}`;
  };
  reel.querySelectorAll('[data-reel-step]').forEach(button => button.addEventListener('click', () => {
    track.scrollBy({left: Number(button.dataset.reelStep) * (items[0].getBoundingClientRect().width + 16), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }));
  track.addEventListener('scroll', update, {passive: true});
  new ResizeObserver(update).observe(track);
  update();
});

const projects = [...document.querySelectorAll('.project-entry')];
function openLinkedProject() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target?.classList.contains('project-entry')) return;
  projects.forEach(project => { project.open = project === target; });
  requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
}
projects.forEach(project => project.addEventListener('toggle', () => {
  if (!project.open) return;
  projects.forEach(other => { if (other !== project) other.open = false; });
}));
window.addEventListener('hashchange', openLinkedProject);
openLinkedProject();

// Scroll moves the contour and orbital layers; there is no perpetual animation loop.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let scrollFrame = 0;
function updateJourney() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
  document.documentElement.style.setProperty('--journey', reducedMotion.matches ? 0 : progress.toFixed(4));
}
function queueJourney() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateJourney);
}
window.addEventListener('scroll', queueJourney, {passive: true});
window.addEventListener('resize', queueJourney, {passive: true});
reducedMotion.addEventListener('change', updateJourney);
new ResizeObserver(queueJourney).observe(document.body);
updateJourney();

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
