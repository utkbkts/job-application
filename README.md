# 🎉 İş başvurusu ve proje paylaşım platformu

**Hoş geldiniz!** Projelerinizi paylaşabileceğiniz ve insanların yorumlarını okuyabileceğiniz projenizin değerini ölçebileceğiniz iş verenler ile sizi hızlı bir şekilde buluşturan bir proje

---

## 🚀 Proje Özellikleri

- **Kullanıcı Paneli**: iş arayanların kolayla bulabileceği
- **Admin Paneli**: Yönlendirmeler.
- **Modern Tasarım**: Shadcn ile şık ve profesyonel bir görünüm.
- **Node.js Backend**: Güvenli ve verimli bir sunucu yapısı ile hızlı veri işleme.
- **Docker ile Kolay Dağıtım**: Projenin her ortamda sorunsuz çalışmasını sağlamak için Docker kullanıldı.

---

## 📦 Teknolojiler

| Katman      | Teknolojiler                  |
|-------------|-------------------------------|
| **Frontend**  | React, Shadcn               |
| **Backend**   | Node.js,Express             |
| **Veritabanı**| MongoDB                     |
| **Konteyner** | Docker                      |

---

## 📈 Hedef

iş verenler ile iş arayanları buluşturan platform.

---

## 🔗 Bağlantılar

- **Canlı Demo**:

---

---

## ⚙️ Projeyi Çalıştırmak İçin
1. **İlk önce repoyu kendinize çekin:**
```bash
git clone https://github.com/utkbkts/job-application.git
```
2.**Proje dizinine gelin ve gerekli bağımlılıkları yükleyin:**
 ```bash
cd frontend
npm install
```
3.**Projeyi çalıştırın:**
 ```bash
npm run dev
```
4.**Yerel olarak derleyin:**
```bash
npm run build
```
5.**.env-Backend**
```bash
DATABASE_URI=

FRONTEND_URL=
PORT=

COOKIE_EXPIRES_TIME=
JWT_SECRET=
JWT_EXPIRES_TIME=


CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

6.**.env-Frontend**
```bash
VITE_REACT_APP_API=http://localhost:5000
```
5.**Docker'ı çalıştırmak için**

1-**Ana dizine gidin /** - build
```bash
docker compose build
```
2-**Ana dizine gidin /** - run
```bash
docker compose up -d
```
