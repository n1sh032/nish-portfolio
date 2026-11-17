const projectList = document.querySelector('#projects');
const projectDialog = document.querySelector('#project-dialog');
const filterButtons = document.querySelectorAll('[data-filter]');

function openProject(card) {
  document.querySelector('#dialog-type').textContent = card.querySelector('.project-meta span').textContent;
  document.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent;
  document.querySelector('#dialog-description').textContent = card.querySelector('.project-summary').textContent;
  document.querySelector('#dialog-tech').textContent = Array.from(card.querySelectorAll('.tags span'), tag => tag.textContent).join(' / ');
  document.querySelector('#dialog-link').href = card.querySelector('.project-source').href;
  document.querySelector('#dialog-details').replaceChildren(card.querySelector('template').content.cloneNode(true));
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

function renderProjects() {
  projectList.querySelectorAll('.project').forEach(card => {
    const button = card.querySelector('.project-open');
    button.hidden = false;
    button.addEventListener('click', () => openProject(card));
  });
}

function filterProjects(category) {
  let visibleCount = 0;

  document.querySelectorAll('.project').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) visibleCount += 1;
  });

  filterButtons.forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  document.querySelector('#count').textContent = `${visibleCount} project${visibleCount === 1 ? '' : 's'} on the workbench`;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => filterProjects(button.dataset.filter));
});

// Native dialog handles Escape and keeps keyboard focus inside the project.
document.querySelector('.close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  if (event.target !== projectDialog) return;

  const bounds = projectDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;

  if (outside) projectDialog.close();
});

const themeButton = document.querySelector('#theme-toggle');
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}

try {
  setTheme(localStorage.getItem('portfolio-theme') === 'dark');
} catch {
  // The site still works when browser storage is unavailable.
}

themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark);
  try {
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  } catch {
    // Keep the selected theme for this visit.
  }
});

const demoButton = document.querySelector('#run-demo');
const demoCourt = document.querySelector('#demo-court');
const demoStatus = document.querySelector('#demo-status');
const playDuration = parseFloat(
  getComputedStyle(demoCourt).getPropertyValue('--play-duration')
);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

demoButton.addEventListener('click', () => {
  demoButton.disabled = true;
  demoCourt.classList.add('playing');
  demoStatus.textContent = 'Tracking the play…';

  setTimeout(() => {
    demoCourt.classList.remove('playing');
    demoStatus.textContent = 'Play complete. Open CourtVision below.';
    demoButton.textContent = '↻ Run it again';
    demoButton.disabled = false;
  }, reduceMotion.matches ? 0 : playDuration);
});

document.querySelector('#copy').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('nishanthgobinath39@gmail.com');
    status.textContent = 'Copied. Say hi!';
  } catch {
    status.textContent = 'nishanthgobinath39@gmail.com';
  }
});

renderProjects();
filterProjects('all');
document.querySelector('#year').textContent = new Date().getFullYear();

// Highlight the current section and show how far down the page we are.
const sections = document.querySelectorAll('main > section[id]');
const sectionLinks = document.querySelectorAll('.site-header a[href^="#"]');
const intro = document.querySelector('#intro');
const projectArt = document.querySelectorAll('.project-art');
const compactScreen = window.matchMedia('(max-width: 650px)');
let scrollFrame = 0;
let activeSection;

