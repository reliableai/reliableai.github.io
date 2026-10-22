// Site menu for the homepage and About page. Edit the items here; every page picks them up.
// Each page needs: <nav id="site-menu"></nav> and <script src="menu.js"></script>
(function () {
  const items = [
    { label: "Home", href: "index.html" },
    { label: "About the course", href: "about.html" },
    { label: "Optional deep dives", href: "index.html#deep-dives" },
    { label: "Playgrounds", href: "https://reliableai.github.io/playground/", external: true },
    { label: "YouTube channel", href: "https://www.youtube.com/@aimadeeasy5926", external: true }
  ];
  const nav = document.getElementById("site-menu");
  if (!nav) throw new Error("menu.js: page has no <nav id=\"site-menu\">");
  const page = location.pathname.split("/").pop() || "index.html";
  const list = document.createElement("ul");
  items.forEach(function (item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    if (item.external) { a.target = "_blank"; a.rel = "noopener"; }
    if (item.href === page) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    list.appendChild(li);
  });
  nav.appendChild(list);
})();
