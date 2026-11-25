// Mobile menu, scroll-spy for the anchors, direction accordions (mobile only), sticky call bar.
const header = document.getElementById("site-header");
const btn = document.getElementById("menu-btn") as HTMLButtonElement | null;
const menu = document.getElementById("menu");
const wide = window.matchMedia("(min-width: 1100px)");
const phone = window.matchMedia("(max-width: 767px)");

function setMenu(open: boolean) {
  if (!header || !btn || !menu) return;
  header.toggleAttribute("data-menu-open", open);
  btn.setAttribute("aria-expanded", String(open));
  btn.querySelector(".menu-btn__text")!.textContent = open ? "Закрити" : "Меню";
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) menu.removeAttribute("inert"); else menu.setAttribute("inert", "");
}
if (btn && menu) {
  menu.setAttribute("inert", "");
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); }
  });
  wide.addEventListener("change", () => { if (wide.matches) setMenu(false); });
}

// Scroll-spy: aria-current on the anchor of the section in view.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-spy] a[href^='#']"));
const secs = links.map((a) => document.querySelector<HTMLElement>(a.getAttribute("href")!)).filter(Boolean) as HTMLElement[];
if ("IntersectionObserver" in window && secs.length) {
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = "#" + (e.target as HTMLElement).id;
      links.forEach((a) => (a.getAttribute("href") === id ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
    }
  }, { rootMargin: "-35% 0px -60% 0px" });
  secs.forEach((s) => spy.observe(s));
}

// Directions: all open on desktop, accordion on phone (open without JS, so the content is always readable).
const dirs = Array.from(document.querySelectorAll<HTMLDetailsElement>("details.dir"));
function syncDirs() {
  dirs.forEach((d) => {
    const sum = d.querySelector("summary")!;
    if (wide.matches) { d.open = true; sum.tabIndex = -1; sum.setAttribute("aria-disabled", "true"); }
    else { sum.removeAttribute("tabindex"); sum.removeAttribute("aria-disabled"); }
  });
}
dirs.forEach((d) => {
  d.querySelector("summary")!.addEventListener("click", (e) => { if (wide.matches) e.preventDefault(); });
});
if (!wide.matches) dirs.forEach((d) => (d.open = false));
syncDirs();
wide.addEventListener("change", () => { syncDirs(); if (!wide.matches) dirs.forEach((d) => (d.open = false)); });

// Sticky call bar on phone: appears after the first screen.
const bar = document.getElementById("callbar");
const hero = document.getElementById("top");
if (bar && hero && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(([e]) => { const on = !e.isIntersecting; bar.classList.toggle("is-on", on); bar.toggleAttribute("inert", !on); }, { rootMargin: "-80px 0px 0px 0px" });
  io.observe(hero);
} else bar?.classList.add("is-on");
void phone;
