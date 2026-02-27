/* ══════════════════════════════════════
   Pankaj Dnyaneshwar Mule – Portfolio JS
   ══════════════════════════════════════ */

/* ── 1. Particle Canvas ── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function buildParticles() {
    const count = Math.floor(W * H / 14000);
    particles = Array.from({ length: count }, () => ({
      x:  randomBetween(0, W),
      y:  randomBetween(0, H),
      r:  randomBetween(0.5, 2),
      dx: randomBetween(-0.25, 0.25),
      dy: randomBetween(-0.25, 0.25),
      o:  randomBetween(0.1, 0.5),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.o})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Draw faint connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); buildParticles(); });
  resize();
  buildParticles();
  draw();
})();


/* ── 2. Typing Animation ── */
(function initTyping() {
  const texts = [
    'Sr. Linux Administrator',
    'System Reliability Engineer',
    'Infrastructure Automation Pro',
    'Open-Source Enthusiast',
    'Bash / Python Scripter',
  ];
  const el  = document.getElementById('typed-text');
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
      setTimeout(type, 70);
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; setTimeout(type, 400); return; }
      setTimeout(type, 35);
    }
  }
  setTimeout(type, 800);
})();


/* ── 3. Navbar Scroll & Active Link ── */
(function initNav() {
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const hamburger= document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();


/* ── 4. Intersection Observer – Skill Bars & Fade-in ── */
(function initObserver() {
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); barObserver.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObserver.observe(b));

  // Generic fade-in for cards / sections
  const cards = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-card, .contact-card, .about-grid, .stat-card'
  );
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
        cardObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => {
    c.style.opacity   = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition= 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(c);
  });
})();


/* ── 5. Contact Form ── */
(function initForm() {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('send-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      this.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message ✈️';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
})();


/* ── 6. Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
