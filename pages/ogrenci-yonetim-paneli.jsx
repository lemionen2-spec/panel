import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  ExternalLink,
  MessageCircle,
  Clock,
  Bell,
  BellRing,
  Plus,
  Check,
  Phone,
  Mail,
  X,
  CircleDot,
  ChevronDown,
  Send,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Copy,
  Timer,
  Video,
  ClipboardList,
} from "lucide-react";

/* ---------------------------------------------------------
   Palette (kept as constants so it stays consistent
   everywhere instead of scattered hex values)
--------------------------------------------------------- */
const ink = "#1F1B1D";
const inkSoft = "#83807C";
const line = "#ECEBF0";
const canvas = "#F5F6FA";
const accent = "#B7295A"; // deep rose/berry, primary
const accentSoft = "#FBE9EF";
const gold = "#B8862B"; // premium / month-2+ badge
const goldSoft = "#FBF3E3";
const green = "#2F8F4E";
const greenSoft = "#E9F6EE";
const cardShadow = "0 1px 2px rgba(31,27,29,0.04), 0 8px 24px rgba(31,27,29,0.05)";

// Lemi Önen wordmark logo (uploaded by the user), embedded so the artifact stays self-contained
const LOGO_DATA_URI =
  "data:image/png;base64,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";

/* ---------------------------------------------------------
   Mock data
--------------------------------------------------------- */
const STUDENTS = [
  { id: 1, name: "Elif Yıldırım", handle: "@elifyildirim", stage: "2. Ay+", avatar: "EY", phone: "+90 532 111 22 33", email: "elif.yildirim@gmail.com", niche: "Kişisel gelişim içerikleri", nextCall: "Bugün 14:00", notes: "Reels tempo çalışması yapıyoruz, hook'lar geliştirildi. Sonraki hafta hedefi: 3 viral deneme." },
  { id: 2, name: "Mert Kaya", handle: "@mertkaya.fit", stage: "1. Ay", avatar: "MK", phone: "+90 533 222 33 44", email: "mert.kaya@gmail.com", niche: "Fitness koçluğu", nextCall: "Bugün 16:30", notes: "Profil biyografisi ve vurgu renkleri netleşti. Bu hafta ilk 5 gönderi planı hazırlanacak." },
  { id: 3, name: "Zeynep Arslan", handle: "@zeyneparslan", stage: "2. Ay+", avatar: "ZA", phone: "+90 534 333 44 55", email: "zeynep.arslan@gmail.com", niche: "Dijital pazarlama", nextCall: "Yarın 10:00", notes: "Gelir hedefine göre teklif sayfası revize edildi." },
  { id: 4, name: "Burak Demir", handle: "@burakdemir", stage: "1. Ay", avatar: "BD", phone: "+90 535 444 55 66", email: "burak.demir@gmail.com", niche: "Emlak danışmanlığı", nextCall: "Perşembe 11:00", notes: "İlk görüşme yapıldı, hedef kitle netleştirme aşamasında." },
  { id: 5, name: "Selin Öztürk", handle: "@selinozturk", stage: "2. Ay+", avatar: "SÖ", phone: "+90 536 555 66 77", email: "selin.ozturk@gmail.com", niche: "Moda & stil", nextCall: "Cuma 13:00", notes: "Aylık rapor hazırlandı, onay bekleniyor." },
  { id: 6, name: "Onur Şahin", handle: "@onursahin", stage: "1. Ay", avatar: "OŞ", phone: "+90 537 666 77 88", email: "onur.sahin@gmail.com", niche: "Yazılım kariyeri", nextCall: "Pazartesi 15:00", notes: "İçerik takvimi taslağı paylaşıldı." },
  { id: 7, name: "Aylin Koç", handle: "@aylinkoc", stage: "2. Ay+", avatar: "AK", phone: "+90 538 777 88 99", email: "aylin.koc@gmail.com", niche: "Anne & bebek", nextCall: "Salı 09:30", notes: "Reels performansı %40 arttı, strateji sabit tutulacak." },
  { id: 8, name: "Kerem Yavuz", handle: "@keremyavuz", stage: "1. Ay", avatar: "KY", phone: "+90 539 888 99 00", email: "kerem.yavuz@gmail.com", niche: "Kişisel finans", nextCall: "Çarşamba 17:00", notes: "Marka sesi çalışması tamamlandı." },
];

const PENDING_REPORTS = [
  { id: 1, student: "Elif Yıldırım", file: "Aylık Performans Raporu.pdf", due: "Bugün, 18:00" },
  { id: 2, student: "Selin Öztürk", file: "İçerik Takvimi – Ekim.docx", due: "Bugün, 20:00" },
  { id: 3, student: "Aylin Koç", file: "Büyüme Analizi.pdf", due: "Yarın, 10:00" },
];

const TODAY_CALLS = [
  { id: 1, student: "Elif Yıldırım", time: "14:00", duration: "45 dk", type: "Haftalık değerlendirme" },
  { id: 2, student: "Mert Kaya", time: "16:30", duration: "30 dk", type: "İlk strateji görüşmesi" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Ana Sayfa", icon: LayoutDashboard },
  { id: "students", label: "Öğrencilerim", icon: Users },
  { id: "calendar", label: "Takvim & Randevular", icon: CalendarDays },
  { id: "payments", label: "Ödemeler", icon: CreditCard },
  { id: "settings", label: "Ayarlar", icon: Settings },
];

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function Badge({ stage }) {
  const isVeteran = stage === "2. Ay+";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium"
      style={{
        background: isVeteran ? goldSoft : accentSoft,
        color: isVeteran ? gold : accent,
      }}
    >
      <CircleDot size={11} strokeWidth={3} />
      {stage}
    </span>
  );
}

