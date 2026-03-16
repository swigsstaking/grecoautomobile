import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockVehicules from '../../data/mockVehicules';

gsap.registerPlugin(ScrollTrigger);

const PANELS = 5;

// ── V8 Color Palette ──
// Light mode — brand blue + warm greys, clean premium feel
const C = {
  bg: '#f4f4f2',                  // warm light grey
  bgAlt: '#eaeae8',               // slightly darker section
  bgCard: '#ffffff',              // white cards
  door: {
    light: '#c8c8cc',             // light silver
    mid: '#b8b8bc',               // mid silver
    dark: '#a8a8ac',              // darker silver
    edge: '#d0d0d4',              // panel edges
  },
  blue: '#13427E',                // brand primary
  blueMuted: 'rgba(19,66,126,0.6)',
  blueFaint: 'rgba(19,66,126,0.25)',
  blueGlow: 'rgba(19,66,126,0.08)',
  blueLight: '#1a5199',           // hover
  text: '#0f1a2e',                // dark navy for text
  textMuted: 'rgba(15,26,46,0.55)',
  textFaint: 'rgba(15,26,46,0.35)',
  accent: '#13427E',              // same as blue
  border: 'rgba(15,26,46,0.08)',  // subtle borders
};

const HomeV8 = () => {
  const siteInfo = useSiteInfo();
  const featuredVehicules = mockVehicules.filter(v => v.status === 'available');
  const containerRef = useRef(null);
  const garageRef = useRef(null);
  const idleTimeline = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    const panels = gsap.utils.toArray('.garage-panel');
    if (!panels.length) return;

    const numPanels = panels.length;

    // ═══ IDLE: Warm interior light ═══
    const idle = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    idleTimeline.current = idle;

    const glow = '.hl-left, .hl-right, .hl-flare';

    // Fade in
    idle.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'power2.out' }, 0);
    // Hold
    idle.to(glow, { opacity: 0.7, duration: 3, ease: 'sine.inOut' }, 3.5);
    idle.to(glow, { opacity: 1, duration: 3, ease: 'sine.inOut' }, 6.5);
    // Fade out
    idle.to(glow, { opacity: 0, duration: 2.5, ease: 'power2.in' }, 10);

    // ═══ SCROLL: Garage door opening ═══
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: garageRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.progress > 0.02 && idleTimeline.current && !idleTimeline.current.paused()) {
            idleTimeline.current.pause();
            gsap.to('.hl-left,.hl-right,.hl-flare', { opacity: 0, duration: 0.3 });
          }
          if (self.progress < 0.01 && idleTimeline.current?.paused()) {
            idleTimeline.current.resume();
          }
        },
      },
    });

    // ── Car reveals ──
    tl.fromTo('.hero-car img', {
      scale: 1.1,
      filter: 'blur(5px) brightness(0.3)',
    }, {
      scale: 1,
      filter: 'blur(0px) brightness(0.85)',
      duration: 0.6,
      ease: 'none',
    }, 0);

    tl.fromTo('.headlight-glow', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.15);

    // ── Panels slide up ──
    const reversed = [...panels].reverse();
    reversed.forEach((panel, j) => {
      const originalIndex = numPanels - 1 - j;
      const clearDistance = -(originalIndex + 2) * 100;
      tl.to(panel, {
        yPercent: clearDistance,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0.02 + j * 0.06);
    });

    // ── Hero content appears ──
    tl.fromTo('.hero-content', {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    }, 0.5);

    tl.to({}, { duration: 0.1 });

    // Sections reveal
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    });

    return () => {
      if (idleTimeline.current) idleTimeline.current.kill();
    };
  }, { scope: containerRef });

  const reviews = [
    { name: 'Marc D.', text: 'Service impeccable, équipe professionnelle et à l\'écoute. Je recommande vivement.', rating: 5 },
    { name: 'Sophie L.', text: 'Estimation juste et paiement rapide. Très satisfaite de la transaction.', rating: 5 },
    { name: 'Jean-Pierre M.', text: 'Mon véhicule a été vendu rapidement et au bon prix. Excellent service.', rating: 5 },
    { name: 'Laura K.', text: 'Bon accompagnement du début à la fin. Véhicules en excellent état.', rating: 4 },
  ];

  return (
    <div ref={containerRef} style={{ background: C.bg }}>
      <SEOHead page="home" />

      {/* ═══ GARAGE DOOR HERO ═══ */}
      <section ref={garageRef} className="h-screen overflow-hidden relative" style={{ background: '#e8e8e6' }}>

        {/* Car behind the door */}
        <div className="hero-car absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&q=90"
            alt=""
            className="w-full h-full object-cover will-change-[transform,filter]"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(15,26,46,0.7) 0%, rgba(15,26,46,0.05) 40%, rgba(15,26,46,0.15) 100%)',
          }} />
        </div>

        {/* Headlights glow */}
        <div className="headlight-glow absolute inset-0 z-[2] pointer-events-none opacity-0">
          <div className="absolute bottom-[20%] left-[25%] w-[20%] h-[40%]"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,240,200,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[20%] right-[25%] w-[20%] h-[40%]"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,240,200,0.15) 0%, transparent 70%)' }} />
        </div>

        {/* ── Garage door panels — light silver ── */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: PANELS }).map((_, i) => {
            const hasWindows = i === 1;
            const isBottom = i === PANELS - 1;
            const isLogoTop = i === 0;
            const isLogoMain = i === 2;
            const isLogoSub = i === 3;

            return (
              <div
                key={i}
                className="garage-panel absolute left-0 right-0 will-change-transform"
                style={{
                  height: `${100 / PANELS}%`,
                  top: `${(i * 100) / PANELS}%`,
                  zIndex: PANELS - i,
                }}
              >
                <div className="w-full h-full relative"
                  style={{
                    background: `linear-gradient(180deg,
                      ${C.door.edge} 0%, ${C.door.light} 3%, ${C.door.mid} 7%,
                      ${C.door.light} 40%, ${C.door.mid} 60%,
                      ${C.door.light} 93%, ${C.door.dark} 97%, ${C.door.edge} 100%)`,
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.5),
                      inset 0 -1px 0 rgba(0,0,0,0.1),
                      0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                >
                  {/* Embossed grooves */}
                  <div className="absolute top-[28%] left-[2%] right-[2%] h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
                  <div className="absolute top-[calc(28%+1px)] left-[2%] right-[2%] h-px" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  <div className="absolute top-[72%] left-[2%] right-[2%] h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
                  <div className="absolute top-[calc(72%+1px)] left-[2%] right-[2%] h-px" style={{ background: 'rgba(255,255,255,0.4)' }} />

                  {/* Side rails */}
                  <div className="absolute inset-y-0 left-0 w-[2%] bg-gradient-to-r from-black/[0.06] to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-[2%] bg-gradient-to-l from-black/[0.06] to-transparent" />

                  {/* Windows */}
                  {hasWindows && (
                    <div className="absolute left-[8%] right-[8%] top-[10%] bottom-[10%] flex gap-[3px] overflow-hidden rounded-[2px]">
                      {Array.from({ length: 4 }).map((_, w) => (
                        <div key={w} className="flex-1 rounded-[1px] overflow-hidden relative"
                          style={{
                            background: 'linear-gradient(180deg, #2a3040 0%, #1a2030 40%, #151d2a 60%, #2a3040 100%)',
                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.7), inset 0 2px 4px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(0,0,0,0.15)',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white/[0.03] to-transparent" />
                        </div>
                      ))}
                      {/* ── Interior light — warm glow filling the windows ── */}
                      <div className="hl-left absolute inset-0 opacity-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,245,220,0.18) 0%, rgba(255,235,200,0.12) 50%, rgba(255,225,180,0.06) 100%)',
                        }}
                      />
                      <div className="hl-right absolute inset-0 opacity-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse 80% 100% at 50% 60%, rgba(255,240,210,0.15) 0%, transparent 70%)',
                        }}
                      />
                      <div className="hl-flare absolute inset-[-5%] opacity-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse 100% 140% at 50% 50%, rgba(255,245,220,0.1) 0%, transparent 60%)',
                          filter: 'blur(4px)',
                        }}
                      />
                    </div>
                  )}

                  {/* "Bienvenue chez" */}
                  {isLogoTop && (
                    <div className="absolute inset-x-0 bottom-2 flex items-end justify-center pointer-events-none pb-1">
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-sans"
                        style={{ color: C.textFaint }}>
                        Bienvenue chez
                      </p>
                    </div>
                  )}

                  {/* "GRECO" — navy blue on silver */}
                  {isLogoMain && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none"
                        style={{
                          color: C.blue,
                          textShadow: '0 1px 0 rgba(255,255,255,0.3)',
                        }}>
                        GRECO
                      </h1>
                    </div>
                  )}

                  {/* "AUTOGROUP" + scroll */}
                  {isLogoSub && (
                    <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                      <div className="flex items-center justify-center pt-2 md:pt-3">
                        <p className="text-xl md:text-3xl font-display font-light tracking-[0.3em]"
                          style={{ color: C.blueMuted }}>
                          AUTOGROUP
                        </p>
                      </div>
                      <div className="mt-auto mb-3" />
                    </div>
                  )}

                  {/* Handle */}
                  {isBottom && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                      <div className="w-20 h-2 rounded-full"
                        style={{
                          background: `linear-gradient(180deg, #d8d8dc 0%, #c0c0c4 30%, #b0b0b4 70%, #c8c8cc 100%)`,
                          boxShadow: '0 1px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Hero content ── */}
        <div className="hero-content absolute bottom-0 left-0 right-0 z-20 pb-16 md:pb-24 opacity-0">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Votre concessionnaire de confiance
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-4 text-white">
                L'excellence<br />automobile.
              </h2>
              <p className="text-lg font-light mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Achat, vente et dépôt-vente de véhicules d'occasion premium en Suisse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/v8/vehicules"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:opacity-90"
                  style={{ background: C.blue, color: '#ffffff' }}>
                  Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/v8/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-colors text-white border border-white/30 hover:border-white/50">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <section className="reveal-up py-16 md:py-24" style={{ background: C.bgCard, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x" style={{ borderColor: C.border }}>
            {[
              { label: 'Achat', text: 'Nous rachetons votre véhicule au meilleur prix. Estimation gratuite en 24h.' },
              { label: 'Vente', text: 'Des véhicules soigneusement inspectés et garantis. Qualité certifiée.' },
              { label: 'Dépôt-vente', text: 'Confiez-nous la vente de votre véhicule. Nous gérons l\'intégralité.' },
            ].map((item, i) => (
              <div key={i} className={`${i === 0 ? 'md:pr-16' : i === 1 ? 'md:px-16' : 'md:pl-16'}`}
                style={i > 0 ? { borderLeftColor: C.border } : {}}>
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.blue }}>{item.label}</p>
                <p className="text-lg font-light leading-relaxed" style={{ color: C.textMuted }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE SHOWCASE ═══ */}
      <section style={{ background: C.bg }}>
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.blueMuted }}>Catalogue</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.95]" style={{ color: C.text }}>Nos modèles</h2>
            </div>
            <Link to="/v8/vehicules" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-colors hover:opacity-80"
              style={{ color: C.blue }}>
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-20 px-6 md:px-12 lg:px-24 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {featuredVehicules.map((v) => (
            <Link key={v._id} to={`/vehicules/${v._id}`} className="group flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-5" style={{ background: C.bgAlt }}>
                <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold group-hover:opacity-60 transition-colors" style={{ color: C.text }}>{v.name}</h3>
                  <p className="text-sm mt-1" style={{ color: C.textFaint }}>{v.year} · {v.mileage.toLocaleString()} km · {v.fuelType}</p>
                </div>
                <p className="font-display font-bold text-lg" style={{ color: C.blue }}>CHF {v.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pb-20 md:hidden">
          <Link to="/v8/vehicules" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-colors hover:opacity-80"
            style={{ color: C.blue }}>
            Voir tout le catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(19,66,126,0.92) 0%, rgba(19,66,126,0.7) 40%, rgba(19,66,126,0.3) 100%)',
          }} />
        </div>
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-white/40">Qui sommes-nous</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] mb-8 text-white">
              L'automobile,<br />notre passion.
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg text-white/65">
              Depuis plus de 10 ans, Greco Autogroup accompagne ses clients avec expertise, transparence et un service personnalisé.
            </p>
            <Link to="/v8/notre-histoire" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-medium pb-2 transition-colors text-white border-b border-white/30 hover:border-white/60">
              Notre histoire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 md:py-32" style={{ background: C.bgCard }}>
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.blueMuted }}>Services</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.95] mb-20" style={{ color: C.text }}>
            Comment pouvons-nous<br />vous aider ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Achat', desc: 'Estimation gratuite, rachat immédiat, paiement sécurisé.', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop', link: '/v8/services#achat' },
              { title: 'Vente', desc: 'Véhicules inspectés et garantis. Essai routier disponible.', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop', link: '/v8/services#vente' },
              { title: 'Dépôt-vente', desc: 'Photos pro, diffusion, négociation — on gère tout.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop', link: '/v8/services#depot-vente' },
            ].map((service, i) => (
              <Link key={i} to={service.link} className="group block cursor-pointer rounded-lg overflow-hidden" style={{ background: C.bg }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:opacity-60 transition-colors" style={{ color: C.text }}>{service.title}</h3>
                  <p className="leading-relaxed mb-6 text-sm" style={{ color: C.textFaint }}>{service.desc}</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] group-hover:opacity-100 transition-colors"
                    style={{ color: C.blue }}>
                    En savoir plus <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-20 md:py-32" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.blueMuted }}>Avis clients</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-[0.95] mb-16" style={{ color: C.text }}>Ce qu'ils disent de nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {reviews.map((review, i) => (
              <div key={i}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12}
                      style={{ color: j < review.rating ? '#f59e0b' : '#d4d4d4', fill: j < review.rating ? '#f59e0b' : 'none' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 font-light italic" style={{ color: C.textMuted }}>"{review.text}"</p>
                <p className="text-sm font-medium" style={{ color: C.text }}>{review.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <a href="https://www.google.com/maps/place/Greco+Autogroup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors hover:opacity-70"
              style={{ color: C.blueFaint }}>
              Voir tous les avis sur Google <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1920&h=800&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(19,66,126,0.85)' }} />
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center w-full">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Trouvez votre prochain véhicule</h2>
          <p className="text-lg font-light mb-10 max-w-xl mx-auto text-white/60">Parcourez notre catalogue ou contactez-nous pour une recherche personnalisée.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/v8/vehicules"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:bg-white/90"
              style={{ color: C.blue }}>
              Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v8/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-colors text-white border border-white/30 hover:border-white/60">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeV8;
