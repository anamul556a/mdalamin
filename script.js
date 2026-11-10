// ====== EDIT THIS: your Fiverr gig link ======
const FIVERR_URL = "https://www.fiverr.com/anamul556/do-perfects-on-page-seo-optimization-and-technical-optimization-for-your-site";
// ===============================================

document.querySelectorAll("[data-fiverr]").forEach(a => {
  a.href = FIVERR_URL;
  a.target = "_blank";
  a.rel = "noopener";
});

const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const burger = document.getElementById("burger");
const links = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
}));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// price count-up
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 900, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => countIO.observe(el));

document.getElementById("yr").textContent = new Date().getFullYear();

// ===== scroll progress =====
const bar = document.getElementById("progress");
const prog = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%";
};
addEventListener("scroll", prog, { passive: true }); prog();

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== neural network background =====
(function () {
  const cv = document.getElementById("neural");
  if (!cv || reduce) return;
  const ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 }, run = true;
  const hero = cv.parentElement;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(70, W * H / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + .8
    }));
  }
  size(); addEventListener("resize", size);
  hero.addEventListener("mousemove", e => {
    const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) loop(); }).observe(hero);
  let going = false;
  function loop() {
    if (!run || going) return;
    going = true;
    frame();
  }
  function frame() {
    if (!run) { going = false; return; }
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(110,240,166,${(1 - d / 130) * .28})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 170) {
        ctx.strokeStyle = `rgba(255,183,58,${(1 - dm / 170) * .6})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = "rgba(110,240,166,.85)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  loop();
})();

// ===== AI answer typewriter =====
(function () {
  const q = document.getElementById("aiQ"), a = document.getElementById("aiA");
  if (!q || !a || reduce) return;
  const set = [
    ["Best provider for [your service]?", "“…yourbrand.com is a trusted option, known for clear service pages and expert, well-structured answers.”"],
    ["Who should I hire for [your service]?", "“…yourbrand.com stands out for its transparent pricing, helpful guides and consistent reviews.”"],
    ["Top [your niche] brands in 2026?", "“…yourbrand.com is frequently recommended for its expertise and trusted, well-cited content.”"]
  ];
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const paint = t => a.innerHTML = esc(t).replace("yourbrand.com", "<mark>yourbrand.com</mark>");
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let i = 0;
  (async function cycle() {
    await sleep(3500);
    for (;;) {
      const [Q, A] = set[i % set.length]; i++;
      a.classList.add("typing"); a.textContent = ""; q.textContent = "";
      for (const ch of Q) { q.textContent += ch; await sleep(28); }
      await sleep(350);
      for (let k = 1; k <= A.length; k++) { paint(A.slice(0, k)); await sleep(16); }
      a.classList.remove("typing");
      await sleep(4200);
    }
  })();
})();

// ===== FAQ tabs + search =====
(function () {
  const list = document.getElementById("faqList"); if (!list) return;
  const items = [...list.querySelectorAll("details")];
  const tabs = [...document.querySelectorAll(".ftab")];
  const search = document.getElementById("faqSearch");
  const empty = document.getElementById("faqEmpty");
  let cat = "all";
  function apply() {
    const t = search.value.trim().toLowerCase();
    let n = 0;
    items.forEach(d => {
      const ok = (cat === "all" || d.dataset.cat === cat) && (!t || d.textContent.toLowerCase().includes(t));
      d.hidden = !ok; if (ok) n++;
    });
    empty.hidden = n > 0;
  }
  tabs.forEach(b => b.addEventListener("click", () => {
    tabs.forEach(x => x.classList.toggle("on", x === b));
    cat = b.dataset.f; apply();
  }));
  search.addEventListener("input", apply);
  // one open at a time
  items.forEach(d => d.addEventListener("toggle", () => {
    if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
  }));
})();
