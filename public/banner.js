(() => {
  const CONFIG = {
    registryUrl: "https://raw.githubusercontent.com/ui-errors/ui-banner/main/build/registry.json",
    timeout: 2500,
    rootId: "ui-banner-root"
  };

  function todayMMDD() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}-${dd}`;
  }

  function inRange(today, start, end) {
    return today >= start && today <= end;
  }

  function safeFetch(url, timeout) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { signal: controller.signal })
      .then(r => {
        clearTimeout(t);
        if (!r.ok) throw new Error("fetch failed");
        return r;
      })
      .catch(() => null);
  }

  function ensureHostRoot() {
    let el = document.getElementById(CONFIG.rootId);

    if (!el) {
      el = document.createElement("div");
      el.id = CONFIG.rootId;

      // NEVER affects layout
      el.style.position = "relative";
      el.style.width = "100%";

      document.body.prepend(el);
    }

    return el;
  }

  function mountShadow(html) {
    const host = ensureHostRoot();

    // clear previous render
    host.innerHTML = "";

    const shadow = host.attachShadow({ mode: "open" });

    // safety wrapper inside shadow
    const wrapper = document.createElement("div");

    wrapper.style.width = "100%";
    wrapper.style.maxWidth = "100%";
    wrapper.style.boxSizing = "border-box";
    wrapper.style.overflow = "hidden";

    wrapper.innerHTML = html;

    shadow.appendChild(wrapper);
  }

  async function load() {
    try {
      const res = await safeFetch(CONFIG.registryUrl, CONFIG.timeout);
      if (!res) return;

      const registry = await res.json();

      const today = todayMMDD();
      const forced = window.UI_BANNER?.banner;

      let selected = null;

      // 1. manual override
      if (forced) {
        selected = registry.banners.find(
          b => b.id === forced || b.folder === forced
        );
      }

      // 2. auto schedule
      if (!selected) {
        const matches = registry.banners.filter(b =>
          b.start && b.end && inRange(today, b.start, b.end)
        );

        selected = matches[0] || null;
      }

      if (!selected) return;

      const htmlRes = await safeFetch(selected.file, CONFIG.timeout);
      if (!htmlRes) return;

      const html = await htmlRes.text();

      mountShadow(html);

    } catch (err) {
      console.warn("UI Banner error:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(load, 0));
  } else {
    setTimeout(load, 0);
  }
})();