function Avatar({ initials, size = 44 }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: accentSoft,
        color: accent,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

function Card({ children, className = "", padded = true }) {
  return (
    <div
      className={`rounded-2xl bg-white ${padded ? "p-6" : ""} ${className}`}
      style={{ border: `1px solid ${line}`, boxShadow: cardShadow }}
    >
      {children}
    </div>
  );
}

/* Decorative arc sparkline used behind dashboard stat values */
function ArcSparkline({ color }) {
  return (
    <svg viewBox="0 0 200 60" className="absolute bottom-0 right-0 h-[60px] w-[160px]" preserveAspectRatio="none">
      <path
        d="M0,52 C40,52 40,10 80,10 C120,10 120,34 160,34 C180,34 190,20 200,18"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M0,52 C40,52 40,10 80,10 C120,10 120,34 160,34 C180,34 190,20 200,18 L200,60 L0,60 Z"
        fill={color}
        opacity="0.08"
      />
    </svg>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[17px] font-semibold" style={{ color: ink }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

function PrimaryButton({ children, icon: Icon, onClick, full = false, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${
        full ? "w-full" : ""
      }`}
      style={{ background: accent }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function GhostButton({ children, icon: Icon, onClick, full = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-black/[0.03] ${
        full ? "w-full" : ""
      }`}
      style={{ border: `1px solid ${line}`, color: ink }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

/* ---------------------------------------------------------
   Yönetici / Koç giriş ekranı
--------------------------------------------------------- */
const DEMO_CREDENTIALS = { email: "yucel@sifirdanzirveye.com", password: "demo1234" };

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("E-posta ve şifre alanları zorunludur.");
      return;
    }
    if (password.length < 4) {
      setError("Şifre en az 4 karakter olmalı.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 700);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center font-sans" style={{ background: canvas }}>
      <div className="w-full max-w-[380px] px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={LOGO_DATA_URI} alt="Lemi Önen" className="mb-3 h-9 w-auto" />
          <p className="text-[12.5px]" style={{ color: inkSoft }}>
            Yönetici / Koç Paneli
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7" style={{ border: `1px solid ${line}`, boxShadow: cardShadow }}>
          <h1 className="font-serif text-[21px] font-semibold" style={{ color: ink }}>
            Tekrar hoş geldin
          </h1>
          <p className="mt-1 text-[13.5px]" style={{ color: inkSoft }}>
            Devam etmek için giriş bilgilerini gir
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                E-posta
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <Mail size={15} style={{ color: inkSoft }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@eposta.com"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                Şifre
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <Lock size={15} style={{ color: inkSoft }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: ink }}
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} style={{ color: inkSoft }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg px-3 py-2 text-[12.5px]" style={{ background: "#F4E7E5", color: "#B3453A" }}>
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px]" style={{ color: inkSoft }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded"
                  style={{ accentColor: accent }}
                />
                Beni hatırla
              </label>
              <a href="#" className="text-[13px] font-medium" style={{ color: accent }}>
                Şifremi unuttum
              </a>
            </div>

            <PrimaryButton type="submit" full disabled={loading}>
              {loading ? "Giriş yapılıyor..." : "Giriş yap"}
            </PrimaryButton>

            <button
              type="button"
              onClick={fillDemo}
              className="text-center text-[12.5px] font-medium"
              style={{ color: inkSoft }}
            >
              Demo giriş bilgileriyle doldur
            </button>
          </form>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-[12px]" style={{ color: inkSoft }}>
          <ShieldCheck size={12} />
          Bu panel yalnızca yetkili koçlar içindir.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Sidebar
--------------------------------------------------------- */
function Sidebar({ active, setActive }) {
  return (
    <aside
      className="flex h-full w-[248px] shrink-0 flex-col justify-between py-6"
      style={{ borderRight: `1px solid ${line}`, background: "#FFFFFF" }}
    >
      <div>
        <div className="mb-8 flex flex-col gap-1 px-5">
          <img src={LOGO_DATA_URI} alt="Lemi Önen" className="h-8 w-auto" />
          <p className="text-[12px] leading-tight" style={{ color: inkSoft }}>
            Koçluk Programı
          </p>
        </div>

        <nav className="flex flex-col gap-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors"
                style={{
                  background: isActive ? accent : "transparent",
                  color: isActive ? "#FFFFFF" : inkSoft,
                  fontWeight: isActive ? 600 : 500,
                  boxShadow: isActive ? "0 4px 12px rgba(183,41,90,0.25)" : "none",
                }}
              >
                <Icon size={17} strokeWidth={isActive ? 2.3 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-3">
        <div
          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
          style={{ background: canvas }}
        >
          <Avatar initials="LÖ" size={34} />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold" style={{ color: ink }}>
              Lemi Önen
            </p>
            <p className="truncate text-[12px]" style={{ color: inkSoft }}>
              @lemi.onen
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------
   Dashboard page
--------------------------------------------------------- */
/* ---------------------------------------------------------
   Günlük & haftalık iş planlayıcı (koçun kendi zaman yönetimi)
--------------------------------------------------------- */
const DEFAULT_TASKS = {
  day: [
    { id: 1, title: "Elif'in içerik metinleri", minutes: 45, done: true },
    { id: 2, title: "Mert ile görüşme hazırlığı", minutes: 20, done: true },
    { id: 3, title: "Zeynep'in haftalık raporu", minutes: 35, done: false },
    { id: 4, title: "Reels çekimi — VELMORA lansmanı", minutes: 60, done: false },
    { id: 5, title: "Yeni öğrenci onboarding maili", minutes: 15, done: false },
  ],
  week: [
    { id: 101, title: "Tüm öğrencilerin haftalık içerik metinlerini hazırla", minutes: 180, done: false },
    { id: 102, title: "Haftalık performans raporlarını gözden geçir", minutes: 60, done: true },
    { id: 103, title: "3 rakip hesabı incele, içerik fikri çıkar", minutes: 45, done: false },
    { id: 104, title: "Bekleyen adaylarla ön görüşme yap", minutes: 40, done: false },
  ],
  month: [
    { id: 201, title: "Aylık gelir ve abonelik durumunu gözden geçir", minutes: 60, done: false },
    { id: 202, title: "VELMORA lansman içerik planını tamamla", minutes: 120, done: false },
    { id: 203, title: "Yeni öğrenci kontenjanı ve fiyatlandırmayı değerlendir", minutes: 45, done: true },
    { id: 204, title: "Aylık öğrenci memnuniyet check-in'leri", minutes: 90, done: false },
  ],
};

const PLANNER_PERIODS = [
  { id: "day", label: "Gün" },
  { id: "week", label: "Hafta" },
  { id: "month", label: "Ay" },
];

function formatDuration(mins) {
  if (mins < 60) return `${mins} dk`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} sa ${m} dk` : `${h} sa`;
}

function WorkPlanner() {
  const [period, setPeriod] = useState("day");
  const [tasksByPeriod, setTasksByPeriod] = useState(DEFAULT_TASKS);
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");

  const tasks = tasksByPeriod[period];

  const toggle = (id) =>
    setTasksByPeriod((prev) => ({
      ...prev,
      [period]: prev[period].map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));

  const addTask = () => {
    if (!title.trim()) return;
    setTasksByPeriod((prev) => ({
      ...prev,
      [period]: [...prev[period], { id: Date.now(), title, minutes: Number(minutes) || 30, done: false }],
    }));
    setTitle("");
    setMinutes("");
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const remainingMinutes = tasks.filter((t) => !t.done).reduce((s, t) => s + t.minutes, 0);

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            İş planlayıcı
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
            {doneCount}/{tasks.length} tamamlandı · kalan ~{formatDuration(remainingMinutes)}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: canvas }}>
          {PLANNER_PERIODS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors"
              style={{
                background: period === p.id ? "#fff" : "transparent",
                color: period === p.id ? ink : inkSoft,
                boxShadow: period === p.id ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-6 py-3"
            style={{ borderTop: `1px solid ${line}` }}
          >
            <button
              onClick={() => toggle(t.id)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{ border: `1.5px solid ${t.done ? green : line}`, background: t.done ? green : "transparent" }}
            >
              {t.done && <Check size={12} style={{ color: "#fff" }} />}
            </button>
            <p
              className="flex-1 text-[13.5px]"
              style={{ color: t.done ? inkSoft : ink, textDecoration: t.done ? "line-through" : "none" }}
            >
              {t.title}
            </p>
            <span
              className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium"
              style={{ background: canvas, color: inkSoft }}
            >
              <Timer size={11} />
              {formatDuration(t.minutes)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-6 py-4" style={{ borderTop: `1px solid ${line}` }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder={`Bu ${PLANNER_PERIODS.find((p) => p.id === period).label.toLowerCase()}e iş ekle...`}
          className="min-w-0 flex-1 rounded-xl px-3 py-2 text-[13.5px] outline-none"
          style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
        />
        <input
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="dk"
          className="w-14 shrink-0 rounded-xl px-2.5 py-2 text-[13.5px] outline-none"
          style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
        />
        <button
          onClick={addTask}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ background: accent }}
        >
          <Plus size={16} />
        </button>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   Hızlı mesaj şablonları bankası
--------------------------------------------------------- */
const MESSAGE_TEMPLATES = [
  { id: 1, title: "İçerik teslimi", text: "Merhaba {isim}, yeni döneme ait içerik metinleriniz hazırlandı. Panelinizden inceleyebilirsiniz 🎯" },
  { id: 2, title: "Randevu talebi", text: "Merhaba {isim}, bir sonraki görüşmemiz için uygun saatinizi şu linkten seçebilir misiniz? {takvim_linki}" },
  { id: 3, title: "Ödeme hatırlatma", text: "Merhaba {isim}, aboneliğinizin yenilenme tarihi yaklaşıyor. Bir sorunuz olursa buradayım 🙌" },
  { id: 4, title: "Görüşme özeti", text: "Merhaba {isim}, bugünkü görüşmemizin özetini ve aksiyon maddelerini panelinize ekledim." },
];

function QuickMessageTemplates({ showToast }) {
  const copy = (tpl) => {
    try {
      navigator.clipboard.writeText(tpl.text);
      showToast("Kopyalandı", `"${tpl.title}" şablonu panoya kopyalandı.`);
    } catch (e) {
      showToast("Kopyalanamadı", "Metni manuel olarak seçip kopyalayabilirsin.");
    }
  };

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Hızlı mesaj şablonları
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
            Tek tıkla kopyala, WhatsApp'a yapıştır
          </p>
        </div>
        <ClipboardList size={18} style={{ color: inkSoft }} />
      </div>

      <div className="mt-4">
        {MESSAGE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="flex items-start justify-between gap-3 px-6 py-3.5"
            style={{ borderTop: `1px solid ${line}` }}
          >
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium" style={{ color: ink }}>
                {tpl.title}
              </p>
              <p className="mt-0.5 truncate text-[12px]" style={{ color: inkSoft }}>
                {tpl.text}
              </p>
            </div>
            <button
              onClick={() => copy(tpl)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: accentSoft, color: accent }}
            >
              <Copy size={14} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Dashboard({ openStudent, showToast }) {
  const stats = [
    { label: "Aktif Öğrenci", value: "24", sub: "+3 bu ay", positive: true, arc: accent },
    { label: "Bu Ay Koçluk Geliri", value: "₺48.600", sub: "+%18 geçen aya göre", positive: true, arc: accent },
    { label: "Gönderilecek Raporlar", value: "5", sub: "Bugün 3 tanesi", positive: false, arc: green },
  ];

  return (
    <div className="mx-auto max-w-[1040px] px-10 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold" style={{ color: ink }}>
          Merhaba, Yücel
        </h1>
        <p className="mt-1.5 text-[14px]" style={{ color: inkSoft }}>
          2 Eylül Çarşamba — bugün 2 birebir görüşmen ve gönderilecek 3 dosyan var.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <p className="text-[13px]" style={{ color: inkSoft }}>
              {s.label}
            </p>
            <p className="mt-2 text-[28px] font-semibold" style={{ color: ink }}>
              {s.value}
            </p>
            <p
              className="mt-1 text-[12.5px] font-medium"
              style={{ color: s.positive ? green : gold }}
            >
              {s.sub}
            </p>
            <ArcSparkline color={s.arc} />
          </Card>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <WorkPlanner />
        <QuickMessageTemplates showToast={showToast} />
      </div>

      <div className="mb-6">
        <Card padded={false}>
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <h2 className="text-[17px] font-semibold" style={{ color: ink }}>
                Bugün gönderilecek raporlar & dosyalar
              </h2>
              <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
                Hazırlanan dosyaları öğrenciye WhatsApp üzerinden ilet.
              </p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[12.5px] font-medium"
              style={{ background: goldSoft, color: gold }}
            >
              {PENDING_REPORTS.length} bekliyor
            </span>
          </div>

          <div className="mt-5">
            {PENDING_REPORTS.map((r, i) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-6 py-4"
                style={{ borderTop: `1px solid ${line}` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: canvas }}
                  >
                    <FileText size={16} style={{ color: inkSoft }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: ink }}>
                      {r.file}
                    </p>
                    <p className="text-[12.5px]" style={{ color: inkSoft }}>
                      {r.student} · Son gönderim: {r.due}
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-white hover:opacity-90"
                  style={{ background: green }}
                >
                  <MessageCircle size={15} />
                  WhatsApp'tan gönder
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <h2 className="text-[17px] font-semibold" style={{ color: ink }}>
              Online görüşme randevuları
            </h2>
            <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
              Saatinden önce hatırlatma alırsın, görüşmeye Meet üzerinden katılırsın
            </p>
          </div>
          <CalendarDays size={18} style={{ color: inkSoft }} />
        </div>

        <div className="mt-5">
          {TODAY_CALLS.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between px-6 py-4"
              style={{ borderTop: `1px solid ${line}` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex w-14 flex-col items-center">
                  <p className="text-[15px] font-semibold" style={{ color: ink }}>
                    {c.time}
                  </p>
                  <p className="text-[11.5px]" style={{ color: inkSoft }}>
                    {c.duration}
                  </p>
                </div>
                <div style={{ width: 1, height: 32, background: line }} />
                <div>
                  <p className="text-[14px] font-medium" style={{ color: ink }}>
                    {c.student}
                  </p>
                  <p className="text-[12.5px]" style={{ color: inkSoft }}>
                    {c.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  let native = false;
                  try {
                    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                      new Notification("Görüşme hatırlatması", {
                        body: `${c.student} ile görüşmen ${c.time}'te başlıyor.`,
                      });
                      native = true;
                    }
                  } catch (e) {
                    native = false;
                  }
                  if (!native)
                    showToast("Görüşme hatırlatması", `${c.student} ile görüşmen ${c.time}'te başlıyor.`);
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
                style={{ background: accentSoft, color: accent }}
              >
                <Bell size={12} />
                Hatırlatma açık
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------
   Students list page
--------------------------------------------------------- */
function AddStudentModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [niche, setNiche] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState("1. Ay");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Ad soyad zorunludur.");
      return;
    }
    const initials = name
      .trim()
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    onAdd({
      id: Date.now(),
      name: name.trim(),
      handle: handle.trim() || "@yeniöğrenci",
      stage,
      avatar: initials || "ÖĞ",
      phone: phone.trim() || "—",
      email: email.trim() || "—",
      niche: niche.trim() || "Belirtilmedi",
      nextCall: "Henüz planlanmadı",
      notes: "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(31,27,29,0.4)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-2xl bg-white p-6"
        style={{ boxShadow: cardShadow }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[17px] font-semibold" style={{ color: ink }}>
            Yeni öğrenci ekle
          </p>
          <button onClick={onClose} style={{ color: inkSoft }}>
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Ad Soyad
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn. Ayşe Yılmaz"
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Instagram kullanıcı adı
            </label>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@ayseyilmaz"
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Niş / sektör
            </label>
            <input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Örn. Fitness koçluğu"
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
                Telefon
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 5xx xxx xx xx"
                className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
                style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
                Abonelik
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full appearance-none rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
                style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
              >
                <option>1. Ay</option>
                <option>2. Ay+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              E-posta
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@eposta.com"
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>

          {error && (
            <p className="rounded-lg px-3 py-2 text-[12.5px]" style={{ background: "#F4E7E5", color: "#B3453A" }}>
              {error}
            </p>
          )}

          <PrimaryButton full onClick={handleSubmit}>
            Öğrenciyi ekle
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ openStudent }) {
  const [students, setStudents] = useState(STUDENTS);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = students.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.handle.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "Tümü" || s.stage === filter;
    return matchesQuery && matchesFilter;
  });

  const handleAdd = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="mx-auto max-w-[1040px] px-10 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
            Öğrencilerim
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
            {students.length} öğrenci · Lemi Önen Koçluk Programı
          </p>
        </div>
        <PrimaryButton icon={Plus} onClick={() => setShowAddModal(true)}>
          Yeni öğrenci ekle
        </PrimaryButton>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex flex-1 items-center gap-2 rounded-xl px-3.5 py-2.5"
          style={{ border: `1px solid ${line}`, background: "#fff" }}
        >
          <Search size={16} style={{ color: inkSoft }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İsim veya kullanıcı adına göre ara"
            className="w-full bg-transparent text-[14px] outline-none"
            style={{ color: ink }}
          />
        </div>
        <div className="flex items-center gap-1.5 rounded-xl p-1" style={{ background: canvas }}>
          {["Tümü", "1. Ay", "2. Ay+"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors"
              style={{
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? ink : inkSoft,
                boxShadow: filter === f ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => openStudent(s)}
            className="group text-left"
          >
            <Card className="transition-colors group-hover:border-black/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.avatar} />
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: ink }}>
                      {s.name}
                    </p>
                    <p className="text-[13px]" style={{ color: inkSoft }}>
                      {s.handle}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: inkSoft }} />
              </div>
              <p className="mt-4 text-[13px]" style={{ color: inkSoft }}>
                {s.niche}
              </p>

              <div className="mt-3.5 flex items-center justify-between">
                <Badge stage={s.stage} />
                <span className="flex items-center gap-1.5 text-[12.5px]" style={{ color: inkSoft }}>
                  <Clock size={13} />
                  {s.nextCall}
                </span>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-[14px]" style={{ color: inkSoft }}>
          Aramanla eşleşen öğrenci bulunamadı.
        </div>
      )}

      {showAddModal && <AddStudentModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </div>
  );
}