function updateScrollMotion() {
  if (reduceMotion.matches || compactScreen.matches) return;

  const distance = intro.getBoundingClientRect().top + window.scrollY;
  const travel = Math.min(1, Math.max(0, (window.scrollY - distance + 100) / 360));
  intro.style.setProperty('--name-offset', `${-100 * travel}px`);
  intro.style.setProperty('--name-scale', 1 - travel * .18);
  intro.style.setProperty('--name-opacity', 1 - travel * .45);
  intro.style.setProperty('--desk-x', `${24 * travel}px`);
  intro.style.setProperty('--desk-y', `${-68 * travel}px`);
  intro.style.setProperty('--desk-turn', `${-8 * travel}deg`);

  const viewportHeight = window.innerHeight;

  sections.forEach((section, index) => {
    if (section === intro) return;

    const top = section.getBoundingClientRect().top;
    const entryDistance = Math.min(380, viewportHeight * .5);
    const entry = Math.max(0, Math.min(1, (top - viewportHeight * .3) / entryDistance));
    const shiftX = Math.min(55, window.innerWidth * .055) * entry;
    const direction = index % 2 === 0 ? -1 : 1;

    section.style.setProperty('--chapter-scale', 1 - entry * .055);
    section.style.setProperty('--chapter-x', `${shiftX * direction}px`);
    section.style.setProperty('--chapter-counter-x', `${shiftX * -direction}px`);
    section.style.setProperty('--chapter-y', `${entry * 58}px`);
    section.style.setProperty('--chapter-counter-y', `${entry * 92}px`);
  });
  projectArt.forEach(art => {
    if (art.closest('[hidden]')) return;
    const box = art.getBoundingClientRect();
    const offset = (box.top + box.height / 2 - viewportHeight / 2) * .14;
    art.style.setProperty('--art-offset', `${Math.max(-38, Math.min(38, offset))}px`);
  });
}


const storyTrack = document.querySelector('.scroll-story');
const storyStage = storyTrack.querySelector('.story-stage');
const codeScene = storyTrack.querySelector('.story-code');
const basketballScene = storyTrack.querySelector('.story-basketball');
document.body.classList.add('story-ready');

let storyStart = 0;
let storyDistance = 0;
let lastStoryProgress;
let pageScrollRange = 0;

function measureScrollLayout() {
  storyStart = storyTrack.getBoundingClientRect().top + window.scrollY;
  storyDistance = storyTrack.offsetHeight - storyStage.offsetHeight;
  pageScrollRange = document.documentElement.scrollHeight - window.innerHeight;
  lastStoryProgress = undefined;
  scheduleScrollUpdate();
}

function clampProgress(value) {
  return Math.max(0, Math.min(1, value));
}

function moveScene(scene, progress, direction) {
  const enter = clampProgress(progress / .26);
  const leave = clampProgress((progress - .64) / .36);
  const offset = (1 - enter) - leave;
  const travel = Math.min(window.innerWidth * .8, 720);

  scene.style.setProperty('--scene-opacity', enter * (1 - leave));
  scene.style.setProperty('--scene-x', (offset * travel * direction) + 'px');
  scene.style.setProperty('--scene-y', (leave * -110) + 'px');
  scene.style.setProperty('--scene-scale', .75 + enter * .25 + leave * .25);
  scene.style.setProperty('--scene-turn', (offset * 19 * direction) + 'deg');
}

function updateStory() {
  if (reduceMotion.matches) return;

  if (storyDistance <= 0) return;

  const progress = clampProgress((window.scrollY - storyStart) / storyDistance);
  if (progress === lastStoryProgress) return;
  lastStoryProgress = progress;
  moveScene(codeScene, progress / .55 + .07, 1);
  moveScene(basketballScene, (progress - .41) / .59, -1);
  basketballScene.style.setProperty('--ball-turn', (progress * 280 - 135) + 'deg');
}

function updateScrollPosition() {
  scrollFrame = 0;
  updateScrollMotion();
  updateStory();
  // The desktop header is sticky. The phone header scrolls away.
  if (compactScreen.matches) return;

  const progress = pageScrollRange > 0 ? clampProgress(window.scrollY / pageScrollRange) : 0;
  document.querySelector('.reading-progress').style.setProperty('--reading-progress', progress);

  let currentSection = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * .35) {
      currentSection = section.id;
    }
  }
  if (progress >= .99) currentSection = sections[sections.length - 1].id;

  if (activeSection === currentSection) return;
  activeSection = currentSection;

  sectionLinks.forEach(link => {
    if (link.hash === '#' + currentSection) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function scheduleScrollUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollPosition);
}

window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', measureScrollLayout);
reduceMotion.addEventListener('change', measureScrollLayout);

if ('ResizeObserver' in window) {
  const layoutObserver = new ResizeObserver(measureScrollLayout);
  layoutObserver.observe(document.querySelector('main'));
  layoutObserver.observe(storyTrack);
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', measureScrollLayout);
});
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', measureScrollLayout);
});
measureScrollLayout();
