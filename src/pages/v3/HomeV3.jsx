import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, ArrowLeft, ChevronRight, Play, ArrowDown, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import seoData from '../../data/seo.json';
import mockVehicules from '../../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const HomeV3 = () => {
  const siteInfo = useSiteInfo();

  const { data: apiVehicules } = useQuery({
    queryKey: ['vehicules-home', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/vehicles?siteId=${seoData.site.slug}`);
      if (!response.ok) throw new Error('Erreur');
      const json = await response.json();
      return json.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const allVehicules = (apiVehicules && apiVehicules.length > 0) ? apiVehicules : mockVehicules;
  const featuredVehicules = allVehicules.filter(v => v.status === 'available' || v.status !== 'sold');

  // Hero slides — dynamiques depuis les vehicules disponibles
  const heroSlides = featuredVehicules.slice(0, 3).map((v, i) => ({
    image: v.images?.[0] || null,
    label: i === 0 ? 'Dernier arrivage' : i === 1 ? 'Selection premium' : 'A decouvrir',
    title: v.brand || v.title || '',
    subtitle: v.model || '',
    cta: 'Decouvrir',
    link: `/vehicules/${v.slug || v._id || v.id}`,
  }));

  // Fallback si pas de vehicules
  if (heroSlides.length === 0) {
    heroSlides.push({
      image: null,
      label: 'Greco Autogroup',
      title: 'Achat & Vente',
      subtitle: 'Automobile',
      cta: 'Voir le catalogue',
      link: '/vehicules',
    });
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // Small delay to let CSS paint before revealing hero
    const t = setTimeout(() => setHeroReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, heroSlides.length, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Horizontal scroll
  const scrollContainerRef = useRef(null);

  return (
    <>
      <SEOHead page="home" />

      {/* ═══ HERO ═══ Full viewport cinematic slider */}
      <section className={`relative h-screen overflow-hidden bg-black transition-opacity duration-500 ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {slide.image ? (
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#061224]"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
          </div>
        ))}

        {/* Hero content — bottom aligned like Audi */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-24 md:pb-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-4 font-sans">
                {heroSlides[currentSlide].label}
              </p>
              <h1
                className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-white leading-[0.9] mb-2 transition-all duration-700"
                key={`title-${currentSlide}`}
              >
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white/60 mb-10">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link
                to={heroSlides[currentSlide].link}
                className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium hover:text-white/70 transition-colors"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide counter — right side */}
        <div className="absolute right-6 md:right-12 lg:right-24 bottom-24 md:bottom-32 z-10 flex flex-col items-end gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Slide ${i + 1}`}
            >
              <span className={`text-xs font-mono transition-colors ${i === currentSlide ? 'text-white' : 'text-white/30'}`}>
                0{i + 1}
              </span>
              <div className={`h-px transition-all duration-500 ${i === currentSlide ? 'w-16 bg-white' : 'w-8 bg-white/20 group-hover:bg-white/40'}`}></div>
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ArrowDown size={16} className="text-white/30" />
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <section className="bg-[#0d1117] py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/10">
            <div className="md:pr-16">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">Achat</p>
              <p className="text-white text-lg font-light leading-relaxed">
                Nous rachetons votre véhicule au meilleur prix. Estimation gratuite en 24h.
              </p>
            </div>
            <div className="md:px-16">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">Vente</p>
              <p className="text-white text-lg font-light leading-relaxed">
                Des véhicules soigneusement inspectés et garantis. Qualité certifiée.
              </p>
            </div>
            <div className="md:pl-16">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">Dépôt-vente</p>
              <p className="text-white text-lg font-light leading-relaxed">
                Confiez-nous la vente de votre véhicule. Nous nous occupons de tout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section className="bg-[#0d1117] border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-10 text-center">Nos partenaires</p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            <a href="https://www.quality1.ch" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <img
                src="/partners/quality1.svg"
                alt="Quality1 - Garantie automobile"
                className="h-12 md:h-14 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
              />
              <span className="text-white/30 text-xs uppercase tracking-[0.15em]">Garantie</span>
            </a>
            <a href="https://www.autoscout24.ch" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <img
                src="/partners/autoscout24.svg"
                alt="AutoScout24 - Plateforme automobile"
                className="h-12 md:h-14 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
              />
              <span className="text-white/30 text-xs uppercase tracking-[0.15em]">Diffusion</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE SHOWCASE ═══ Cinematic product reveal */}
      <section className="bg-[#0d1117]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Catalogue</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95]">
                Nos modèles
              </h2>
            </div>
            <Link
              to="/vehicules"
              className="hidden md:inline-flex items-center gap-2 text-white/50 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors"
            >
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Full-bleed horizontal scroll — Audi style */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-20 px-6 md:px-12 lg:px-24 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {featuredVehicules.map((v) => (
            <Link
              key={v._id || v.id}
              to={`/vehicules/${v.slug || v._id || v.id}`}
              className="group flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#161b22] mb-5">
                {v.images?.[0] ? (
                  <img
                    src={v.images[0]}
                    alt={v.title || v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car size={48} className="text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-lg font-display font-bold group-hover:text-white/80 transition-colors">
                    {v.title || v.name}
                  </h3>
                  <p className="text-white/30 text-sm mt-1">
                    {v.year} · {typeof v.mileage === 'number' ? v.mileage.toLocaleString() : v.mileage} km · {v.fuelType}
                  </p>
                </div>
                <p className="text-white font-display font-bold text-lg">
                  CHF {typeof v.price === 'number' ? v.price.toLocaleString() : v.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pb-20 md:hidden">
          <Link to="/vehicules" className="inline-flex items-center gap-2 text-white/50 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors">
            Voir tout le catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ Full bleed image + text overlay */}
      <section className="relative min-h-[80vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#13274a] to-[#0d1117]"></div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-6">Qui sommes-nous</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-8">
              L'automobile,<br />
              notre passion.
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Greco Autogroup, votre partenaire automobile de confiance.
              Achat, vente et depot-vente avec un service sur mesure.
            </p>
            <Link
              to="/notre-histoire"
              className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium border-b border-white/20 pb-2 hover:border-white/50 transition-colors"
            >
              Notre histoire
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ Clean editorial grid */}
      <section className="bg-[#0d1117] py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Services</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95] mb-20">
            Comment pouvons-nous<br />
            vous aider ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: 'Achat',
                desc: 'Vous souhaitez vendre votre véhicule ? Estimation gratuite, rachat immédiat, paiement sécurisé.',
                image: null,
                link: '/services#achat',
              },
              {
                title: 'Vente',
                desc: 'Découvrez notre sélection de véhicules inspectés et garantis. Essai routier disponible.',
                image: null,
                link: '/services#vente',
              },
              {
                title: 'Dépôt-vente',
                desc: 'Confiez-nous votre véhicule. Photos pro, diffusion, négociation — on gère tout.',
                image: null,
                link: '/services#depot-vente',
              },
            ].map((service, i) => (
              <Link
                key={i}
                to={service.link}
                className="group bg-[#0d1117] p-0 block"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#162d50] to-[#0d1117]"></div>
                  )}
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-white/80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed mb-6 text-sm">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white/50 text-xs uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">
                    En savoir plus <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ Cinematic final */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#13274a] to-[#061224]"></div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center w-full">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Trouvez votre prochain véhicule
          </h2>
          <p className="text-white/50 text-lg font-light mb-10 max-w-xl mx-auto">
            Parcourez notre catalogue ou contactez-nous pour une recherche personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/vehicules"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
            >
              Voir le catalogue
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/40 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeV3;
