import SEOHead from '../../components/SEOHead';
import { Car, Users, Award, Heart, Target, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotreHistoireV2 = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'L\'automobile est notre passion depuis toujours. Chaque véhicule que nous proposons est sélectionné avec soin et enthousiasme.',
      color: 'from-red-500/20 to-red-600/5',
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'Nous construisons des relations durables avec nos clients, basées sur la transparence et l\'honnêteté.',
      color: 'from-blue-500/20 to-blue-600/5',
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Chaque véhicule passe par un contrôle rigoureux avant d\'être proposé à la vente. Votre satisfaction est notre priorité.',
      color: 'from-amber-500/20 to-amber-600/5',
    },
    {
      icon: Car,
      title: 'Expertise',
      description: 'Notre équipe possède une expertise approfondie du marché automobile, vous garantissant les meilleurs conseils.',
      color: 'from-emerald-500/20 to-emerald-600/5',
    },
  ];

  const timeline = [
    {
      year: 'Les débuts',
      title: 'La naissance d\'une passion',
      description: 'Greco Autogroup naît de la passion d\'un homme pour l\'automobile. Ce qui a commencé comme un hobby est rapidement devenu une vocation. Chaque véhicule raconte une histoire, et nous avons voulu être ceux qui la transmettent.',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    },
    {
      year: 'La croissance',
      title: 'Une réputation qui grandit',
      description: 'Grâce à un service irréprochable et des véhicules de qualité, Greco Autogroup se fait un nom dans le monde de l\'automobile d\'occasion. Le bouche-à-oreille fait son œuvre, les clients reviennent et nous recommandent.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
    },
    {
      year: 'Aujourd\'hui',
      title: 'Un acteur incontournable',
      description: 'Aujourd\'hui, Greco Autogroup est reconnu pour son expertise, sa fiabilité et son engagement envers chaque client. Nous continuons à grandir avec la même philosophie : proposer des véhicules de qualité à des prix justes.',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop',
    },
  ];

  return (
    <>
      <SEOHead page="notre-histoire" />

      {/* Hero - Full width immersive */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&h=1080&fit=crop"
            alt="Garage automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 to-transparent"></div>
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full px-5 py-2 mb-8">
              <span className="text-primary-200 text-sm font-medium tracking-wide">Qui sommes-nous</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[0.95]">
              Notre<br />
              <span className="text-primary-300">Histoire</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-light leading-relaxed">
              Découvrez l'histoire de Greco Autogroup, notre passion pour l'automobile
              et notre engagement envers la satisfaction de nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Split layout */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                Notre mission
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4 mb-8">
                Plus qu'une agence,<br />
                <span className="text-primary-300">une passion</span>
              </h2>
              <div className="space-y-5 text-text-secondary leading-relaxed text-lg">
                <p>
                  Greco Autogroup est né de la conviction qu'acheter ou vendre un véhicule devrait être
                  une expérience <span className="text-text-primary font-medium">simple, transparente et agréable</span>.
                </p>
                <p>
                  Notre fondateur, passionné d'automobile depuis son plus jeune âge, a souhaité créer
                  un espace où chaque client se sent écouté, conseillé et accompagné dans ses démarches.
                </p>
                <p>
                  Aujourd'hui, Greco Autogroup continue de grandir avec la même philosophie :
                  proposer des <span className="text-text-primary font-medium">véhicules de qualité à des prix justes</span>,
                  avec un service humain et personnalisé.
                </p>
              </div>

              {/* Mission & Vision pills */}
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="flex items-center gap-3 bg-primary-700/20 backdrop-blur-sm border border-primary-500/10 rounded-2xl px-5 py-3">
                  <Target size={20} className="text-primary-300" />
                  <div>
                    <p className="text-text-primary font-bold text-sm">Notre Mission</p>
                    <p className="text-text-secondary text-xs">Rendre l'automobile accessible à tous</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-primary-700/20 backdrop-blur-sm border border-primary-500/10 rounded-2xl px-5 py-3">
                  <Eye size={20} className="text-primary-300" />
                  <div>
                    <p className="text-text-primary font-bold text-sm">Notre Vision</p>
                    <p className="text-text-secondary text-xs">Devenir la référence automobile en Suisse</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-primary-500/15">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=1000&fit=crop"
                  alt="Passion automobile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white rounded-2xl p-6 shadow-2xl shadow-primary-500/20">
                <div className="text-4xl font-display font-bold">10+</div>
                <div className="text-primary-100 text-sm">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Alternating layout */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="text-center mb-20">
            <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
              Notre parcours
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4">
              Les étapes clés
            </h2>
          </div>

          <div className="space-y-20">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <div className="inline-flex items-center gap-3 bg-primary-500/15 border border-primary-500/20 rounded-full px-5 py-2 mb-6">
                    <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                    <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
                <div className="aspect-[3/2] rounded-3xl overflow-hidden border border-primary-500/15">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values - Glass cards */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
              Ce qui nous définit
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-4 mb-6">
              Nos Valeurs
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Des principes qui guident chacune de nos actions au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${value.color} backdrop-blur-sm border border-primary-500/10 rounded-3xl p-8 hover:border-primary-400/20 transition-all duration-300 group overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary-500/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500/25 transition-colors">
                    <value.icon size={26} className="text-primary-300" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-section">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
            Envie de nous rencontrer ?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
            Venez découvrir notre showroom et discuter de votre projet automobile avec notre équipe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/v2/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-all duration-300">
              Nous contacter
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/v2/vehicules" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500/30 text-primary-300 font-semibold rounded-xl hover:bg-primary-500/10 transition-all duration-300">
              Voir nos véhicules
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotreHistoireV2;
