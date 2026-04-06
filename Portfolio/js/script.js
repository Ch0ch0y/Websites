/* =============================================
   Portfolio JS – Francis Niño R. Villanueva
   ============================================= */

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hidden'), 700);
});

/* ===== CUSTOM CURSOR ===== */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let follX  = 0, follY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4.5 + 'px';
  cursor.style.top  = mouseY - 4.5 + 'px';
});

(function animateFollower() {
  follX += (mouseX - follX) * 0.1;
  follY += (mouseY - follY) * 0.1;
  cursorFollower.style.left = follX - 16 + 'px';
  cursorFollower.style.top  = follY - 16 + 'px';
  requestAnimationFrame(animateFollower);
})();

const hoverTargets = 'a, button, .skill-card, .edu-card, .cert-card, .tl-card, .social-link, .nav-toggle';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorFollower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorFollower.classList.remove('hovered');
  });
});

/* ===== NAVBAR ===== */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top visibility
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);

  // Active nav link highlight
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  document.querySelectorAll('section[id]').forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

/* ===== TYPED.JS ===== */
// Typed.js is loaded via CDN in the HTML
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'IT Support Specialist',
        'AI-native full-stack developer',
        'Network Administrator',
        'Computer Technician',
        'IT Technician',
        'Cisco Certified (Ethical Hacker)',
        'Team Leader',
        'Lifelong Learner',
      ],
      typeSpeed:  55,
      backSpeed:  40,
      backDelay:  2400,
      loop:       true,
      smartBackspace: true,
    });
  }
});

/* ===== AOS (Animate On Scroll) ===== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 720,
      once:     true,
      offset:   90,
      easing:   'ease-out-cubic',
    });
  }
});

/* ===== SKILL BARS ANIMATION ===== */
let skillsAnimated = false;

function animateSkillBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-width') + '%';
  });
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        setTimeout(animateSkillBars, 250);
      }
    });
  }, { threshold: 0.15 });
  obs.observe(skillsSection);
}

/* ===== BACK TO TOP ===== */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const btn  = document.getElementById('submitBtn');
  const form = e.target;

  // Basic validation
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showFormMessage('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate sending
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    showFormMessage('Thanks for reaching out! I\'ll get back to you soon.', 'success');
    form.reset();

    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      btn.disabled = false;
      removeFormMessage();
    }, 4000);
  }, 1500);
});

function showFormMessage(text, type) {
  removeFormMessage();
  const msg = document.createElement('p');
  msg.id = 'formMsg';
  msg.textContent = text;
  msg.style.cssText = `
    font-size: 0.85rem;
    padding: 10px 16px;
    border-radius: 8px;
    margin-top: -8px;
    font-weight: 500;
    ${type === 'success'
      ? 'color:#4ade80; background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.25);'
      : 'color:#f87171; background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.25);'}
  `;
  document.getElementById('contactForm').appendChild(msg);
}

function removeFormMessage() {
  const old = document.getElementById('formMsg');
  if (old) old.remove();
}

/* ===== COUNTER ANIMATION (stats) ===== */
function animateCounter(el, target, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;
if (statsSection) {
  const obsStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statsSection.querySelectorAll('.stat-item h4').forEach(el => {
          const text    = el.textContent.trim();
          const num     = parseInt(text, 10);
          const suffix  = text.replace(/[0-9]/g, '');
          el.dataset.suffix = suffix;
          animateCounter(el, num, 1500);
        });
      }
    });
  }, { threshold: 0.5 });
  obsStats.observe(statsSection);
}

/* ===== CERTIFICATE MODAL ===== */
const certModal       = document.getElementById('certModal');
const certModalClose  = document.getElementById('certModalClose');
const certModalOverlay= document.getElementById('certModalOverlay');
const certModalFrame  = document.getElementById('certModalFrame');
const certModalTitle  = document.getElementById('certModalTitle');
const certModalSub    = document.getElementById('certModalSub');

const certMeta = {
  'images/tesda-cert.pdf': {
    title: 'TESDA – Installing and Configuring Computer Systems',
    sub:   'Issued by NITESD / TESDA Online Program · September 21, 2024 · ID: er70yAy0q3'
  },
  'images/cisco-cert.jpg': {
    title: 'Cisco Networking Academy – Ethical Hacker',
    sub:   'Certificate of Course Completion · September 23, 2024'
  }
};

const certModalImg = document.getElementById('certModalImg');

function openCertModal(certSrc, certType) {
  const meta = certMeta[certSrc] || { title: 'Certificate', sub: '' };
  certModalTitle.textContent = meta.title;
  certModalSub.textContent   = meta.sub;

  if (certType === 'image') {
    certModalFrame.style.display = 'none';
    certModalFrame.src = '';
    certModalImg.style.display = 'block';
    certModalImg.src = certSrc;
  } else {
    certModalImg.style.display = 'none';
    certModalImg.src = '';
    certModalFrame.style.display = 'block';
    certModalFrame.src = certSrc;
  }

  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    certModalFrame.src = '';
    certModalImg.src = '';
    certModalFrame.style.display = 'block';
    certModalImg.style.display = 'none';
  }, 350);
}

document.querySelectorAll('.cert-clickable').forEach(card => {
  card.addEventListener('click', () => openCertModal(card.dataset.cert, card.dataset.certType));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCertModal(card.dataset.cert, card.dataset.certType);
    }
  });
});

certModalClose.addEventListener('click', closeCertModal);
certModalOverlay.addEventListener('click', closeCertModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) closeCertModal();
});
