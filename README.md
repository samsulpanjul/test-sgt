# Test - SGT

Aplikasi untuk test frontend developer - manajemen produk dengan authentication Firebase.

## Fitur yang Diimplementasi

- Authentication - Login dan register dengan Firebase Auth
- Protected Routes - Halaman products hanya bisa diakses setelah login
- CRUD Products - Tambah dan edit produk
- Search & Pagination - Cari produk dan navigasi halaman

## Environment Yang Digunakan

- Node.js: Versi 22.20.0
- npm: Versi 10.9.3
- Akun Firebase: Untuk authentication

## Cara Install

1. Clone Repository

```
git clone https://github.com/samsulpanjul/test-sgt.git
cd test-sgt
```

2. Install Dependencies

```
npm install
```

3. Setup Environment

Buat file `.env.local` di root project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=api_key_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=app_id
```

4. Setup Firebase

- Buka Firebase Console
- Buat project baru atau pakai yang sudah ada
- Enable Authentication → Email/Password provider
- Ambil config values dari project settings

5. Jalankan Aplikasi

```
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Pages

1. Register - Buat akun baru di /auth/register
2. Login - Masuk dengan email dan password di /auth/login
3. Manage Products - Setelah login, bisa tambah dan edit produk di /products
4. Logout - Keluar dari aplikasi
