(function () {
  "use strict";

  const content = window.TAMA_CONTENT || { categories: [], diaryEntries: [], collection: [] };
  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const menuButton = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
  });
  nav?.addEventListener("click", event => {
    if (event.target.closest("a")) {
      menuButton?.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });

  const filterWrap = document.querySelector("[data-filters]");
  const diaryList = document.querySelector("[data-diary-list]");

  function diaryCard(entry, index) {
    const tags = (entry.tags || []).map(tag => `<li>#${escapeHTML(tag)}</li>`).join("");
    const media = entry.image
      ? `<img src="${escapeHTML(entry.image)}" alt="${escapeHTML(entry.imageAlt || "日記相片")}" loading="lazy">`
      : `<div class="entry-pattern" aria-hidden="true"><span>${entry.category === "paradise" ? "✦" : "♥"}</span></div>`;
    return `
      <article class="diary-card" data-category="${escapeHTML(entry.category)}">
        <div class="entry-media">${media}<span class="entry-index">${String(index + 1).padStart(2, "0")}</span></div>
        <div class="entry-body">
          <div class="entry-meta"><time>${escapeHTML(entry.date)}</time>${entry.placeholder ? '<span class="placeholder-badge">待填寫</span>' : ""}</div>
          <h3>${escapeHTML(entry.title)}</h3>
          <p class="entry-model">${escapeHTML(entry.model)}</p>
          <p>${escapeHTML(entry.description)}</p>
          <ul class="entry-tags" aria-label="標籤">${tags}</ul>
        </div>
      </article>`;
  }

  function renderDiary(category = "all") {
    if (!diaryList) return;
    const entries = category === "all"
      ? content.diaryEntries
      : content.diaryEntries.filter(entry => entry.category === category);
    diaryList.innerHTML = entries.length
      ? entries.map(diaryCard).join("")
      : '<p class="empty-state">這個分類暫時未有日記。</p>';
  }

  if (filterWrap) {
    filterWrap.innerHTML = content.categories.map((category, index) =>
      `<button type="button" data-filter="${escapeHTML(category.id)}" aria-pressed="${index === 0}">${escapeHTML(category.label)}</button>`
    ).join("");
    filterWrap.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      filterWrap.querySelectorAll("button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      renderDiary(button.dataset.filter);
    });
  }
  renderDiary();

  const collectionList = document.querySelector("[data-collection-list]");
  if (collectionList) {
    collectionList.innerHTML = content.collection.map((item, index) => `
      <article class="collection-card collection-card--${escapeHTML(item.color)}">
        <div class="collection-visual" aria-hidden="true">
          <span class="collection-number">0${index + 1}</span>
          <div class="mini-device"><div><span>${escapeHTML(item.symbol)}</span><i></i><i></i></div><b></b><b></b><b></b></div>
          <span class="collection-spark">${index % 2 ? "✿" : "✦"}</span>
        </div>
        <div class="collection-copy">
          <p>${escapeHTML(item.shortName)}</p>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.description)}</p>
          <span>${escapeHTML(item.note)} ${item.placeholder ? "· 待填寫" : ""}</span>
        </div>
      </article>`).join("");
  }

  const PET_KEY = "debby-tiny-planet-pet-v1";
  const defaultPet = { mood: 72, energy: 64, lastAction: "hello" };
  let pet = { ...defaultPet };
  try {
    const saved = JSON.parse(localStorage.getItem(PET_KEY));
    if (saved && Number.isFinite(saved.mood) && Number.isFinite(saved.energy)) pet = { ...defaultPet, ...saved };
  } catch (_) { /* localStorage can be unavailable in privacy modes */ }

  const moodBar = document.querySelector("[data-mood-bar]");
  const energyBar = document.querySelector("[data-energy-bar]");
  const moodValue = document.querySelector("[data-mood-value]");
  const energyValue = document.querySelector("[data-energy-value]");
  const petMessage = document.querySelector("[data-pet-message]");
  const petSprite = document.querySelector("[data-pet-sprite]");
  const messages = {
    hello: "今天也一起玩吧！",
    feed: "吃飽飽，心裡暖暖的 ♡",
    play: "好開心！再玩一次！",
    rest: "晚安，做個小小的好夢…",
    reset: "重新認識吧！你好呀！"
  };

  function clamp(value) { return Math.max(0, Math.min(100, value)); }
  function savePet() {
    try { localStorage.setItem(PET_KEY, JSON.stringify(pet)); } catch (_) { /* non-critical */ }
  }
  function renderPet() {
    pet.mood = clamp(pet.mood);
    pet.energy = clamp(pet.energy);
    if (moodBar) moodBar.style.width = `${pet.mood}%`;
    if (energyBar) energyBar.style.width = `${pet.energy}%`;
    if (moodValue) moodValue.textContent = Math.round(pet.mood);
    if (energyValue) energyValue.textContent = Math.round(pet.energy);
    if (petMessage) petMessage.textContent = messages[pet.lastAction] || messages.hello;
    petSprite?.classList.toggle("is-sleeping", pet.lastAction === "rest");
  }
  function animatePet(action) {
    if (!petSprite) return;
    petSprite.classList.remove("is-bouncing", "is-eating");
    void petSprite.offsetWidth;
    if (action === "play") petSprite.classList.add("is-bouncing");
    if (action === "feed") petSprite.classList.add("is-eating");
  }
  document.querySelectorAll("[data-pet-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.petAction;
      if (action === "feed") { pet.mood += 8; pet.energy += 12; }
      if (action === "play") { pet.mood += 16; pet.energy -= 9; }
      if (action === "rest") { pet.mood += 4; pet.energy += 22; }
      pet.lastAction = action;
      savePet(); renderPet(); animatePet(action);
    });
  });
  document.querySelector("[data-pet-reset]")?.addEventListener("click", () => {
    pet = { ...defaultPet, lastAction: "reset" }; savePet(); renderPet();
  });
  renderPet();

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
})();
