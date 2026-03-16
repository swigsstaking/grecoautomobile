import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { ArrowRight, Check } from 'lucide-react';

const ServicesV4 = () => {
  const siteInfo = useSiteInfo();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.hash]);

  const services = [
    { id: 'achat', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&h=1080&fit=crop&q=90', title: 'Achat de véhicules', subtitle: 'Nous rachetons votre véhicule', description: 'Estimation gratuite et rachat immédiat de votre véhicule, quelle que soit sa marque ou son modèle.', features: ['Estimation gratuite et sans engagement', 'Rachat immédiat au meilleur prix', 'Paiement rapide et sécurisé', 'Toutes marques et tous modèles', 'Prise en charge administrative', 'Déplacement à domicile possible'] },
    { id: 'vente', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=1920&h=1080&fit=crop&q=90', title: 'Vente de véhicules', subtitle: 'Des véhicules de qualité garantis', description: 'Véhicules d\'occasion soigneusement inspectés avec contrôle technique complet et garantie.', features: ['Véhicules soigneusement inspectés', 'Historique complet et transparent', 'Garantie sur chaque véhicule', 'Essai routier possible', 'Financement et leasing disponibles', 'Service après-vente dédié'] },
    { id: 'depot-vente', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&h=1080&fit=crop&q=90', title: 'Dépôt-vente', subtitle: 'Nous vendons pour vous', description: 'Photos professionnelles, annonces, négociation — nous gérons l\'intégralité du processus pour vous.', features: ['Prise en charge complète', 'Photos professionnelles', 'Diffusion multi-canaux', 'Gestion des visites et essais', 'Négociation au meilleur prix', 'Commission transparente'] },
  ];

  return (
    <>
      <SEOHead page="services" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=1080&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-white/10"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-16 md:pb-24 w-full">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Ce que nous proposons</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 leading-[0.9]">Nos Services</h1>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className="scroll-mt-20">
          <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 z-10 pb-10">
              <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
                <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-2">{service.subtitle}</p>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[0.95]">{service.title}</h2>
              </div>
            </div>
          </div>

          <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} py-16 md:py-24`}>
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                <div>
                  <p className="text-black/50 text-lg md:text-xl font-light leading-relaxed mb-10">{service.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/v4/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors">
                      Nous contacter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {siteInfo.contact?.phone && (
                      <a href={`tel:${siteInfo.contact.phone}`} className="inline-flex items-center gap-3 px-8 py-4 border border-black/20 text-gray-900 text-sm uppercase tracking-[0.15em] font-medium hover:border-black/40 transition-colors">Appeler</a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-black/20 text-xs uppercase tracking-[0.3em] mb-8">Les avantages</p>
                  <div className="space-y-5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-black/50 group">
                        <div className="w-5 h-5 border border-black/15 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-black/30 transition-colors">
                          <Check size={12} className="text-black/30" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ PROCESS ═══ */}
      <section className="bg-gray-50 border-t border-black/5 py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Processus</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-[0.95] mb-20">Simple et rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
            {[
              { step: '01', title: 'Contact', text: 'Appelez-nous ou envoyez un message.' },
              { step: '02', title: 'Estimation', text: 'Évaluation gratuite et prix juste.' },
              { step: '03', title: 'Accord', text: 'On finalise les détails ensemble.' },
              { step: '04', title: 'Transaction', text: 'Paiement immédiat, démarches incluses.' },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-black/5 text-5xl font-display font-bold">{item.step}</span>
                <h3 className="text-lg font-display font-bold text-gray-900 mt-3 mb-3">{item.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesV4;
