(() => {
  "use strict";
  const data = window.TAMA_CONTENT || { categories: [], diaryEntries: [], collection: [] };
  const photoSources = [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/David%27s_Tamagotchi.jpg/500px-David%27s_Tamagotchi.jpg",
      alt: "手持黃色電子寵物參考照片，並非作者本人藏品"
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Tamagotchi_%289174345467%29.jpg/960px-Tamagotchi_%289174345467%29.jpg",
      alt: "復古電子寵物展示參考照片，並非作者本人藏品"
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Tamagotchis.jpg/960px-Tamagotchis.jpg",
      alt: "電子寵物與手提電腦參考照片，並非作者本人藏品"
    }
  ];
  const escape = (value = "") => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const getImage = (item, index) => {
    if (item.image && !/photo-placeholder\.svg$/i.test(item.image)) {
      const path = String(item.image);
      return {
        src: /^(https?:\/\/|\/)/.test(path) ? path : "../" + path.replace(/^\.\//, ""),
        alt: item.imageAlt || "日記相片",
        demo: false
      };
    }
    return { ...photoSources[index % photoSources.length], demo: true };
  };
  const diaryList = document.querySelector("[data-diary-list]");
  const filters = document.querySelector("[data-filters]");
  const results = document.querySelector("[data-result-count]");
  const searchToggle = document.querySelector("[data-search-toggle]");
  const searchForm = document.querySelector("[data-search-form]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchClear = document.querySelector("[data-search-clear]");
  let activeCategory = "all";
  let searchText = "";

  function diaryCard(entry, index) {
    const photo = getImage(entry, index);
    const tags = (entry.tags || []).join(" | ");
    const displayCategory = (data.categories.find(c => c.id === entry.category) || {}).label || entry.category;
    return '<article class="diary-card">' +
      '<div class="diary-media">' +
      '<img src="' + escape(photo.src) + '" alt="' + escape(photo.alt) + '" loading="lazy">' +
      (photo.demo ? '<span class="diary-media-caption micro">ILLUSTRATIVE PHOTO</span>' : '') +
      '</div>' +
      '<div class="diary-content">' +
      '<h3>' + escape(entry.title) + '</h3>' +
      '<div class="diary-metadata"><span>' + escape(displayCategory) + '</span><time>' + escape(entry.date) + '</time></div>' +
      '<p class="diary-description">' + escape(entry.description) + '</p>' +
      '<p class="diary-tags">' + escape(entry.model) + (tags ? ' | ' + escape(tags) : '') + '</p>' +
      (entry.placeholder ? '<span class="placeholder-label">內容待填寫 / SAMPLE ENTRY</span>' : '') +
      '</div></article>';
  }
  function renderDiary() {
    if (!diaryList) return;
    const keyword = searchText.trim().toLocaleLowerCase();
    const entries = data.diaryEntries.map((item, index) => ({ item, index })).filter(({ item }) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const searchPool = [item.title, item.description, item.model, item.date, ...(item.tags || [])].join(" ").toLocaleLowerCase();
      return matchCategory && (!keyword || searchPool.includes(keyword));
    });
    diaryList.innerHTML = entries.length
      ? entries.map(({ item, index }) => diaryCard(item, index)).join("")
      : '<p class="empty-state">找不到符合條件的日記。請試試其他關鍵字或分類。</p>';
    if (results) results.textContent = "ARCHIVE / " + String(entries.length).padStart(2, "0") + " ENTRIES";
  }
  if (filters) {
    filters.innerHTML = data.categories.map(c =>
      '<button type="button" data-filter="' + escape(c.id) + '" aria-pressed="' + String(c.id === activeCategory) + '">' + escape(c.label) + '</button>'
    ).join("");
    filters.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeCategory = button.dataset.filter;
      filters.querySelectorAll("button").forEach(el => el.setAttribute("aria-pressed", String(el === button)));
      renderDiary();
    });
  }
  searchToggle?.addEventListener("click", () => {
    const open = searchToggle.getAttribute("aria-expanded") === "true";
    searchToggle.setAttribute("aria-expanded", String(!open));
    if (searchForm) searchForm.hidden = open;
    if (!open) searchInput?.focus();
  });
  searchForm?.addEventListener("submit", event => event.preventDefault());
  searchInput?.addEventListener("input", () => {
    searchText = searchInput.value;
    renderDiary();
  });
  searchClear?.addEventListener("click", () => {
    if (searchInput) { searchInput.value = ""; searchInput.focus(); }
    searchText = "";
    renderDiary();
  });
  renderDiary();

  const collectionList = document.querySelector("[data-collection-list]");
  if (collectionList) {
    collectionList.innerHTML = data.collection.map((item, index) => {
      const photo = photoSources[(index + 1) % photoSources.length];
      return '<article class="collection-card">' +
        '<img src="' + escape(photo.src) + '" alt="' + escape(photo.alt) + '" loading="lazy">' +
        '<div class="collection-content"><p class="micro">COLLECTION / ' + String(index + 1).padStart(2, "0") + '</p>' +
        '<h3>' + escape(item.name) + '</h3>' +
        '<p>' + escape(item.description) + '</p>' +
        '<div class="collection-meta"><span>' + escape(item.shortName) + '</span><span>' + escape(item.note) + '</span></div>' +
        '<span class="placeholder-label">REFERENCE IMAGE / ' + (item.placeholder ? '內容待填寫' : '示範照片') + '</span></div></article>';
    }).join("");
  }

  const PET_KEY = "debby-tiny-planet-pet-v1";
  const defaultPet = { mood: 72, energy: 64, lastAction: "hello" };
  const messages = {
    hello: "今天也一起玩吧！",
    feed: "吃飽飽，心裡暖暖的。",
    play: "好開心！再玩一次！",
    rest: "晚安，做個小小的好夢…",
    reset: "重新認識吧！你好呀！"
  };
  let pet = { ...defaultPet };
  try {
    const saved = JSON.parse(localStorage.getItem(PET_KEY));
    if (saved && Number.isFinite(saved.mood) && Number.isFinite(saved.energy)) {
      pet = { ...defaultPet, ...saved };
    }
  } catch (_) { /* Storage can be blocked in private browsing */ }

  const moodBar = document.querySelector("[data-mood-bar]");
  const energyBar = document.querySelector("[data-energy-bar]");
  const moodValue = document.querySelector("[data-mood-value]");
  const energyValue = document.querySelector("[data-energy-value]");
  const message = document.querySelector("[data-pet-message]");
  const sprite = document.querySelector("[data-pet-sprite]");
  const clamp = number => Math.max(0, Math.min(100, number));
  function persistPet() {
    try { localStorage.setItem(PET_KEY, JSON.stringify(pet)); } catch (_) { /* Non-critical */ }
  }
  function renderPet() {
    pet.mood = clamp(pet.mood);
    pet.energy = clamp(pet.energy);
    if (moodBar) moodBar.style.width = pet.mood + "%";
    if (energyBar) energyBar.style.width = pet.energy + "%";
    if (moodValue) moodValue.textContent = String(Math.round(pet.mood));
    if (energyValue) energyValue.textContent = String(Math.round(pet.energy));
    if (message) message.textContent = messages[pet.lastAction] || messages.hello;
    sprite?.classList.toggle("is-sleeping", pet.lastAction === "rest");
  }
  document.querySelectorAll("[data-pet-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.petAction;
      if (action === "feed") { pet.mood += 8; pet.energy += 12; }
      if (action === "play") { pet.mood += 16; pet.energy -= 9; }
      if (action === "rest") { pet.mood += 4; pet.energy += 22; }
      pet.lastAction = action;
      persistPet();
      renderPet();
      sprite?.classList.remove("is-bouncing", "is-eating");
      if (sprite) void sprite.offsetWidth;
      if (action === "play") sprite?.classList.add("is-bouncing");
      if (action === "feed") sprite?.classList.add("is-eating");
    });
  });
  document.querySelector("[data-pet-reset]")?.addEventListener("click", () => {
    pet = { ...defaultPet, lastAction: "reset" };
    persistPet();
    sprite?.classList.remove("is-bouncing", "is-eating");
    renderPet();
  });
  renderPet();
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
