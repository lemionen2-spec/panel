import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
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
  Pencil,
  LogOut,
  Trash2,
  ListChecks,
  Menu as MenuIcon,
  Wallet,
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
  { id: 1, name: "Elif Yıldırım", handle: "@elifyildirim", monthNumber: 7, gender: "Kadın", avatar: "EY", phone: "+90 532 111 22 33", email: "elif.yildirim@gmail.com", niche: "Kişisel gelişim içerikleri", nextCall: "Bugün 14:00", nextDeliveryDate: "2026-09-03", notes: "Reels tempo çalışması yapıyoruz, hook'lar geliştirildi. Sonraki hafta hedefi: 3 viral deneme." },
  { id: 2, name: "Mert Kaya", handle: "@mertkaya.fit", monthNumber: 1, gender: "Erkek", avatar: "MK", phone: "+90 533 222 33 44", email: "mert.kaya@gmail.com", niche: "Fitness koçluğu", nextCall: "Bugün 16:30", nextDeliveryDate: "2026-09-05", notes: "Profil biyografisi ve vurgu renkleri netleşti. Bu hafta ilk 5 gönderi planı hazırlanacak." },
  { id: 3, name: "Zeynep Arslan", handle: "@zeyneparslan", monthNumber: 20, gender: "Kadın", avatar: "ZA", phone: "+90 534 333 44 55", email: "zeynep.arslan@gmail.com", niche: "Dijital pazarlama", nextCall: "Yarın 10:00", nextDeliveryDate: "2026-09-01", notes: "Gelir hedefine göre teklif sayfası revize edildi." },
  { id: 4, name: "Burak Demir", handle: "@burakdemir", monthNumber: 1, gender: "Erkek", avatar: "BD", phone: "+90 535 444 55 66", email: "burak.demir@gmail.com", niche: "Emlak danışmanlığı", nextCall: "Perşembe 11:00", nextDeliveryDate: "2026-09-10", notes: "İlk görüşme yapıldı, hedef kitle netleştirme aşamasında." },
  { id: 5, name: "Selin Öztürk", handle: "@selinozturk", monthNumber: 14, gender: "Kadın", avatar: "SÖ", phone: "+90 536 555 66 77", email: "selin.ozturk@gmail.com", niche: "Moda & stil", nextCall: "Cuma 13:00", nextDeliveryDate: "2026-09-03", notes: "Aylık rapor hazırlandı, onay bekleniyor." },
  { id: 6, name: "Onur Şahin", handle: "@onursahin", monthNumber: 1, gender: "Erkek", avatar: "OŞ", phone: "+90 537 666 77 88", email: "onur.sahin@gmail.com", niche: "Yazılım kariyeri", nextCall: "Pazartesi 15:00", nextDeliveryDate: "2026-09-08", notes: "İçerik takvimi taslağı paylaşıldı." },
  { id: 7, name: "Aylin Koç", handle: "@aylinkoc", monthNumber: 9, gender: "Kadın", avatar: "AK", phone: "+90 538 777 88 99", email: "aylin.koc@gmail.com", niche: "Anne & bebek", nextCall: "Salı 09:30", nextDeliveryDate: "2026-09-12", notes: "Reels performansı %40 arttı, strateji sabit tutulacak." },
  { id: 8, name: "Kerem Yavuz", handle: "@keremyavuz", monthNumber: 1, gender: "Erkek", avatar: "KY", phone: "+90 539 888 99 00", email: "kerem.yavuz@gmail.com", niche: "Kişisel finans", nextCall: "Çarşamba 17:00", nextDeliveryDate: "2026-09-06", notes: "Marka sesi çalışması tamamlandı." },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Ana Sayfa", icon: LayoutDashboard },
  { id: "students", label: "Öğrencilerim", icon: Users },
  { id: "calendar", label: "Takvim & Randevular", icon: CalendarDays },
  { id: "payments", label: "Ödemeler", icon: CreditCard },
  { id: "finans", label: "Finans", icon: Wallet },
  { id: "settings", label: "Ayarlar", icon: Settings },
];

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function Badge({ month }) {
  const isVeteran = month >= 2;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-medium"
      style={{
        background: isVeteran ? goldSoft : accentSoft,
        color: isVeteran ? gold : accent,
      }}
    >
      <CircleDot size={11} strokeWidth={3} />
      {month}. Ay
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
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("E-posta ve şifre alanları zorunludur.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError("E-posta veya şifre hatalı.");
      return;
    }
    onLogin(email);
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

            <PrimaryButton type="submit" full disabled={loading} onClick={handleSubmit}>
              {loading ? "Giriş yapılıyor..." : "Giriş yap"}
            </PrimaryButton>
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
function Sidebar({ active, setActive, onLogout }) {
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
              @lemionen
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors hover:bg-black/[0.03]"
          style={{ color: inkSoft }}
        >
          <LogOut size={16} />
          Çıkış yap
        </button>
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
    { id: 1, title: "Elif'in içerik metinleri", minutes: 45, done: true, time: "09:00" },
    { id: 2, title: "Mert ile görüşme hazırlığı", minutes: 20, done: true, time: "10:30" },
    { id: 3, title: "Zeynep'in haftalık raporu", minutes: 35, done: false, time: "13:00" },
    { id: 4, title: "Reels çekimi — VELMORA lansmanı", minutes: 60, done: false, time: "15:00" },
    { id: 5, title: "Yeni öğrenci onboarding maili", minutes: 15, done: false, time: "" },
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

const SCHEDULED_TASKS_SEED = [
  {
    id: 900,
    title: "Bugün son gün — içerik paketini WhatsApp'tan gönder",
    minutes: 20,
    done: false,
    studentId: 6,
    studentName: "Onur Şahin",
    dueDate: "2026-09-03",
  },
  {
    id: 901,
    title: "İçerik metinlerini hazırla ve gönder",
    minutes: 45,
    done: false,
    studentId: 3,
    studentName: "Zeynep Arslan",
    dueDate: "2026-09-05",
  },
];

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

function timeToMinutes(t) {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function findTimeConflicts(tasks) {
  const timed = tasks.filter((t) => !t.done && t.time);
  const conflicts = new Set();
  for (let i = 0; i < timed.length; i++) {
    const aStart = timeToMinutes(timed[i].time);
    const aEnd = aStart + (timed[i].minutes || 0);
    for (let j = i + 1; j < timed.length; j++) {
      const bStart = timeToMinutes(timed[j].time);
      const bEnd = bStart + (timed[j].minutes || 0);
      if (aStart < bEnd && bStart < aEnd) {
        conflicts.add(timed[i].id);
        conflicts.add(timed[j].id);
      }
    }
  }
  return conflicts;
}

function WorkPlanner({ students, tasksByPeriod, setTasksByPeriod, scheduledTasks, setScheduledTasks }) {
  const [period, setPeriod] = useState("day");
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [schedStudentId, setSchedStudentId] = useState(String(students[0]?.id || ""));
  const [schedTitle, setSchedTitle] = useState("");
  const [schedDate, setSchedDate] = useState(TODAY_ISO);
  const [schedMinutes, setSchedMinutes] = useState("30");

  const tasks = tasksByPeriod[period];
  const displayTasks =
    period === "day"
      ? [...tasks].sort((a, b) => {
          const at = timeToMinutes(a.time);
          const bt = timeToMinutes(b.time);
          if (at === null && bt === null) return 0;
          if (at === null) return 1;
          if (bt === null) return -1;
          return at - bt;
        })
      : tasks;
  const conflicts = period === "day" ? findTimeConflicts(tasks) : new Set();
  const todaysScheduled = scheduledTasks.filter((t) => t.dueDate === TODAY_ISO && !t.done);

  const toggle = (id) => {
    setTasksByPeriod((prev) => ({
      ...prev,
      [period]: prev[period].map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
    const t = tasksByPeriod[period].find((x) => x.id === id);
    if (t) supabase.from("planner_tasks").update({ done: !t.done }).eq("id", id);
  };

  const deleteTask = (id) => {
    setTasksByPeriod((prev) => ({
      ...prev,
      [period]: prev[period].filter((t) => t.id !== id),
    }));
    supabase.from("planner_tasks").delete().eq("id", id);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const payload = {
      period,
      title,
      minutes: Number(minutes) || 30,
      done: false,
      task_time: period === "day" && taskTime ? taskTime : null,
    };
    const { data, error } = await supabase.from("planner_tasks").insert(payload).select().single();
    if (error) return;
    setTasksByPeriod((prev) => ({
      ...prev,
      [period]: [...prev[period], dbToPlannerTask(data)],
    }));
    setTitle("");
    setMinutes("");
    setTaskTime("");
  };

  const toggleScheduled = (id) => {
    setScheduledTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    const t = scheduledTasks.find((x) => x.id === id);
    if (t) supabase.from("scheduled_tasks").update({ done: !t.done }).eq("id", id);
  };

  const deleteScheduled = (id) => {
    setScheduledTasks((prev) => prev.filter((t) => t.id !== id));
    supabase.from("scheduled_tasks").delete().eq("id", id);
  };

  const addScheduledTask = async () => {
    if (!schedTitle.trim() || !schedDate) return;
    const student = students.find((s) => s.id === Number(schedStudentId));
    const payload = {
      title: schedTitle.trim(),
      minutes: Number(schedMinutes) || 30,
      done: false,
      student_id: student?.id || null,
      student_name: student?.name || "—",
      due_date: schedDate,
    };
    const { data, error } = await supabase.from("scheduled_tasks").insert(payload).select().single();
    if (error) return;
    setScheduledTasks((prev) => [...prev, dbToScheduledTask(data)]);
    setSchedTitle("");
    setShowScheduleForm(false);
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const remainingMinutes = tasks.filter((t) => !t.done).reduce((s, t) => s + t.minutes, 0);

  const upcomingScheduled = [...scheduledTasks]
    .filter((t) => !t.done)
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1));

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            İş planlayıcı
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
            {doneCount}/{tasks.length} tamamlandı · kalan ~{formatDuration(remainingMinutes)}
            {period === "day" && conflicts.size > 0 ? " · saat çakışması var" : ""}
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

      {period === "day" && todaysScheduled.length > 0 && (
        <div className="mt-4 px-6">
          <p className="mb-2 text-[12px] font-medium" style={{ color: gold }}>
            Bugün teslim edilecek öğrenci işleri
          </p>
          {todaysScheduled.map((t) => (
            <div
              key={t.id}
              className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{ background: goldSoft }}
            >
              <button
                onClick={() => toggleScheduled(t.id)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                style={{ border: `1.5px solid ${gold}` }}
              >
                {t.done && <Check size={12} style={{ color: gold }} />}
              </button>
              <p className="flex-1 text-[13.5px]" style={{ color: ink }}>
                {t.title}
              </p>
              <span className="shrink-0 text-[12px] font-medium" style={{ color: gold }}>
                {t.studentName}
              </span>
              <button onClick={() => deleteScheduled(t.id)} style={{ color: gold }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        {displayTasks.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-6 py-3"
            style={{ borderTop: `1px solid ${line}`, background: conflicts.has(t.id) ? "#FDEDEC" : "transparent" }}
          >
            <button
              onClick={() => toggle(t.id)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{ border: `1.5px solid ${t.done ? green : line}`, background: t.done ? green : "transparent" }}
            >
              {t.done && <Check size={12} style={{ color: "#fff" }} />}
            </button>
            {period === "day" && (
              <span className="w-11 shrink-0 text-[12px] font-medium" style={{ color: t.time ? ink : inkSoft }}>
                {t.time || "—"}
              </span>
            )}
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
            <button onClick={() => deleteTask(t.id)} style={{ color: inkSoft }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-6 py-4" style={{ borderTop: `1px solid ${line}` }}>
        {period === "day" && (
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="w-24 shrink-0 rounded-xl px-2.5 py-2 text-[13.5px] outline-none"
            style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
          />
        )}
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

      <div className="px-6 py-4" style={{ borderTop: `1px solid ${line}` }}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold" style={{ color: ink }}>
            Öğrenciye özel planlanan işler
          </p>
          <button
            onClick={() => setShowScheduleForm((v) => !v)}
            className="inline-flex items-center gap-1 text-[12.5px] font-medium"
            style={{ color: accent }}
          >
            <Plus size={13} />
            Tarihe planla
          </button>
        </div>

        {showScheduleForm && (
          <div className="mb-3 flex flex-col gap-2 rounded-xl p-3" style={{ background: canvas }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={schedStudentId}
                onChange={(e) => setSchedStudentId(e.target.value)}
                className="w-full appearance-none rounded-lg px-2.5 py-2 text-[13px] outline-none"
                style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={schedDate}
                onChange={(e) => setSchedDate(e.target.value)}
                className="w-full rounded-lg px-2.5 py-2 text-[13px] outline-none"
                style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
              />
            </div>
            <div className="flex gap-2">
              <input
                value={schedTitle}
                onChange={(e) => setSchedTitle(e.target.value)}
                placeholder="Örn. İçerik metinlerini hazırla ve gönder"
                className="min-w-0 flex-1 rounded-lg px-2.5 py-2 text-[13px] outline-none"
                style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
              />
              <input
                value={schedMinutes}
                onChange={(e) => setSchedMinutes(e.target.value)}
                placeholder="dk"
                className="w-14 shrink-0 rounded-lg px-2.5 py-2 text-[13px] outline-none"
                style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
              />
            </div>
            <PrimaryButton onClick={addScheduledTask}>Planla</PrimaryButton>
          </div>
        )}

        {upcomingScheduled.length === 0 ? (
          <p className="text-[12.5px]" style={{ color: inkSoft }}>
            Planlanmış öğrenci işi yok.
          </p>
        ) : (
          upcomingScheduled.map((t) => {
            const tone = renewalTone(daysUntil(t.dueDate));
            return (
              <div key={t.id} className="flex items-center gap-3 py-2">
                <button
                  onClick={() => toggleScheduled(t.id)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                  style={{ border: `1.5px solid ${line}` }}
                >
                  {t.done && <Check size={12} style={{ color: ink }} />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px]" style={{ color: ink }}>
                    {t.title}
                  </p>
                  <p className="text-[11.5px]" style={{ color: inkSoft }}>
                    {t.studentName} · {formatTRDate(t.dueDate)}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-1 text-[11px] font-medium"
                  style={{ background: tone.bg, color: tone.color }}
                >
                  {tone.label}
                </span>
                <button onClick={() => deleteScheduled(t.id)} style={{ color: inkSoft }}>
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   Hızlı mesaj şablonları bankası
--------------------------------------------------------- */
const MESSAGE_TEMPLATES = [
  { id: 1, title: "İçerik teslimi", text: "Merhaba {isim}, yeni döneme ait içerik metinlerinize linki tıklayarak ulaşabilirsiniz 🎯" },
  { id: 2, title: "Randevu talebi", text: "Merhaba {isim}, bir sonraki görüşmemiz için uygun saatinizi şu linkten seçebilir misiniz?\n\n{takvim_linki}" },
  { id: 3, title: "Ödeme hatırlatma", text: "Merhaba {isim}, aboneliğinizin yenilenme tarihi yaklaşıyor. Bir sorunuz olursa buradayım 🙌" },
  { id: 4, title: "Görüşme özeti", text: "Merhaba {isim}, bugünkü görüşmemizin özetini ve aksiyon maddelerini panelinize ekledim." },
];

function QuickMessageTemplates({ showToast }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    supabase
      .from("message_templates")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setTemplates(data.map(dbToTemplate));
        setLoading(false);
      });
  }, []);

  const copy = (tpl) => {
    try {
      navigator.clipboard.writeText(tpl.text);
      showToast("Kopyalandı", `"${tpl.title}" şablonu panoya kopyalandı.`);
    } catch (e) {
      showToast("Kopyalanamadı", "Metni manuel olarak seçip kopyalayabilirsin.");
    }
  };

  const addTemplate = async () => {
    if (!newTitle.trim() || !newText.trim()) return;
    const { data, error } = await supabase
      .from("message_templates")
      .insert(templateToDb({ title: newTitle.trim(), text: newText.trim() }))
      .select()
      .single();
    if (error) return;
    setTemplates((prev) => [...prev, dbToTemplate(data)]);
    setNewTitle("");
    setNewText("");
    setShowAdd(false);
  };

  const deleteTemplate = async (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    await supabase.from("message_templates").delete().eq("id", id);
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
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: accentSoft, color: accent }}
        >
          <Plus size={16} />
        </button>
      </div>

      {showAdd && (
        <div className="mx-6 mt-4 flex flex-col gap-2 rounded-xl p-3" style={{ background: canvas }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Şablon başlığı"
            className="w-full rounded-lg px-2.5 py-2 text-[13px] outline-none"
            style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
          />
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Mesaj metni... ({isim} gibi değişkenler kullanabilirsin)"
            rows={2}
            className="w-full resize-none rounded-lg px-2.5 py-2 text-[13px] outline-none"
            style={{ border: `1px solid ${line}`, background: "#fff", color: ink }}
          />
          <PrimaryButton onClick={addTemplate}>Şablonu ekle</PrimaryButton>
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
            Yükleniyor...
          </p>
        ) : templates.length === 0 ? (
          <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
            Henüz şablon yok.
          </p>
        ) : (
          templates.map((tpl) => (
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
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => copy(tpl)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: accentSoft, color: accent }}
              >
                <Copy size={14} />
              </button>
              <button
                onClick={() => deleteTemplate(tpl.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "#F4E7E5", color: "#B3453A" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </Card>
  );
}

function Dashboard({ students, payments, tasksByPeriod, setTasksByPeriod, scheduledTasks, setScheduledTasks, openStudent, showToast }) {
  const [todayEvents, setTodayEvents] = useState([]);
  const [calConnected, setCalConnected] = useState(null);
  const [calLoading, setCalLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/calendar/events?range=week`)
      .then((r) => r.json())
      .then((d) => {
        setCalConnected(d.connected);
        const todays = (d.events || []).filter(
          (ev) => new Date(ev.start).toDateString() === new Date().toDateString()
        );
        setTodayEvents(todays);
      })
      .catch(() => setCalConnected(false))
      .finally(() => setCalLoading(false));
  }, []);

  const collectedThisMonth = payments
    .filter((p) => monthKey(p.date) === monthKey(TODAY_ISO))
    .reduce((s, p) => s + p.amount, 0);

  const dueReports = students
    .filter((s) => s.nextDeliveryDate && s.nextDeliveryDate <= TODAY_ISO)
    .sort((a, b) => (a.nextDeliveryDate < b.nextDeliveryDate ? -1 : 1));
  const dueToday = dueReports.filter((s) => s.nextDeliveryDate === TODAY_ISO);

  const stats = [
    { label: "Aktif Öğrenci", value: String(students.length), sub: "Toplam kayıtlı öğrenci", positive: true, arc: accent },
    {
      label: "Bu Ay Koçluk Geliri",
      value: `₺${collectedThisMonth.toLocaleString("tr-TR")}`,
      sub: `${monthLabel(monthKey(TODAY_ISO))}`,
      positive: true,
      arc: accent,
    },
    {
      label: "Gönderilecek Raporlar",
      value: String(dueReports.length),
      sub: `Bugün ${dueToday.length} tanesi`,
      positive: false,
      arc: green,
    },
  ];

  return (
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold" style={{ color: ink }}>
          Merhaba, Lemi
        </h1>
        <p className="mt-1.5 text-[14px]" style={{ color: inkSoft }}>
          Bugün {todayEvents.length} birebir görüşmen ve gönderilecek {dueToday.length} dosyan var.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkPlanner students={students} tasksByPeriod={tasksByPeriod} setTasksByPeriod={setTasksByPeriod} scheduledTasks={scheduledTasks} setScheduledTasks={setScheduledTasks} />
        <QuickMessageTemplates showToast={showToast} />
      </div>

      <div className="mb-6">
        <Card padded={false}>
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <h2 className="text-[17px] font-semibold" style={{ color: ink }}>
                Gönderilecek raporlar & dosyalar
              </h2>
              <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
                Teslim tarihi geçmiş veya bugün olan öğrenciler — tıklayınca öğrenci sayfasına gidip
                dosya linkini ekleyip gönderebilirsin.
              </p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[12.5px] font-medium"
              style={{ background: goldSoft, color: gold }}
            >
              {dueReports.length} bekliyor
            </span>
          </div>

          <div className="mt-5">
            {dueReports.length === 0 ? (
              <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
                Bekleyen bir teslim yok.
              </p>
            ) : (
              dueReports.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => openStudent(s)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-black/[0.02]"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
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
                        {s.name}
                      </p>
                      <p className="text-[12.5px]" style={{ color: inkSoft }}>
                        Teslim: {formatTRDate(s.nextDeliveryDate)}
                        {s.nextDeliveryDate < TODAY_ISO ? " · gecikti" : ""}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: inkSoft }} />
                </button>
              ))
            )}
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
              Google Calendar'ından bugünün randevuları
            </p>
          </div>
          <CalendarDays size={18} style={{ color: inkSoft }} />
        </div>

        <div className="mt-5">
          {calLoading ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Yükleniyor...
            </p>
          ) : calConnected === false ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Google Calendar bağlı değil — Ayarlar'dan bağlayabilirsin.
            </p>
          ) : todayEvents.length === 0 ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Bugün planlı randevu yok.
            </p>
          ) : (
            todayEvents.map((ev) => (
              <a
                key={ev.id}
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-black/[0.02]"
                style={{ borderTop: `1px solid ${line}` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex w-14 flex-col items-center">
                    <p className="text-[15px] font-semibold" style={{ color: ink }}>
                      {ev.allDay
                        ? "Tüm gün"
                        : new Date(ev.start).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div style={{ width: 1, height: 32, background: line }} />
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: ink }}>
                      {ev.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    let native = false;
                    try {
                      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                        new Notification("Görüşme hatırlatması", { body: `${ev.title} yaklaşıyor.` });
                        native = true;
                      }
                    } catch (err) {
                      native = false;
                    }
                    if (!native) showToast("Görüşme hatırlatması", `${ev.title} yaklaşıyor.`);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
                  style={{ background: accentSoft, color: accent }}
                >
                  <Bell size={12} />
                  Hatırlatma açık
                </button>
              </a>
            ))
          )}
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
  const [monthNumber, setMonthNumber] = useState("1");
  const [gender, setGender] = useState("Kadın");
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
      monthNumber: Number(monthNumber) || 1,
      gender,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                Cinsiyet
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full appearance-none rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
                style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
              >
                <option>Kadın</option>
                <option>Erkek</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Kaçıncı ayında?
            </label>
            <input
              type="number"
              min="1"
              value={monthNumber}
              onChange={(e) => setMonthNumber(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
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

function StudentsPage({ students, addStudent, openStudent }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = students.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.handle.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      filter === "Tümü" || (filter === "1. Ay" ? s.monthNumber === 1 : s.monthNumber >= 2);
    return matchesQuery && matchesFilter;
  });

  const handleAdd = async (newStudent) => {
    await addStudent(newStudent);
    setShowAddModal(false);
  };

  return (
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
            Öğrencilerim
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
            {students.length} öğrenci · Lemi Önen Koçluk Programı
          </p>
        </div>
        <PrimaryButton icon={Plus} onClick={() => setShowAddModal(true)} full={false}>
          <span className="shrink-0 whitespace-nowrap">Yeni öğrenci ekle</span>
        </PrimaryButton>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
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
          {["Tümü", "1. Ay", "2. Ay ve sonrası"].map((f) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Badge month={s.monthNumber} />
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
const MOCK_SESSIONS = [];

const NOTE_SECTIONS = [
  { key: "discussed", label: "Konuşulanlar" },
  { key: "problems", label: "Problemler / Tıkanıklıklar" },
  { key: "nextSteps", label: "Bir Sonraki Görüşmeye Kadar Yapılacaklar" },
];

function MeetingNotesHistory({ studentId }) {
  const [sessions, setSessions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("meeting_notes")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped = data.map(dbToNote);
          setSessions(mapped);
          setSelectedId(mapped[0]?.id || null);
        }
        setLoading(false);
      });
  }, [studentId]);

  const selected = sessions.find((s) => s.id === selectedId) || sessions[0] || null;

  const updateField = (field, value) =>
    setSessions((prev) => prev.map((s) => (s.id === selectedId ? { ...s, [field]: value } : s)));

  const addSession = async () => {
    const nextNumber = sessions.length + 1;
    const { data, error } = await supabase
      .from("meeting_notes")
      .insert(
        noteToDb({
          studentId,
          date: "Bugün",
          label: `${nextNumber}. Görüşme`,
          discussed: "",
          problems: "",
          nextSteps: "",
        })
      )
      .select()
      .single();
    if (error) return;
    const saved = dbToNote(data);
    setSessions((prev) => [saved, ...prev]);
    setSelectedId(saved.id);
  };

  const saveNote = async () => {
    if (!selected) return;
    await supabase
      .from("meeting_notes")
      .update(
        noteToDb({ discussed: selected.discussed, problems: selected.problems, nextSteps: selected.nextSteps })
      )
      .eq("id", selected.id);
  };

  return (
    <Card padded={false}>
      <div className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Görüşme notları
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
            {loading
              ? "Yükleniyor..."
              : sessions.length > 0
              ? `${sessions.length} haftalık görüşme kaydı · geçmişe dönük görüntüle`
              : "Henüz görüşme kaydı yok"}
          </p>
        </div>
        <div className="shrink-0">
          <GhostButton icon={Plus} onClick={addSession}>
            <span className="whitespace-nowrap">Yeni görüşme ekle</span>
          </GhostButton>
        </div>
      </div>

      {!loading && !selected ? (
        <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
          İlk görüşme notunu eklemek için "Yeni görüşme ekle"ye tıkla.
        </p>
      ) : selected ? (
        <>
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
                    value={selected[section.key] || ""}
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
              <PrimaryButton onClick={saveNote}>Notu kaydet</PrimaryButton>
            </div>
          </div>
        </>
      ) : null}
    </Card>
  );
}

/* ---------------------------------------------------------
   İçerik teslim tarihi (esnek periyot) — 2 gün kala uyarı
--------------------------------------------------------- */
function ContentDeliveryDate({ student, onUpdateStudent }) {
  const [period, setPeriod] = useState("7");
  const [editing, setEditing] = useState(false);
  const [dateValue, setDateValue] = useState(student.nextDeliveryDate || "");

  const daysLeft = student.nextDeliveryDate ? daysUntil(student.nextDeliveryDate) : null;
  const isOverdue = daysLeft !== null && daysLeft < 0;
  const isWarning = daysLeft !== null && daysLeft <= 2;

  const save = () => {
    onUpdateStudent(student.id, { nextDeliveryDate: dateValue });
    setEditing(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold" style={{ color: ink }}>
          İçerik teslim tarihi
        </p>
        {isWarning && (
          <span
            className="rounded-full px-2.5 py-1 text-[12px] font-medium"
            style={{ background: isOverdue ? "#F4E7E5" : goldSoft, color: isOverdue ? "#B3453A" : gold }}
          >
            {isOverdue ? `${Math.abs(daysLeft)} gün gecikti` : daysLeft === 0 ? "Bugün" : `${daysLeft} gün kaldı`}
          </span>
        )}
      </div>

      {editing ? (
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
            style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
          />
          <PrimaryButton full onClick={save}>
            Kaydet
          </PrimaryButton>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: accentSoft }}>
            <CalendarDays size={18} style={{ color: accent }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium" style={{ color: ink }}>
              {student.nextDeliveryDate ? formatTRDate(student.nextDeliveryDate) : "Henüz belirlenmedi"}
            </p>
            <p className="text-[12.5px]" style={{ color: inkSoft }}>
              Bir sonraki içerik paketi teslim tarihi
            </p>
          </div>
          <button onClick={() => setEditing(true)} className="text-[12.5px] font-medium shrink-0" style={{ color: accent }}>
            Değiştir
          </button>
        </div>
      )}

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
function EditStudentModal({ student, onClose, onSave }) {
  const [name, setName] = useState(student.name);
  const [handle, setHandle] = useState(student.handle);
  const [niche, setNiche] = useState(student.niche);
  const [phone, setPhone] = useState(student.phone);
  const [email, setEmail] = useState(student.email);
  const [gender, setGender] = useState(student.gender || "Kadın");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Ad soyad zorunludur.");
      return;
    }
    onSave({
      name: name.trim(),
      handle: handle.trim(),
      niche: niche.trim(),
      phone: phone.trim(),
      email: email.trim(),
      gender,
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
            Öğrenci bilgilerini düzenle
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
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Telefon
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              Cinsiyet
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full appearance-none rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            >
              <option>Kadın</option>
              <option>Erkek</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: inkSoft }}>
              E-posta
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Değişiklikleri kaydet
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function DocLinkEditor({ student, onUpdateStudent, onDone }) {
  const [value, setValue] = useState(student.docLink || "");

  const save = () => {
    onUpdateStudent(student.id, { docLink: value.trim() });
    onDone();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://docs.google.com/document/..."
        className="w-full rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none"
        style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
      />
      <PrimaryButton full onClick={save}>
        Kaydet
      </PrimaryButton>
    </div>
  );
}

function StudentDetail({ student, payments, onUpdateStudent, onDeleteStudent, back }) {
  const [fileName, setFileName] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [loomLink, setLoomLink] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(false);

  const firstName = student.name.split(" ")[0];
  const honorific = student.gender === "Kadın" ? "Hanım" : student.gender === "Erkek" ? "Bey" : "";
  const greetingName = honorific ? `${firstName} ${honorific}` : firstName;
  const calendarLink = "https://calendar.app.google/EUeXReTdmqxNUxrJ9";
  const appointmentMessage = `Merhaba ${greetingName}, online görüşmemiz için uygun saatinizi şu linkten seçebilirsiniz:\n\n${calendarLink}`;
  const whatsappPhone = student.phone.replace(/[^\d]/g, "");
  const appointmentWaLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(appointmentMessage)}`;

  const deliveryMessage = `Merhaba ${greetingName}, yeni döneme ait içerik metinlerinize linki tıklayarak ulaşabilirsiniz:\n\n${fileLink}${
    loomLink ? `\n\nAçıklama videosu:\n${loomLink}` : ""
  }`;
  const deliveryWaLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(deliveryMessage)}`;

  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <button
        onClick={back}
        className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium"
        style={{ color: inkSoft }}
      >
        <ChevronLeft size={16} />
        Öğrencilerime dön
      </button>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar initials={student.avatar} size={56} />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[22px] font-semibold" style={{ color: ink }}>
                {student.name}
              </h1>
              <Badge month={student.monthNumber} />
            </div>
            <p className="mt-0.5 text-[14px]" style={{ color: inkSoft }}>
              {student.handle} · {student.niche}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <GhostButton icon={Pencil} onClick={() => setShowEditModal(true)}>
            Düzenle
          </GhostButton>
          <button
            onClick={() => {
              if (window.confirm(`${student.name} adlı öğrenciyi silmek istediğine emin misin? Bu işlem geri alınamaz.`)) {
                onDeleteStudent(student.id);
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-black/[0.03]"
            style={{ border: `1px solid ${line}`, color: "#B3453A" }}
          >
            <Trash2 size={16} />
            Sil
          </button>
          <GhostButton icon={Phone}>{student.phone}</GhostButton>
          <GhostButton icon={Mail}>{student.email}</GhostButton>
          {whatsappPhone ? (
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
          ) : (
            <button
              disabled
              title="Önce bu öğrencinin telefon numarasını 'Düzenle' ile ekle"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-white opacity-40"
              style={{ background: green }}
            >
              <MessageCircle size={16} />
              Randevu iste (telefon eksik)
            </button>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditStudentModal
          student={student}
          onClose={() => setShowEditModal(false)}
          onSave={(updates) => {
            onUpdateStudent(student.id, updates);
            setShowEditModal(false);
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
        <div className="flex flex-col gap-5">
          <MeetingNotesHistory studentId={student.id} />

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
                Dosya linki (Google Drive/Docs vb.)
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <ExternalLink size={15} style={{ color: inkSoft }} />
                <input
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-transparent text-[13.5px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

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

            {fileLink ? (
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
          <ContentDeliveryDate student={student} onUpdateStudent={onUpdateStudent} />

          <Card>
            <SectionTitle>Belgeler</SectionTitle>
            <p className="mb-3 text-[12.5px] leading-relaxed" style={{ color: inkSoft }}>
              Bu öğrenciyle ilgili detaylı notları/raporu tuttuğun Google Docs belgesinin linkini buraya yapıştır —
              her seferinde arayıp bulmak yerine tek tıkla açarsın.
            </p>
            {student.docLink && editingDoc !== true ? (
              <>
                <a
                  href={student.docLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-3.5 py-3 text-[14px] font-medium transition-colors hover:bg-black/[0.03]"
                  style={{ border: `1px solid ${line}`, color: ink }}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText size={16} style={{ color: accent }} />
                    Google Docs belgesini aç
                  </span>
                  <ExternalLink size={14} style={{ color: inkSoft }} />
                </a>
                <button
                  onClick={() => setEditingDoc(true)}
                  className="mt-2 text-[12.5px] font-medium"
                  style={{ color: accent }}
                >
                  Linki değiştir
                </button>
              </>
            ) : (
              <DocLinkEditor
                student={student}
                onUpdateStudent={onUpdateStudent}
                onDone={() => setEditingDoc(false)}
              />
            )}
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
              <Badge month={student.monthNumber} />
            </div>
            {(() => {
              const last = payments.filter((p) => p.studentId === student.id).sort((a, b) =>
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
function formatEventDateTime(iso, allDay) {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "short" });
  if (allDay) return dateStr;
  const timeStr = d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  return `${dateStr} · ${timeStr}`;
}

function getCalendarWeek() {
  const now = new Date();
  const day = now.getDay(); // 0=Paz, 1=Pzt, ... 6=Cmt
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

function CalendarPage({ students, tasksByPeriod, setTasksByPeriod, scheduledTasks, setScheduledTasks }) {
  const [showPlanner, setShowPlanner] = useState(false);
  const [range, setRange] = useState("week"); // "week" | "all"
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(null); // null = henüz bilinmiyor
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchError(false);
    fetch(`/api/calendar/events?range=${range}`)
      .then((r) => r.json())
      .then((d) => {
        setConnected(d.connected);
        setEvents(d.events || []);
        setFetchError(!!d.error);
      })
      .catch(() => {
        setConnected(false);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, [range]);

  const weekDays = getCalendarWeek();
  const eventsByDay = weekDays.map((day) =>
    events.filter((ev) => new Date(ev.start).toDateString() === day.toDateString())
  );

  return (
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
            Takvim & Randevular
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
            Google Calendar'ından canlı çekiliyor
          </p>
        </div>
        <PrimaryButton icon={ListChecks} onClick={() => setShowPlanner((v) => !v)}>
          {showPlanner ? "İş planlayıcıyı gizle" : "İş planlayıcıyı göster"}
        </PrimaryButton>
      </div>

      <Card padded={false}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Yaklaşan randevular
          </p>
          <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: canvas }}>
            {[
              { id: "week", label: "7 Gün" },
              { id: "all", label: "Tüm Randevular" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className="rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors"
                style={{
                  background: range === r.id ? "#fff" : "transparent",
                  color: range === r.id ? ink : inkSoft,
                  boxShadow: range === r.id ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Yükleniyor...
            </p>
          ) : connected === false ? (
            <div className="px-6 py-8 text-center">
              <p className="text-[13.5px] font-medium" style={{ color: ink }}>
                Google Calendar bağlı değil
              </p>
              <p className="mt-1 text-[12.5px]" style={{ color: inkSoft }}>
                Randevularını burada görebilmek için Ayarlar sayfasından Google Calendar'ı bağla.
              </p>
            </div>
          ) : fetchError ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: "#B3453A" }}>
              Randevular çekilirken bir sorun oluştu, sayfayı yenilemeyi dener misin?
            </p>
          ) : range === "week" ? (
            <div className="overflow-x-auto px-6 pb-6">
              <div className="grid min-w-[700px] grid-cols-7 gap-2">
                {weekDays.map((day, i) => (
                  <div key={i}>
                    <div className="mb-2 text-center">
                      <p className="text-[11.5px] font-medium uppercase" style={{ color: inkSoft }}>
                        {day.toLocaleDateString("tr-TR", { weekday: "short" })}
                      </p>
                      <p
                        className="mx-auto mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold"
                        style={{
                          background: day.toDateString() === new Date().toDateString() ? accent : "transparent",
                          color: day.toDateString() === new Date().toDateString() ? "#fff" : ink,
                        }}
                      >
                        {day.getDate()}
                      </p>
                    </div>
                    <div className="flex min-h-[120px] flex-col gap-1.5 rounded-lg p-1.5" style={{ background: canvas }}>
                      {eventsByDay[i].length === 0 ? (
                        <p className="pt-2 text-center text-[11px]" style={{ color: inkSoft }}>
                          —
                        </p>
                      ) : (
                        eventsByDay[i].map((ev) => (
                          <a
                            key={ev.id}
                            href={ev.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg px-2 py-1.5 text-[11px] leading-tight transition-opacity hover:opacity-80"
                            style={{ background: accentSoft, color: accent }}
                          >
                            <p className="font-semibold">
                              {ev.allDay
                                ? "Tüm gün"
                                : new Date(ev.start).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            <p className="truncate">{ev.title}</p>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : events.length === 0 ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Bu aralıkta planlı randevu yok.
            </p>
          ) : (
            events.map((ev, i) => (
              <a
                key={ev.id}
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-black/[0.02]"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
              >
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium" style={{ color: ink }}>
                    {ev.title}
                  </p>
                  <p className="text-[12px]" style={{ color: inkSoft }}>
                    {formatEventDateTime(ev.start, ev.allDay)}
                  </p>
                </div>
                <ExternalLink size={14} className="shrink-0" style={{ color: inkSoft }} />
              </a>
            ))
          )}
        </div>
      </Card>

      {showPlanner && (
        <div className="mt-6">
          <WorkPlanner students={students} tasksByPeriod={tasksByPeriod} setTasksByPeriod={setTasksByPeriod} scheduledTasks={scheduledTasks} setScheduledTasks={setScheduledTasks} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Ödeme tarihi yardımcıları — havale/EFT sonrası 30 gün üzerinden
   bir sonraki yenileme tarihi hesaplanır
--------------------------------------------------------- */
const TODAY_ISO = new Date().toISOString().slice(0, 10);
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

/* ---------------------------------------------------------
   Finans — bu ay tahsil edilen / edilecek, gelecek ay tahmini
--------------------------------------------------------- */
function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}

function shiftMonthKey(key, delta) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS_TR[m - 1]} ${y}`;
}

function FinansPage({ payments }) {
  const currentMonthKey = monthKey(TODAY_ISO);
  const nextMonthKey = shiftMonthKey(currentMonthKey, 1);

  const collectedThisMonth = payments.filter((p) => monthKey(p.date) === currentMonthKey);
  const collectedTotal = collectedThisMonth.reduce((s, p) => s + p.amount, 0);

  // Her öğrencinin en son ödemesi — nextDate'i bir sonraki beklenen tahsilat
  const latestPerStudent = Object.values(
    payments.reduce((acc, p) => {
      if (!acc[p.studentId] || acc[p.studentId].date < p.date) acc[p.studentId] = p;
      return acc;
    }, {})
  );

  const dueThisMonth = latestPerStudent.filter((p) => monthKey(p.nextDate) === currentMonthKey);
  const dueTotal = dueThisMonth.reduce((s, p) => s + p.amount, 0);

  const dueNextMonth = latestPerStudent.filter((p) => monthKey(p.nextDate) === nextMonthKey);
  const nextMonthTotal = dueNextMonth.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] font-semibold" style={{ color: ink }}>
          Finans
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
          {monthLabel(currentMonthKey)} ayına göre tahsilat özeti
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden">
          <p className="text-[13px]" style={{ color: inkSoft }}>
            Bu ay tahsil edilen
          </p>
          <p className="mt-2 text-[26px] font-semibold" style={{ color: ink }}>
            ₺{collectedTotal.toLocaleString("tr-TR")}
          </p>
          <p className="mt-1 text-[12.5px] font-medium" style={{ color: green }}>
            {collectedThisMonth.length} ödeme
          </p>
        </Card>
        <Card className="relative overflow-hidden">
          <p className="text-[13px]" style={{ color: inkSoft }}>
            Bu ay tahsil edilecek
          </p>
          <p className="mt-2 text-[26px] font-semibold" style={{ color: ink }}>
            ₺{dueTotal.toLocaleString("tr-TR")}
          </p>
          <p className="mt-1 text-[12.5px] font-medium" style={{ color: gold }}>
            {dueThisMonth.length} öğrenciden bekleniyor
          </p>
        </Card>
        <Card className="relative overflow-hidden">
          <p className="text-[13px]" style={{ color: inkSoft }}>
            {monthLabel(nextMonthKey)} tahmini gelir
          </p>
          <p className="mt-2 text-[26px] font-semibold" style={{ color: ink }}>
            ₺{nextMonthTotal.toLocaleString("tr-TR")}
          </p>
          <p className="mt-1 text-[12.5px] font-medium" style={{ color: accent }}>
            {dueNextMonth.length} öğrenciden bekleniyor
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <p className="mb-3 text-[14.5px] font-semibold" style={{ color: ink }}>
            Bu ay tahsil edilenler
          </p>
          <Card padded={false}>
            {collectedThisMonth.length === 0 ? (
              <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
                Bu ay henüz tahsilat yok.
              </p>
            ) : (
              collectedThisMonth.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-6 py-3.5"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
                >
                  <div>
                    <p className="text-[13.5px] font-medium" style={{ color: ink }}>
                      {p.studentName}
                    </p>
                    <p className="text-[12px]" style={{ color: inkSoft }}>
                      {formatTRDate(p.date)}
                    </p>
                  </div>
                  <span className="text-[13.5px] font-semibold" style={{ color: green }}>
                    ₺{p.amount.toLocaleString("tr-TR")}
                  </span>
                </div>
              ))
            )}
          </Card>
        </div>

        <div>
          <p className="mb-3 text-[14.5px] font-semibold" style={{ color: ink }}>
            Bu ay tahsil edilecekler
          </p>
          <Card padded={false}>
            {dueThisMonth.length === 0 ? (
              <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
                Bu ay için bekleyen tahsilat yok.
              </p>
            ) : (
              dueThisMonth.map((p, i) => {
                const tone = renewalTone(daysUntil(p.nextDate));
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between px-6 py-3.5"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${line}` }}
                  >
                    <div>
                      <p className="text-[13.5px] font-medium" style={{ color: ink }}>
                        {p.studentName}
                      </p>
                      <p className="text-[12px]" style={{ color: inkSoft }}>
                        {formatTRDate(p.nextDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-1 text-[11px] font-medium"
                        style={{ background: tone.bg, color: tone.color }}
                      >
                        {tone.label}
                      </span>
                      <span className="text-[13.5px] font-semibold" style={{ color: gold }}>
                        ₺{p.amount.toLocaleString("tr-TR")}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function PaymentsPage({ students, payments, onAddPayment, showToast }) {
  const [studentId, setStudentId] = useState(String(students[0]?.id || ""));
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(TODAY_ISO);
  const [note, setNote] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const latestPerStudent = students.map((s) => {
    const studentPayments = payments.filter((p) => p.studentId === s.id).sort((a, b) => (a.date < b.date ? 1 : -1));
    return { student: s, payment: studentPayments[0] || null };
  });

  const upcoming = latestPerStudent
    .filter((x) => x.payment)
    .map((x) => ({ ...x, days: daysUntil(x.payment.nextDate) }))
    .sort((a, b) => a.days - b.days);

  const filteredPayments = payments.filter((p) => {
    if (fromDate && p.date < fromDate) return false;
    if (toDate && p.date > toDate) return false;
    return true;
  });

  const handleAddPayment = async () => {
    const student = students.find((s) => s.id === Number(studentId));
    if (!student || !amount || !date) return;
    const nextDate = addDaysISO(date, 30);
    const saved = await onAddPayment({
      studentId: student.id,
      studentName: student.name,
      amount: Number(amount),
      date,
      note,
      nextDate,
    });
    if (!saved) return;
    setNote("");
    setAmount("");
    showToast?.(
      "Ödeme kaydedildi",
      `${student.name} için ${formatTRDate(date)} tarihli ödeme eklendi. Sonraki yenileme: ${formatTRDate(nextDate)}.`
    );
  };

  return (
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
              {students.map((s) => (
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
              placeholder="Örn. 4500"
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
          <PrimaryButton icon={Plus} onClick={handleAddPayment}>
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
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14.5px] font-semibold" style={{ color: ink }}>
            Ödeme geçmişi
          </p>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-lg px-2.5 py-1.5 text-[12.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
            <span className="text-[12.5px]" style={{ color: inkSoft }}>
              —
            </span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-lg px-2.5 py-1.5 text-[12.5px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
            {(fromDate || toDate) && (
              <button
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                }}
                className="text-[12.5px] font-medium"
                style={{ color: accent }}
              >
                Temizle
              </button>
            )}
          </div>
        </div>
        <Card padded={false}>
          {filteredPayments.length === 0 ? (
            <p className="px-6 py-8 text-center text-[13.5px]" style={{ color: inkSoft }}>
              Seçilen tarih aralığında ödeme kaydı yok.
            </p>
          ) : (
            filteredPayments.map((p, i) => (
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
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

function SettingsPage({ showToast }) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [googleStatus, setGoogleStatus] = useState("checking"); // checking | connected | disconnected | connecting

  useEffect(() => {
    // Google'dan geri dönüşte URL'deki ?google= parametresini kontrol et
    const params = new URLSearchParams(window.location.search);
    const result = params.get("google");
    if (result === "connected") {
      showToast("Bağlantı kuruldu", "Google Calendar ve Docs başarıyla bağlandı.");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (result === "error") {
      showToast("Bağlantı başarısız", "Google bağlantısı kurulamadı, tekrar dener misin?");
      window.history.replaceState({}, "", window.location.pathname);
    }

    fetch("/api/auth/google/status")
      .then((r) => r.json())
      .then((d) => setGoogleStatus(d.connected ? "connected" : "disconnected"))
      .catch(() => setGoogleStatus("disconnected"));
  }, []);

  const connectGoogle = () => {
    setGoogleStatus("connecting");
    window.location.href = "/api/auth/google";
  };

  const disconnectGoogle = async () => {
    setGoogleStatus("connecting");
    try {
      await fetch("/api/auth/google/disconnect", { method: "POST" });
      setGoogleStatus("disconnected");
      showToast("Bağlantı kesildi", "Google Calendar ve Docs bağlantısı kaldırıldı.");
    } catch (e) {
      setGoogleStatus("connected");
      showToast("Hata", "Bağlantı kesilirken bir sorun oluştu.");
    }
  };

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
    <div className="mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10 py-6 md:py-10">
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
        {["Google Calendar bağlantısı", "Google Docs bağlantısı"].map((label) => {
          const status = googleStatus;
          return (
            <Card key={label} className="flex items-center justify-between !py-4">
              <p className="text-[14px] font-medium" style={{ color: ink }}>
                {label}
              </p>
              {status === "connected" ? (
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[12.5px] font-medium"
                    style={{ background: greenSoft, color: green }}
                  >
                    Bağlı
                  </span>
                  <button
                    onClick={disconnectGoogle}
                    className="text-[12.5px] font-medium"
                    style={{ color: inkSoft }}
                  >
                    Bağlantıyı kes
                  </button>
                </div>
              ) : status === "connecting" || status === "checking" ? (
                <span
                  className="rounded-full px-2.5 py-1 text-[12.5px] font-medium"
                  style={{ background: goldSoft, color: gold }}
                >
                  {status === "checking" ? "Kontrol ediliyor..." : "Bağlanıyor..."}
                </span>
              ) : (
                <button
                  onClick={connectGoogle}
                  className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-white"
                  style={{ background: accent }}
                >
                  Bağlan
                </button>
              )}
            </Card>
          );
        })}
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
      className="fixed right-4 left-4 top-4 z-50 w-auto sm:left-auto sm:w-[340px] rounded-2xl bg-white p-4"
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
   Supabase <-> JS veri eşleme yardımcıları (students, payments)
--------------------------------------------------------- */
const STUDENT_FIELD_MAP = {
  name: "name",
  handle: "handle",
  monthNumber: "month_number",
  gender: "gender",
  avatar: "avatar",
  phone: "phone",
  email: "email",
  niche: "niche",
  nextCall: "next_call",
  nextDeliveryDate: "next_delivery_date",
  notes: "notes",
  docLink: "doc_link",
};

function studentToDb(s) {
  const out = {};
  for (const [jsKey, dbKey] of Object.entries(STUDENT_FIELD_MAP)) {
    if (s[jsKey] !== undefined) out[dbKey] = s[jsKey] === "" ? null : s[jsKey];
  }
  return out;
}

function dbToStudent(row) {
  const out = { id: row.id };
  for (const [jsKey, dbKey] of Object.entries(STUDENT_FIELD_MAP)) {
    out[jsKey] = row[dbKey];
  }
  return out;
}

const PAYMENT_FIELD_MAP = {
  studentId: "student_id",
  studentName: "student_name",
  amount: "amount",
  date: "date",
  nextDate: "next_date",
  note: "note",
};

function paymentToDb(p) {
  const out = {};
  for (const [jsKey, dbKey] of Object.entries(PAYMENT_FIELD_MAP)) {
    if (p[jsKey] !== undefined) out[dbKey] = p[jsKey] === "" ? null : p[jsKey];
  }
  return out;
}

function dbToPayment(row) {
  const out = { id: row.id };
  for (const [jsKey, dbKey] of Object.entries(PAYMENT_FIELD_MAP)) {
    out[jsKey] = row[dbKey];
  }
  return out;
}

const NOTE_FIELD_MAP = {
  studentId: "student_id",
  date: "session_date",
  label: "session_label",
  discussed: "discussed",
  problems: "problems",
  nextSteps: "next_steps",
};

function noteToDb(n) {
  const out = {};
  for (const [jsKey, dbKey] of Object.entries(NOTE_FIELD_MAP)) {
    if (n[jsKey] !== undefined) out[dbKey] = n[jsKey] === "" ? null : n[jsKey];
  }
  return out;
}

function dbToNote(row) {
  const out = { id: row.id };
  for (const [jsKey, dbKey] of Object.entries(NOTE_FIELD_MAP)) {
    out[jsKey] = row[dbKey];
  }
  return out;
}

function templateToDb(t) {
  const out = {};
  if (t.title !== undefined) out.title = t.title;
  if (t.text !== undefined) out.body = t.text;
  return out;
}

function dbToTemplate(row) {
  return { id: row.id, title: row.title, text: row.body };
}

function dbToPlannerTask(row) {
  return { id: row.id, title: row.title, minutes: row.minutes, done: row.done, time: row.task_time || "" };
}

function dbToScheduledTask(row) {
  return {
    id: row.id,
    title: row.title,
    minutes: row.minutes,
    done: row.done,
    studentId: row.student_id,
    studentName: row.student_name,
    dueDate: row.due_date,
  };
}

/* ---------------------------------------------------------
   Root app
--------------------------------------------------------- */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [tasksByPeriod, setTasksByPeriod] = useState({ day: [], week: [], month: [] });
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setCheckingSession(false);
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    setDataLoading(true);
    Promise.all([
      supabase.from("students").select("*").order("id", { ascending: true }),
      supabase.from("payments").select("*").order("date", { ascending: false }),
      supabase.from("planner_tasks").select("*").order("id", { ascending: true }),
      supabase.from("scheduled_tasks").select("*").order("due_date", { ascending: true }),
    ]).then(([studentsRes, paymentsRes, plannerRes, schedRes]) => {
      if (!studentsRes.error && studentsRes.data) setStudents(studentsRes.data.map(dbToStudent));
      if (!paymentsRes.error && paymentsRes.data) setPayments(paymentsRes.data.map(dbToPayment));
      if (!plannerRes.error && plannerRes.data) {
        const grouped = { day: [], week: [], month: [] };
        plannerRes.data.forEach((row) => {
          if (grouped[row.period]) grouped[row.period].push(dbToPlannerTask(row));
        });
        setTasksByPeriod(grouped);
      }
      if (!schedRes.error && schedRes.data) setScheduledTasks(schedRes.data.map(dbToScheduledTask));
      setDataLoading(false);
    });
  }, [isAuthenticated]);

  const showToast = (title, body) => setToast({ title, body });

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || null;

  const openStudent = (s) => {
    setSelectedStudentId(s.id);
    setPage("student-detail");
  };

  const addStudent = async (formData) => {
    const { id, ...rest } = formData;
    const { data, error } = await supabase.from("students").insert(studentToDb(rest)).select().single();
    if (error) {
      showToast("Kaydedilemedi", "Öğrenci eklenirken bir sorun oluştu.");
      return;
    }
    setStudents((prev) => [dbToStudent(data), ...prev]);
  };

  const updateStudent = async (id, updates) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    const { error } = await supabase.from("students").update(studentToDb(updates)).eq("id", id);
    if (error) showToast("Kaydedilemedi", "Değişiklik veritabanına yazılamadı.");
  };

  const deleteStudent = async (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelectedStudentId(null);
    setPage("students");
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) showToast("Silinemedi", "Öğrenci veritabanından silinemedi.");
  };

  const addPayment = async (paymentData) => {
    const { data, error } = await supabase.from("payments").insert(paymentToDb(paymentData)).select().single();
    if (error) {
      showToast("Kaydedilemedi", "Ödeme kaydedilirken bir sorun oluştu.");
      return null;
    }
    const saved = dbToPayment(data);
    setPayments((prev) => [saved, ...prev]);
    return saved;
  };

  const setActive = (id) => {
    setSelectedStudentId(null);
    setPage(id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPage("dashboard");
    setSelectedStudentId(null);
  };

  if (checkingSession) {
    return (
      <div className="flex h-screen w-full items-center justify-center font-sans" style={{ background: canvas }}>
        <p className="text-[14px]" style={{ color: inkSoft }}>
          Yükleniyor...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  if (dataLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center font-sans" style={{ background: canvas }}>
        <p className="text-[14px]" style={{ color: inkSoft }}>
          Veriler yükleniyor...
        </p>
      </div>
    );
  }

  const activeNavId = page === "student-detail" ? "students" : page;

  let content;
  if (page === "dashboard")
    content = (
      <Dashboard
        students={students}
        payments={payments}
        tasksByPeriod={tasksByPeriod}
        setTasksByPeriod={setTasksByPeriod}
        scheduledTasks={scheduledTasks}
        setScheduledTasks={setScheduledTasks}
        openStudent={openStudent}
        showToast={showToast}
      />
    );
  else if (page === "students")
    content = <StudentsPage students={students} addStudent={addStudent} openStudent={openStudent} />;
  else if (page === "student-detail")
    content = (
      <StudentDetail
        student={selectedStudent}
        payments={payments}
        onUpdateStudent={updateStudent}
        onDeleteStudent={deleteStudent}
        back={() => setPage("students")}
      />
    );
  else if (page === "calendar")
    content = (
      <CalendarPage
        students={students}
        tasksByPeriod={tasksByPeriod}
        setTasksByPeriod={setTasksByPeriod}
        scheduledTasks={scheduledTasks}
        setScheduledTasks={setScheduledTasks}
      />
    );
  else if (page === "payments")
    content = <PaymentsPage students={students} payments={payments} onAddPayment={addPayment} showToast={showToast} />;
  else if (page === "finans") content = <FinansPage payments={payments} />;
  else if (page === "settings") content = <SettingsPage showToast={showToast} />;

  return (
    <div className="flex h-screen w-full flex-col font-sans md:flex-row" style={{ background: canvas }}>
      {/* Mobil üst bar */}
      <div
        className="flex items-center justify-between px-4 py-3 md:hidden"
        style={{ background: "#fff", borderBottom: `1px solid ${line}` }}
      >
        <img src={LOGO_DATA_URI} alt="Lemi Önen" className="h-7 w-auto" />
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ color: ink }}
        >
          <MenuIcon size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(31,27,29,0.4)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 md:relative md:z-auto ${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Sidebar
          active={activeNavId}
          setActive={(id) => {
            setActive(id);
            setMobileMenuOpen(false);
          }}
          onLogout={handleLogout}
        />
      </div>

      <main className="flex-1 overflow-y-auto">{content}</main>
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
