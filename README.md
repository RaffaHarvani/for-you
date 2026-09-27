# ❤️ Special Love Letter & Confession Website

Website romantis interaktif yang dibuat khusus untuk menyatakan perasaan cinta, dirancang responsif dan optimal untuk layar **PC / Laptop** maupun **Smartphone Android / iOS**.

---

## ✨ Fitur & Alur Website

1. **Loading / Landing Screen (4 Detik)**:
   - Menampilkan tulisan *"I made this website for u"* dengan animasi detak jantung, partikel kilauan, dan progress bar otomatis selama 4 detik.
2. **Halaman PIN Rahasia**:
   - Kode PIN: `11111111`.
   - Dilengkapi keypad sentuh interaktif untuk HP, dukungan keyboard fisik PC, indikator 8 titik pin, efek getar (*shake*) jika salah, dan animasi terbuka (*unlock*) jika benar.
3. **Halaman Surat Cinta (Love Letter Narrative)**:
   - Desain amplop & kertas surat estetik dengan glassmorphism.
   - Menampilkan teks narasi ungkapan perasaan yang tulus dan tombol *"Lanjut"*.
4. **Halaman Pertanyaan ("Will you be my girlfriend?")**:
   - Tombol **YES! 🥰** yang membesar dan berdenyut.
   - Tombol **NO 🥺** yang **kabur / berpindah-pindah posisi** secara otomatis setiap kali kursor mouse mendekat atau layar hp disentuh/ditap, disertai teks jahil & lucu yang berubah-ubah.
5. **Halaman Perayaan & Kotak Pesan**:
   - Ledakan konfeti (*confetti blast*).
   - Teks perayaan: *"yeayy!! you just made me the happiest person alive. thank you for choosing me. i promise i'll take care of your heart!"*.
   - Text area agar dia bisa mengetikkan pesan atau perasaannya.
   - Tombol *"Kirim Pesan"*.
6. **Pop-up / Alert Khusus Screenshot**:
   - Menampilkan pesan yang baru saja diinput.
   - Teks pengingat tebal: **"jangan lupa kirim screenshot nya ke aku yaa 📸✨"**.
   - Tombol instan untuk mengirim balasan langsung ke **WhatsApp**.
7. **Musik Latar Romantis**:
   - Tombol musik di pojok kanan atas dengan animasi gelombang suara.

---

## 🚀 Cara Menjalankan Website

### 1. Membuka Langsung di Laptop / PC
- Cukup klik dua kali file [`index.html`](file:///c:/xampp/htdocs/confess/index.html) untuk membukanya di browser apa saja (Google Chrome, Edge, Firefox, dll).

### 2. Membuka Lewat XAMPP (Localhost)
- Buka **XAMPP Control Panel** dan klik **Start** pada modul **Apache**.
- Buka browser dan kunjungi:
  ```
  http://localhost/confess/
  ```

### 3. Membuka di HP Android (Jaringan Wi-Fi yang Sama)
- Pastikan laptop dan HP Android terhubung ke Wi-Fi / hotspot yang sama.
- Cek IP laptop kamu (misal melalui CMD: `ipconfig`, cari *IPv4 Address*, contoh: `192.168.1.15`).
- Di browser HP Android (Chrome), buka:
  ```
  http://192.168.1.15/confess/
  ```

### 4. Mengirim Link Online (Akses dari Mana Saja)
Agar dia bisa membuka website ini dari mana pun melalui HP-nya, kamu bisa mengunggah folder ini secara gratis ke:
- **GitHub Pages** (gratis selamanya)
- **Vercel** / **Netlify** (cukup drag and drop folder `confess`)
- Atau menggunakan tunnel sementara seperti **ngrok** / **Cloudflare Tunnel**:
  ```bash
  npx cloudflared tunnel --url http://localhost:80
  ```
