import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/41d73b9e-2ded-41ce-a7e4-cedf7c3ebb33/files/6ccb2074-ffd8-47f9-be97-7b6321c3e4a2.jpg";
const IMG_MOUNTAIN = "https://cdn.poehali.dev/projects/41d73b9e-2ded-41ce-a7e4-cedf7c3ebb33/files/968564f0-5a13-4bc5-a88e-6fc0fc5ee47d.jpg";
const IMG_FOREST = "https://cdn.poehali.dev/projects/41d73b9e-2ded-41ce-a7e4-cedf7c3ebb33/files/34c19f33-8ed6-4b70-90ba-a65c23c3212f.jpg";

const formats = [
  {
    label: "Мини-тур",
    duration: "1 час",
    badge: "Для новичков",
    color: "#d79a57",
    includes: ["Инструктаж и экипировка", "Сопровождение инструктора", "Базовый маршрут"],
    note: "Идеально для первого раза",
  },
  {
    label: "Драйв-тур",
    duration: "2–3 часа",
    badge: "Хит",
    color: "#f1c98a",
    includes: ["Маршрут по бездорожью", "Остановки и фотозоны", "Экипировка включена"],
    note: "Для компаний и пар",
  },
  {
    label: "Премиум",
    duration: "4+ часов",
    badge: "VIP",
    color: "#d79a57",
    includes: ["Индивидуальный маршрут", "Профессиональный контент", "Полный сервис"],
    note: "Для особых поводов",
  },
];

const features = [
  { icon: "Zap", title: "Мощный драйв", desc: "Профессиональные квадроциклы и маршруты, которые заряжают адреналином" },
  { icon: "Map", title: "Насыщенные маршруты", desc: "Лес, горы, бездорожье — каждый тур уникален и запоминается" },
  { icon: "ShieldCheck", title: "Сервис под ключ", desc: "Экипировка, инструктаж, фото и комфортная организация поездки" },
  { icon: "Star", title: "Премиальный стиль", desc: "Визуал, атмосфера и подача на уровне — статус чувствуется в деталях" },
];

