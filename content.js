/*
 * 內容編輯區
 * 新增日記或收藏時，複製一個物件並修改文字即可。
 * placeholder: true 會顯示「待填寫」標籤，避免把範例誤當成真實經歷。
 */
window.TAMA_CONTENT = {
  categories: [
    { id: "all", label: "全部" },
    { id: "melody-kuromi", label: "My Melody & Kuromi" },
    { id: "paradise", label: "Tamagotchi Paradise" }
  ],

  diaryEntries: [
    {
      id: "first-memory",
      date: "日期待補",
      title: "第一篇星球日誌",
      model: "My Melody & Kuromi Tamagotchi",
      category: "melody-kuromi",
      description: "在這裡寫下第一次開機、遇見角色，或某個想要記住的日常片段。這段文字目前只是內容位置示範。",
      tags: ["初次見面", "日常"],
      image: "",
      placeholder: true
    },
    {
      id: "paradise-note",
      date: "日期待補",
      title: "來自新星球的消息",
      model: "Tamagotchi Paradise",
      category: "paradise",
      description: "可以在這裡記錄新角色、成長階段，或今天發生的一件小事。加入真實內容後，把 placeholder 改成 false。",
      tags: ["成長記錄", "待整理"],
      image: "",
      placeholder: true
    },
    {
      id: "photo-memory",
      date: "日期待補",
      title: "一張照片，一段回憶",
      model: "My Melody & Kuromi Tamagotchi",
      category: "melody-kuromi",
      description: "這張卡片示範日後加入相片的位置。把圖片放進 assets 資料夾，再於 content.js 填上路徑即可。",
      tags: ["相片", "收藏"],
      image: "assets/photo-placeholder.svg",
      imageAlt: "相片位置示意圖",
      placeholder: true
    }
  ],

  collection: [
    {
      name: "My Melody & Kuromi Tamagotchi",
      shortName: "MELODY & KUROMI",
      color: "pink",
      symbol: "♥",
      note: "收藏資料待 Debby 補充",
      description: "預留給機身版本、入手日期與喜愛原因的介紹位置。",
      placeholder: true
    },
    {
      name: "Tamagotchi Paradise",
      shortName: "PARADISE",
      color: "green",
      symbol: "✦",
      note: "收藏資料待 Debby 補充",
      description: "預留給星球特色、遊玩心得與收藏故事的介紹位置。",
      placeholder: true
    }
  ]
};
