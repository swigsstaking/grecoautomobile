import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, ArrowLeft, ChevronRight, Play, ArrowDown, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import seoData from '../../data/seo.json';
import mockVehicules from '../../data/mockVehicules';
import { useTranslation } from '../../i18n/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const HomeV3 = () => {
  const siteInfo = useSiteInfo();
  const { t } = useTranslation();

  const { data: apiVehicules, isSuccess: vehiclesLoaded } = useQuery({
    queryKey: ['vehicules-home', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/vehicles?siteId=${seoData.site.slug}`);
      if (!response.ok) throw new Error('Erreur');
      const json = await response.json();
      return json.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const allVehicules = vehiclesLoaded
    ? (apiVehicules && apiVehicules.length > 0 ? apiVehicules : mockVehicules)
    : [];
  const featuredVehicules = allVehicules.filter(v => v.status === 'available' || v.status !== 'sold');

  // Hero slides — images réelles du garage + véhicules API
  const grecoSlides = [
    {
      image: 'https://swigs.online/uploads/grecoautogroup/1775542051182-769409253.webp',
      label: t('home.hero1.label'),
      title: t('home.hero1.title'),
      subtitle: t('home.hero1.subtitle'),
      cta: t('home.hero1.cta'),
      link: '/vehicules',
    },
    {
      image: 'https://swigs.online/uploads/grecoautogroup/1775542049399-58977568.webp',
      label: t('home.hero2.label'),
      title: t('home.hero2.title'),
      subtitle: t('home.hero2.subtitle'),
      cta: t('home.hero2.cta'),
      link: '/notre-histoire',
    },
    {
      image: 'https://swigs.online/uploads/grecoautogroup/1775542047236-190922193.webp',
      label: t('home.hero3.label'),
      title: t('home.hero3.title'),
      subtitle: t('home.hero3.subtitle'),
      cta: t('home.hero3.cta'),
      link: '/contact',
    },
  ];
  const heroSlides = grecoSlides;

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
              <img src={slide.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 65%' }} />
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

      {/* ═══ CAR BRANDS MARQUEE ═══ */}
      <section className="bg-white py-10 overflow-hidden">
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          {/* Scrolling track — duplicated for seamless loop */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center shrink-0">
                {[
                  { name: 'Fiat', src: '/brands/fiat.svg' },
                  { name: 'Volkswagen', src: '/brands/vw.svg' },
                  { name: 'Škoda', src: '/brands/skoda.svg' },
                  { name: 'Kia', src: '/brands/kia.svg' },
                  { name: 'Suzuki', src: '/brands/suzuki.svg' },
                  { name: 'Alfa Romeo', src: '/brands/alfa-romeo.svg' },
                  { name: 'Renault', src: '/brands/renault.svg' },
                  { name: 'Peugeot', src: '/brands/peugeot.svg' },
                  { name: 'Audi', src: '/brands/audi.svg' },
                  { name: 'BMW', src: '/brands/bmw.svg' },
                  { name: 'Ford', src: '/brands/ford.svg' },
                  { name: 'Toyota', src: '/brands/toyota.svg' },
                ].map((brand) => (
                  <div key={`${setIndex}-${brand.name}`} className="mx-12 flex-shrink-0">
                    <img src={brand.src} alt={brand.name} className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <section className="bg-[#0d1117] pt-16 md:pt-20 pb-10 md:pb-12 border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-0 md:divide-x md:divide-white/10">
            <div className="md:pr-10 lg:pr-12">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">{t('home.strip.purchase')}</p>
              <p className="text-white text-base font-light leading-relaxed">
                {t('home.strip.purchase_desc')}
              </p>
            </div>
            <div className="md:px-10 lg:px-12">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">{t('home.strip.sale')}</p>
              <p className="text-white text-base font-light leading-relaxed">
                {t('home.strip.sale_desc')}
              </p>
            </div>
            <div className="md:px-10 lg:px-12">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">{t('home.strip.consignment')}</p>
              <p className="text-white text-base font-light leading-relaxed">
                {t('home.strip.consignment_desc')}
              </p>
            </div>
            <div className="md:pl-10 lg:pl-12">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">{t('home.strip.clean')}</p>
              <p className="text-white text-base font-light leading-relaxed">
                {t('home.strip.clean_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS MARQUEE ═══ */}
      <section className="bg-[#f0f0f0] py-12 md:py-14 overflow-hidden">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] text-center mb-8 font-medium">Nos partenaires de confiance</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f0f0f0] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f0f0f0] to-transparent z-10" />
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center shrink-0">
                {[
                  { name: 'Quality1', src: '/partners/quality1.png', href: 'https://www.quality1.ch', h: 'h-12' },
                  { name: 'AutoScout24', src: '/partners/autoscout24.png', href: 'https://www.autoscout24.ch', h: 'h-12' },
                  { name: 'Autolina', src: '/partners/autolina.svg', href: 'https://www.autolina.ch', h: 'h-9' },
                  { name: 'carVertical', src: '/partners/carvertical.svg', href: 'https://www.carvertical.com', h: 'h-8' },
                  { name: 'Cembra', src: '/partners/cembra.svg', href: 'https://www.cembra.ch', h: 'h-9' },
                  { name: 'Generali', src: '/partners/generali.svg', href: 'https://www.generali.ch', h: 'h-7' },
                ].map((partner) => (
                  <a
                    key={`${setIndex}-${partner.name}`}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-14 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  >
                    <img src={partner.src} alt={partner.name} className={`${partner.h} w-auto object-contain`} />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE SHOWCASE ═══ Cinematic product reveal */}
      <section className="bg-[#0d1117] border-t border-white/[0.03]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-20 md:pb-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('home.catalog')}</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95]">
                {t('home.our_models')}
              </h2>
            </div>
            <Link
              to="/vehicules"
              className="hidden md:inline-flex items-center gap-2 text-white/50 text-sm uppercase tracking-[0.15em] hover:text-white transition-colors"
            >
              {t('home.view_all')} <ArrowRight size={14} />
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
            {t('home.view_catalog')} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ Full bleed image + text overlay */}
      <section className="relative min-h-[80vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://swigs.online/uploads/grecoautogroup/1775542049074-367922835.webp" alt="Garage Greco Autogroup" className="w-full h-full object-cover" style={{ objectPosition: 'center 55%' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-6">{t('home.about_label')}</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-8">
              {t('home.about_title_1')}<br />
              {t('home.about_title_2')}
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              {t('home.about_desc')}
            </p>
            <Link
              to="/notre-histoire"
              className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium border-b border-white/20 pb-2 hover:border-white/50 transition-colors"
            >
              {t('home.about_cta')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ Clean editorial grid */}
      <section className="bg-[#0d1117] py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('home.services')}</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95] mb-20">
            {t('home.services_title_1')}<br />
            {t('home.services_title_2')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('home.services.purchase'),
                desc: t('home.services.purchase_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542049399-58977568.webp',
                link: '/services#achat',
              },
              {
                title: t('home.services.sale'),
                desc: t('home.services.sale_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542050418-111557555.webp',
                link: '/services#vente',
              },
              {
                title: t('home.services.consignment'),
                desc: t('home.services.consignment_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542048321-636143732.webp',
                link: '/services#depot-vente',
              },
              {
                title: t('home.services.custom_search'),
                desc: t('home.services.custom_search_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542047236-190922193.webp',
                link: '/services#recherche',
              },
              {
                title: t('home.services.mechanics'),
                desc: t('home.services.mechanics_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542049074-367922835.webp',
                link: '/services#mecanique',
              },
              {
                title: t('home.services.languages'),
                desc: t('home.services.languages_desc'),
                image: 'https://swigs.online/uploads/grecoautogroup/1775542050418-111557555.webp',
                link: '/contact',
              },
            ].map((service, i) => (
              <Link key={i} to={service.link} className="group block border border-white/10 rounded-sm overflow-hidden hover:border-white/20 transition-colors">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: 'center 60%' }} />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-white/80 transition-colors">{service.title}</h3>
                  <p className="text-white/40 leading-relaxed mb-5 text-sm">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 text-white/50 text-xs uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">{t('home.learn_more')} <ChevronRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ Cinematic final */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://swigs.online/uploads/grecoautogroup/1775542048321-636143732.webp" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 60%' }} />
          <div className="absolute inset-0 bg-[#0a1628]/75"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center w-full">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {t('home.cta_title')}
          </h2>
          <p className="text-white/50 text-lg font-light mb-10 max-w-xl mx-auto">
            {t('home.cta_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/vehicules"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
            >
              {t('home.cta_catalog')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/40 transition-colors"
            >
              {t('home.cta_contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeV3;
