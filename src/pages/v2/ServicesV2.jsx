import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { Car, ShieldCheck, Handshake, ArrowRight, CheckCircle, Phone, Banknote, Camera, FileText, Wrench, UserCheck, Truck } from 'lucide-react';

const ServicesV2 = () => {
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
        { icon: Banknote, text: 'Estimation gratuite et sans engagement' },
        { icon: CheckCircle, text: 'Rachat immédiat au meilleur prix' },
        { icon: ShieldCheck, text: 'Paiement rapide et sécurisé' },
        { icon: Car, text: 'Toutes marques et tous modèles' },
        { icon: FileText, text: 'Prise en charge des démarches administratives' },
        { icon: Truck, text: 'Déplacement possible à votre domicile' },
      ],
      cta: 'Obtenir une estimation',
      gradient: 'from-blue-600/20 via-primary-700/20 to-transparent',
    },
    {
      id: 'vente',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=800&h=500&fit=crop',
      title: 'Vente de véhicules',
      subtitle: 'Des véhicules de qualité garantis',
      description: 'Découvrez notre sélection de véhicules d\'occasion soigneusement inspectés et préparés. Chaque véhicule bénéficie d\'un contrôle technique complet et d\'une garantie pour votre tranquillité d\'esprit.',
      features: [
        { icon: Wrench, text: 'Véhicules soigneusement inspectés' },
        { icon: FileText, text: 'Historique complet et transparent' },
        { icon: ShieldCheck, text: 'Garantie sur chaque véhicule' },
        { icon: Car, text: 'Essai routier possible' },
        { icon: Banknote, text: 'Financement et leasing disponibles' },
        { icon: UserCheck, text: 'Service après-vente dédié' },
      ],
      cta: 'Voir nos véhicules',
      ctaLink: '/v2/vehicules',
      gradient: 'from-emerald-600/20 via-primary-700/20 to-transparent',
    },
    {
      id: 'depot-vente',
      icon: Handshake,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop',
      title: 'Dépôt-vente',
      subtitle: 'Nous vendons pour vous',
      description: 'Vous souhaitez vendre votre véhicule mais manquez de temps ? Confiez-nous la vente de votre véhicule. Nous nous occupons de tout : photos professionnelles, annonces, négociation et vente.',
      features: [
        { icon: CheckCircle, text: 'Prise en charge complète de la vente' },
        { icon: Camera, text: 'Photos professionnelles de votre véhicule' },
        { icon: FileText, text: 'Diffusion sur nos canaux de vente' },
        { icon: UserCheck, text: 'Gestion des visites et essais' },
        { icon: Banknote, text: 'Négociation au meilleur prix' },
        { icon: ShieldCheck, text: 'Commission transparente et compétitive' },
      ],
      cta: 'En savoir plus',
      gradient: 'from-amber-600/20 via-primary-700/20 to-transparent',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Contactez-nous', description: 'Appelez ou envoyez-nous un message avec les détails de votre véhicule.' },
    { step: '02', title: 'Estimation', description: 'Nous évaluons votre véhicule gratuitement et vous proposons un prix juste.' },
    { step: '03', title: 'Accord', description: 'Si notre offre vous convient, nous finalisons les détails ensemble.' },
    { step: '04', title: 'Transaction', description: 'Paiement immédiat et prise en charge de toutes les démarches administratives.' },
  ];

  return (
    <>
      <SEOHead page="services" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=1080&fit=crop"
            alt="Services automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 to-transparent"></div>
        </div>
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full px-5 py-2 mb-8">
              <span className="text-primary-200 text-sm font-medium tracking-wide">Ce que nous proposons</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[0.95]">
              Nos<br />
              <span className="text-primary-300">Services</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-light leading-relaxed">
              Un accompagnement complet pour tous vos besoins automobiles.
              Achat, vente ou dépôt-vente, nous avons la solution.
            </p>
          </div>
        </div>

        {/* Quick nav */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container-site">
            <div className="flex gap-1 bg-primary-700/40 backdrop-blur-xl border border-primary-500/15 rounded-t-2xl p-2 max-w-lg">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-primary-200 hover:bg-primary-500/20 hover:text-white transition-all flex-1 justify-center"
                >
                  <s.icon size={16} />
                  {s.id === 'depot-vente' ? 'Dépôt' : s.title.split(' ')[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section scroll-mt-28 ${index % 2 === 0 ? 'bg-dark-bg' : 'bg-dark-section'}`}
        >
          <div className="container-site">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
              index % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}>
              {/* Content */}
              <div>
                <div className="w-16 h-16 bg-primary-500/15 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon size={30} className="text-primary-300" />
                </div>
                <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                  {service.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-3 mb-6">
                  {service.title}
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg mb-10">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={service.ctaLink || '/v2/contact'}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-all duration-300"
                  >
                    {service.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {siteInfo.contact?.phone && (
                    <a href={`tel:${siteInfo.contact.phone}`} className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary-500/30 text-primary-300 font-semibold rounded-xl hover:bg-primary-500/10 transition-all duration-300">
                      <Phone size={18} />
                      Appeler
                    </a>
                  )}
                </div>
              </div>

              {/* Image + Features */}
              <div>
                <div className="rounded-3xl overflow-hidden border border-primary-500/15 mb-6 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} pointer-events-none`}></div>
                </div>
                <div className="bg-gradient-to-br from-primary-700/30 to-primary-800/20 backdrop-blur-sm border border-primary-500/15 rounded-3xl p-8">
                  <h3 className="text-lg font-display font-bold text-text-primary mb-6">
                    Les avantages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 bg-primary-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/25 transition-colors">
                          <feature.icon size={16} className="text-primary-400" />
                        </div>
                        <span className="text-text-secondary text-sm leading-relaxed">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Steps */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
              Comment ça marche
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4 mb-6">
              Un processus simple
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-primary-700/30 to-primary-800/20 backdrop-blur-sm border border-primary-500/15 rounded-3xl p-6 hover:border-primary-400/25 transition-all duration-300 h-full">
                  <span className="text-5xl font-display font-bold text-primary-500/20 group-hover:text-primary-500/30 transition-colors">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-display font-bold text-text-primary mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight size={18} className="text-primary-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=600&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 via-primary-600/90 to-primary-500/85 backdrop-blur-sm"></div>
        </div>
        <div className="container-site text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Un projet automobile ?
          </h2>
          <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto font-light">
            Quel que soit votre besoin, notre équipe est à votre disposition
            pour vous accompagner.
          </p>
          <Link to="/v2/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 hover:shadow-lg">
            Nous contacter
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesV2;
