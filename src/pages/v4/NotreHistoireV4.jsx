import SEOHead from '../../components/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotreHistoireV4 = () => {
  return (
    <>
      <SEOHead page="notre-histoire" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&h=1080&fit=crop&q=90" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-white/10"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-16 md:pb-24 w-full">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Qui sommes-nous</p>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-gray-900 leading-[0.9]">
            Notre<br />Histoire
          </h1>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <div>
              <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-6">Notre mission</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-[0.95]">
                Plus qu'une agence, une vision.
              </h2>
            </div>
            <div className="lg:pt-4">
              <div className="space-y-6 text-black/50 text-lg font-light leading-relaxed">
                <p>Greco Autogroup est né de la conviction qu'acheter ou vendre un véhicule devrait être une expérience simple, transparente et agréable.</p>
                <p>Notre fondateur, passionné d'automobile depuis son plus jeune âge, a souhaité créer un espace où chaque client se sent écouté, conseillé et accompagné.</p>
                <p>Aujourd'hui, nous continuons avec la même philosophie : des véhicules de qualité à des prix justes, avec un service humain et personnalisé.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FULL BLEED IMAGE ═══ */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&h=800&fit=crop&q=90" alt="Passion automobile" className="w-full h-full object-cover" />
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-16">Notre parcours</p>

          <div className="space-y-24 md:space-y-32">
            {[
              { period: 'Les débuts', title: 'La naissance d\'une passion', text: 'Greco Autogroup naît de la passion d\'un homme pour l\'automobile. Ce qui a commencé comme un hobby est rapidement devenu une vocation.', image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1000&h=700&fit=crop', align: 'left' },
              { period: 'La croissance', title: 'Une réputation bâtie sur la confiance', text: 'Grâce à un service irréprochable et des véhicules de qualité, Greco Autogroup se fait un nom. Le bouche-à-oreille fait son œuvre.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&h=700&fit=crop', align: 'right' },
              { period: 'Aujourd\'hui', title: 'Un acteur incontournable', text: 'Reconnu pour notre expertise, notre fiabilité et notre engagement. Plus de 500 véhicules vendus et un taux de satisfaction de 98%.', image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1000&h=700&fit=crop', align: 'left' },
            ].map((item, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${item.align === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <p className="text-black/20 text-xs uppercase tracking-[0.3em] mb-4">{item.period}</p>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-[0.95] mb-6">{item.title}</h3>
                  <p className="text-black/40 text-lg font-light leading-relaxed">{item.text}</p>
                </div>
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="bg-gray-50 border-t border-black/5 py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Ce qui nous définit</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-[0.95] mb-20">Nos valeurs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5">
            {[
              { title: 'Passion', text: 'L\'automobile est notre passion. Chaque véhicule est sélectionné avec soin et enthousiasme.' },
              { title: 'Confiance', text: 'Des relations durables basées sur la transparence et l\'honnêteté.' },
              { title: 'Qualité', text: 'Contrôle rigoureux avant chaque vente. Votre satisfaction est notre priorité.' },
              { title: 'Expertise', text: 'Une connaissance approfondie du marché pour les meilleurs conseils.' },
            ].map((value, i) => (
              <div key={i} className="bg-gray-50 p-8 md:p-10">
                <span className="text-black/5 text-6xl font-display font-bold leading-none">0{i + 1}</span>
                <h3 className="text-xl font-display font-bold text-gray-900 mt-4 mb-3">{value.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-white border-t border-black/5 py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">Envie de nous rencontrer ?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/v4/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors">
              Nous contacter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v4/vehicules" className="inline-flex items-center gap-3 px-8 py-4 border border-black/20 text-gray-900 text-sm uppercase tracking-[0.15em] font-medium hover:border-black/40 transition-colors">
              Voir nos véhicules
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotreHistoireV4;
