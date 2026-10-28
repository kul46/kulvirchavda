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
matchMedia('(min-width: 1051px)').addEventListener('change', event => {
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
    const reel = button.closest('.media-reel');
    imageGroup = reel ? [...reel.querySelectorAll('[data-image]')] : [button];
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

// A shared silhouette changes shape across three engineering environments.
const stage = document.querySelector('.exploration-stage');
if (stage) {
  stage.classList.add('js-stage');
  const pin = stage.querySelector('.stage-pin');
  const hull = stage.querySelector('.craft-hull');
  const shapes = [
    [[-38,-58],[0,-72],[38,-58],[52,-12],[48,34],[28,55],[0,62],[-28,55],[-48,34],[-52,-12],[-38,-58]],
    [[-12,-112],[0,-148],[12,-112],[22,42],[14,96],[6,114],[0,120],[-6,114],[-14,96],[-22,42],[-12,-112]],
    [[-60,-85],[0,-95],[60,-85],[72,-25],[72,45],[45,78],[0,88],[-45,78],[-72,45],[-72,-25],[-60,-85]]
  ];
  const names = ['Field robotics.', 'Aircraft & flight.', 'Space robotics.'];
  const notes = ['How do we move through what we don’t yet know?', 'The same curiosity, with a different view.', 'An interest in exploration beyond Earth.'];
  let selected = 0;
  let frame = 0;
  const shortStage = matchMedia('(max-height: 600px) and (min-width: 601px)');
  function render(progress) {
    const segment = progress < .5 ? 0 : 1;
    const amount = Math.min(1,Math.max(0,(progress - segment * .5) * 2));
    const t = amount * amount * (3 - 2 * amount);
    const points = shapes[segment].map((point,i) => point.map((value,j) => (value + (shapes[segment+1][i][j] - value) * t).toFixed(1)));
    hull.setAttribute('d', points.map((p,i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('')+'Z');
    // Retract attachments before extending the next set, avoiding overlapping outlines.
    const retract = Math.max(0,1 - t * 3);
    const extend = Math.max(0,(t - .65) / .35);
    stage.querySelector('.craft-drone').setAttribute('opacity', String(segment === 0 ? retract : 0));
    stage.querySelector('.craft-flight').setAttribute('opacity', String(segment === 0 ? extend : retract));
    stage.querySelector('.craft-rover').setAttribute('opacity', String(segment === 1 ? extend : 0));
    stage.querySelector('.stage-space').setAttribute('opacity', String(segment === 1 ? t : 0));
    stage.querySelector('.stage-ground').setAttribute('opacity', String(1-progress*.75));
    const index = progress < .26 ? 0 : progress < .76 ? 1 : 2;
    stage.querySelector('.stage-title').textContent = names[index];
    stage.querySelector('.stage-note').textContent = notes[index];
    stage.querySelector('.stage-index').textContent = `0${index+1} / 03`;
    stage.querySelectorAll('[data-stage]').forEach((button,i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  function updateStage() {
    frame = 0;
    if (reducedMotion.matches || shortStage.matches) { render(selected); return; }
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const distance = Math.max(1,stage.offsetHeight - pin.offsetHeight);
    render(Math.min(1,Math.max(0,(top - stage.getBoundingClientRect().top) / distance)));
  }
  function queueStage() { if (!frame) frame = requestAnimationFrame(updateStage); }
  stage.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
    selected = Number(button.dataset.stage);
    if (reducedMotion.matches || shortStage.matches) { render(selected); return; }
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    window.scrollTo({top: scrollY + stage.getBoundingClientRect().top - top + (stage.offsetHeight-pin.offsetHeight)*selected,behavior:'instant'});
    queueStage();
  }));
  window.addEventListener('scroll',queueStage,{passive:true});
  window.addEventListener('resize',queueStage,{passive:true});
  reducedMotion.addEventListener('change',queueStage);
  shortStage.addEventListener('change',queueStage);
  new ResizeObserver(queueStage).observe(stage);
  queueStage();
}

// Keep the project hover light independent of the standard system cursor.
const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project-entry>summary').forEach(row => {
  let frame = 0;
  let x = 0, y = 0;
  row.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !hoverPointer.matches || reducedMotion.matches) return;
    const bounds = row.getBoundingClientRect();
    x = event.clientX - bounds.left;
    y = event.clientY - bounds.top;
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      row.style.setProperty('--project-x', `${x}px`);
      row.style.setProperty('--project-y', `${y}px`);
    });
  }, {passive: true});
});
