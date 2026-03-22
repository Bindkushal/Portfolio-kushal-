/* ============================================
   KUSHAL KANT BIND — Portfolio JS
   ============================================ */

// ---- CUSTOM CURSOR ----
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();


// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


// ---- TERMINAL TYPEWRITER ----
const commands = [
  {
    cmd: 'whoami',
    output: [
      { text: 'kushal kant bind', cls: 'success' },
      { text: 'CS + Stats + Math @ Chandigarh University', cls: 'info' },
      { text: '# ML Researcher · Open Source Contributor', cls: 'comment' },
    ]
  },
  {
    cmd: 'cat research.txt',
    output: [
      { text: '→ Self-Supervised Representation Learning', cls: 'info' },
      { text: '→ Contrastive methods on tabular data', cls: '' },
      { text: '→ Edge AI / quantized GGUF inference', cls: '' },
      { text: '→ Risk Analysis & Statistical Modeling', cls: '' },
    ]
  },
  {
    cmd: 'git log --oneline sugarlabs/speak-ai',
    output: [
      { text: 'a3f12e1 feat: runtime Kokoro TTS language selector', cls: 'success' },
      { text: 'b8c04d2 fix: identified syntax bug in PR#14 diffs', cls: '' },
      { text: 'c2d19f3 docs: sugar-activity-devkit mocking framework', cls: '' },
      { text: '# GSoC track · active contributor', cls: 'comment' },
    ]
  },
  {
    cmd: 'ls certifications/',
    output: [
      { text: 'cs50x/  cs50-python/  cs50-sql/  cs50-r/', cls: 'info' },
      { text: 'cs50-ai/  cs50w/  ml-specialization/  dl-spec/', cls: 'info' },
      { text: '# 8 certs total · Stanford · Harvard · DeepLearning.AI', cls: 'comment' },
    ]
  },
];

let cmdIndex = 0;
let charIndex = 0;
let isTyping = false;

const typeTarget  = document.getElementById('typeTarget');
const termOutput  = document.getElementById('termOutput');

function clearOutput() {
  termOutput.innerHTML = '';
}

function typeCommand(cmd, callback) {
  isTyping = true;
  charIndex = 0;
  typeTarget.textContent = '';

  const interval = setInterval(() => {
    typeTarget.textContent += cmd[charIndex];
    charIndex++;
    if (charIndex >= cmd.length) {
      clearInterval(interval);
      setTimeout(callback, 350);
    }
  }, 60);
}

function showOutput(lines, callback) {
  clearOutput();
  let i = 0;
  const next = () => {
    if (i >= lines.length) {
      setTimeout(callback, 2200);
      return;
    }
    const div = document.createElement('div');
    div.className = 't-line ' + (lines[i].cls || '');
    div.textContent = lines[i].text;
    div.style.opacity = '0';
    div.style.transform = 'translateX(-6px)';
    div.style.transition = 'opacity 0.25s, transform 0.25s';
    termOutput.appendChild(div);
    requestAnimationFrame(() => {
      div.style.opacity = '1';
      div.style.transform = 'translateX(0)';
    });
    i++;
    setTimeout(next, 160);
  };
  next();
}

function runTerminal() {
  const { cmd, output } = commands[cmdIndex];
  typeCommand(cmd, () => {
    showOutput(output, () => {
      cmdIndex = (cmdIndex + 1) % commands.length;
      typeTarget.textContent = '';
      clearOutput();
      setTimeout(runTerminal, 400);
    });
  });
}

// Start terminal after page load animation
setTimeout(runTerminal, 900);


// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1400;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(update);
    else el.textContent = target;
  };
  update();
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});


// ---- SCROLL REVEAL (sections) ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-grid, .info-card, .research-item, .tl-item, .contact-card, .skill-group'
).forEach(el => {
  el.classList.add('fade-in');
  revealObserver.observe(el);
});


// ---- PROJECT CARDS STAGGERED REVEAL ----
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = parseInt(entry.target.getAttribute('data-index')) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.project-card').forEach(el => {
  projectObserver.observe(el);
});


// ---- SMOOTH ACTIVE NAV ----
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// ---- SKILL PILLS HOVER RIPPLE ----
document.querySelectorAll('.skill-pills span').forEach(span => {
  span.addEventListener('mouseenter', () => {
    span.style.transform = 'translateY(-2px)';
  });
  span.addEventListener('mouseleave', () => {
    span.style.transform = '';
  });
});


// ---- RESEARCH ITEM TILT ----
document.querySelectorAll('.research-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-3px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ---- PROJECT CARD SUBTLE TILT ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = card.classList.contains('visible') ? '' : 'translateY(0)';
  });
});


// ---- MOBILE NAV TOGGLE (simple) ----
// On mobile the nav-links are hidden; tapping logo scrolls to top
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});