import SEOHead from '../components/SEOHead';
import { Car, Users, Award, Heart } from 'lucide-react';

const NotreHistoire = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'L\'automobile est notre passion depuis toujours. Chaque véhicule que nous proposons est sélectionné avec soin et enthousiasme.',
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'Nous construisons des relations durables avec nos clients, basées sur la transparence et l\'honnêteté.',
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Chaque véhicule passe par un contrôle rigoureux avant d\'être proposé à la vente. Votre satisfaction est notre priorité.',
    },
    {
      icon: Car,
      title: 'Expertise',
      description: 'Notre équipe possède une expertise approfondie du marché automobile, vous garantissant les meilleurs conseils.',
    },
  ];

  const timeline = [
    {
      year: 'Les débuts',
      title: 'La naissance d\'une passion',
      description: 'Greco Autogroup naît de la passion d\'un homme pour l\'automobile. Ce qui a commencé comme un hobby est rapidement devenu une vocation.',
    },
    {
      year: 'La croissance',
      title: 'Une réputation qui grandit',
      description: 'Grâce à un service irréprochable et des véhicules de qualité, Greco Autogroup se fait un nom dans le monde de l\'automobile d\'occasion.',
    },
    {
      year: 'Aujourd\'hui',
      title: 'Un acteur incontournable',
      description: 'Aujourd\'hui, Greco Autogroup est reconnu pour son expertise, sa fiabilité et son engagement envers chaque client.',
    },
  ];

  return (
    <>
      <SEOHead page="notre-histoire" />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&h=800&fit=crop"
            alt="Garage automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/50"></div>
        </div>
        <div className="container-site relative z-10">
          <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-4">
            Qui sommes-nous
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Notre Histoire
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Découvrez l'histoire de Greco Autogroup, notre passion pour l'automobile
            et notre engagement envers la satisfaction de nos clients.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title text-4xl mb-6">
                Plus qu'une agence,<br />
                <span className="text-primary-300">une passion</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Greco Autogroup est né de la conviction qu'acheter ou vendre un véhicule devrait être
                  une expérience simple, transparente et agréable.
                </p>
                <p>
                  Notre fondateur, passionné d'automobile depuis son plus jeune âge, a souhaité créer
                  un espace où chaque client se sent écouté, conseillé et accompagné dans ses démarches.
                </p>
                <p>
                  Aujourd'hui, Greco Autogroup continue de grandir avec la même philosophie :
                  proposer des véhicules de qualité à des prix justes, avec un service humain et personnalisé.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-primary-600/20">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=800&fit=crop"
                  alt="Passion automobile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-dark-section">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
              Notre parcours
            </p>
            <h2 className="section-title text-4xl">
              Les étapes clés
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-primary-500 rounded-full flex-shrink-0"></div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-grow bg-primary-600/30 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="text-center mb-16">
            <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-3">
              Ce qui nous définit
            </p>
            <h2 className="section-title text-4xl">
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-dark-section border border-primary-600/20 rounded-2xl p-8 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-500/15 rounded-xl flex items-center justify-center mb-5">
                  <value.icon size={24} className="text-primary-300" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NotreHistoire;
