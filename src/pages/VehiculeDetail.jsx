import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { ArrowLeft, Phone, Mail, Calendar, Gauge, Fuel, Car, Cog, Palette } from 'lucide-react';
import { useState } from 'react';
import seoData from '../data/seo.json';
import mockVehicules from '../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const VehiculeDetail = () => {
  const { id } = useParams();
  const siteInfo = useSiteInfo();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: apiVehicule, isLoading } = useQuery({
    queryKey: ['vehicule', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/sites/${seoData.site.slug}/products/${id}`);
      if (!response.ok) throw new Error('Véhicule non trouvé');
      const json = await response.json();
      return json.data;
    },
  });

  // Utiliser les données de l'API si disponibles, sinon chercher dans les données fictives
  const vehicule = apiVehicule || mockVehicules.find(v => v._id === id);

  if (isLoading && !vehicule) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (!vehicule) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <Car size={64} className="text-primary-500/30 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
            Véhicule non trouvé
          </h2>
          <p className="text-text-secondary mb-6">
            Ce véhicule n'existe plus ou a été retiré de notre catalogue.
          </p>
          <Link to="/vehicules" className="btn-primary">
            <ArrowLeft size={18} />
            Retour aux véhicules
          </Link>
        </div>
      </div>
    );
  }

  const images = vehicule.images || (vehicule.image ? [vehicule.image] : []);
  const brand = vehicule.brand || vehicule.metadata?.brand || '';
  const model = vehicule.model || vehicule.metadata?.model || '';
  const year = vehicule.year || vehicule.metadata?.year || '';
  const mileage = vehicule.mileage || vehicule.metadata?.mileage || '';
  const fuelType = vehicule.fuelType || vehicule.metadata?.fuelType || '';
  const transmission = vehicule.transmission || vehicule.metadata?.transmission || '';
  const color = vehicule.color || vehicule.metadata?.color || '';
  const price = vehicule.price;

  const specs = [
    { icon: Calendar, label: 'Année', value: year },
    { icon: Gauge, label: 'Kilométrage', value: mileage ? (typeof mileage === 'number' ? `${mileage.toLocaleString()} km` : mileage) : '' },
    { icon: Fuel, label: 'Carburant', value: fuelType },
    { icon: Cog, label: 'Transmission', value: transmission },
    { icon: Palette, label: 'Couleur', value: color },
  ].filter(s => s.value);

  return (
    <>
      <SEOHead page="vehicules" />

      {/* Back nav */}
      <div className="bg-dark-section border-b border-primary-600/20">
        <div className="container-site py-4">
          <Link to="/vehicules" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-300 transition-colors text-sm">
            <ArrowLeft size={16} />
            Retour aux véhicules
          </Link>
        </div>
      </div>

      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              {images.length > 0 ? (
                <>
                  <div className="aspect-[16/10] bg-dark-section rounded-2xl overflow-hidden border border-primary-600/20 mb-4">
                    <img
                      src={images[selectedImage]}
                      alt={vehicule.name || `${brand} ${model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-[16/10] rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                            selectedImage === index
                              ? 'border-primary-500'
                              : 'border-primary-600/20 hover:border-primary-500/50'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[16/10] bg-dark-section rounded-2xl border border-primary-600/20 flex items-center justify-center">
                  <Car size={80} className="text-primary-500/20" />
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {vehicule.status === 'sold' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm font-medium mb-4">
                  Ce véhicule a été vendu
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                {vehicule.name || `${brand} ${model}`}
              </h1>

              {(brand || model) && vehicule.name && (
                <p className="text-text-secondary text-lg mb-6">
                  {brand} {model}
                </p>
              )}

              {price !== undefined && price !== null && (
                <div className="bg-dark-section border border-primary-600/20 rounded-xl p-6 mb-8">
                  <span className="text-3xl font-display font-bold text-primary-300">
                    CHF {typeof price === 'number' ? price.toLocaleString() : price}
                  </span>
                </div>
              )}

              {/* Specs */}
              {specs.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 bg-dark-section border border-primary-600/20 rounded-xl p-4">
                      <spec.icon size={20} className="text-primary-400 flex-shrink-0" />
                      <div>
                        <p className="text-text-secondary text-xs uppercase tracking-wider">{spec.label}</p>
                        <p className="text-text-primary font-medium">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {vehicule.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-text-primary mb-4">Description</h2>
                  <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {vehicule.description}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-dark-section border border-primary-600/20 rounded-xl p-6">
                <h3 className="text-lg font-display font-bold text-text-primary mb-3">
                  Intéressé par ce véhicule ?
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  Contactez-nous pour plus d'informations ou pour organiser un essai.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    <Mail size={18} />
                    Nous contacter
                  </Link>
                  {siteInfo.contact?.phone && (
                    <a href={`tel:${siteInfo.contact.phone}`} className="btn-outline">
                      <Phone size={18} />
                      Appeler
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehiculeDetail;
