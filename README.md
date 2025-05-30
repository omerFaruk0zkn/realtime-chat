# 💬 Realtime Chat

Gerçek zamanlı iletişim deneyimi sunan **Realtime Chat**, kullanıcıların anlık olarak mesajlaşabileceği modern bir sohbet uygulamasıdır.  
MERN (MongoDB, Express.js, React.js, Node.js) teknolojileriyle geliştirilmiş olan bu proje, Socket.IO ile gerçek zamanlı veri aktarımı sağlar.

🔗 [Canlı Uygulama](https://realtime-chat-4i40.onrender.com/login)

---

## 🚀 Özellikler

- **Gerçek Zamanlı Mesajlaşma:** Socket.IO entegrasyonu sayesinde anlık mesaj gönderimi ve alımı.
- **Kimlik Doğrulama**: JWT tabanlı kimlik doğrulama ve korumalı rotalar.
- **Duyarlı Arayüz:** Mobil ve masaüstü cihazlarla uyumlu, kullanıcı dostu tasarım.
- **Tema Desteği**: 35 farklı kullanıcı arayüzü teması ile kişiselleştirilebilir deneyim.
- **Hata Yönetimi**: Hem ön uç hem de arka uç için kapsamlı hata yönetimi.
- **Ücretsiz Dağıtım**: Render.com üzerinden ücretsiz dağıtım imkanı.

---

## 🛠️ Kullanılan Teknolojiler

### Backend

- **Node.js & Express.js:** Sunucu tarafı uygulama geliştirme.
- **MongoDB & Mongoose:** Veri tabanı yönetimi ve şema modelleme.
- **Socket.IO:** Gerçek zamanlı, çift yönlü iletişim.
- **JWT (JSON Web Tokens):** Kullanıcı kimlik doğrulama ve yetkilendirme.
- **Cloudinary:** Resim bulut deposu.

### Frontend

- **React.js & Vite:** Kullanıcı arayüzü geliştirme.
- **Axios:** HTTP istekleri için istemci kütüphanesi.
- **React Router:** Sayfa yönlendirme ve gezinme.
- **Tailwind CSS / Daisyui:** Stil ve tasarım.
- **Durum Yönetimi**: Zustand
- **Lucide React**: Resim kütüphanesi
- **React Hot Toast**: Bildirim

---

## 📁 Proje Yapısı

```
realtime-chat/
├── backend/
│   ├── src/
│     ├── controllers/
│     ├── lib/
│     ├── middlewares/
│     ├── models/
│     ├── routes/
│     ├── seeds/
│     └── index.js
├── frontend/
│   ├── src/
│     ├── components/
│     ├── constants/
│     ├── lib/
│     ├── pages/
│     ├── store/
│     ├── App.jsx
│     └── main.jsx
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/omerFaruk0zkn/realtime-chat.git
cd realtime-chat
```

### 2. Ortam Değişkenlerini Ayarlayın

#### Backend (`/backend` dizininde `.env` dosyası oluşturun):

```
PORT=5001
MONGODB_URI=your_mongo_uri
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_secret_key
NODE_ENV=development
```

### 3. Bağımlılıkları Yükleyin ve Uygulamayı Başlatın

#### Backend:

```bash
cd backend
npm install
npm run dev
```

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Test ve Geliştirme

- **Geliştirme Ortamı**: Vite ile hızlı geliştirme ve sıcak yeniden yükleme.
- **Hata Ayıklama**: Hem istemci hem de sunucu tarafında kapsamlı hata ayıklama araçları.