const tableRows = [
  { format: "Мини-тур", duration: "1 час", who: "Новички", includes: "Инструктаж, экипировка, сопровождение" },
  { format: "Драйв-тур", duration: "2–3 часа", who: "Друзья, пары", includes: "Маршрут по бездорожью, остановки, фото" },
  { format: "Премиум-поездка", duration: "4+ часа", who: "Компания, VIP", includes: "Инд. маршрут, сервис, контент" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("Драйв-тур");
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setBookingOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(180deg, #020202 0%, #070707 40%, #0b0b0b 100%)", fontFamily: "'Montserrat', sans-serif", color: "#f3e2bf" }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-[rgba(215,154,87,0.18)]" : ""}`}
        style={{ background: scrolled ? "rgba(5,5,5,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
          <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-light tracking-[0.2em] text-[#f3e2bf]">
            BOGATOV <span style={{ color: "#d79a57" }}>TRAVEL</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[["#about", "О нас"], ["#tours", "Туры"], ["#booking", "Бронирование"]].map(([href, label]) => (
              <a key={href} href={href} className="text-[10px] tracking-[0.28em] uppercase transition-colors duration-300"
                style={{ color: "rgba(243,226,191,0.55)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(243,226,191,0.55)")}>
                {label}
              </a>
            ))}
          </div>
          <button onClick={() => setBookingOpen(true)}
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #d79a57, #f0b36d)", color: "#160f07", fontWeight: 700, borderRadius: 999 }}>
            <Icon name="CalendarCheck" size={14} />
            Забронировать
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ color: "#f3e2bf" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5 border-t border-[rgba(215,154,87,0.12)]" style={{ background: "rgba(5,5,5,0.98)" }}>
            {[["#about", "О нас"], ["#tours", "Туры"], ["#booking", "Бронирование"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm tracking-[0.2em] uppercase pt-4" style={{ color: "rgba(243,226,191,0.7)" }}>
                {label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); setBookingOpen(true); }} className="mt-2 py-4 text-[11px] tracking-[0.25em] uppercase font-bold" style={{ background: "linear-gradient(135deg, #d79a57, #f0b36d)", color: "#160f07", borderRadius: 999 }}>
              Забронировать тур
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="" className="w-full h-full object-cover" style={{ filter: "grayscale(20%) brightness(0.45)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,2,2,0.3) 0%, rgba(2,2,2,0.2) 50%, #020202 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, rgba(215,154,87,0.08), transparent 55%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-20">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 border rounded-full" style={{ borderColor: "rgba(215,154,87,0.3)", background: "rgba(215,154,87,0.06)", backdropFilter: "blur(12px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d79a57] animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#d79a57" }}>Активный отдых · Квадротуры</span>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="font-light leading-none mb-6" style2={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="block" style={{ fontSize: "clamp(58px, 11vw, 110px)", letterSpacing: "0.1em", color: "#f3e2bf" }}>BOGATOV</span>
            <span className="block" style={{ fontSize: "clamp(58px, 11vw, 110px)", letterSpacing: "0.1em", color: "#d79a57" }}>TRAVEL</span>
          </h1>

          <div className="w-20 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #d79a57, transparent)" }} />

          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#e8ddc9", letterSpacing: "0.02em" }}>
            Премиальные квадротуры и активный отдых.<br />Эмоции, стиль и мощный драйв в каждой поездке.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="flex items-center justify-center gap-2 px-10 py-4 text-[12px] tracking-[0.3em] uppercase font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #d79a57, #f0b36d)", color: "#160f07", borderRadius: 999 }}>
              <Icon name="CalendarCheck" size={16} />
              Забронировать тур
            </button>
            <a href="#about" className="flex items-center justify-center gap-2 px-10 py-4 text-[12px] tracking-[0.3em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(215,154,87,0.3)", color: "#f3e2bf", borderRadius: 999, backdropFilter: "blur(10px)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(215,154,87,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              Узнать подробнее
              <Icon name="ChevronDown" size={14} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={18} style={{ color: "#d79a57" }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="border-y" style={{ borderColor: "rgba(215,154,87,0.15)", background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["500+", "Туристов"], ["3", "Формата туров"], ["100%", "Живых эмоций"], ["1 час", "Минимальный тур"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,52px)", color: "#d79a57", fontWeight: 300 }}>{val}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: "rgba(243,226,191,0.45)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: "#d79a57" }}>Почему мы</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#f3e2bf", fontWeight: 300 }}>BOGATOV TRAVEL</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="relative">
              <img src={IMG_MOUNTAIN} alt="Квадротур в горах" className="w-full object-cover" style={{ height: 440, borderRadius: 4 }} />
              <div className="absolute inset-0 rounded" style={{ background: "linear-gradient(to top, rgba(2,2,2,0.5), transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-bold" style={{ background: "linear-gradient(135deg,#d79a57,#f0b36d)", color: "#160f07", borderRadius: 999 }}>
                  Горные маршруты
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {features.map((f) => (
                <div key={f.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center border" style={{ borderColor: "rgba(215,154,87,0.3)", borderRadius: 8 }}>
                    <Icon name={f.icon} fallback="Star" size={18} style={{ color: "#d79a57" }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-sm tracking-wide" style={{ color: "#f3e2bf" }}>{f.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "rgba(222,212,194,0.7)" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOURS ── */}
      <section id="tours" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: "#d79a57" }}>Выбери формат</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#f3e2bf", fontWeight: 300 }}>
              Форматы <em className="not-italic" style={{ color: "#d79a57" }}>туров</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {formats.map((f) => (
              <div key={f.label} className="relative group cursor-pointer transition-all duration-300 p-8" onClick={() => { setSelectedFormat(f.label); setBookingOpen(true); }}
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))", border: "1px solid rgba(215,154,87,0.18)", borderRadius: 24 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[9px] tracking-[0.35em] uppercase mb-2 font-semibold px-3 py-1 inline-block" style={{ background: "rgba(215,154,87,0.12)", color: "#d79a57", borderRadius: 999 }}>
                      {f.badge}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#f1c98a", fontWeight: 400 }} className="leading-tight">{f.label}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(243,226,191,0.4)" }}>Время</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#d79a57" }}>{f.duration}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {f.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Icon name="Check" size={14} style={{ color: "#d79a57", flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: "rgba(222,212,194,0.8)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "rgba(215,154,87,0.12)" }}>
                  <span className="text-xs" style={{ color: "rgba(243,226,191,0.4)" }}>{f.note}</span>
                  <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d79a57" }}>
                    Выбрать <Icon name="ArrowRight" size={12} style={{ color: "#d79a57" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(215,154,87,0.18)" }}>
            <table className="w-full" style={{ background: "rgba(255,255,255,0.02)", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg,#d79a57,#f0b36d)" }}>
                  {["Формат", "Длительность", "Для кого", "Что включено"].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[11px] tracking-[0.12em] uppercase font-bold" style={{ color: "#160f07" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r, i) => (
                  <tr key={r.format} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#f3e2bf" }}>{r.format}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#d79a57" }}>{r.duration}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#ded4c2" }}>{r.who}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#ded4c2" }}>{r.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-4 text-xs" style={{ color: "rgba(185,170,144,0.7)" }}>* Цены и состав пакетов можно уточнить при бронировании</p>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: "#d79a57" }}>Атмосфера</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,54px)", color: "#f3e2bf", fontWeight: 300 }}>
              Живые <em className="not-italic" style={{ color: "#d79a57" }}>впечатления</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-2 md:col-span-2">
              <img src={IMG_HERO} alt="" className="w-full object-cover" style={{ height: 340, borderRadius: 8, filter: "brightness(0.85)" }} />
            </div>
            <img src={IMG_FOREST} alt="" className="w-full object-cover" style={{ height: 340, borderRadius: 8, filter: "brightness(0.85)" }} />
            <img src={IMG_MOUNTAIN} alt="" className="w-full object-cover" style={{ height: 240, borderRadius: 8, filter: "brightness(0.85)" }} />
            <div className="col-span-2">
              <img src={IMG_FOREST} alt="" className="w-full object-cover" style={{ height: 240, borderRadius: 8, filter: "brightness(0.85)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="booking" className="py-28 px-6" style={{ background: "radial-gradient(circle at center, rgba(215,154,87,0.08), transparent 50%), linear-gradient(180deg,#090909,#050505)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 md:p-14 border rounded-3xl" style={{ borderColor: "rgba(215,154,87,0.2)", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}>
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: "#d79a57" }}>Готовы к поездке?</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,56px)", color: "#f3e2bf", fontWeight: 300 }} className="mb-4 leading-tight">
              Выберите формат<br /><em className="not-italic" style={{ color: "#d79a57" }}>и отправляйтесь!</em>
            </h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg,transparent,#d79a57,transparent)" }} />
            <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(222,212,194,0.75)" }}>
              Оставьте заявку — мы подберём маршрут под ваше настроение, уровень и формат отдыха. Ответим в течение часа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={() => setBookingOpen(true)} className="flex items-center justify-center gap-2 px-10 py-4 text-[12px] tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#d79a57,#f0b36d)", color: "#160f07", borderRadius: 999 }}>
                <Icon name="CalendarCheck" size={16} />
                Забронировать тур
              </button>
              <a href="tel:+79991046666" className="flex items-center justify-center gap-2 px-8 py-4 text-[12px] tracking-[0.25em] uppercase transition-all duration-300"
                style={{ border: "1px solid rgba(215,154,87,0.3)", color: "#f3e2bf", borderRadius: 999 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.6)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(215,154,87,0.3)"; }}>
                <Icon name="Phone" size={14} />
                Позвонить
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "rgba(233,221,200,0.7)" }}>
              <span className="flex items-center gap-2"><Icon name="Phone" size={14} style={{ color: "#d79a57" }} />+7 (999) 104-66-66</span>
              <span className="flex items-center gap-2"><Icon name="Mail" size={14} style={{ color: "#d79a57" }} />info@bogatovtravel.ru</span>
              <span className="flex items-center gap-2"><Icon name="Clock" size={14} style={{ color: "#d79a57" }} />Ежедневно 9:00–20:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(170,154,127,0.7)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-lg mb-2 tracking-[0.15em]">
          BOGATOV <span style={{ color: "#d79a57" }}>TRAVEL</span>
        </div>
        <p className="text-xs tracking-wider">Активные путешествия с характером · © 2026</p>
      </footer>

      {/* ── BOOKING MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0" style={{ background: "rgba(2,2,2,0.88)", backdropFilter: "blur(12px)" }} onClick={() => setBookingOpen(false)} />
          <div className="relative w-full max-w-md p-8 border rounded-2xl" style={{ background: "#0d0d0d", borderColor: "rgba(215,154,87,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setBookingOpen(false)} className="absolute top-5 right-5" style={{ color: "rgba(243,226,191,0.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#d79a57"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(243,226,191,0.4)"; }}>
              <Icon name="X" size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(215,154,87,0.15)", border: "1px solid rgba(215,154,87,0.4)" }}>
                  <Icon name="CheckCircle" size={28} style={{ color: "#d79a57" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#f3e2bf" }} className="mb-2">Заявка принята!</h3>
                <p className="text-sm" style={{ color: "rgba(222,212,194,0.7)" }}>Мы свяжемся с вами в течение часа</p>
              </div>
            ) : (
              <>
                <p className="text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: "#d79a57" }}>Бронирование</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#f3e2bf", fontWeight: 300 }} className="mb-6">Выберите тур</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Format selector */}
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(243,226,191,0.45)" }}>Формат тура</label>
                    <div className="grid grid-cols-3 gap-2">
                      {formats.map((f) => (
                        <button key={f.label} type="button" onClick={() => setSelectedFormat(f.label)}
                          className="py-3 px-2 text-center text-xs transition-all duration-200 rounded-lg border"
                          style={{
                            borderColor: selectedFormat === f.label ? "#d79a57" : "rgba(215,154,87,0.18)",
                            background: selectedFormat === f.label ? "rgba(215,154,87,0.12)" : "transparent",
                            color: selectedFormat === f.label ? "#d79a57" : "rgba(243,226,191,0.55)",
                          }}>
                          <div className="font-semibold text-[11px] mb-0.5">{f.label}</div>
                          <div className="text-[10px] opacity-70">{f.duration}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(243,226,191,0.45)" }}>Дата</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(215,154,87,0.2)", color: "#f3e2bf", colorScheme: "dark" }}
                      onFocus={e => (e.target.style.borderColor = "#d79a57")}
                      onBlur={e => (e.target.style.borderColor = "rgba(215,154,87,0.2)")} />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(243,226,191,0.45)" }}>Количество человек</label>
                    <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none"
                      style={{ background: "#0d0d0d", borderColor: "rgba(215,154,87,0.2)", color: "#f3e2bf" }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "человек" : n < 5 ? "человека" : "человек"}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(243,226,191,0.45)" }}>Имя</label>
                      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Александр"
                        className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(215,154,87,0.2)", color: "#f3e2bf" }}
                        onFocus={e => (e.target.style.borderColor = "#d79a57")}
                        onBlur={e => (e.target.style.borderColor = "rgba(215,154,87,0.2)")} />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(243,226,191,0.45)" }}>Телефон</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(215,154,87,0.2)", color: "#f3e2bf" }}
                        onFocus={e => (e.target.style.borderColor = "#d79a57")}
                        onBlur={e => (e.target.style.borderColor = "rgba(215,154,87,0.2)")} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(243,226,191,0.45)" }}>Пожелания</label>
                    <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                      placeholder="Любой особый запрос..." rows={3}
                      className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none resize-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(215,154,87,0.2)", color: "#f3e2bf" }}
                      onFocus={e => (e.target.style.borderColor = "#d79a57")}
                      onBlur={e => (e.target.style.borderColor = "rgba(215,154,87,0.2)")} />
                  </div>

                  <button type="submit" className="w-full py-4 text-[12px] tracking-[0.3em] uppercase font-bold transition-all duration-300 hover:opacity-90 rounded-lg mt-2"
                    style={{ background: "linear-gradient(135deg,#d79a57,#f0b36d)", color: "#160f07" }}>
                    Подтвердить заявку
                  </button>
                  <p className="text-center text-[10px]" style={{ color: "rgba(185,170,144,0.5)" }}>Ответим в течение часа · Ежедневно 9:00–20:00</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}