/* ---------------------------------------------------------
   Görüşme notları — tarihsel kayıt
--------------------------------------------------------- */
const MOCK_SESSIONS = [
  {
    id: 8,
    date: "3 Eylül 2026",
    label: "8. Görüşme",
    discussed: "Reels tempo çalışması ve hook geliştirme üzerine konuşuldu, son 2 haftanın verileri incelendi.",
    problems: "Yayın saatleri düzensiz, akşam 21:00 sonrası paylaşım yapılamıyor.",
    nextSteps: "Bu haftaki hedef: 3 viral deneme + paylaşım saatini 19:00'a çekmek.",
  },
  {
    id: 7,
    date: "27 Ağustos 2026",
    label: "7. Görüşme",
    discussed: "Yayın sıklığı haftada 4'e çıkarıldı, içerik sütunları netleşti: eğitim, motivasyon, günlük yaşam.",
    problems: "Video düzenleme için ayrılan süre yetersiz kalıyor.",
    nextSteps: "CapCut şablonları hazırlanacak, düzenleme süresi kısaltılacak.",
  },
  {
    id: 6,
    date: "20 Ağustos 2026",
    label: "6. Görüşme",
    discussed: "İlk küçük iş birliği teklifi geldi, biyografi ve vurgu renkleri revize edildi.",
    problems: "İş birliği teklifinin şartları net değil.",
    nextSteps: "Marka ile ön görüşme yapılacak, fiyat teklifi hazırlanacak.",
  },
  {
    id: 5,
    date: "13 Ağustos 2026",
    label: "5. Görüşme",
    discussed: "Geçen haftanın etkileşim verileri incelendi: %4.2'den %5.1'e çıktı.",
    problems: "Yorumlara geç dönülüyor, ilk saatteki etkileşim kaçırılıyor.",
    nextSteps: "Paylaşımdan sonraki ilk 30 dk yorumlara aktif dönülecek.",
  },
  {
    id: 4,
    date: "6 Ağustos 2026",
    label: "4. Görüşme",
    discussed: "Hedef kitle analizi tamamlandı, niş daha da daraltıldı: çalışan kadınlar için ev egzersizi.",
    problems: "İçerik genel kalıyor, dar kitleye özel dil kullanılmıyor.",
    nextSteps: "Sonraki 5 gönderi doğrudan bu alt kitleye hitap edecek.",
  },
  {
    id: 3,
    date: "30 Temmuz 2026",
    label: "3. Görüşme",
    discussed: "İlk 2 haftanın sonuçları değerlendirildi: +80 takipçi, ilk viral Reels denemesi yapıldı.",
    problems: "Viral olan içeriğin neden işe yaradığı netleşmedi.",
    nextSteps: "Viral gönderi analiz edilip formül tekrar denenecek.",
  },
  {
    id: 2,
    date: "23 Temmuz 2026",
    label: "2. Görüşme",
    discussed: "İçerik takvimi birlikte oluşturuldu, ilk haftanın gönderileri planlandı.",
    problems: "Çekim için yeterli ışık/ortam yok.",
    nextSteps: "Basit bir çekim köşesi kurulacak (ışık + fon önerisi verildi).",
  },
  {
    id: 1,
    date: "16 Temmuz 2026",
    label: "1. Görüşme — Marka Analizi",
    discussed: "Marka analiz formu birlikte gözden geçirildi, ilk haftalık içerik planı oluşturuldu.",
    problems: "Niş konusunda kararsızlık var, iki farklı alan arasında gidip geliyor.",
    nextSteps: "Bir hafta boyunca tek nişte içerik üretilip sonuçlar değerlendirilecek.",
  },
];

