# Majesty ARL — Website Resmi

Website statis resmi untuk **Majesty ARL (Aurora Blush Petals Entertainment/Competition)** — komunitas Voice Acting berbasis WhatsApp bertema **Dream Serenity**.

100% HTML, CSS, dan JavaScript murni (vanilla). Tidak ada backend, tidak ada database, siap di-hosting di **GitHub Pages**.

---

## 🗂️ Struktur Folder

```
├── index.html
├── manifest.json
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── icons/          (favicon, apple-touch-icon, PWA icons)
    ├── video/          (video intro Aurora Blush Petals)
    └── images/
        ├── logo/       (logo resmi Aurora Blush Petals)
        ├── team/       (foto seluruh staff)
        ├── gallery/    (aset galeri tambahan)
        ├── background/ (poster/hero background)
        ├── illustration/ (elemen dekoratif petal)
        ├── event/      (aset event, jika ditambahkan)
        └── partner/    (aset partner, jika ditambahkan)
```

## ▶️ Menjalankan Secara Lokal

Karena website ini 100% statis, kamu hanya perlu web server sederhana (dibutuhkan agar path `fetch`/module & video bekerja dengan benar):

**Opsi 1 — Python:**
```bash
cd nama-folder-project
python3 -m http.server 8080
```
Lalu buka `http://localhost:8080` di browser.

**Opsi 2 — VS Code Live Server extension:**
Klik kanan pada `index.html` → "Open with Live Server".

**Opsi 3 — Node (npx serve):**
```bash
npx serve .
```

## 🚀 Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `majesty-arl`.
2. Push seluruh isi folder project ini ke branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Majesty ARL website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/majesty-arl.git
   git push -u origin main
   ```
3. Buka repository di GitHub → **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Source: Deploy from a branch**.
5. Pilih **Branch: main**, folder **/(root)** → klik **Save**.
6. Tunggu beberapa menit, website akan aktif di:
   `https://USERNAME.github.io/majesty-arl/`

> Jika ingin domain root `https://USERNAME.github.io/` (tanpa subfolder), beri nama repository persis `USERNAME.github.io`.

## ⚠️ Yang Perlu Diperbarui Sebelum Publish

Beberapa tautan berikut menggunakan placeholder karena data asli tidak tersedia di dalam berkas aset yang diberikan — **wajib diganti dengan tautan resmi sebelum go-live**:

- Tautan tombol **"Join WhatsApp" / "Gabung WhatsApp Channel"** (`href="#join"` pada beberapa tombol, dan `https://whatsapp.com/channel/majesty-arl` pada CTA utama) → ganti dengan link WhatsApp Channel/grup resmi.
- Tautan **TikTok** (`https://www.tiktok.com/@majesty.arl`) → ganti dengan username TikTok resmi jika berbeda.
- URL kanonik & Open Graph di `index.html` (`https://majesty-arl.github.io/`) → sesuaikan dengan URL GitHub Pages final kamu, lalu perbarui juga di `sitemap.xml` dan `robots.txt`.
- Nama & peran 4 dari 6 staff (Eresh, Nadiah, Pandu, Zeru) diasumsikan mengikuti struktur peran pada brief (W. Founder, Secretary, Promotion, Staff) karena label peran asli hanya dapat dikonfirmasi untuk Ashkym (Founder) dan Dira (Editor) dari nama berkas aset. Silakan sesuaikan jika ada perbedaan.

## 🎨 Ringkasan Identitas Visual

- **Palet warna**: Rose Mauve `#B8577D`, Blush Petal Pink `#F6C9DC`, Dream Lavender `#B79CF0`, Soft Gold `#E3B463`, Aurora White `#FFF8FB`.
- **Tipografi**: Cormorant Garamond (display/heading), Quicksand (body), Dancing Script (aksen tagline).
- **Gaya visual**: dreamy, soft pastel, sakura/petal motif, glassmorphism ringan, rounded corner, elegant & premium.

## ♿ Aksesibilitas & Performa

- Semantic HTML5, ARIA pada komponen interaktif (accordion, lightbox, navigasi).
- Kontras warna teks disesuaikan dengan standar keterbacaan.
- Mendukung navigasi keyboard penuh & `prefers-reduced-motion`.
- Lazy-loading gambar, preconnect font, ukuran gambar dioptimalkan untuk web.
