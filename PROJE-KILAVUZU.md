# Öğrenci Yönetim Paneli — Proje Kılavuzu

Bu doküman, Lemi Önen için geliştirilen **koç/yönetici paneli**nin (kod adı: "öğrenci yönetim paneli") teknik ve iş bağlamını özetler. Amaç: bu projeyi yeni bir Claude konuşmasında (zip + bu dosya yüklenerek) hiç soru sormadan, kaldığı yerden devam ettirebilmek.

> ⚠️ Bu proje, **Lemi Önen'in genel tanıtım/randevu/ödeme sitesi** ile (statik HTML, repo: `lemi-onen-website`) **aynı proje değildir**. Bu panel tamamen ayrı bir Next.js uygulaması, ayrı bir repo (`lemionen2-spec/panel`) ve ayrı bir domain (`panel.dijitalgelirsistemi.com.tr`) üzerinde çalışır. İkisini karıştırmayın.

---

## 1. Proje Özeti

- **Ne işe yarıyor:** Lemi Önen'in (ve ileride yanında çalışacak koçluk öğrencilerinin) danışanlarını (öğrenci/student olarak adlandırılıyor) yönetmesi için özel bir admin panel. Öğrenci ekleme, ödeme takibi, haftalık/aylık planlayıcı, Google Takvim entegrasyonu, WhatsApp üzerinden hızlı mesaj gönderme gibi işlevleri barındırıyor.
- **Kimin için:** Sadece Lemi Önen (ve yetkili koçlar) kullanıyor — danışan/öğrenci tarafına açık bir portal **yok**, bilinçli olarak kapsam dışı bırakıldı (danışanlarla iletişim WhatsApp üzerinden yürütülüyor).
- **Teknoloji:** Next.js (Pages Router), React, Tailwind CSS, Supabase (veritabanı + auth), Google Calendar API (OAuth2).
- **Barındırma:** Vercel, proje adı `lemionen` (aynı Vercel ekibi/hesabı altında Lemi Önen web sitesiyle birlikte, ama **farklı bir Vercel projesi**).
- **Domain:** `panel.dijitalgelirsistemi.com.tr` — bu, Lemi Önen'in kendi domaini değil, **Yücel'in kendi `dijitalgelirsistemi.com.tr` domaininin bir alt alan adı**. Kök domain (`dijitalgelirsistemi.com.tr`) ayrı bir landing sitesine (dgs-landing) ait; panel sadece `panel.` alt alan adını kullanıyor.

---

## 2. Dosya Yapısı

```
panel-main/
├── package.json              # bağımlılıklar: next, react, react-dom, lucide-react, @supabase/supabase-js
├── postcss.config.js
├── tailwind.config.js
├── styles/
│   └── globals.css           # sade Tailwind @tailwind base/components/utilities
└── pages/
    ├── _app.js                # globals.css'i import eden standart Next.js App wrapper
    ├── index.js                # tek satır: AdminPanel (ogrenci-yonetim-paneli.jsx) render ediyor
    ├── ogrenci-yonetim-paneli.jsx   # ANA DOSYA — ~3400 satır, panelin tamamı burada
    └── api/
        ├── auth/google.js               # Google OAuth akışını başlatır (redirect)
        ├── auth/google/callback.js      # OAuth code'u token'a çevirir, Supabase'e yazar
        ├── auth/google/disconnect.js    # kayıtlı Google token'ı siler
        ├── auth/google/status.js        # Google bağlı mı diye kontrol eder
        └── calendar/events.js           # Google Calendar'dan etkinlikleri çeker (haftalık/90 günlük)
```

