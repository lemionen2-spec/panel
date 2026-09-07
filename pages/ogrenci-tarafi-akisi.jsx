import React, { useState } from "react";
import {
  Sparkles,
  Target,
  Users,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Lock,
  CreditCard,
  Mail,
  ShieldCheck,
  Download,
  Video,
  BarChart3,
  MessageSquareText,
  Check,
  Star,
  Clock,
  ClipboardList,
  Eye,
  EyeOff,
  ListChecks,
  CalendarClock,
  ArrowLeft,
} from "lucide-react";

/* ---------------------------------------------------------
   Shared palette — matches the admin panel
--------------------------------------------------------- */
const ink = "#1C1C1E";
const inkSoft = "#78766F";
const line = "#E8E7E2";
const canvas = "#F8F7F4";
const accent = "#4338CA";
const accentSoft = "#EEEEFB";
const gold = "#B8862B";
const goldSoft = "#FBF3E3";
const green = "#2F8F4E";
const greenSoft = "#EAF6EE";

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function Card({ children, className = "", padded = true }) {
  return (
    <div
      className={`rounded-2xl bg-white ${padded ? "p-6" : ""} ${className}`}
      style={{ border: `1px solid ${line}` }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, icon: Icon, onClick, full = false, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14.5px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 ${
        full ? "w-full" : ""
      }`}
      style={{ background: accent }}
    >
      {children}
      {Icon && <Icon size={16} />}
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

/* ===========================================================
   1) LANDING / PROGRAM TANITIM SAYFASI
=========================================================== */
function LandingPage({ goToPayment }) {
  const features = [
    {
      icon: Users,
      title: "Birebir koçluk görüşmeleri",
      desc: "Her hafta planlanan görüşmelerle hesabın birlikte analiz edilir, sonraki adımlar netleştirilir.",
    },
    {
      icon: BarChart3,
      title: "Aylık performans raporları",
      desc: "Büyüme, etkileşim ve içerik performansı; anlaşılır ve uygulanabilir raporlarla elinde.",
    },
    {
      icon: Sparkles,
      title: "AI destekli içerik stratejisi",
      desc: "Markana özel üretilen içerik fikirleri ve gönderi planlarıyla asla boş takvimle kalmazsın.",
    },
    {
      icon: MessageSquareText,
      title: "Özel destek hattı",
      desc: "Görüşmeler arasında aklına takılan her şey için doğrudan WhatsApp üzerinden ulaşabilirsin.",
    },
  ];

  const included = [
    "Haftalık 1 birebir görüşme (45 dk)",
    "Aylık performans & büyüme raporu",
    "AI destekli içerik planı",
    "WhatsApp üzerinden öncelikli destek",
    "İlk ay detaylı marka analiz formu",
  ];

  return (
    <div className="mx-auto max-w-[880px] px-8 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div
          className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium"
          style={{ background: accentSoft, color: accent }}
        >
          <Star size={13} />
          Sıfırdan Zirveye Koçluk Programı
        </div>
        <h1 className="text-[38px] font-semibold leading-[1.15]" style={{ color: ink }}>
          Instagram'da kişisel markanı
          <br />
          gerçek bir stratejiyle büyüt
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-relaxed" style={{ color: inkSoft }}>
          Rastgele içerik üretmeyi bırak. Her hafta birebir görüşmeler, kişiye özel raporlar ve
          AI destekli içerik planıyla markanı adım adım inşa et.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <PrimaryButton icon={ArrowRight} onClick={goToPayment}>
            Koçluk programına katıl
          </PrimaryButton>
        </div>
        <p className="mt-4 text-[13px]" style={{ color: inkSoft }}>
          500+ öğrenci · ortalama 4 ayda belirgin büyüme
        </p>
      </div>

      {/* Features */}
      <div className="mb-16 grid grid-cols-2 gap-4">
        {features.map((f) => (
          <Card key={f.title}>
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: accentSoft }}
            >
              <f.icon size={18} style={{ color: accent }} />
            </div>
            <p className="text-[15px] font-semibold" style={{ color: ink }}>
              {f.title}
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: inkSoft }}>
              {f.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <div className="mx-auto max-w-[420px]">
        <Card className="!p-8" >
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[15px] font-semibold" style={{ color: ink }}>
              Aylık Üyelik
            </p>
            <span
              className="rounded-full px-2.5 py-1 text-[12px] font-medium"
              style={{ background: goldSoft, color: gold }}
            >
              İstediğin zaman iptal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[38px] font-semibold" style={{ color: ink }}>
              ₺4.500
            </span>
            <span className="text-[14px]" style={{ color: inkSoft }}>
              / ay
            </span>
          </div>

          <div className="my-6" style={{ borderTop: `1px solid ${line}` }} />

          <div className="flex flex-col gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={17} style={{ color: green }} className="mt-[1px] shrink-0" />
                <span className="text-[14px]" style={{ color: ink }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <PrimaryButton full icon={ArrowRight} onClick={goToPayment}>
              Koçluk programına katıl / satın al
            </PrimaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ===========================================================
   ÖĞRENCİ GİRİŞİ (e-posta / şifre + şifremi unuttum)
=========================================================== */
const STUDENT_DEMO_CREDENTIALS = { email: "elif@ornek.com", password: "demo1234" };

function StudentLogin({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | forgot | sent
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fillDemo = () => {
    setEmail(STUDENT_DEMO_CREDENTIALS.email);
    setPassword(STUDENT_DEMO_CREDENTIALS.password);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("E-posta ve şifre alanları zorunludur.");
      return;
    }
    setError("");
    onLogin();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Sıfırlama linki için e-posta adresini gir.");
      return;
    }
    setError("");
    setMode("sent");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[380px] flex-col justify-center px-8 py-16">
      <div className="mb-7 flex flex-col items-center text-center">
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-[16px] font-bold text-white"
          style={{ background: accent }}
        >
          Y
        </div>
        <p className="text-[14px] font-semibold" style={{ color: ink }}>
          Sıfırdan Zirveye
        </p>
        <p className="text-[12.5px]" style={{ color: inkSoft }}>
          Öğrenci Paneli
        </p>
      </div>

      <Card className="!p-7">
        {mode === "sent" ? (
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: greenSoft }}
            >
              <Check size={22} style={{ color: green }} />
            </div>
            <p className="text-[16px] font-semibold" style={{ color: ink }}>
              Sıfırlama linki gönderildi
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: inkSoft }}>
              {email} adresine yeni bir şifre belirlemen için bir bağlantı gönderdik.
            </p>
            <button
              onClick={() => setMode("login")}
              className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium"
              style={{ color: accent }}
            >
              <ArrowLeft size={14} />
              Girişe dön
            </button>
          </div>
        ) : mode === "forgot" ? (
          <>
            <h1 className="text-[19px] font-semibold" style={{ color: ink }}>
              Şifreni sıfırla
            </h1>
            <p className="mt-1 text-[13.5px]" style={{ color: inkSoft }}>
              E-posta adresine bir sıfırlama bağlantısı gönderelim
            </p>
            <form onSubmit={handleForgotSubmit} className="mt-5 flex flex-col gap-4">
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
              {error && (
                <p className="rounded-lg px-3 py-2 text-[12.5px]" style={{ background: "#F4E7E5", color: "#B3453A" }}>
                  {error}
                </p>
              )}
              <PrimaryButton type="submit" full>Sıfırlama linki gönder</PrimaryButton>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium"
                style={{ color: inkSoft }}
              >
                <ArrowLeft size={13} />
                Girişe dön
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-[19px] font-semibold" style={{ color: ink }}>
              Tekrar hoş geldin
            </h1>
            <p className="mt-1 text-[13.5px]" style={{ color: inkSoft }}>
              Panelin için giriş yap
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-[13px] font-medium"
                  style={{ color: accent }}
                >
                  Şifremi unuttum
                </button>
              </div>
              <PrimaryButton type="submit" full>Giriş yap</PrimaryButton>
              <button
                type="button"
                onClick={fillDemo}
                className="text-center text-[12.5px] font-medium"
                style={{ color: inkSoft }}
              >
                Demo giriş bilgileriyle doldur
              </button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

/* ===========================================================
   2) ÖDEME SAYFASI (Stripe Checkout görünümü)
=========================================================== */
function PaymentPage({ goToDashboard }) {
  const [status, setStatus] = useState("idle"); // idle | processing | success
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "", email: "" });

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => setStatus("success"), 1100);
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-[480px] flex-col items-center px-8 py-24 text-center">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: greenSoft }}
        >
          <Check size={28} style={{ color: green }} />
        </div>
        <h1 className="text-[22px] font-semibold" style={{ color: ink }}>
          Ödeme başarılı
        </h1>
        <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: inkSoft }}>
          Sıfırdan Zirveye programına hoş geldin. Şimdi seni tanıyabilmemiz için kısa
          bir marka analiz formu dolduracaksın.
        </p>
        <div className="mt-7 w-full">
          <PrimaryButton full icon={ArrowRight} onClick={goToDashboard}>
            Analiz formuna git
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[880px] grid-cols-[1fr_1.15fr] gap-6 px-8 py-16">
      {/* Order summary */}
      <div>
        <p className="mb-4 text-[13px] font-medium" style={{ color: inkSoft }}>
          Sipariş özeti
        </p>
        <Card>
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Sıfırdan Zirveye — Aylık Üyelik
          </p>
          <p className="mt-1 text-[13px]" style={{ color: inkSoft }}>
            Her ay otomatik yenilenir, istediğin zaman iptal edebilirsin.
          </p>
          <div className="my-5" style={{ borderTop: `1px solid ${line}` }} />
          <div className="flex items-center justify-between text-[14px]">
            <span style={{ color: inkSoft }}>Aylık ücret</span>
            <span className="font-medium" style={{ color: ink }}>
              ₺4.500,00
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[14px]">
            <span style={{ color: inkSoft }}>KDV</span>
            <span className="font-medium" style={{ color: ink }}>
              Dahil
            </span>
          </div>
          <div className="my-5" style={{ borderTop: `1px solid ${line}` }} />
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold" style={{ color: ink }}>
              Bugün ödenecek
            </span>
            <span className="text-[19px] font-semibold" style={{ color: ink }}>
              ₺4.500,00
            </span>
          </div>
        </Card>

        <div className="mt-4 flex items-center gap-2 px-1 text-[12.5px]" style={{ color: inkSoft }}>
          <ShieldCheck size={14} />
          Ödeme bilgilerin Stripe altyapısıyla şifrelenerek işlenir.
        </div>
      </div>

      {/* Card form */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[13px] font-medium" style={{ color: inkSoft }}>
            Ödeme bilgileri
          </p>
          <div className="flex items-center gap-1.5 text-[12.5px]" style={{ color: inkSoft }}>
            <Lock size={12} />
            Stripe ile güvenli ödeme
          </div>
        </div>

        <Card>
          <div className="flex flex-col gap-4">
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
                  value={card.email}
                  onChange={(e) => setCard({ ...card, email: e.target.value })}
                  placeholder="ornek@eposta.com"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                Kart üzerindeki isim
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <input
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  placeholder="Ad Soyad"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                Kart numarası
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ border: `1px solid ${line}`, background: canvas }}
              >
                <CreditCard size={15} style={{ color: inkSoft }} />
                <input
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  placeholder="4242 4242 4242 4242"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: ink }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                  Son kullanma
                </label>
                <div
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                  style={{ border: `1px solid ${line}`, background: canvas }}
                >
                  <input
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    placeholder="AA / YY"
                    className="w-full bg-transparent text-[14px] outline-none"
                    style={{ color: ink }}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
                  CVC
                </label>
                <div
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                  style={{ border: `1px solid ${line}`, background: canvas }}
                >
                  <input
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                    placeholder="CVC"
                    className="w-full bg-transparent text-[14px] outline-none"
                    style={{ color: ink }}
                  />
                </div>
              </div>
            </div>

            <PrimaryButton full onClick={handlePay} disabled={status === "processing"}>
              {status === "processing" ? "İşleniyor..." : "₺4.500,00 öde"}
            </PrimaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ===========================================================
   3) ÖĞRENCİ ANA PANELİ
=========================================================== */
const FORM_STEPS = [
  {
    title: "Marka & sektör",
    fields: [
      { key: "brand", label: "Instagram kullanıcı adın", placeholder: "@kullaniciadi" },
      { key: "sector", label: "Sektörün / niş alanın", placeholder: "Örn. fitness koçluğu" },
    ],
  },
  {
    title: "Hedef kitle",
    fields: [
      { key: "audience", label: "Hedef kitleni tanımla", placeholder: "Yaş aralığı, ilgi alanları, konum..." },
      { key: "followers", label: "Mevcut takipçi sayın", placeholder: "Örn. 3.200" },
    ],
  },
  {
    title: "Hedefler",
    fields: [
      { key: "goal", label: "Bu programdan beklentin nedir?", placeholder: "Takipçi büyümesi, satış, iş birlikleri..." },
      { key: "monthlyGoal", label: "3 aylık hedefin", placeholder: "Örn. 10.000 takipçi, aylık 5 danışan" },
    ],
  },
];

function AnalysisForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [done, setDone] = useState(false);

  const isLast = step === FORM_STEPS.length - 1;

  const next = () => {
    if (isLast) {
      setDone(true);
      onComplete?.();
    } else {
      setStep((s) => s + 1);
    }
  };

  if (done) {
    return (
      <Card className="text-center !py-10">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: greenSoft }}
        >
          <Check size={22} style={{ color: green }} />
        </div>
        <p className="text-[16px] font-semibold" style={{ color: ink }}>
          Analiz formun alındı
        </p>
        <p className="mx-auto mt-1.5 max-w-[360px] text-[13.5px]" style={{ color: inkSoft }}>
          Cevapların incelendikten sonra ilk görüşme öncesinde sana özel strateji notlarıyla dönüş yapılacak.
        </p>
      </Card>
    );
  }

  return (
    <Card padded={false}>
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <p className="text-[13px] font-medium" style={{ color: accent }}>
            1. Ay · Marka analiz formu
          </p>
          <h3 className="mt-0.5 text-[17px] font-semibold" style={{ color: ink }}>
            {FORM_STEPS[step].title}
          </h3>
        </div>
        <span className="text-[13px]" style={{ color: inkSoft }}>
          {step + 1} / {FORM_STEPS.length}
        </span>
      </div>

      {/* progress */}
      <div className="mt-4 flex gap-1.5 px-6">
        {FORM_STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: i <= step ? accent : line }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 px-6 py-6">
        {FORM_STEPS[step].fields.map((f) => (
          <div key={f.key}>
            <label className="mb-1.5 block text-[13px] font-medium" style={{ color: ink }}>
              {f.label}
            </label>
            <input
              value={values[f.key] || ""}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none"
              style={{ border: `1px solid ${line}`, background: canvas, color: ink }}
            />
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderTop: `1px solid ${line}` }}
      >
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-[14px] font-medium disabled:opacity-30"
          style={{ color: inkSoft }}
        >
          <ChevronLeft size={16} />
          Geri
        </button>
        <PrimaryButton icon={isLast ? undefined : ChevronRight} onClick={next}>
          {isLast ? "Formu gönder" : "Devam et"}
        </PrimaryButton>
      </div>
    </Card>
  );
}

const REPORTS = [
  { name: "1. Ay Marka Analiz Raporu.pdf", date: "3 Eylül 2026", type: "PDF" },
  { name: "İçerik Planı — Eylül.docx", date: "3 Eylül 2026", type: "Word" },
];

/* Koçun tanımladığı ödevler — öğrenci tamamladıkça işaretler */
const DEFAULT_STUDENT_ACTIONS = [
  { id: 1, text: "3 rakip hesabı incele, ortak noktalarını not al", done: true },
  { id: 2, text: "Yeni profil fotoğrafı ve biyografi taslağını gönder", done: true },
  { id: 3, text: "Bu hafta en az 1 Reels'i belirlenen saatte paylaş", done: false },
  { id: 4, text: "Takipçilerden gelen 5 yorumu yanıtla", done: false },
];

function ActionChecklist() {
  const [actions, setActions] = useState(DEFAULT_STUDENT_ACTIONS);
  const toggle = (id) => setActions((a) => a.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const doneCount = actions.filter((a) => a.done).length;

  return (
    <Card padded={false}>
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold" style={{ color: ink }}>
            Aksiyonlarım & ödevlerim
          </p>
          <span className="text-[12.5px]" style={{ color: inkSoft }}>
            {doneCount}/{actions.length}
          </span>
        </div>
        <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
          Koçunun görüşme sonrası tanımladığı görevler
        </p>
      </div>
      <div className="mt-4">
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => toggle(a.id)}
            className="flex w-full items-center gap-3 px-6 py-3 text-left"
            style={{ borderTop: `1px solid ${line}` }}
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{ border: `1.5px solid ${a.done ? green : line}`, background: a.done ? green : "transparent" }}
            >
              {a.done && <Check size={12} style={{ color: "#fff" }} />}
            </span>
            <span
              className="text-[13.5px]"
              style={{ color: a.done ? inkSoft : ink, textDecoration: a.done ? "line-through" : "none" }}
            >
              {a.text}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function ContentDeliveryDate() {
  return (
    <Card>
      <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: inkSoft }}>
        <CalendarClock size={15} />
        Sonraki içerik teslim tarihi
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: accentSoft }}>
          <FileText size={18} style={{ color: accent }} />
        </div>
        <div>
          <p className="text-[14.5px] font-semibold" style={{ color: ink }}>
            5 Eylül 2026
          </p>
          <p className="text-[12.5px]" style={{ color: inkSoft }}>
            Yeni içerik paketin bu tarihte panelinde olacak
          </p>
        </div>
      </div>
    </Card>
  );
}

function StudentDashboard() {
  const [stage, setStage] = useState("1"); // "1" | "2plus" — demo toggle
  const [formDone, setFormDone] = useState(false);

  const currentMonth = stage === "1" ? 1 : 3;
  const totalMonths = 6;

  return (
    <div className="mx-auto max-w-[900px] px-8 py-14">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold" style={{ color: ink }}>
            Merhaba, Elif
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: inkSoft }}>
            Sıfırdan Zirveye programına hoş geldin.
          </p>
        </div>

        {/* demo toggle — lets you preview month-1 vs month-2+ behaviour */}
        <div className="flex items-center gap-1.5 rounded-xl p-1" style={{ background: canvas }}>
          {[
            { id: "1", label: "1. Ay" },
            { id: "2plus", label: "2. Ay+" },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => setStage(o.id)}
              className="rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors"
              style={{
                background: stage === o.id ? "#fff" : "transparent",
                color: stage === o.id ? ink : inkSoft,
                boxShadow: stage === o.id ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-medium" style={{ color: ink }}>
            Program ilerlemen
          </p>
          <span className="text-[13px]" style={{ color: inkSoft }}>
            {currentMonth}. ay / {totalMonths} ay
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: totalMonths }).map((_, i) => (
            <div
              key={i}
              className="h-2 flex-1 rounded-full"
              style={{ background: i < currentMonth ? accent : line }}
            />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-[1.4fr_1fr] gap-5">
        <div className="flex flex-col gap-5">
          {stage === "1" ? (
            <AnalysisForm onComplete={() => setFormDone(true)} />
          ) : (
            <Card>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: greenSoft }}
                >
                  <ClipboardList size={18} style={{ color: green }} />
                </div>
                <div>
                  <p className="text-[14.5px] font-semibold" style={{ color: ink }}>
                    Marka analiz formu tamamlandı
                  </p>
                  <p className="text-[13px]" style={{ color: inkSoft }}>
                    Bu form yalnızca ilk ay dolduruluyor — sıradaki görüşmene hazırsın.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <ActionChecklist />

          <Card padded={false}>
            <div className="px-6 pt-6">
              <p className="text-[15px] font-semibold" style={{ color: ink }}>
                Raporlarım & içerik planlarım
              </p>
              <p className="mt-0.5 text-[13px]" style={{ color: inkSoft }}>
                Koçun tarafından sisteme yüklenen dosyalar
              </p>
            </div>
            <div className="mt-4">
              {REPORTS.map((r, i) => (
                <div
                  key={r.name}
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
                        {r.name}
                      </p>
                      <p className="text-[12.5px]" style={{ color: inkSoft }}>
                        {r.date} · {r.type}
                      </p>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                    style={{ color: accent }}
                  >
                    <Download size={15} />
                    İndir
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: inkSoft }}>
              <Calendar size={15} />
              Online görüşme randevum
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="flex h-12 w-12 flex-col items-center justify-center rounded-xl"
                style={{ background: accentSoft }}
              >
                <span className="text-[15px] font-bold leading-none" style={{ color: accent }}>
                  12
                </span>
                <span className="text-[10px] font-medium" style={{ color: accent }}>
                  EYL
                </span>
              </div>
              <div>
                <p className="text-[14.5px] font-semibold" style={{ color: ink }}>
                  14:00 — Birebir görüşme
                </p>
                <p className="flex items-center gap-1 text-[12.5px]" style={{ color: inkSoft }}>
                  <Clock size={12} />
                  45 dakika
                </p>
              </div>
            </div>
            <div className="mt-4">
              <GhostButton icon={Video} full>
                Görüşme detayını gör
              </GhostButton>
            </div>
          </Card>

          <ContentDeliveryDate />

          <Card>
            <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: inkSoft }}>
              <Target size={15} />
              Bu ayın odağı
            </div>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: ink }}>
              Reels tempo ve hook çalışması ile haftalık paylaşım düzenini oturtmak.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   ROOT — top tab switcher between the 3 screens
=========================================================== */
const TABS = [
  { id: "landing", label: "1 · Tanıtım Sayfası" },
  { id: "payment", label: "2 · Ödeme" },
  { id: "dashboard", label: "3 · Öğrenci Paneli" },
];

export default function App() {
  const [tab, setTab] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col font-sans" style={{ background: canvas }}>
      {/* preview switcher */}
      <div
        className="flex shrink-0 items-center justify-center gap-2 px-6 py-3"
        style={{ background: "#fff", borderBottom: `1px solid ${line}` }}
      >
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: canvas }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors"
              style={{
                background: tab === t.id ? "#fff" : "transparent",
                color: tab === t.id ? accent : inkSoft,
                boxShadow: tab === t.id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        {tab === "landing" && <LandingPage goToPayment={() => setTab("payment")} />}
        {tab === "payment" && (
          <PaymentPage
            goToDashboard={() => {
              setIsLoggedIn(true);
              setTab("dashboard");
            }}
          />
        )}
        {tab === "dashboard" &&
          (isLoggedIn ? <StudentDashboard /> : <StudentLogin onLogin={() => setIsLoggedIn(true)} />)}
      </main>
    </div>
  );
}
