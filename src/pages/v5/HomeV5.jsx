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

const HomeV5 = () => {
  const siteInfo = useSiteInfo();
  const featuredVehicules = mockVehicules.filter(v => v.status === 'available');
  const containerRef = useRef(null);
  const garageRef = useRef(null);
  const lenisRef = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // GSAP garage door animation
  useGSAP(() => {
    const panels = gsap.utils.toArray('.garage-panel');
    if (!panels.length) return;

    const numPanels = panels.length; // 5

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: garageRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    // ── Logo fades out immediately ──
    tl.to('.logo-overlay', {
      opacity: 0,
      y: -20,
      duration: 0.1,
      ease: 'power2.in',
    }, 0);

    // ── Car unblurs across the whole animation ──
    tl.fromTo('.hero-car img', {
      scale: 1.1,
      filter: 'blur(5px) brightness(0.5)',
    }, {
      scale: 1,
      filter: 'blur(0px) brightness(0.9)',
      duration: 0.6,
      ease: 'none',
    }, 0);

    // ── Panels slide up — each must go fully off-screen ──
    // Each panel is (100/numPanels)% of viewport tall
    // Panel at original index i sits at top = i * (100/numPanels)%
    // To clear the screen: needs yPercent = -(original_index + 1) * 100
    // +50 extra margin to be safe
    // Bottom panels move first (reversed)
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

    // ── Hero text appears once panels are mostly gone ──
    tl.fromTo('.hero-content', {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    }, 0.5);

    // ── Brief hold at end ──
    tl.to({}, { duration: 0.1 });

    // Sections reveal
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    });

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

      {/* ═══ GARAGE DOOR HERO — pinned by GSAP ═══ */}
      <section ref={garageRef} className="h-screen overflow-hidden bg-[#111] relative">

        {/* Car behind the door */}
        <div className="hero-car absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop&q=90"
            alt=""
            className="w-full h-full object-cover will-change-[transform,filter]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* ── Garage door ── */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: PANELS }).map((_, i) => (
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
                    #3a3a3f 0%,
                    #2e2e33 3%,
                    #35353a 7%,
                    #313136 40%,
                    #2d2d32 60%,
                    #35353a 93%,
                    #2a2a2f 97%,
                    #323237 100%)`,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.06),
                    inset 0 -1px 0 rgba(0,0,0,0.3),
                    0 4px 16px rgba(0,0,0,0.4)
                  `,
                }}
              >
                {/* Embossed groove top */}
                <div className="absolute top-[28%] left-[2%] right-[2%] h-px bg-black/20" />
                <div className="absolute top-[calc(28%+1px)] left-[2%] right-[2%] h-px bg-white/[0.04]" />
                {/* Embossed groove bottom */}
                <div className="absolute top-[72%] left-[2%] right-[2%] h-px bg-black/20" />
                <div className="absolute top-[calc(72%+1px)] left-[2%] right-[2%] h-px bg-white/[0.04]" />

                {/* Side rails */}
                <div className="absolute inset-y-0 left-0 w-[2%] bg-gradient-to-r from-black/15 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-[2%] bg-gradient-to-l from-black/15 to-transparent" />

                {/* Windows on 2nd panel */}
                {i === 1 && (
                  <div className="absolute left-[8%] right-[8%] top-[15%] bottom-[15%] flex gap-1">
                    {Array.from({ length: 4 }).map((_, w) => (
                      <div key={w} className="flex-1 rounded-sm overflow-hidden relative"
                        style={{
                          background: 'linear-gradient(180deg, #1a1a1f 0%, #111115 50%, #1a1a1f 100%)',
                          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Handle on bottom panel */}
                {i === PANELS - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div className="w-16 h-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, #555, #3a3a3a, #555)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Logo on closed door ── */}
        <div className="logo-overlay absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-white/20 text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 font-sans">
            Bienvenue chez
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white/30 leading-none">
            GRECO
          </h1>
          <p className="text-xl md:text-3xl font-display font-light text-white/15 tracking-[0.25em] mt-1">
            AUTOGROUP
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <Mouse size={18} className="text-white/15" />
            <span className="text-white/15 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          </div>
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
                <Link to="/v5/vehicules"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors">
                  Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/v5/contact"
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
            <Link to="/v5/vehicules" className="hidden md:inline-flex items-center gap-2 text-white/30 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors">
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
          <Link to="/v5/vehicules" className="inline-flex items-center gap-2 text-white/30 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors">
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
            <Link to="/v5/notre-histoire" className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium border-b border-white/20 pb-2 hover:border-white/50 transition-colors">
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
              { title: 'Achat', desc: 'Estimation gratuite, rachat immédiat, paiement sécurisé.', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop', link: '/v5/services#achat' },
              { title: 'Vente', desc: 'Véhicules inspectés et garantis. Essai routier disponible.', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=800&h=600&fit=crop', link: '/v5/services#vente' },
              { title: 'Dépôt-vente', desc: 'Photos pro, diffusion, négociation — on gère tout.', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop', link: '/v5/services#depot-vente' },
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
            <Link to="/v5/vehicules" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors">
              Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v5/contact" className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/50 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeV5;
