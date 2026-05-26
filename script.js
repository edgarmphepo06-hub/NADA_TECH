/* ============================
   MZUZU CCAP NKHOMA SYNOD - JAVASCRIPT
   ============================ */

// --- PAGE LOAD: Reset to top & show loader ---
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  // Force scroll to top on fresh load / refresh
  window.scrollTo(0, 0);
  history.replaceState(null, null, ' '); // Clear any hash

  // Hide loader after content is ready
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 600);
  }
});

// On pageshow (handles back/forward cache)
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    window.scrollTo(0, 0);
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('loaded');
      loader.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// --- NAVIGATION ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  // Update aria-expanded
  const expanded = navMenu.classList.contains('active');
  navToggle.setAttribute('aria-expanded', expanded);
  // Prevent body scroll when menu is open
  document.body.style.overflow = expanded ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// --- SERMON LIBRARY ---
const sermons = [
  {
    id: 1,
    title: 'Walking in Faith Amidst Trials',
    speaker: 'Rev. James Mkandawire',
    category: 'sermons',
    date: 'May 18, 2026',
    description: 'A powerful message on trusting God through difficult seasons, from the book of James.',
  },
  {
    id: 2,
    title: 'The Power of Prayer in the Life of a Believer',
    speaker: 'Rev. Grace Banda',
    category: 'sermons',
    date: 'May 11, 2026',
    description: 'Understanding how prayer transforms our daily walk with Christ and strengthens the church.',
  },
  {
    id: 3,
    title: 'Understanding Biblical Stewardship',
    speaker: 'Elder Samuel Phiri',
    category: 'teachings',
    date: 'May 4, 2026',
    description: 'A deep dive into managing God-given resources with wisdom and faithfulness.',
  },
  {
    id: 4,
    title: 'Building a Strong Church Community',
    speaker: 'Rev. Jennifer Kachale',
    category: 'teachings',
    date: 'April 27, 2026',
    description: 'Practical steps for fostering unity, love, and fellowship within the body of Christ.',
  },
  {
    id: 5,
    title: 'Easter Sunday: He Is Risen!',
    speaker: 'Rev. Thomas Ngoma',
    category: 'special',
    date: 'April 5, 2026',
    description: 'A celebration of the resurrection of Jesus Christ and its profound significance for believers today.',
  },
  {
    id: 6,
    title: 'New Year Prayer & Dedication Service',
    speaker: 'Mzuzu CCAP Ministry Team',
    category: 'special',
    date: 'January 4, 2026',
    description: 'Starting the year with prayer, worship, and commitment to God\'s purpose for our church.',
  },
  {
    id: 7,
    title: 'The Fruit of the Spirit',
    speaker: 'Rev. Peter Chibwana',
    category: 'teachings',
    date: 'March 22, 2026',
    description: 'An in-depth teaching on Galatians 5 — how the Holy Spirit transforms our character.',
  },
  {
    id: 8,
    title: 'Love Your Neighbour',
    speaker: 'Rev. Mary Nyirenda',
    category: 'sermons',
    date: 'March 15, 2026',
    description: 'A sermon on Christ\'s command to love our neighbours as ourselves in practical ways.',
  },
];

const sermonGrid = document.getElementById('sermonGrid');
const sermonTabs = document.querySelectorAll('.sermon-tab');

function renderSermons(category = 'all') {
  const filtered = category === 'all'
    ? sermons
    : sermons.filter(s => s.category === category);

  sermonGrid.innerHTML = filtered.map(sermon => `
    <div class="sermon-card">
      <div class="sermon-thumb">
        <i class="fas fa-play-circle"></i>
        <div class="sermon-play">
          <i class="fas fa-play"></i>
        </div>
      </div>
      <div class="sermon-body">
        <span class="sermon-category">${capitalize(sermon.category)}</span>
        <h4>${sermon.title}</h4>
        <p>${sermon.description}</p>
        <div class="sermon-meta">
          <span><i class="fas fa-user"></i>${sermon.speaker}</span>
          <span><i class="fas fa-calendar-alt"></i>${sermon.date}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tab switching
sermonTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sermonTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderSermons(tab.dataset.category);
  });
});

// Initial render
renderSermons();

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    organization: formData.get('organization'),
    service: formData.get('service'),
    message: formData.get('message'),
  };

  // Simple validation
  if (!data.name || !data.email || !data.message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simulate sending
  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(`Thank you, ${data.name}! Your message has been received. We will get back to you shortly. God bless you.`);
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// --- SCROLL ANIMATIONS (Intersection Observer) ---
const animateElements = document.querySelectorAll(
  '.about-card, .service-card, .portfolio-item, .sermon-card, .ministry-intro'
);

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

console.log('Mzuzu CCAP Nkhoma Synod — Digital Ministry Website');
console.log('Built by Next Level Advanced Digital Administration (NADA)');
console.log('https://nadadigital.net/');