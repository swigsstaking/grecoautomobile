import { useState, useEffect, useCallback, useRef } from 'react';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, ArrowDown, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockVehicules from '../../data/mockVehicules';

const HomeV4 = () => {
  const siteInfo = useSiteInfo();
  const featuredVehicules = mockVehicules.filter(v => v.status === 'available');

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&q=90',
      label: 'Nouvelle arrivée',
      title: 'Porsche Cayenne',
      subtitle: 'E-Hybrid',
      link: '/vehicules/mock-4',
    },
    {
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop&q=90',
      label: 'Sélection premium',
      title: 'BMW Série 3',
      subtitle: '320d M Sport',
      link: '/vehicules/mock-1',
    },
    {
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&h=1080&fit=crop&q=90',
      label: 'Hybride premium',
      title: 'Mercedes-Benz',
      subtitle: 'Classe C 300e',
      link: '/vehicules/mock-2',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const scrollContainerRef = useRef(null);

  const reviews = [
    { name: 'Marc D.', text: 'Service impeccable, équipe professionnelle et à l\'écoute. Je recommande.', rating: 5 },
    { name: 'Sophie L.', text: 'Estimation juste et paiement rapide. Très satisfaite de la vente.', rating: 5 },
    { name: 'Jean-Pierre M.', text: 'Mon véhicule a été vendu rapidement et au bon prix. Excellent.', rating: 5 },
    { name: 'Laura K.', text: 'Bon accompagnement, véhicules en excellent état, prix transparents.', rating: 4 },
  ];

  return (
    <>
      <SEOHead page="home" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-white/10"></div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-24 md:pb-32">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <p className="text-black/40 text-xs uppercase tracking-[0.3em] mb-4 font-sans">
                {heroSlides[currentSlide].label}
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-gray-900 leading-[0.9] mb-2">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-black/40 mb-10">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link
                to={heroSlides[currentSlide].link}
                className="group inline-flex items-center gap-3 text-gray-900 text-sm uppercase tracking-[0.2em] font-medium hover:text-black/60 transition-colors"
              >
                Découvrir
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute right-6 md:right-12 lg:right-24 bottom-24 md:bottom-32 z-10 flex flex-col items-end gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Slide ${i + 1}`}
            >
              <span className={`text-xs font-mono transition-colors ${i === currentSlide ? 'text-gray-900' : 'text-black/20'}`}>
                0{i + 1}
              </span>
              <div className={`h-px transition-all duration-500 ${i === currentSlide ? 'w-16 bg-gray-900' : 'w-8 bg-black/15 group-hover:bg-black/30'}`}></div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ArrowDown size={16} className="text-black/20" />
        </div>
      </section>

      {/* ═══ BRAND STRIP ═══ */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-black/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-black/10">
            <div className="md:pr-16">
              <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-3">Achat</p>
              <p className="text-gray-800 text-lg font-light leading-relaxed">
                Nous rachetons votre véhicule au meilleur prix. Estimation gratuite en 24h.
              </p>
            </div>
            <div className="md:px-16">
              <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-3">Vente</p>
              <p className="text-gray-800 text-lg font-light leading-relaxed">
                Des véhicules soigneusement inspectés et garantis. Qualité certifiée.
              </p>
            </div>
            <div className="md:pl-16">
              <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-3">Dépôt-vente</p>
              <p className="text-gray-800 text-lg font-light leading-relaxed">
                Confiez-nous la vente de votre véhicule. Nous nous occupons de tout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE SHOWCASE ═══ */}
      <section className="bg-white">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Catalogue</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[0.95]">
                Nos modèles
              </h2>
            </div>
            <Link to="/v4/vehicules" className="hidden md:inline-flex items-center gap-2 text-black/40 text-sm uppercase tracking-[0.15em] hover:text-gray-900 transition-colors">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-20 px-6 md:px-12 lg:px-24 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {featuredVehicules.map((v) => (
            <Link key={v._id} to={`/vehicules/${v._id}`} className="group flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-5">
                <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-gray-900 text-lg font-display font-bold group-hover:text-black/60 transition-colors">{v.name}</h3>
                  <p className="text-black/30 text-sm mt-1">{v.year} · {v.mileage.toLocaleString()} km · {v.fuelType}</p>
                </div>
                <p className="text-gray-900 font-display font-bold text-lg">CHF {v.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pb-20 md:hidden">
          <Link to="/v4/vehicules" className="inline-flex items-center gap-2 text-black/40 text-sm uppercase tracking-[0.15em] hover:text-gray-900 transition-colors">
            Voir tout le catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&h=1080&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-6">Qui sommes-nous</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-[0.95] mb-8">
              L'automobile,<br />notre passion.
            </h2>
            <p className="text-black/50 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Depuis plus de 10 ans, Greco Autogroup accompagne ses clients avec expertise, transparence et un service personnalisé.
            </p>
            <Link to="/v4/notre-histoire" className="group inline-flex items-center gap-3 text-gray-900 text-sm uppercase tracking-[0.2em] font-medium border-b border-black/20 pb-2 hover:border-black/50 transition-colors">
              Notre histoire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Services</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[0.95] mb-20">
            Comment pouvons-nous<br />vous aider ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5">
            {[
              { title: 'Achat', desc: 'Estimation gratuite, rachat immédiat, paiement sécurisé.', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop', link: '/v4/services#achat' },
              { title: 'Vente', desc: 'Véhicules inspectés et garantis. Essai routier disponible.', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=800&h=600&fit=crop', link: '/v4/services#vente' },
              { title: 'Dépôt-vente', desc: 'Photos pro, diffusion, négociation — on gère tout.', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop', link: '/v4/services#depot-vente' },
            ].map((service, i) => (
              <Link key={i} to={service.link} className="group bg-white block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-black/60 transition-colors">{service.title}</h3>
                  <p className="text-black/40 leading-relaxed mb-6 text-sm">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 text-black/40 text-xs uppercase tracking-[0.2em] group-hover:text-gray-900 transition-colors">
                    En savoir plus <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="bg-gray-50 border-t border-black/5 py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Avis clients</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-[0.95] mb-16">
            Ce qu'ils disent de nous
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {reviews.map((review, i) => (
              <div key={i}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? 'text-gray-900 fill-gray-900' : 'text-black/10'} />
                  ))}
                </div>
                <p className="text-black/50 text-sm leading-relaxed mb-6 font-light italic">"{review.text}"</p>
                <p className="text-gray-900 text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <a href="https://www.google.com/maps/place/Greco+Autogroup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black/30 text-xs uppercase tracking-[0.2em] hover:text-black/60 transition-colors">
              Voir tous les avis sur Google <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=800&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/70"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center w-full">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Trouvez votre prochain véhicule
          </h2>
          <p className="text-black/40 text-lg font-light mb-10 max-w-xl mx-auto">
            Parcourez notre catalogue ou contactez-nous pour une recherche personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/v4/vehicules" className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors">
              Voir le catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v4/contact" className="inline-flex items-center gap-3 px-8 py-4 border border-black/20 text-gray-900 text-sm uppercase tracking-[0.15em] font-medium hover:border-black/40 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeV4;
