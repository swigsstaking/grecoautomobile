import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, Check } from 'lucide-react';

const ServicesV3 = () => {
  const siteInfo = useSiteInfo();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.hash]);

  const services = [
    {
      id: 'achat',
      image: 'https://swigs.online/uploads/grecoautogroup/1775542049399-58977568.webp',
      title: 'Achat de véhicules',
      subtitle: 'Nous rachetons votre véhicule',
      description: 'Vous souhaitez vendre votre véhicule rapidement et au meilleur prix ? Greco Autogroup vous propose une estimation gratuite et un rachat immédiat, quelle que soit la marque ou le modèle.',
      features: [
        'Estimation gratuite et sans engagement',
        'Rachat immédiat au meilleur prix',
        'Paiement rapide et sécurisé',
        'Toutes marques et tous modèles',
        'Prise en charge administrative',
        'Déplacement à domicile possible',
      ],
    },
    {
      id: 'vente',
      image: 'https://swigs.online/uploads/grecoautogroup/1775542050418-111557555.webp',
      title: 'Vente de véhicules',
      subtitle: 'Des véhicules de qualité garantis',
      description: 'Découvrez notre sélection de véhicules d\'occasion soigneusement inspectés. Chaque véhicule bénéficie d\'un contrôle technique complet et d\'une garantie.',
      features: [
        'Véhicules soigneusement inspectés',
        'Historique complet et transparent',
        'Garantie sur chaque véhicule',
        'Essai routier possible',
        'Financement et leasing disponibles',
        'Service après-vente dédié',
      ],
    },
    {
      id: 'depot-vente',
      image: 'https://swigs.online/uploads/grecoautogroup/1775542048321-636143732.webp',
      title: 'Dépôt-vente',
      subtitle: 'Nous vendons pour vous',
      description: 'Vous manquez de temps ? Confiez-nous la vente de votre véhicule. Photos professionnelles, annonces, négociation — nous gérons l\'intégralité du processus.',
      features: [
        'Prise en charge complète',
        'Photos professionnelles',
        'Diffusion multi-canaux',
        'Gestion des visites et essais',
        'Négociation au meilleur prix',
        'Commission transparente',
      ],
    },
  ];

  return (
    <>
      <SEOHead page="services" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://swigs.online/uploads/grecoautogroup/1775542051182-769409253.webp" alt="Greco Autogroup" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-16 md:pb-24 w-full">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Ce que nous proposons</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9]">
            Nos Services
          </h1>
        </div>
      </section>

      {/* ═══ SERVICES ═══ Cinematic sections */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className="scroll-mt-20">
          {/* Full bleed image */}
          <div className="relative h-[50vh] min-h-[350px] bg-black overflow-hidden">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#162d50] to-[#0d1117]"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 z-10 pb-10">
              <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
                <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-2">{service.subtitle}</p>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.95]">
                  {service.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#0d1117] py-16 md:py-24">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                <div>
                  <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-10">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
                    >
                      Nous contacter
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {siteInfo.contact?.phone && (
                      <a
                        href={`tel:${siteInfo.contact.phone}`}
                        className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/40 transition-colors"
                      >
                        Appeler
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-white/20 text-xs uppercase tracking-[0.3em] mb-8">Les avantages</p>
                  <div className="space-y-5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-white/60 group">
                        <div className="w-5 h-5 border border-white/20 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors">
                          <Check size={12} className="text-white/40" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          {index < services.length - 1 && (
            <div className="bg-[#0d1117]">
              <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="h-px bg-white/5"></div>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* ═══ PROCESS ═══ */}
      <section className="bg-[#0d1117] border-t border-white/5 py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Processus</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[0.95] mb-20">
            Simple et rapide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
            {[
              { step: '01', title: 'Contact', text: 'Appelez-nous ou envoyez un message avec les détails de votre véhicule.' },
              { step: '02', title: 'Estimation', text: 'Nous évaluons votre véhicule gratuitement et proposons un prix juste.' },
              { step: '03', title: 'Accord', text: 'Si notre offre vous convient, nous finalisons ensemble les détails.' },
              { step: '04', title: 'Transaction', text: 'Paiement immédiat. Toutes les démarches administratives sont prises en charge.' },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-white/10 text-5xl font-display font-bold">{item.step}</span>
                <h3 className="text-lg font-display font-bold text-white mt-3 mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesV3;