const NOTE_SECTIONS = [
  { key: "discussed", label: "Konuşulanlar" },
  { key: "problems", label: "Problemler / Tıkanıklıklar" },
  { key: "nextSteps", label: "Bir Sonraki Görüşmeye Kadar Yapılacaklar" },
];

function MeetingNotesHistory() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [selectedId, setSelectedId] = useState(MOCK_SESSIONS[0].id);

  const selected = sessions.find((s) => s.id === selectedId) || sessions[0];

  const updateField = (field, value) =>
    setSessions((prev) => prev.map((s) => (s.id === selectedId ? { ...s, [field]: value } : s)));

  const addSession = () => {
    const newId = Math.max(...sessions.map((s) => s.id)) + 1;
    const newSession = { id: newId, date: "Bugün", label: `${newId}. Görüşme`, discussed: "", problems: "", nextSteps: "" };
    setSessions([newSession, ...sessions]);
    setSelectedId(newId);
  };

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Görüşme notları
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
            {sessions.length} haftalık görüşme kaydı · geçmişe dönük görüntüle
          </p>
        </div>
        <GhostButton icon={Plus} onClick={addSession}>
          Yeni görüşme ekle
        </GhostButton>
      </div>

      <div className="mt-5 px-6">
        <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
          Tarih seç
        </label>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full appearance-none rounded-xl px-3.5 py-2.5 pr-10 text-[14px] outline-none"
            style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
          >
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.date} · {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: inkSoft }}
          />
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <div className="mb-4 flex items-center gap-2">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: accentSoft }}
          >
            <CalendarDays size={14} style={{ color: accent }} />
          </div>
          <div>
            <p className="text-[13.5px] font-medium" style={{ color: ink }}>
              {selected.label}
            </p>
            <p className="text-[12px]" style={{ color: inkSoft }}>
              {selected.date}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {NOTE_SECTIONS.map((section) => (
            <div key={section.key}>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
                {section.label}
              </label>
              <textarea
                value={selected[section.key]}
                onChange={(e) => updateField(section.key, e.target.value)}
                rows={2}
                placeholder="..."
                className="w-full resize-none rounded-xl p-3 text-[13.5px] leading-relaxed outline-none"
                style={{ border: `1px solid ${line}`, color: ink, background: canvas }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-end">
          <PrimaryButton>Notu kaydet</PrimaryButton>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   İçerik teslim tarihi (esnek periyot) — 2 gün kala uyarı
--------------------------------------------------------- */
function ContentDeliveryDate() {
  const [period, setPeriod] = useState("7");
  const daysLeft = 2; // demo: bugünden itibaren kalan gün

  const isWarning = daysLeft <= 2;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold" style={{ color: ink }}>
          İçerik teslim tarihi
        </p>
        {isWarning && (
          <span
            className="rounded-full px-2.5 py-1 text-[12px] font-medium"
            style={{ background: goldSoft, color: gold }}
          >
            {daysLeft} gün kaldı
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: accentSoft }}>
          <CalendarDays size={18} style={{ color: accent }} />
        </div>
        <div>
          <p className="text-[14px] font-medium" style={{ color: ink }}>
            5 Eylül 2026
          </p>
          <p className="text-[12.5px]" style={{ color: inkSoft }}>
            Bir sonraki içerik paketi teslim tarihi
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
          Teslim periyodu
        </label>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full appearance-none rounded-xl px-3.5 py-2.5 pr-10 text-[14px] outline-none"
            style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
          >
            <option value="7">Her 7 günde bir</option>
            <option value="10">Her 10 günde bir</option>
            <option value="14">Her 14 günde bir</option>
            <option value="30">Aylık</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: inkSoft }}
          />
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   Student detail page
--------------------------------------------------------- */
function StudentDetail({ student, back }) {
  const [fileName, setFileName] = useState(null);
  const [loomLink, setLoomLink] = useState("");

  const firstName = student.name.split(" ")[0];
  const calendarLink = "https://calendar.google.com/appointments/sifirdanzirveye-demo";
  const appointmentMessage = `Merhaba ${firstName}, online görüşmemiz için uygun saatinizi şu linkten seçebilirsiniz: ${calendarLink}`;
  const whatsappPhone = student.phone.replace(/[^\d]/g, "");
  const appointmentWaLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(appointmentMessage)}`;

  const deliveryMessage = `Merhaba ${firstName}, yeni döneme ait içerik metinleriniz hazırlandı. Panelinizden inceleyebilirsiniz: [Panel Linki]${
    loomLink ? `\nAçıklama videosu: ${loomLink}` : ""
  }`;
  const deliveryWaLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(deliveryMessage)}`;

  return (
    <div className="mx-auto max-w-[900px] px-10 py-10">
      <button
        onClick={back}
        className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium"
        style={{ color: inkSoft }}
      >
        <ChevronLeft size={16} />
        Öğrencilerime dön
      </button>

      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={student.avatar} size={56} />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[22px] font-semibold" style={{ color: ink }}>
                {student.name}
              </h1>
              <Badge stage={student.stage} />
            </div>
            <p className="mt-0.5 text-[14px]" style={{ color: inkSoft }}>
              {student.handle} · {student.niche}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <GhostButton icon={Phone}>{student.phone}</GhostButton>
          <GhostButton icon={Mail}>{student.email}</GhostButton>
          <a
            href={appointmentWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-white hover:opacity-90"
            style={{ background: green }}
          >
            <MessageCircle size={16} />
            Randevu iste (WhatsApp)
          </a>
        </div>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-5">
        <div className="flex flex-col gap-5">
          <MeetingNotesHistory />

          <Card>
            <SectionTitle>Hazırlanan dosyayı yükle & gönder</SectionTitle>
            <label
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl py-8 text-center"
              style={{ border: `1.5px dashed ${line}`, background: canvas }}
            >
              <Upload size={20} style={{ color: inkSoft }} />
              <p className="text-[13.5px]" style={{ color: inkSoft }}>
                {fileName ? fileName : "Word veya PDF dosyasını sürükle ya da seç"}
              </p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
              />
            </label>

            <div className="mt-3">
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
                Açıklama videosu linki (Loom, opsiyonel)
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <Video size={15} style={{ color: inkSoft }} />
                <input
                  value={loomLink}
                  onChange={(e) => setLoomLink(e.target.value)}
                  placeholder="https://loom.com/share/..."
                  className="w-full bg-transparent text-[13.5px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

            {fileName ? (
              <a
                href={deliveryWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-white hover:opacity-90"
                style={{ background: green }}
              >
                <MessageCircle size={16} />
                WhatsApp'tan öğrenciye gönder
              </a>
            ) : (
              <button
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-white"
                style={{ background: "#C7C6C1" }}
                disabled
              >
                <MessageCircle size={16} />
                WhatsApp'tan öğrenciye gönder
              </button>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <ContentDeliveryDate />

          <Card>
            <SectionTitle>Belgeler</SectionTitle>
            <a
              href="#"
              className="flex items-center justify-between rounded-xl px-3.5 py-3 text-[14px] font-medium transition-colors hover:bg-black/[0.03]"
              style={{ border: `1px solid ${line}`, color: ink }}
            >
              <span className="flex items-center gap-2.5">
                <FileText size={16} style={{ color: accent }} />
                Google Docs belgesini aç
              </span>
              <ExternalLink size={14} style={{ color: inkSoft }} />
            </a>
          </Card>

          <Card>
            <SectionTitle>Sonraki görüşme</SectionTitle>
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: accentSoft }}
              >
                <CalendarDays size={18} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-[14px] font-medium" style={{ color: ink }}>
                  {student.nextCall}
                </p>
                <p className="text-[12.5px]" style={{ color: inkSoft }}>
                  Google Takvim ile senkronize
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle>Abonelik</SectionTitle>
            <div className="flex items-center justify-between text-[14px]">
              <span style={{ color: inkSoft }}>Durum</span>
              <Badge stage={student.stage} />
            </div>
            {(() => {
              const last = PAYMENTS_SEED.filter((p) => p.studentId === student.id).sort((a, b) =>
                a.date < b.date ? 1 : -1
              )[0];
              if (!last) {
                return (
                  <p className="mt-3 text-[13px]" style={{ color: inkSoft }}>
                    Henüz ödeme kaydı yok
                  </p>
                );
              }
              const tone = renewalTone(daysUntil(last.nextDate));
              return (
                <>
                  <div className="mt-3 flex items-center justify-between text-[14px]">
                    <span style={{ color: inkSoft }}>Son ödeme</span>
                    <span className="font-medium" style={{ color: ink }}>
                      {formatTRDate(last.date)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[14px]">
                    <span style={{ color: inkSoft }}>Sonraki yenileme</span>
                    <span className="font-medium" style={{ color: ink }}>
                      {formatTRDate(last.nextDate)}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <span
                      className="rounded-full px-2.5 py-1 text-[12px] font-medium"
                      style={{ background: tone.bg, color: tone.color }}
                    >
                      {tone.label}
                    </span>
                  </div>
                </>
              );
            })()}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Lightweight placeholder pages (Calendar / Payments / Settings)
--------------------------------------------------------- */
function CalendarPage() {
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum"];
  return (
    <div className="mx-auto max-w-[1040px] px-10 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
          Takvim & Randevular
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
          Hatırlatmalar açık — bu hafta 8 görüşme planlı.
        </p>
      </div>
      <Card padded={false}>
        <div className="grid grid-cols-5" style={{ borderBottom: `1px solid ${line}` }}>
          {days.map((d) => (
            <div key={d} className="px-5 py-3 text-[13px] font-medium" style={{ color: inkSoft }}>
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5">
          {days.map((d, i) => (
            <div
              key={d}
              className="min-h-[220px] px-3 py-3"
              style={{ borderRight: i < 4 ? `1px solid ${line}` : "none" }}
            >
              {i === 1 && (
                <div className="mb-2 rounded-lg px-2.5 py-2 text-[12.5px]" style={{ background: accentSoft, color: accent }}>
                  14:00 Elif Yıldırım
                </div>
              )}
              {i === 1 && (
                <div className="rounded-lg px-2.5 py-2 text-[12.5px]" style={{ background: accentSoft, color: accent }}>
                  16:30 Mert Kaya
                </div>
              )}
              {i === 2 && (
                <div className="rounded-lg px-2.5 py-2 text-[12.5px]" style={{ background: accentSoft, color: accent }}>
                  10:00 Zeynep Arslan
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------
   Ödeme tarihi yardımcıları — havale/EFT sonrası 30 gün üzerinden
   bir sonraki yenileme tarihi hesaplanır
--------------------------------------------------------- */
const TODAY_ISO = "2026-09-03";
const MONTHS_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function addDaysISO(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatTRDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS_TR[d.getMonth()]} ${d.getFullYear()}`;
}

function daysUntil(dateStr) {
  const ms = new Date(dateStr + "T00:00:00") - new Date(TODAY_ISO + "T00:00:00");
  return Math.round(ms / 86400000);
}

function renewalTone(days) {
  if (days < 0) return { label: `${Math.abs(days)} gün gecikti`, bg: "#F4E7E5", color: "#B3453A" };
  if (days <= 3) return { label: days === 0 ? "Bugün" : `${days} gün kaldı`, bg: goldSoft, color: gold };
  return { label: `${days} gün kaldı`, bg: greenSoft, color: green };
}

/* Her öğrencinin son havale/EFT kaydı — gerçek üründe bu veriler kalıcı olur */
const PAYMENTS_SEED = [
  { id: 1, studentId: 1, studentName: "Elif Yıldırım", amount: 4500, date: "2026-08-10", note: "" },
  { id: 2, studentId: 2, studentName: "Mert Kaya", amount: 4500, date: "2026-08-25", note: "" },
  { id: 3, studentId: 3, studentName: "Zeynep Arslan", amount: 4500, date: "2026-08-05", note: "" },
  { id: 4, studentId: 4, studentName: "Burak Demir", amount: 4500, date: "2026-08-30", note: "" },
  { id: 5, studentId: 5, studentName: "Selin Öztürk", amount: 4500, date: "2026-07-28", note: "" },
  { id: 6, studentId: 6, studentName: "Onur Şahin", amount: 4500, date: "2026-08-20", note: "" },
  { id: 7, studentId: 7, studentName: "Aylin Koç", amount: 4500, date: "2026-08-15", note: "" },
  { id: 8, studentId: 8, studentName: "Kerem Yavuz", amount: 4500, date: "2026-08-28", note: "" },
].map((p) => ({ ...p, nextDate: addDaysISO(p.date, 30) }));

function PaymentsPage({ showToast }) {
  const [payments, setPayments] = useState(PAYMENTS_SEED);
  const [studentId, setStudentId] = useState(String(STUDENTS[0].id));
  const [amount, setAmount] = useState("4500");
  const [date, setDate] = useState(TODAY_ISO);
  const [note, setNote] = useState("");

  const latestPerStudent = STUDENTS.map((s) => {
    const studentPayments = payments.filter((p) => p.studentId === s.id).sort((a, b) => (a.date < b.date ? 1 : -1));
    return { student: s, payment: studentPayments[0] || null };
  });

  const upcoming = latestPerStudent
    .filter((x) => x.payment)
    .map((x) => ({ ...x, days: daysUntil(x.payment.nextDate) }))
    .sort((a, b) => a.days - b.days);

  const addPayment = () => {
    const student = STUDENTS.find((s) => s.id === Number(studentId));
    if (!student || !amount || !date) return;
    const newPayment = {
      id: Date.now(),
      studentId: student.id,
      studentName: student.name,
      amount: Number(amount),
      date,
      note,
      nextDate: addDaysISO(date, 30),
    };
    setPayments((p) => [newPayment, ...p]);
    setNote("");
    showToast?.(
      "Ödeme kaydedildi",
      `${student.name} için ${formatTRDate(date)} tarihli ödeme eklendi. Sonraki yenileme: ${formatTRDate(newPayment.nextDate)}.`
    );
  };

  return (
    <div className="mx-auto max-w-[1040px] px-10 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
          Ödemeler
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
          Havale / EFT ile alınan ödemeleri elle kaydet — sistem 30 gün üzerinden bir sonraki yenileme tarihini otomatik hesaplar
        </p>
      </div>

      {/* Ödeme ekleme formu */}
      <Card className="mb-6">
        <p className="mb-4 text-[14.5px] font-semibold" style={{ color: ink }}>
          Yeni ödeme kaydı
        </p>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Öğrenci
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full appearance-none rounded-xl px-3 py-2.5 text-[13.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            >
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Tutar (₺)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-[13.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Ödeme tarihi
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-[13.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Not (opsiyonel)
            </label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Örn. Ziraat EFT"
              className="w-full rounded-xl px-3 py-2.5 text-[13.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12.5px]" style={{ color: inkSoft }}>
            Sonraki yenileme: <span style={{ color: ink, fontWeight: 500 }}>{date ? formatTRDate(addDaysISO(date, 30)) : "—"}</span>
          </p>
          <PrimaryButton icon={Plus} onClick={addPayment}>
            Ödemeyi kaydet
          </PrimaryButton>
        </div>
      </Card>

      {/* Yaklaşan yenilemeler */}
      <div className="mb-6">
        <p className="mb-3 text-[14.5px] font-semibold" style={{ color: ink }}>
          Yaklaşan yenilemeler
        </p>
        <Card padded={false}>
          {upcoming.map((u, i) => {
            const tone = renewalTone(u.days);
            return (
              <div
                key={u.student.id}
                className="flex items-center justify-between px-6 py-4"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
              >
                <div className="flex items-center gap-3">
                  <Avatar initials={u.student.avatar} size={36} />
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: ink }}>
                      {u.student.name}
                    </p>
                    <p className="text-[12.5px]" style={{ color: inkSoft }}>
                      Sonraki yenileme: {formatTRDate(u.payment.nextDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[12px] font-medium"
                    style={{ background: tone.bg, color: tone.color }}
                  >
                    {tone.label}
                  </span>
                  <button
                    onClick={() =>
                      showToast?.(
                        "Ödeme hatırlatması",
                        `${u.student.name} — yenileme tarihi ${formatTRDate(u.payment.nextDate)}.`
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: accentSoft, color: accent }}
                  >
                    <Bell size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Ödeme geçmişi */}
      <div>
        <p className="mb-3 text-[14.5px] font-semibold" style={{ color: ink }}>
          Ödeme geçmişi
        </p>
        <Card padded={false}>
          {payments.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-6 py-4"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
            >
              <div className="flex items-center gap-3">
                <CreditCard size={16} style={{ color: inkSoft }} />
                <div>
                  <p className="text-[14px] font-medium" style={{ color: ink }}>
                    {p.studentName}
                  </p>
                  <p className="text-[12.5px]" style={{ color: inkSoft }}>
                    {formatTRDate(p.date)} · Sonraki: {formatTRDate(p.nextDate)}
                    {p.note ? ` · ${p.note}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-[14px] font-semibold" style={{ color: ink }}>
                ₺{p.amount.toLocaleString("tr-TR")}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function SettingsPage({ showToast }) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );

  const requestPermission = async () => {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch (e) {
      setPermission("unsupported");
    }
  };

  const sendTest = () => {
    const title = "Görüşme hatırlatması";
    const body = "Elif Yıldırım ile görüşmen 15 dakika sonra başlıyor.";
    let native = false;
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification(title, { body });
        native = true;
      }
    } catch (e) {
      native = false;
    }
    if (!native) showToast(title, body);
  };

  const statusCopy = {
    granted: { label: "Bildirimlere izin verildi", tone: "good" },
    denied: { label: "Bildirimler engellendi", tone: "bad" },
    default: { label: "Henüz izin istenmedi", tone: "neutral" },
    unsupported: { label: "Bu tarayıcıda desteklenmiyor", tone: "neutral" },
  }[permission];

  return (
    <div className="mx-auto max-w-[1040px] px-10 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
          Ayarlar
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
          Hesap ve entegrasyon tercihlerin
        </p>
      </div>

      <Card className="mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: accentSoft }}
            >
              {permission === "granted" ? (
                <BellRing size={18} style={{ color: accent }} />
              ) : (
                <Bell size={18} style={{ color: accent }} />
              )}
            </div>
            <div>
              <p className="text-[14.5px] font-semibold" style={{ color: ink }}>
                Tarayıcı bildirimleri
              </p>
              <p className="mt-0.5 max-w-[440px] text-[13px] leading-relaxed" style={{ color: inkSoft }}>
                Görüşme saatine az kala bu tarayıcıya bildirim düşer. Panel açık olmasa bile
                sekmen açık kaldığı sürece çalışır.
              </p>
              <span
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium"
                style={{
                  background:
                    statusCopy.tone === "good" ? greenSoft : statusCopy.tone === "bad" ? "#F4E7E5" : canvas,
                  color: statusCopy.tone === "good" ? green : statusCopy.tone === "bad" ? "#B3453A" : inkSoft,
                }}
              >
                {statusCopy.label}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            {permission !== "granted" && (
              <PrimaryButton onClick={requestPermission}>Bildirimlere izin ver</PrimaryButton>
            )}
            <GhostButton icon={Bell} onClick={sendTest}>
              Test bildirimi gönder
            </GhostButton>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        {[
          { label: "Google Calendar bağlantısı", status: "Bağlı" },
          { label: "Google Docs bağlantısı", status: "Bağlı" },
        ].map((row) => (
          <Card key={row.label} className="flex items-center justify-between !py-4">
            <p className="text-[14px] font-medium" style={{ color: ink }}>
              {row.label}
            </p>
            <span
              className="rounded-full px-2.5 py-1 text-[12.5px] font-medium"
              style={{
                background: row.status === "Bağlı" ? greenSoft : "#F4E7E5",
                color: row.status === "Bağlı" ? green : "#B3453A",
              }}
            >
              {row.status}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   In-app notification toast
   (fallback for when the sandboxed preview can't show a
   real OS-level browser notification)
--------------------------------------------------------- */
function NotificationToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className="fixed right-5 top-5 z-50 w-[340px] rounded-2xl bg-white p-4"
      style={{ border: `1px solid ${line}`, boxShadow: cardShadow }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: accentSoft }}
        >
          <BellRing size={16} style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13.5px] font-semibold" style={{ color: ink }}>
              {toast.title}
            </p>
            <button onClick={onClose} className="shrink-0" style={{ color: inkSoft }}>
              <X size={14} />
            </button>
          </div>
          <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: inkSoft }}>
            {toast.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Root app
--------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (title, body) => setToast({ title, body });

  const openStudent = (s) => {
    setSelectedStudent(s);
    setPage("student-detail");
  };

  const setActive = (id) => {
    setSelectedStudent(null);
    setPage(id);
  };

  const activeNavId = page === "student-detail" ? "students" : page;

  let content;
  if (page === "dashboard") content = <Dashboard openStudent={openStudent} showToast={showToast} />;
  else if (page === "students") content = <StudentsPage openStudent={openStudent} />;
  else if (page === "student-detail")
    content = <StudentDetail student={selectedStudent} back={() => setPage("students")} />;
  else if (page === "calendar") content = <CalendarPage />;
  else if (page === "payments") content = <PaymentsPage showToast={showToast} />;
  else if (page === "settings") content = <SettingsPage showToast={showToast} />;

  return (
    <div className="flex h-screen w-full font-sans" style={{ background: canvas }}>
      <Sidebar active={activeNavId} setActive={setActive} />
      <main className="flex-1 overflow-y-auto">{content}</main>
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
