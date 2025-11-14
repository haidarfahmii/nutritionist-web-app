# Nutritionist Web App

Platform aplikasi web nutrisi yang dibangun dengan **Next.js 16 (App Router)**, dirancang untuk menghubungkan ahli gizi dengan klien, serta menyediakan artikel kesehatan edukatif. Proyek ini menggunakan arsitektur *feature-based*, styling modern dengan Tailwind CSS, dan Backendless sebagai *Backend-as-a-Service* (BaaS).

---

## 📋 Daftar Isi
1. [Analisis Proyek](#analisis-proyek)
2. [Panduan Pengguna (User Client Flow)](#-panduan-pengguna-user-client-flow)
   - [Akses Pengunjung (Public)](#1-akses-pengunjung-public)
   - [Akses Pengguna Terdaftar (User)](#2-akses-pengguna-terdaftar-user)
   - [Akses Administrator (Admin)](#3-akses-administrator-admin)
3. [Panduan Developer (Developer Flow)](#-panduan-developer-developer-flow)
   - [Tech Stack](#tech-stack)
   - [Struktur Proyek & Arsitektur](#struktur-proyek--arsitektur)
   - [Instalasi & Setup](#instalasi--setup)
   - [Environment Variables](#environment-variables)
   - [Catatan Pengembangan Penting](#catatan-pengembangan-penting)

---

## Analisis Proyek

Proyek ini adalah aplikasi **Full-stack** yang server-less (menggunakan BaaS).
- **Keamanan:** Menggunakan JWT/Session token via Backendless. Middleware digunakan untuk memproteksi *route* admin dan *authenticated routes*.
- **Performa:** Menggunakan `Next.js Image Optimization`, *lazy loading* pada komponen berat, dan *server-side data fetching* untuk SEO yang baik.
- **UI/UX:** Desain responsif dengan animasi halus menggunakan `framer-motion`.

---

## 👥 Panduan Pengguna (User Client Flow)

Berikut adalah alur penggunaan aplikasi berdasarkan peran pengguna:

### 1. Akses Pengunjung (Public)
Pengguna tanpa akun dapat mengakses informasi umum:
* **Beranda:** Melihat hero section, fitur unggulan, testimoni, dan *pricing* (paket harga).
* **Blog:** Membaca artikel kesehatan. Fitur pencarian (*search*) dan filter kategori tersedia secara *real-time* (debounced).
* **Team:** Melihat daftar ahli gizi (Data diambil dari API eksternal `randomuser.me`).
* **Services:** Melihat detail paket layanan (Basic, Premium, Elite).
* **About:** Membaca sejarah dan pencapaian perusahaan.

### 2. Akses Pengguna Terdaftar (User)
Setelah melakukan **Registrasi** dan **Login**, pengguna mendapatkan akses fitur interaktif:
* **Autentikasi:**
    * *Register:* Mendaftar akun baru dengan validasi form (Yup/Formik).
    * *Login:* Masuk ke sistem. Sesi akan disimpan (persist) menggunakan Zustand.
* **Manajemen Blog (User):**
    * **Create Blog:** Akses menu "Create Blog" untuk menulis artikel baru. Bisa upload gambar cover atau menggunakan URL gambar.
    * **Edit/Delete:** Pengguna **hanya** dapat mengedit atau menghapus artikel blog yang **mereka buat sendiri** (kepemilikan divalidasi oleh sistem).

### 3. Akses Administrator (Admin)
Role khusus yang memiliki kontrol penuh terhadap sistem. Role ini diset melalui database Backendless.
* **Manajemen Blog (Super Access):** Admin dapat mengedit dan menghapus **semua** artikel blog, terlepas dari siapa penulisnya.
* **User Management (Dashboard Admin):**
    * Apabila mau test role `admin` bisa minta/hubungi developer agar diberikan akses sementara.
    * Akses route `/admin/users`.
    * Melihat daftar semua pengguna terdaftar.
    * **Suspend/Activate:** Dapat memblokir akun pengguna (suspend) atau mengaktifkannya kembali.
    * **Change Role:** Dapat mengubah role pengguna biasa menjadi admin atau sebaliknya.


---

## 💻 Panduan Developer (Developer Flow)

Bagian ini menjelaskan cara kerja kode, struktur folder, dan cara mengembangkan fitur baru.

### Tech Stack
* **Core:** Next.js 16 (App Router), TypeScript.
* **Styling:** Tailwind CSS, Shadcn UI (Radix Primitives), Lucide Icons.
* **State Management:** Zustand (dengan persist middleware).
* **Form Handling:** Formik + Yup Validation.
* **Backend/DB:** Backendless (BaaS) untuk Database, File Storage, dan Auth.
* **Animations:** Framer Motion.
* **HTTP Client:** Axios (dengan interceptor untuk auto-attach token).

### Struktur Proyek & Arsitektur
Proyek ini menggunakan pendekatan **Feature-based folder structure** di dalam `src/`, membuat kode sangat modular dan mudah dipelihara.

```bash
src/
├── app/                 # Next.js App Router (Pages & API Routes)
│   ├── api/             # Backend logic (Auth, Blog, Admin routes)
│   ├── admin/           # Halaman khusus Admin
│   ├── blog/            # Halaman Blog (List, Detail, Create, Edit)
│   └── ...
├── components/          # Shared UI components (Button, Card, Input, dll)
├── features/            # Logika spesifik per fitur
├── lib/                 # Utility functions, Types, Animation configs
├── providers/           # Context Providers (Auth, Header visibility)
├── stores/              # Global State (Zustand - useAuthStore)
└── utils/               # Konfigurasi Axios & Backendless
```

## Instalasi & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd nutritionist-web-app
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment Variables: Buat file .env.local di root folder dan isi kredensial Backendless Anda:
```bash
NEXT_PUBLIC_BACKENDLESS_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_BACKENDLESS_API_KEY=YOUR_API_KEY
API_BASE_URL=http://localhost:3000 # Atau URL production
```

### 4. Jalankan Development Server
```bash
npm run dev
```
