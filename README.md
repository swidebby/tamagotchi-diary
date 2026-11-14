# 小小星球日記

Debby's Tamagotchi Diary 是一個以繁體中文為主的私人電子寵物手帳，部署於 GitHub Pages。網站使用原生 HTML、CSS 和 JavaScript，不需要安裝套件或執行建置指令。

> 這是個人非官方日記，網站內的像素寵物與裝飾圖案均為原創設計。`content.js` 目前的日記文字清楚標示為「待填寫」範例，不代表 Debby 的真實經歷。

## 檔案結構

```text
├── index.html                 # 頁面結構與固定文字
├── styles.css                # 顏色、版面與動畫
├── script.js                 # 篩選、選單與迷你寵物互動
├── content.js                # 日記和收藏內容（最常編輯）
├── favicon.svg               # 網站圖示
├── CNAME                     # 自訂網域；請勿加入 https://
└── assets/                   # 相片和其他素材
```

## 新增日記

1. 開啟 `content.js`。
2. 在 `diaryEntries` 中複製一個 `{ ... }` 項目。
3. 為 `id` 填寫不重複的英文名稱，並修改日期、標題、型號、內文和標籤。
4. 使用現有分類：`melody-kuromi` 或 `paradise`。新增分類時，也要在 `categories` 增加對應項目。
5. 真實內容完成後，把 `placeholder: true` 改成 `placeholder: false`。

範例：

```js
{
  id: "2026-01-18-my-note",
  date: "2026.01.18",
  title: "今天的標題",
  model: "Tamagotchi Paradise",
  category: "paradise",
  description: "今天發生的真實事情。",
  tags: ["成長記錄", "日常"],
  image: "assets/2026-01-18.jpg",
  imageAlt: "相片的簡短描述",
  placeholder: false
}
```

## 新增相片

1. 把壓縮後的 JPG、PNG、WebP 或 SVG 放進 `assets/`。建議每張相片小於 500 KB，檔名使用小寫英文、數字和連字號。
2. 在日記項目的 `image` 填寫路徑，例如 `assets/2026-01-18.jpg`。
3. 在 `imageAlt` 描述相片內容，方便使用讀屏軟件的訪客。若不需要相片，把 `image` 留空即可。

只上載自己擁有或獲准使用的相片。不要直接使用品牌宣傳圖。

## 新增收藏型號

在 `content.js` 的 `collection` 陣列複製一項，修改 `name`、`shortName`、`note` 和 `description`。`color` 可使用 `pink` 或 `green`。填好真實資料後，把 `placeholder` 改為 `false`。

## 修改顏色或固定文字

- 全站主要顏色在 `styles.css` 最上方的 `:root`，例如 `--pink`、`--green` 和 `--cream`。
- 首頁標題、關於文字和迷你寵物介紹在 `index.html`。
- 操作後的寵物訊息在 `script.js` 的 `messages`。

## 本機預覽

在專案目錄執行：

```bash
python3 -m http.server 8000
```

然後開啟 `http://localhost:8000`。直接雙擊 `index.html` 也能檢查大部分內容，但使用本機伺服器比較接近 GitHub Pages。

## 發佈到 GitHub Pages

網站使用 `main` 分支根目錄部署。修改檔案後：

```bash
git add .
git commit -m "Update diary"
git push origin main
```

GitHub 會自動重新部署。部署狀態可在 [Actions](https://github.com/swidebby/tamagotchi-diary/actions) 查看；Pages 設定在 [Settings → Pages](https://github.com/swidebby/tamagotchi-diary/settings/pages)。

自訂網域應為 `tama.debby.one`，而 GoDaddy DNS 的 `tama` CNAME 應指向 `swidebby.github.io`。請保留根網域和其他 DNS 記錄。

## 瀏覽器資料

迷你寵物狀態只儲存在訪客自己的瀏覽器 `localStorage`，不會傳到伺服器。按「重設寵物狀態」即可清除目前狀態。
