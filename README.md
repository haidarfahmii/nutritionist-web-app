# Alur Kerja Proyek Nutritionist Web App

Dokumentasi ini menjelaskan alur kerja untuk fitur-fitur utama pada aplikasi web Nutritionist, terutama yang berkaitan dengan manajemen blog.

**URL Website:** [https://nutritionistku.vercel.app/](https://nutritionistku.vercel.app/)

## Akun untuk Pengujian

Anda dapat menggunakan akun berikut untuk menguji fungsionalitas yang berbeda.

### Akun Admin

Akun ini memiliki hak akses penuh, termasuk untuk mengedit dan menghapus postingan blog.

-   **Email:** `hubungi saya untuk mendapatkan akses`
-   **Password:** `hubungi saya untuk mendapatkan akses`

### Akun User

Akun user standar dapat membuat postingan blog namun tidak dapat mengedit atau menghapus postingan milik orang lain.

-   Anda dapat membuat akun user baru melalui halaman registrasi:
    [https://nutritionistku.vercel.app/register](https://nutritionistku.vercel.app/register)

---

## Alur Kerja Fitur Blog

Berikut adalah langkah-langkah untuk mengelola konten blog di dalam aplikasi.

### 1. Membuat Blog (Dapat dilakukan User & Admin)

Setiap pengguna yang telah terautentikasi (login) dapat membuat postingan blog baru.

1.  Buka halaman web dan **Login** menggunakan akun **Admin** atau **User**.
2.  Navigasi ke halaman Blog: [https://nutritionistku.vercel.app/blog](https://nutritionistku.vercel.app/blog)
3.  Klik tombol **"Create Blog"** yang berada di bagian atas halaman.
    * *Catatan: Tombol ini hanya akan muncul jika Anda sudah login.*
4.  Anda akan diarahkan ke halaman formulir `/blog/create`.
5.  Isi semua field yang diperlukan:
    * Title
    * Image (Bisa melalui URL atau upload file)
    * Author
    * Category
    * Description (Ringkasan singkat)
    * Content (Isi lengkap blog)
6.  Klik tombol **"Publish Blog"**. Setelah berhasil, Anda akan otomatis diarahkan ke halaman detail dari blog yang baru saja Anda buat.

### 2. Mengedit Blog (Khusus Admin)

Hanya pengguna dengan role `admin` yang dapat melihat tombol "Edit" dan mengakses fungsionalitas ini.

1.  **Login** sebagai **Admin**.
2.  Pergi ke halaman detail blog yang ingin Anda edit (contoh: `.../blog/your-blog-slug`).
3.  Di bawah gambar utama, akan muncul tombol **"Edit"**.
4.  Klik tombol **"Edit"**.
5.  Anda akan diarahkan ke halaman formulir `/blog/edit/[slug]` dengan data yang sudah terisi.
6.  Lakukan perubahan yang Anda inginkan pada form.
7.  Klik tombol **"Save Changes"** untuk menyimpan perubahan. Anda akan diarahkan kembali ke halaman detail blog dengan konten yang sudah diperbarui.

### 3. Menghapus Blog (Khusus Admin)

Sama seperti edit, hanya pengguna dengan role `admin` yang dapat menghapus postingan blog.

1.  **Login** sebagai **Admin**.
2.  Pergi ke halaman detail blog yang ingin Anda hapus.
3.  Di sebelah tombol "Edit", klik tombol **"Delete"** yang berwarna merah.
4.  Sebuah dialog konfirmasi akan muncul menanyakan "Are you sure?".
5.  Klik tombol **"Delete"** di dalam dialog tersebut untuk mengonfirmasi.
6.  Postingan blog akan dihapus secara permanen, dan Anda akan diarahkan kembali ke halaman daftar blog (`/blog`).
