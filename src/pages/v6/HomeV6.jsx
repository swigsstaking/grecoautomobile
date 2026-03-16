import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, ChevronRight, Star, Mouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockVehicules from '../../data/mockVehicules';

gsap.registerPlugin(ScrollTrigger);

const PANELS = 5;

const HomeV6 = () => {
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

    // ═══ SCROLL INDICATOR PULSE ═══
    gsap.to('.scroll-pulse', {
      opacity: 0.4,
      y: 3,
      duration: 1.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // ═══ IDLE: Headlights startup behind windows ═══
    const idle = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    idleTimeline.current = idle;

    const hlLeft = '.hl-left';
    const hlRight = '.hl-right';
    const hlFlare = '.hl-flare';

    // Startup sequence — like turning on a car ignition
    // 1. First flicker (weak attempt)
    idle.set([hlLeft, hlRight, hlFlare], { opacity: 0 }, 0);
    idle.to([hlLeft, hlRight], { opacity: 0.2, duration: 0.05 }, 1);
    idle.to([hlLeft, hlRight], { opacity: 0, duration: 0.08 }, 1.08);
    // 2. Second flicker (stronger attempt)
    idle.to([hlLeft, hlRight], { opacity: 0.4, duration: 0.05 }, 1.6);
    idle.to([hlLeft, hlRight], { opacity: 0.05, duration: 0.1 }, 1.7);
    // 3. Third flicker (almost catching)
    idle.to([hlLeft, hlRight], { opacity: 0.65, duration: 0.06 }, 2.1);
    idle.to([hlLeft, hlRight], { opacity: 0.15, duration: 0.1 }, 2.2);
    // 4. Ignition catches — warm-up ramp to full brightness
    idle.to([hlLeft, hlRight], { opacity: 0.4, duration: 0.15, ease: 'power1.in' }, 2.6);
    idle.to([hlLeft, hlRight], { opacity: 0.65, duration: 0.2, ease: 'power1.inOut' }, 2.75);
    idle.to([hlLeft, hlRight], { opacity: 0.85, duration: 0.25, ease: 'power2.out' }, 2.95);
    idle.to([hlLeft, hlRight], { opacity: 1, duration: 0.3, ease: 'power2.out' }, 3.2);
    idle.to(hlFlare, { opacity: 0.5, duration: 0.4, ease: 'power1.out' }, 3.0);
    idle.to(hlFlare, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 3.4);
    // 5. Rev pulses — quick brightness kicks like revving the engine
    idle.to([hlLeft, hlRight], { opacity: 0.8, duration: 0.08 }, 3.8);
    idle.to([hlLeft, hlRight], { opacity: 1, duration: 0.1, ease: 'power2.out' }, 3.9);
    idle.to([hlLeft, hlRight], { opacity: 0.75, duration: 0.08 }, 4.15);
    idle.to([hlLeft, hlRight], { opacity: 1, duration: 0.12, ease: 'power2.out' }, 4.25);
    idle.to([hlLeft, hlRight], { opacity: 0.82, duration: 0.07 }, 4.5);
    idle.to([hlLeft, hlRight], { opacity: 1, duration: 0.15, ease: 'power2.out' }, 4.6);
    // 6. Smooth subtle breathing — engine idling
    idle.to([hlLeft, hlRight], { opacity: 0.92, duration: 2, ease: 'sine.inOut' }, 5.0);
    idle.to([hlLeft, hlRight], { opacity: 1, duration: 2, ease: 'sine.inOut' }, 7.0);
    idle.to(hlFlare, { opacity: 0.9, duration: 2, ease: 'sine.inOut' }, 5.5);
    idle.to(hlFlare, { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, 7.5);
    // 7. Engine off — fade with brief re-flash before dying
    idle.to([hlLeft, hlRight], { opacity: 0.3, duration: 0.6, ease: 'power1.in' }, 9.5);
    idle.to(hlFlare, { opacity: 0.2, duration: 0.5, ease: 'power1.in' }, 9.6);
    // Re-flash — headlights kick once before going dark
    idle.to([hlLeft, hlRight], { opacity: 0.7, duration: 0.08 }, 10.2);
    idle.to(hlFlare, { opacity: 0.5, duration: 0.08 }, 10.2);
    // Final fade to black
    idle.to([hlLeft, hlRight], { opacity: 0, duration: 0.8, ease: 'power2.in' }, 10.35);
    idle.to(hlFlare, { opacity: 0, duration: 0.7, ease: 'power2.in' }, 10.4);

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
            gsap.to('.hl-left, .hl-right, .hl-flare', { opacity: 0, duration: 0.3 });
          }
          if (self.progress < 0.01 && idleTimeline.current?.paused()) {
            idleTimeline.current.resume();
          }
        },
      },
    });

    // ── Car reveals: unblur + zoom ──
    tl.fromTo('.hero-car img', {
      scale: 1.1,
      filter: 'blur(5px) brightness(0.4)',
    }, {
      scale: 1,
      filter: 'blur(0px) brightness(0.85)',
      duration: 0.6,
      ease: 'none',
    }, 0);

    // ── Headlights glow intensifies as door opens ──
    tl.fromTo('.headlight-glow', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.15);

    // ── Panels slide up off-screen ──
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

    // ── Hold ──
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
    <div ref={containerRef}>
      <SEOHead page="home" />

      {/* ═══ GARAGE DOOR HERO ═══ */}
      <section ref={garageRef} className="h-screen overflow-hidden bg-[#0a0a0a] relative">

        {/* Car behind the door — front-facing, dramatic lighting */}
        <div className="hero-car absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop&q=90"
            alt=""
            className="w-full h-full object-cover will-change-[transform,filter]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        </div>

        {/* Headlights glow — warm cones from car headlights */}
        <div className="headlight-glow absolute inset-0 z-[2] pointer-events-none opacity-0">
          <div className="absolute bottom-[20%] left-[25%] w-[20%] h-[40%]"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,230,160,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[20%] right-[25%] w-[20%] h-[40%]"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,230,160,0.15) 0%, transparent 70%)' }} />
        </div>

        {/* ── Garage door panels ── */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: PANELS }).map((_, i) => {
            const hasWindows = i === 1;
            const isBottom = i === PANELS - 1;
            // Logo distribution across panels for visual centering:
            // Panel 0: "Bienvenue chez" (bottom-aligned, close to windows)
            // Panel 1: Windows with headlights
            // Panel 2: "GRECO" (large)
            // Panel 3: "AUTOGROUP" (top) + scroll indicator (bottom)
            // Panel 4: Handle
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
                      #3a3a3f 0%, #2e2e33 3%, #35353a 7%,
                      #313136 40%, #2d2d32 60%,
                      #35353a 93%, #2a2a2f 97%, #323237 100%)`,
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.06),
                      inset 0 -1px 0 rgba(0,0,0,0.3),
                      0 4px 16px rgba(0,0,0,0.4)`,
                  }}
                >
                  {/* Embossed grooves */}
                  <div className="absolute top-[28%] left-[2%] right-[2%] h-px bg-black/20" />
                  <div className="absolute top-[calc(28%+1px)] left-[2%] right-[2%] h-px bg-white/[0.04]" />
                  <div className="absolute top-[72%] left-[2%] right-[2%] h-px bg-black/20" />
                  <div className="absolute top-[calc(72%+1px)] left-[2%] right-[2%] h-px bg-white/[0.04]" />

                  {/* Side rails */}
                  <div className="absolute inset-y-0 left-0 w-[2%] bg-gradient-to-r from-black/15 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-[2%] bg-gradient-to-l from-black/15 to-transparent" />

                  {/* Windows with headlight glow */}
                  {hasWindows && (
                    <div className="absolute left-[8%] right-[8%] top-[10%] bottom-[10%] flex gap-[3px] overflow-hidden rounded-[2px]">
                      {Array.from({ length: 4 }).map((_, w) => (
                        <div key={w} className="flex-1 rounded-[1px] overflow-hidden relative"
                          style={{
                            background: 'linear-gradient(180deg, #18181d 0%, #0e0e12 40%, #0a0a0f 60%, #18181d 100%)',
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8), inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 3px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.03)',
                          }}
                        >
                          {/* Glass reflection — diagonal highlight */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
                          {/* Bottom reflection edge */}
                          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white/[0.02] to-transparent" />
                        </div>
                      ))}
                      {/* Headlight LEFT — circular glow like a real headlight */}
                      <div className="hl-left absolute opacity-0 pointer-events-none"
                        style={{
                          width: '24%',
                          height: '90%',
                          left: '14%',
                          top: '5%',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle at 50% 50%, rgba(255,245,220,1) 0%, rgba(255,235,180,0.7) 20%, rgba(255,220,140,0.3) 45%, transparent 70%)',
                          filter: 'blur(3px)',
                        }}
                      />
                      {/* Headlight RIGHT */}
                      <div className="hl-right absolute opacity-0 pointer-events-none"
                        style={{
                          width: '24%',
                          height: '90%',
                          right: '14%',
                          top: '5%',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle at 50% 50%, rgba(255,245,220,1) 0%, rgba(255,235,180,0.7) 20%, rgba(255,220,140,0.3) 45%, transparent 70%)',
                          filter: 'blur(3px)',
                        }}
                      />
                      {/* Ambient flare — warm wash between the two headlights */}
                      <div className="hl-flare absolute inset-0 opacity-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse 70% 120% at 50% 50%, rgba(255,235,180,0.15) 0%, transparent 65%)',
                          filter: 'blur(8px)',
                        }}
                      />
                    </div>
                  )}

                  {/* "Bienvenue chez" — bottom of panel 0, right above the windows */}
                  {isLogoTop && (
                    <div className="absolute inset-x-0 bottom-2 flex items-end justify-center pointer-events-none pb-1">
                      <p className="text-white/35 text-[10px] md:text-xs uppercase tracking-[0.5em] font-sans"
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                        Bienvenue chez
                      </p>
                    </div>
                  )}

                  {/* "GRECO" — large, painted on middle panel */}
                  {isLogoMain && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white/90 leading-none"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.04)' }}>
                        GRECO
                      </h1>
                    </div>
                  )}

                  {/* "AUTOGROUP" + scroll indicator */}
                  {isLogoSub && (
                    <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                      <div className="flex items-center justify-center pt-2 md:pt-3">
                        <p className="text-xl md:text-3xl font-display font-light text-white/45 tracking-[0.3em]"
                          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
                          AUTOGROUP
                        </p>
                      </div>
                      <div className="mt-auto mb-3 flex flex-col items-center gap-1.5">
                        <div className="w-8 h-px bg-white/15" />
                        <div className="scroll-pulse flex flex-col items-center gap-1">
                          <Mouse size={14} className="text-white/25" />
                          <span className="text-white/20 text-[8px] uppercase tracking-[0.3em]">Scroll</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Handle on bottom panel */}
                  {isBottom && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                      <div className="w-20 h-2 rounded-full"
                        style={{
                          background: 'linear-gradient(180deg, #606065 0%, #48484d 30%, #3a3a3f 70%, #505055 100%)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.5), 0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)',
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
              <p className="text-white/35 text-xs uppercase tracking-[0.3em] mb-4">
                Votre concessionnaire de confiance
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] mb-4">
                L'excellence<br />automobile.
              </h2>
              <p className="text-white/45 text-lg font-light mb-10 max-w-lg">
                Achat, vente et dépôt-vente de véhicules d'occasion premium en Suisse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/v6/vehicules"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors">
                  Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/v6/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/40 transition-colors">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <section className="reveal-up bg-[#0a0a0a] border-t border-white/5 py-16 md:py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { label: 'Achat', text: 'Nous rachetons votre véhicule au meilleur prix. Estimation gratuite en 24h.' },
              { label: 'Vente', text: 'Des véhicules soigneusement inspectés et garantis. Qualité certifiée.' },
              { label: 'Dépôt-vente', text: 'Confiez-nous la vente de votre véhicule. Nous gérons l\'intégralité.' },
            ].map((item, i) => (
              <div key={i} className={`${i === 0 ? 'md:pr-16' : i === 1 ? 'md:px-16' : 'md:pl-16'}`}>
                <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-3">{item.label}</p>
                <p className="text-white/60 text-lg font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE SHOWCASE ═══ */}
      <section className="bg-[#0a0a0a]">
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-4">Catalogue</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95]">Nos modèles</h2>
            </div>
            <Link to="/v6/vehicules" className="hidden md:inline-flex items-center gap-2 text-white/30 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-20 px-6 md:px-12 lg:px-24 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {featuredVehicules.map((v) => (
            <Link key={v._id} to={`/vehicules/${v._id}`} className="group flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start">
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5 mb-5">
                <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-lg font-display font-bold group-hover:text-white/60 transition-colors">{v.name}</h3>
                  <p className="text-white/30 text-sm mt-1">{v.year} · {v.mileage.toLocaleString()} km · {v.fuelType}</p>
                </div>
                <p className="text-white font-display font-bold text-lg">CHF {v.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pb-20 md:hidden">
          <Link to="/v6/vehicules" className="inline-flex items-center gap-2 text-white/30 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors">
            Voir tout le catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&h=1080&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-6">Qui sommes-nous</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-8">
              L'automobile,<br />notre passion.
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Depuis plus de 10 ans, Greco Autogroup accompagne ses clients avec expertise, transparence et un service personnalisé.
            </p>
            <Link to="/v6/notre-histoire" className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium border-b border-white/20 pb-2 hover:border-white/50 transition-colors">
              Notre histoire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-[#0a0a0a] py-20 md:py-32">
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-4">Services</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95] mb-20">
            Comment pouvons-nous<br />vous aider ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { title: 'Achat', desc: 'Estimation gratuite, rachat immédiat, paiement sécurisé.', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop', link: '/v6/services#achat' },
              { title: 'Vente', desc: 'Véhicules inspectés et garantis. Essai routier disponible.', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop', link: '/v6/services#vente' },
              { title: 'Dépôt-vente', desc: 'Photos pro, diffusion, négociation — on gère tout.', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop', link: '/v6/services#depot-vente' },
            ].map((service, i) => (
              <Link key={i} to={service.link} className="group bg-[#0a0a0a] block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-white/60 transition-colors">{service.title}</h3>
                  <p className="text-white/40 leading-relaxed mb-6 text-sm">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 text-white/30 text-xs uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                    En savoir plus <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="bg-[#0f0f0f] border-t border-white/5 py-20 md:py-32">
        <div className="reveal-up max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-4">Avis clients</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[0.95] mb-16">Ce qu'ils disent de nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {reviews.map((review, i) => (
              <div key={i}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? 'text-white fill-white' : 'text-white/10'} />
                  ))}
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-6 font-light italic">"{review.text}"</p>
                <p className="text-white text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <a href="https://www.google.com/maps/place/Greco+Autogroup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/20 text-xs uppercase tracking-[0.2em] hover:text-white/50 transition-colors">
              Voir tous les avis sur Google <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=800&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center w-full">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Trouvez votre prochain véhicule</h2>
          <p className="text-white/40 text-lg font-light mb-10 max-w-xl mx-auto">Parcourez notre catalogue ou contactez-nous pour une recherche personnalisée.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/v6/vehicules" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors">
              Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v6/contact" className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/50 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeV6;
