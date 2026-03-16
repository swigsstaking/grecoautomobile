import { useState, useEffect, useCallback } from 'react';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { ArrowRight, Phone, Car, Shield, Handshake, ChevronRight, Star, ChevronLeft, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockVehicules from '../data/mockVehicules';

const Home = () => {
  const siteInfo = useSiteInfo();

  const featuredVehicules = mockVehicules
    .filter(v => v.status === 'available')
    .slice(0, 6);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
  const maxSlide = Math.max(0, featuredVehicules.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Reviews data
  const reviews = [
    {
      name: 'Marc D.',
      rating: 5,
      text: 'Service impeccable ! J\'ai acheté ma voiture chez Greco Autogroup et tout s\'est passé parfaitement. Équipe professionnelle et à l\'écoute.',
      date: 'Il y a 2 semaines',
    },
    {
      name: 'Sophie L.',
      rating: 5,
      text: 'Très satisfaite de la vente de mon ancien véhicule. Estimation juste et paiement rapide. Je recommande vivement !',
      date: 'Il y a 1 mois',
    },
    {
      name: 'Jean-Pierre M.',
      rating: 5,
      text: 'Excellente expérience en dépôt-vente. Mon véhicule a été vendu rapidement et au bon prix. Merci à toute l\'équipe.',
      date: 'Il y a 3 semaines',
    },
    {
      name: 'Laura K.',
      rating: 4,
      text: 'Bon accompagnement du début à la fin. Les véhicules sont en excellent état et les prix sont transparents.',
      date: 'Il y a 2 mois',
    },
  ];

  const services = [
    {
      icon: Car,
      title: 'Achat',
      description: 'Nous rachetons votre véhicule au meilleur prix. Estimation gratuite et paiement immédiat.',
      link: '/services#achat',
    },
    {
      icon: Shield,
      title: 'Vente',
      description: 'Découvrez notre sélection de véhicules d\'occasion soigneusement inspectés et garantis.',
      link: '/services#vente',
    },
    {
      icon: Handshake,
      title: 'Dépôt-vente',
      description: 'Confiez-nous la vente de votre véhicule. Nous nous occupons de tout, vous recevez le paiement.',
      link: '/services#depot-vente',
    },
  ];

  const stats = [
    { value: '500+', label: 'Véhicules vendus' },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '10+', label: 'Années d\'expérience' },
    { value: '24h', label: 'Estimation gratuite' },
  ];

  return (
    <>
      <SEOHead page="home" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
            alt="Voiture de luxe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/40"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-4">
              Agence automobile de confiance
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-6 leading-tight">
              L'excellence<br />
              <span className="text-primary-300">automobile</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-10 leading-relaxed max-w-2xl">
              Achat, vente et dépôt-vente de véhicules d'occasion de qualité.
              Un service personnalisé pour chaque client.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/vehicules" className="btn-primary text-lg px-8 py-4">
                Voir nos véhicules
                <ArrowRight size={22} />
              </Link>
              <Link to="/contact" className="btn-outline text-lg px-8 py-4">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark-section border-y border-primary-600/20">
        <div className="container-site py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
              Ce que nous proposons
            </p>
            <h2 className="section-title text-4xl md:text-5xl">
              Nos Services
            </h2>
            <p className="section-subtitle mx-auto">
              Un accompagnement complet pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-dark-section border border-primary-600/20 rounded-2xl p-8 hover:border-primary-500/40 hover:bg-primary-700/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-500/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/25 transition-colors">
                  <service.icon size={28} className="text-primary-300" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-300 text-sm font-medium group-hover:gap-2 transition-all">
                  En savoir plus <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles Carousel */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
                Dernières arrivées
              </p>
              <h2 className="section-title text-4xl">
                Véhicules en vedette
              </h2>
            </div>
            <Link to="/vehicules" className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-medium mt-4 md:mt-0 transition-colors">
              Voir tout le catalogue <ArrowRight size={18} />
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
              >
                {featuredVehicules.map((v) => (
                  <div
                    key={v._id}
                    className="w-full md:w-1/3 flex-shrink-0 px-3"
                  >
                    <Link
                      to={`/vehicules/${v._id}`}
                      className="group block bg-dark-bg border border-primary-600/20 rounded-2xl overflow-hidden hover:border-primary-500/40 transition-all duration-300"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={v.images[0]}
                          alt={v.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-primary-300 transition-colors mb-2">
                          {v.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-text-secondary mb-4">
                          <span>{v.year}</span>
                          <span>·</span>
                          <span>{v.mileage.toLocaleString()} km</span>
                          <span>·</span>
                          <span>{v.fuelType}</span>
                        </div>
                        <div className="pt-4 border-t border-primary-600/20">
                          <span className="text-xl font-display font-bold text-primary-300">
                            CHF {v.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {featuredVehicules.length > itemsPerView && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-primary-500/90 hover:bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10 cursor-pointer"
                  aria-label="Véhicule précédent"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-primary-500/90 hover:bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10 cursor-pointer"
                  aria-label="Véhicule suivant"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === currentSlide
                      ? 'bg-primary-300 w-8'
                      : 'bg-primary-600/40 hover:bg-primary-500/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
                Pourquoi nous choisir
              </p>
              <h2 className="section-title text-4xl">
                Une expérience automobile unique
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Chez Greco Autogroup, chaque véhicule est soigneusement sélectionné et inspecté.
                Nous mettons un point d'honneur à offrir un service transparent et personnalisé.
              </p>
              <div className="space-y-4">
                {[
                  'Véhicules soigneusement inspectés et garantis',
                  'Prix transparents sans surprises',
                  'Accompagnement personnalisé de A à Z',
                  'Estimation gratuite de votre véhicule',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star size={14} className="text-primary-300" />
                    </div>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-primary-600/20">
                <img
                  src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop"
                  alt="Showroom automobile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white rounded-xl p-6 shadow-2xl">
                <div className="text-3xl font-display font-bold">10+</div>
                <div className="text-sm text-primary-100">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Clients / Reviews */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
              Témoignages
            </p>
            <h2 className="section-title text-4xl md:text-5xl">
              Avis de nos clients
            </h2>
            <p className="section-subtitle mx-auto">
              La satisfaction de nos clients est notre meilleure récompense
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-primary-600/20 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 relative"
              >
                <Quote size={32} className="text-primary-500/15 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-secondary/30'}
                    />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-5 text-sm">
                  "{review.text}"
                </p>
                <div className="pt-4 border-t border-primary-600/20">
                  <p className="font-display font-bold text-text-primary">{review.name}</p>
                  <p className="text-text-secondary text-xs mt-1">{review.date}</p>
                </div>
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

      {/* CTA Section */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=600&fit=crop"
            alt="Route automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 to-primary-500/90"></div>
        </div>
        <div className="container-site text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Vous cherchez le véhicule idéal ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Parcourez notre sélection ou contactez-nous pour une demande personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicules" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-4">
              Voir nos véhicules
              <ArrowRight size={20} />
            </Link>
            {siteInfo.contact?.phone && (
              <a href={`tel:${siteInfo.contact.phone}`} className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4">
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

export default Home;
