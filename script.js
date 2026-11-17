// Project content lives here so it is easy to update.
const projects = [
  {
    "title": "CourtVision",
    "category": "ai",
    "label": "COMPUTER VISION",
    "tagline": "A closer look at the game.",
    "description": "Basketball video analysis with player tracking, pose estimation and annotated video. A development branch flags candidate contact events for human review.",
    "tech": "Python / Player tracking / Pose estimation",
    "repo": "CourtVision",
    "art": "court",
    "symbol": "◎",
    "caption": "TRACK → ESTIMATE → REVIEW",
    "problem": "A basketball game moves quickly. Reviewing footage means finding the moments that deserve a second look, then understanding how players moved around them.",
    "built": [
      "Connected player tracking and pose estimation to a video-analysis workflow.",
      "Prototyped contact candidates from player positions and body keypoints on a development branch.",
      "Rendered boxes, track IDs and skeletons over the source video. A frame review viewer is planned."
    ],
    "decision": "Keep a person in the review loop. A flagged moment is a candidate for inspection, rather than a definitive foul decision. That distinction matters when movement, camera angles, and overlapping players make video difficult to interpret.",
    "takeaway": "Connecting computer vision to video review through pose data, annotated clips and experimental contact candidates."
  },
  {
    "title": "Sortwise",
    "category": "ai",
    "label": "APPLIED AI",
    "tagline": "A little less digital chaos.",
    "description": "A folder watcher that sorts images using CLIP and PDFs using extracted text. It logs manual corrections for a separate training experiment.",
    "tech": "Python / CLIP / scikit-learn",
    "repo": "sortwise",
    "art": "sort",
    "symbol": "▤",
    "caption": "IMAGES / DOCUMENTS / ORDER",
    "problem": "Images and PDFs pile up faster than anyone wants to organise them. Filenames alone often say very little about what a document actually contains.",
    "built": [
      "Built a folder watcher to respond when files arrive.",
      "Used CLIP to sort images by content and extracted text to organise PDFs.",
      "Saved user corrections as training examples, making feedback part of the workflow."
    ],
    "decision": "Use the information each file type gives you. Images and PDFs need different processing paths, while corrections provide concrete examples of where the classification needs work.",
    "takeaway": "An applied AI project that connects model outputs with file handling and user feedback — all around a recognisable everyday problem."
  },
  {
    "title": "Forge 2.0",
    "category": "software",
    "label": "DEVELOPER TOOLS",
    "tagline": "From a plan to the next iteration.",
    "description": "A coding workflow prototype with model assisted planning, patch generation and pytest checks. A caller can request another attempt after a failure.",
    "tech": "Python / pytest / LLM APIs",
    "repo": "Forge-2.0",
    "art": "forge",
    "symbol": "⌘",
    "caption": "PLAN → BUILD → TEST → REFINE",
    "problem": "Generating a piece of code is one step. Planning the work, checking it, and responding to failures are separate problems that need a coordinated workflow.",
    "built": [
      "Built manager steps for planning, generating patches and running tests.",
      "Added a repair state that lets the caller request another coding attempt.",
      "Opened a safety branch with project path validation and explicit file approval for commits."
    ],
    "decision": "Keep the caller in control of plan approval, retry decisions and commit review.",
    "takeaway": "A deeper look at developer tooling: connecting LLM APIs with repeatable checks and explicit control flow."
  },
  {
    "title": "Relay LLM Router",
    "category": "software",
    "label": "AI INFRASTRUCTURE",
    "tagline": "Two providers. One interface.",
    "description": "A FastAPI backend that connects OpenAI and Gemini through a common interface. The project explores practical API design and handling responses across model providers.",
    "tech": "Python / FastAPI / REST APIs",
    "repo": "relay-LLM-router",
    "art": "relay",
    "symbol": "⇄",
    "caption": "REQUEST / ROUTE / RESPONSE",
    "problem": "Working with more than one AI provider can mean separate request formats and integration paths. That complexity quickly spreads into the application using them.",
    "built": [
      "Connected OpenAI and Gemini behind one FastAPI interface.",
      "Implemented a shared backend entry point for model requests.",
      "Added provider fallback when a configured provider reports an API error or returns no text."
    ],
    "decision": "Put provider-specific integration work in the backend. A shared interface makes the application-facing boundary easier to understand while keeping routing logic in one place.",
    "takeaway": "Practical backend engineering across REST APIs, external services, and the boundary between an application and its AI providers."
  },
  {
    "title": "Smart Urban Farm",
    "category": "hardware",
    "label": "EMBEDDED SYSTEMS",
    "tagline": "Code that grows beyond a screen.",
    "description": "A PIC16F18877 system that reads soil moisture, temperature, and light sensors to control a fan and water pump. An LCD displays readings while UART supports system monitoring.",
    "tech": "Embedded C / PIC16F18877 / Sensors / UART",
    "repo": "PIC8877F-Smart-Urban-Farm-System",
    "art": "farm",
    "symbol": "✳",
    "caption": "SENSE → DECIDE → ACT",
    "problem": "A small growing environment needs a way to observe changing conditions and respond through physical devices. Sensor readings become useful when they lead to a controlled action.",
    "built": [
      "Programmed a PIC16F18877 to read soil moisture, temperature, and light sensors.",
      "Connected sensor-driven control to a fan and water pump.",
      "Displayed readings on an LCD and used UART for system monitoring."
    ],
    "decision": "Make the system observable as well as functional. The LCD and UART provide ways to see what the controller is reading while working with real sensors and actuators.",
    "takeaway": "Embedded engineering from input to output: sensor integration, microcontroller logic, physical control, and visibility into the system."
  }
];

const projectList = document.querySelector('#projects');
const projectDialog = document.querySelector('#project-dialog');
const filterButtons = document.querySelectorAll('[data-filter]');

function openProject(project) {
  document.querySelector('#dialog-type').textContent = project.label;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-tech').textContent = project.tech;
  document.querySelector('#dialog-link').href = `https://github.com/n1sh032/${project.repo}`;

  document.querySelector('#dialog-details').innerHTML = `
    <section class="case-section">
      <h3>The problem</h3>
      <p>${project.problem}</p>
    </section>
    <section class="case-section">
      <h3>What I built</h3>
      <ul>${project.built.map(item => `<li>${item}</li>`).join('')}</ul>
    </section>
    <section class="case-section">
      <h3>A decision that matters</h3>
      <p>${project.decision}</p>
    </section>
    <p class="case-takeaway">${project.takeaway}</p>
  `;

  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

function renderProjects() {
  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project';
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="project-art ${project.art}" aria-hidden="true">
        <span class="art-label">EXPERIMENT 0${index + 1}</span>
        <span class="symbol">${project.symbol}</span>
        <span class="art-caption">${project.caption}</span>
      </div>
      <div class="project-body">
        <div class="project-meta"><span>${project.label}</span><span>0${index + 1}</span></div>
        <h3>${project.title}</h3>
        <p class="project-tagline">${project.tagline}</p>
        <p>${project.description}</p>
        <div class="tags">${project.tech.split(' / ').map(tool => `<span>${tool}</span>`).join('')}</div>
        <button class="project-open">Inside the project <span>↗</span></button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => openProject(project));
    projectList.append(card);
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
