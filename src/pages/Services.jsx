import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Car, ShieldCheck, Handshake, ArrowRight, CheckCircle, Phone } from 'lucide-react';

const Services = () => {
  const siteInfo = useSiteInfo();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.hash]);

  const services = [
    {
      id: 'achat',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop',
      title: 'Achat de véhicules',
      subtitle: 'Nous rachetons votre véhicule',
      description: 'Vous souhaitez vendre votre véhicule rapidement et au meilleur prix ? Greco Autogroup vous propose une estimation gratuite et un rachat immédiat de votre véhicule, quelle que soit sa marque ou son modèle.',
      features: [
        'Estimation gratuite et sans engagement',
        'Rachat immédiat au meilleur prix',
        'Paiement rapide et sécurisé',
        'Toutes marques et tous modèles',
        'Prise en charge des démarches administratives',
        'Déplacement possible à votre domicile',
      ],
      cta: 'Obtenir une estimation',
    },
    {
      id: 'vente',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=800&h=500&fit=crop',
      title: 'Vente de véhicules',
      subtitle: 'Des véhicules de qualité garantis',
      description: 'Découvrez notre sélection de véhicules d\'occasion soigneusement inspectés et préparés. Chaque véhicule bénéficie d\'un contrôle technique complet et d\'une garantie pour votre tranquillité d\'esprit.',
      features: [
        'Véhicules soigneusement inspectés',
        'Historique complet et transparent',
        'Garantie sur chaque véhicule',
        'Essai routier possible',
        'Financement et leasing disponibles',
        'Service après-vente dédié',
      ],
      cta: 'Voir nos véhicules',
      ctaLink: '/vehicules',
    },
    {
      id: 'depot-vente',
      icon: Handshake,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop',
      title: 'Dépôt-vente',
      subtitle: 'Nous vendons pour vous',
      description: 'Vous souhaitez vendre votre véhicule mais manquez de temps ? Confiez-nous la vente de votre véhicule. Nous nous occupons de tout : photos professionnelles, annonces, négociation et vente. Vous n\'avez rien à faire, si ce n\'est encaisser le paiement.',
      features: [
        'Prise en charge complète de la vente',
        'Photos professionnelles de votre véhicule',
        'Diffusion sur nos canaux de vente',
        'Gestion des visites et essais',
        'Négociation au meilleur prix',
        'Commission transparente et compétitive',
      ],
      cta: 'En savoir plus',
    },
  ];

  return (
    <>
      <SEOHead page="services" />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=800&fit=crop"
            alt="Services automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/50"></div>
        </div>
        <div className="container-site relative z-10">
          <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-4">
            Ce que nous proposons
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Un accompagnement complet pour tous vos besoins automobiles.
            Achat, vente ou dépôt-vente, nous avons la solution.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section ${index % 2 === 0 ? 'bg-dark-bg' : 'bg-dark-section'} scroll-mt-28`}
        >
          <div className="container-site">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
              {/* Content */}
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="w-14 h-14 bg-primary-500/15 rounded-xl flex items-center justify-center mb-6">
                  <service.icon size={28} className="text-primary-300" />
                </div>
                <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-2">
                  {service.subtitle}
                </p>
                <h2 className="section-title text-4xl mb-6">
                  {service.title}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={service.ctaLink || '/contact'}
                    className="btn-primary"
                  >
                    {service.cta}
                    <ArrowRight size={18} />
                  </Link>
                  {siteInfo.contact?.phone && (
                    <a href={`tel:${siteInfo.contact.phone}`} className="btn-outline">
                      <Phone size={18} />
                      Appeler
                    </a>
                  )}
                </div>
              </div>

              {/* Features + Image */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl overflow-hidden border border-primary-600/20 mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="bg-dark-section border border-primary-600/20 rounded-2xl p-8">
                  <h3 className="text-lg font-display font-bold text-text-primary mb-6">
                    Les avantages
                  </h3>
                  <div className="space-y-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=600&fit=crop"
            alt="Véhicule de luxe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 to-primary-500/90"></div>
        </div>
        <div className="container-site text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Un projet automobile ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Quel que soit votre besoin, notre équipe est à votre disposition
            pour vous accompagner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-4">
              Nous contacter
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