**Önemli:** Bu projede `components/` klasörü yok — tüm arayüz tek bir dosyada (`ogrenci-yonetim-paneli.jsx`, ~3500 satır). Bir değişiklik yapılacaksa büyük ihtimalle bu dosyanın içinde ilgili bölüm bulunup düzenlenecek. Dosyanın içindeki başlıca bileşenler (yaklaşık satır numaralarıyla, 29 Eylül 2026'daki pasife alma eklemesinden sonra):

| Bileşen | Satır | Görev |
|---|---|---|
| `LoginScreen` | ~205 | E-posta/şifre ile Supabase Auth girişi |
| `StudentsPage` | ~1360 | Öğrenci listesi, arama, filtre, **Aktif/Pasif sekmesi**, yeni öğrenci ekleme |
| `PassivateModal` | ~1850 | Öğrenciyi pasife alırken sebep seçtiren modal (bkz. Bölüm 3a) |
| `StudentDetail` | (~1950-2350 arası) | Tek öğrencinin detay sayfası: bilgiler, WhatsApp linkleri, dosya/Loom linki, ödeme geçmişi, **Pasife Al / Tekrar Aktif Et** |
| `CalendarPage` | ~2210 | Haftalık/aylık planlayıcı + Google Takvim entegrasyonu |
| `FinansPage` | ~2445 | Genel finans/gelir özeti |
| `PaymentsPage` | ~2595 | Ödeme kaydı ekleme ve listeleme |
| `SettingsPage` | ~2847 | Mesaj şablonları (message_templates) yönetimi |
| `App` (root) | ~3183 | Oturum kontrolü, sayfa yönlendirme (sidebar navigasyonu), tüm state'in toplandığı yer |

---

## 3. Veritabanı (Supabase)

Panel, Supabase'i hem **auth** (giriş) hem de **veri deposu** olarak kullanıyor. Kod içinde referans verilen tablolar:

- `students` — öğrenci/danışan kayıtları (isim, Instagram handle, niş, telefon, e-posta, ay numarası, cinsiyet, dosya/Loom linkleri, sonraki teslim tarihi, **aktif/pasif durumu** vb. — bkz. Bölüm 3a)
- `payments` — ödeme kayıtları (öğrenciyle ilişkili, tarih sıralı)
- `planner_tasks` — gün/hafta/ay bazlı planlayıcı görevleri (`period` alanına göre gruplanıyor: `day`, `week`, `month`)
- `scheduled_tasks` — tarihe bağlı planlanmış görevler (`due_date` alanına göre sıralı)
- `message_templates` — WhatsApp için hazır mesaj şablonları
- `google_tokens` — (API tarafında kullanılıyor, `id=1` tek satır) Google OAuth `access_token`/`refresh_token`/`expires_at` burada tutuluyor

> Bu tabloların şemasını (kolon adları, tipleri) görmek için Supabase Dashboard → Table Editor kısmına bakılmalı; kod satırlarında `dbToStudent`, `studentToDb`, `dbToPayment`, `paymentToDb`, `dbToPlannerTask`, `dbToScheduledTask` gibi çevirici (mapper) fonksiyonlar var — DB kolon adlarıyla JS tarafındaki alan adları birebir aynı olmayabilir, değişiklik yaparken bu mapper'lara bakılmalı.

**Giriş (auth):** Panelde ayrı bir kullanıcı tablosu yok — Supabase'in kendi Auth sistemi (`supabase.auth.signInWithPassword`) kullanılıyor. Yani panelde giriş yapabilecek e-posta/şifre, Supabase projesinin **Authentication → Users** kısmından yönetiliyor.

---

## 3a. Öğrenciyi Pasife Alma (29 Eylül 2026'da eklendi)

Koçluk programına devam etmeyen öğrenciler silinmiyor, **pasife alınıyor**: aktif takipten (dashboard, takvim/planlayıcı öğrenci seçimi, ödeme formu, yenileme hatırlatmaları) tamamen çıkıyor ama kaydı ve geçmişi (ödemeler, notlar) korunuyor, istenirse tek tıkla tekrar aktif edilebiliyor.

**Veritabanı değişikliği — `students` tablosuna 3 yeni kolon eklendi:**
```sql
alter table public.students
  add column if not exists status text not null default 'aktif',
  add column if not exists passive_since date,
  add column if not exists passive_note text;
```
Bu SQL, panelin bağlı olduğu Supabase projesinde **SQL Editor**'den bir kere çalıştırılmalı. Çalıştırılmadan önce mevcut öğrenciler `status` kolonunu içermediği için kod bunları otomatik "aktif" sayar (bkz. `s.status !== "pasif"` kontrolü) — yani migration çalıştırılana kadar da panel bozulmaz, ama "Pasife Al" butonu veritabanına yazamaz, hata verir. **Bu yüzden kodu deploy ettikten hemen sonra bu SQL'i Supabase'de çalıştırmak gerekiyor.**

**Nasıl çalışıyor:**
- **Öğrenci Detay sayfası** → sağ üstte "Pasife Al" butonu. Tıklanınca bir sebep seçtiren modal açılır (Ücret nedeniyle / Programa uyum sağlayamadı / Motivasyon eksikliği / Zaman ayıramıyor / Diğer + serbest not). Onaylanınca `status='pasif'`, `passive_since=bugün`, `passive_note=seçilen sebep` yazılır.
- Pasif bir öğrencinin detay sayfasında bu buton **"Tekrar Aktif Et"**e döner; tıklanınca `status='aktif'` olur, `passive_since`/`passive_note` temizlenir.
- **Öğrenci Listesi** sayfasına **Aktif / Pasif** sekmesi eklendi (varsayılan: Aktif). Pasif sekmesinde her kart "X gündür pasif", sebep notu, bir "Tekrar Aktif Et" kısayolu ve doğrudan bir **WhatsApp hatırlatma linki** gösterir (hazır metin: "...Seni tekrar aramızda görmekten mutluluk duyarım — uygun olduğunda konuşalım mı?").
- **Dashboard, Takvim/Planlayıcı (randevu planlama dropdown'ı), Ödemeler sayfası (yeni ödeme formu ve yaklaşan yenilemeler listesi)** artık sadece aktif öğrencileri görüyor — bunun için `App` bileşeninde `activeStudents = students.filter(s => s.status !== "pasif")` türetilip bu sayfalara `students` yerine `activeStudents` geçiliyor. **Ödemeler geçmişi (Finans sayfası, geçmiş ödeme kayıtları) buna dahil değil** — pasif olsa da öğrencinin geçmiş ödemeleri finansal raporlarda görünmeye devam ediyor.

**Kod içinde nerede aramalı:** `PASSIVE_REASONS`, `PassivateModal`, `daysSince()`, `StudentsPage` içindeki `statusTab`/`activeStudents`/`passiveStudents`, `StudentDetail` içindeki `isPassive`/`handlePassivate`/`handleReactivate`, ve `App` bileşenindeki `activeStudents` türetimi.

⚠️ **Bu Supabase projesi, Lemi Önen web sitesindeki `ayarlar` tablosunun bulunduğu Supabase projesiyle AYNI DEĞİL** (o proje sadece WhatsApp grup linkini tutuyordu, `nxmvgdnjwgyexdtxlijd` ID'li proje). Panelin kendi ayrı bir Supabase projesi var — hangisi olduğu net değilse Vercel'deki bu projenin environment variable'larından (`NEXT_PUBLIC_SUPABASE_URL`) kontrol edilmeli.

---

## 4. Google Calendar Entegrasyonu

Panelin en teknik kısmı bu. Akış:

1. Kullanıcı panelde "Google'a bağlan" gibi bir aksiyon tetikler → `/api/auth/google` çağrılır.
2. Bu endpoint, Google OAuth ekranına yönlendirir (`calendar` ve `documents` scope'ları istiyor).
3. Kullanıcı izin verince Google, `/api/auth/google/callback` adresine bir `code` ile geri döner.
4. Callback, bu code'u Google'dan `access_token` + `refresh_token` almak için kullanır, bunları Supabase'deki `google_tokens` tablosuna yazar (tek satır, `id=1`).
5. `/api/auth/google/status` ile bağlantının olup olmadığı kontrol edilir; `/api/auth/google/disconnect` ile bağlantı silinir.
6. `/api/calendar/events` panelin takvim ekranına etkinlikleri getirir — token süresi dolmuşsa otomatik `refresh_token` ile yeniler.

⚠️ **DİKKAT — kontrol edilmesi gereken bir tutarsızlık:** `pages/api/auth/google.js` ve `pages/api/auth/google/callback.js` içinde OAuth redirect URI şu şekilde **hardcoded**:
```js
const siteUrl = "https://www.dijitalgelirsistemi.com.tr";
```
Ancak bu proje artık `panel.dijitalgelirsistemi.com.tr` alt alan adında çalışıyor (kök domain `dijitalgelirsistemi.com.tr` ayrı bir landing sitesine — dgs-landing'e — ait). Eğer bu zip, panel `panel.` alt alan adına taşınmadan **önceki** bir sürümse, bu iki dosyadaki `siteUrl` değerinin `https://panel.dijitalgelirsistemi.com.tr` olarak güncellenmesi ve Google Cloud Console'daki OAuth Client'ın **Authorized redirect URIs** listesinin de buna göre güncel olup olmadığının kontrol edilmesi gerekir. Aksi halde Google girişi "redirect_uri_mismatch" hatasıyla çalışmaz.

---

## 5. Gerekli Environment Variable'lar (Vercel)

Kod içinde referans verilen ortam değişkenleri:

| Değişken | Nerede kullanılıyor | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | panel (client-side) + tüm API route'ları | Supabase proje URL'i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `ogrenci-yonetim-paneli.jsx` (client-side Supabase client) | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | tüm `api/auth/google/*` ve `api/calendar/events.js` | Supabase **service role** key (sunucu tarafı, `google_tokens` tablosuna yazmak için — RLS'i bypass eder, asla client tarafına sızdırılmamalı) |
| `GOOGLE_CLIENT_ID` | `api/auth/google.js`, `callback.js`, `events.js` | Google Cloud Console OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | `api/auth/google/callback.js`, `events.js` | Google Cloud Console OAuth Client Secret |

Bunların hepsi Vercel projesinin **Settings → Environment Variables** kısmında tanımlı olmalı. Yeni bir Vercel projesine taşınıyorsa bu 5 değişkenin tek tek yeniden girilmesi gerekir.

---

## 6. Platformlar

- **GitHub:** `lemionen2-spec/panel` reposu (Next.js Pages Router).
- **Vercel:** proje adı `lemionen`, GitHub'dan otomatik deploy ediliyor. **Aynı hesapta, Lemi Önen web sitesi için de ayrı bir Vercel projesi var — ikisini karıştırmamak gerekiyor** (isimleri benzer olabilir, proje URL'lerinden ayırt edin).
- **Domain:** `panel.dijitalgelirsistemi.com.tr` — bu domain Yücel'in kendi `dijitalgelirsistemi.com.tr` domainine ait bir alt alan adı, DNS yönetimi isimtescil üzerinden yapılıyor.
- **Supabase:** panelin kendi ayrı Supabase projesi (auth + students/payments/planner_tasks/scheduled_tasks/message_templates/google_tokens tabloları). Lemi Önen web sitesinin `ayarlar` tablosunu tuttuğu Supabase projesiyle karıştırılmamalı.
- **Google Cloud Console:** Calendar API + OAuth Client bu projede tanımlı; redirect URI'nin güncel domain ile eşleştiğinden emin olunmalı (bkz. Bölüm 4).

---

## 7. Bilinen Kapsam Kararları

- Öğrenci/danışan tarafına açık, login olabilecekleri ayrı bir portal **bilinçli olarak yapılmadı** — iletişim WhatsApp üzerinden manuel yürütülüyor. Panel içinde her öğrenci için hazır WhatsApp linkleri (`wa.me/...`) üretiliyor (randevu hatırlatma ve teslim mesajı gibi hazır metinlerle).
- Panel şu an sadece Lemi Önen (tek kullanıcı) için düşünülmüş görünüyor; koçluk öğrencilerinin (yanında çalışacak diğer koçların) da paneli kullanabilmesi **planlanan ama henüz kodlanmamış** bir özellik.

---

## 8. Henüz Yapılmamış / Planlanan İşler

- **AI destekli "bilgi tabanı" (knowledge base) özelliği:** Lemi Önen'in yanında çalışmaya başlayacak koçluk öğrencilerinin de paneli kullanarak seans yürütebilmesi planlanıyor. Bunun için panelde Gemini tabanlı bir analiz/asistan katmanı eklenmesi düşünülüyor — ICF standartlarına ve Lemi Önen'in kendi metodolojisine uygun çıktı üretmesi için bir "bilgi tabanı" beslenmesi gerekiyor. **Şu anki kodda Gemini entegrasyonuna dair hiçbir iz yok** — bu tamamen gelecekteki bir iş, henüz başlanmadı.
- **Redirect URI kontrolü:** Bölüm 4'te belirtilen `dijitalgelirsistemi.com.tr` / `panel.dijitalgelirsistemi.com.tr` tutarsızlığının doğrulanması ve gerekirse düzeltilmesi.
- Not: Lemi Önen web sitesi tarafında planlanan **PayTR taksit entegrasyonu** ve **WhatsApp toplu mesajlaşma** konuları bu panel projesiyle **ilgisizdir** — onlar `lemi-onen-website` projesinin konularıdır, karıştırılmamalı.

---

## 9. Yeni Bir Talep Geldiğinde Nasıl İlerlenir

1. Önce bu dosyayı ve `ogrenci-yonetim-paneli.jsx`'i oku — panelin %95'i bu tek dosyada.
2. Değişiklik bir Supabase tablosuyla ilgiliyse, ilgili `dbToX`/`XToDb` mapper fonksiyonlarını bul, DB şemasıyla tutarlı çalıştığından emin ol.
3. Google Takvim ile ilgili bir değişiklikse `pages/api/auth/google*` ve `pages/api/calendar/events.js` dosyalarına bak; `siteUrl` hardcoded değerine dikkat et (Bölüm 4).
4. UI değişiklikleri Tailwind class'larıyla yapılıyor — ayrı bir CSS derleme adımı yok (Lemi Önen web sitesindeki gibi manuel bir Tailwind CLI pipeline'ı burada YOK; Next.js kendi build sürecinde Tailwind'i otomatik derliyor).
5. Değişiklik sonrası GitHub reposuna (`lemionen2-spec/panel`) dosyaları yükle, Vercel otomatik deploy edecektir.
