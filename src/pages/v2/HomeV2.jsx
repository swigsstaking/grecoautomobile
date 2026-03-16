import { useState, useEffect, useCallback, useRef } from 'react';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, Phone, Car, Shield, Handshake, ChevronLeft, ChevronRight, Star, Quote, Zap, Clock, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockVehicules from '../../data/mockVehicules';

const HomeV2 = () => {
  const siteInfo = useSiteInfo();

  // Hero slider
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
      title: 'L\'excellence automobile',
      subtitle: 'à votre portée',
      description: 'Achat, vente et dépôt-vente de véhicules d\'occasion premium.',
    },
    {
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop',
      title: 'Des véhicules',
      subtitle: 'soigneusement sélectionnés',
      description: 'Chaque véhicule est inspecté et garanti pour votre tranquillité.',
    },
    {
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop',
      title: 'Un service',
      subtitle: 'personnalisé',
      description: 'Notre équipe vous accompagne de A à Z dans votre projet automobile.',
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [heroTransition, setHeroTransition] = useState(true);

  const nextHeroSlide = useCallback(() => {
    setHeroTransition(false);
    setTimeout(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
      setHeroTransition(true);
    }, 300);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextHeroSlide, 6000);
    return () => clearInterval(timer);
  }, [nextHeroSlide]);

  // Vehicle carousel
  const featuredVehicules = mockVehicules.filter(v => v.status === 'available').slice(0, 6);
  const scrollRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  // Reviews
  const reviews = [
    {
      name: 'Marc D.',
      rating: 5,
      text: 'Service impeccable ! J\'ai acheté ma voiture chez Greco Autogroup et tout s\'est passé parfaitement. Équipe professionnelle et à l\'écoute.',
      date: 'Il y a 2 semaines',
      avatar: 'MD',
    },
    {
      name: 'Sophie L.',
      rating: 5,
      text: 'Très satisfaite de la vente de mon ancien véhicule. Estimation juste et paiement rapide. Je recommande vivement !',
      date: 'Il y a 1 mois',
      avatar: 'SL',
    },
    {
      name: 'Jean-Pierre M.',
      rating: 5,
      text: 'Excellente expérience en dépôt-vente. Mon véhicule a été vendu rapidement et au bon prix. Merci à toute l\'équipe.',
      date: 'Il y a 3 semaines',
      avatar: 'JM',
    },
    {
      name: 'Laura K.',
      rating: 4,
      text: 'Bon accompagnement du début à la fin. Les véhicules sont en excellent état et les prix sont transparents.',
      date: 'Il y a 2 mois',
      avatar: 'LK',
    },
  ];

  const services = [
    {
      icon: Car,
      title: 'Achat',
      description: 'Nous rachetons votre véhicule au meilleur prix. Estimation gratuite et paiement immédiat.',
      link: '/v2/services#achat',
      features: ['Estimation gratuite', 'Paiement immédiat', 'Toutes marques'],
    },
    {
      icon: Shield,
      title: 'Vente',
      description: 'Découvrez notre sélection de véhicules d\'occasion soigneusement inspectés et garantis.',
      link: '/v2/services#vente',
      features: ['Véhicules inspectés', 'Garantie incluse', 'Essai possible'],
    },
    {
      icon: Handshake,
      title: 'Dépôt-vente',
      description: 'Confiez-nous la vente de votre véhicule. Nous nous occupons de tout.',
      link: '/v2/services#depot-vente',
      features: ['Prise en charge totale', 'Photos pro', 'Meilleur prix'],
    },
  ];

  const stats = [
    { icon: TrendingUp, value: '500+', label: 'Véhicules vendus' },
    { icon: Users, value: '98%', label: 'Clients satisfaits' },
    { icon: Award, value: '10+', label: 'Années d\'expérience' },
    { icon: Clock, value: '24h', label: 'Estimation gratuite' },
  ];

  const engagements = [
    { icon: CheckCircle, title: 'Transparence totale', description: 'Historique complet, prix clair, aucune surprise.' },
    { icon: Shield, title: 'Garantie sur chaque véhicule', description: 'Tous nos véhicules bénéficient d\'une garantie minimum de 12 mois.' },
    { icon: Zap, title: 'Réactivité', description: 'Estimation en 24h, réponse rapide à chaque demande.' },
    { icon: Award, title: 'Qualité certifiée', description: 'Contrôle mécanique et esthétique rigoureux avant chaque vente.' },
  ];

  return (
    <>
      <SEOHead page="home" />

      {/* Hero Slider - Full Screen */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/70 via-transparent to-transparent"></div>

        {/* Content */}
        <div className="container-site relative z-10">
          <div className="max-w-4xl">
            <div className={`transition-all duration-500 ${heroTransition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full px-5 py-2 mb-8">
                <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></div>
                <span className="text-primary-200 text-sm font-medium tracking-wide">Agence automobile de confiance</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-2 leading-[0.95]">
                {heroSlides[currentHeroSlide].title}
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-300 mb-8 leading-[0.95]">
                {heroSlides[currentHeroSlide].subtitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl font-light">
                {heroSlides[currentHeroSlide].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/v2/vehicules" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25">
                Voir nos véhicules
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/v2/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setHeroTransition(false); setTimeout(() => { setCurrentHeroSlide(i); setHeroTransition(true); }, 300); }}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                i === currentHeroSlide ? 'w-12 bg-primary-300' : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 z-10 text-white/40 text-xs uppercase tracking-widest hidden md:flex items-center gap-2">
          <div className="w-px h-8 bg-white/20"></div>
          Scroll
        </div>
      </section>

      {/* Stats - Glassmorphism floating bar */}
      <section className="relative -mt-20 z-20 pb-8">
        <div className="container-site">
          <div className="bg-primary-700/60 backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500/30 transition-colors">
                    <stat.icon size={22} className="text-primary-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-200/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services - Bento Grid */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
              Ce que nous proposons
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mt-4 mb-6">
              Nos Services
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Un accompagnement complet pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group relative bg-gradient-to-br from-primary-700/40 to-primary-800/40 backdrop-blur-sm border border-primary-500/15 rounded-3xl p-8 hover:border-primary-400/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary-500/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500/25 transition-all duration-300">
                    <service.icon size={30} className="text-primary-300" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-primary-200/70">
                        <CheckCircle size={14} className="text-primary-400" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary-300 font-medium text-sm group-hover:gap-3 transition-all">
                    En savoir plus <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles - Horizontal Scroll */}
      <section className="section bg-dark-section overflow-hidden">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                Dernières arrivées
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4">
                Véhicules en vedette
              </h2>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <button
                onClick={() => scrollCarousel(-1)}
                className="w-12 h-12 bg-primary-500/15 border border-primary-500/20 rounded-xl flex items-center justify-center hover:bg-primary-500/25 transition-colors cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft size={20} className="text-primary-300" />
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                className="w-12 h-12 bg-primary-500/15 border border-primary-500/20 rounded-xl flex items-center justify-center hover:bg-primary-500/25 transition-colors cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight size={20} className="text-primary-300" />
              </button>
              <Link to="/v2/vehicules" className="hidden md:inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-medium transition-colors ml-4">
                Voir tout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 px-[max(1rem,calc((100vw-80rem)/2+1rem))] scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredVehicules.map((v) => (
            <Link
              key={v._id}
              to={`/vehicules/${v._id}`}
              className="group flex-shrink-0 w-[340px] md:w-[380px] snap-start"
            >
              <div className="bg-gradient-to-br from-primary-700/30 to-dark-bg border border-primary-500/15 rounded-3xl overflow-hidden hover:border-primary-400/30 transition-all duration-500">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={v.images[0]}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary-500/80 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
                      CHF {v.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-primary-300 transition-colors mb-2">
                    {v.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">{v.year}</span>
                    <span className="bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">{v.mileage.toLocaleString()} km</span>
                    <span className="bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">{v.fuelType}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="container-site mt-6 md:hidden">
          <Link to="/v2/vehicules" className="btn-primary w-full justify-center">
            Voir tout le catalogue <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Engagements */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                Notre promesse
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4 mb-6">
                Nos Engagements
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                Chez Greco Autogroup, nous plaçons la confiance et la satisfaction de nos clients
                au cœur de chaque transaction. Voici ce qui nous distingue.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {engagements.map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary-700/20 backdrop-blur-sm border border-primary-500/10 rounded-2xl p-5 hover:border-primary-400/20 transition-all duration-300"
                  >
                    <item.icon size={22} className="text-primary-300 mb-3" />
                    <h3 className="font-display font-bold text-text-primary mb-1.5 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-primary-500/15">
                <img
                  src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=1000&fit=crop"
                  alt="Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating glass card */}
              <div className="absolute -bottom-8 -left-8 bg-primary-700/60 backdrop-blur-xl border border-primary-400/20 rounded-2xl p-6 shadow-2xl max-w-[240px]">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white text-sm font-medium">Note moyenne de 4.9/5</p>
                <p className="text-primary-200/60 text-xs mt-1">Basée sur les avis Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
              Témoignages
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4 mb-6">
              Avis de nos clients
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              La satisfaction de nos clients est notre meilleure récompense
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-primary-700/30 to-primary-800/20 backdrop-blur-sm border border-primary-500/15 rounded-3xl p-6 hover:border-primary-400/25 transition-all duration-300 group"
              >
                <Quote size={40} className="absolute top-4 right-4 text-primary-500/10 group-hover:text-primary-500/20 transition-colors" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-300 font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary text-sm">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-secondary/30'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed text-sm mb-4">
                  "{review.text}"
                </p>

                <p className="text-primary-300/40 text-xs">{review.date}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.google.com/maps/place/Greco+Autogroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-medium transition-colors"
            >
              Voir tous les avis sur Google <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=600&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 via-primary-600/90 to-primary-500/85 backdrop-blur-sm"></div>
        </div>
        <div className="container-site text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Vous cherchez le véhicule idéal ?
          </h2>
          <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto font-light">
            Parcourez notre sélection ou contactez-nous pour une demande personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/v2/vehicules" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 hover:shadow-lg">
              Voir nos véhicules
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            {siteInfo.contact?.phone && (
              <a href={`tel:${siteInfo.contact.phone}`} className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                <Phone size={20} />
                Appeler
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeV2;
