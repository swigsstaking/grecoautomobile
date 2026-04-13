import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowLeft, Phone, Mail, Calendar, Gauge, Fuel, Car, Cog, Palette, Zap, Shield, Check, CheckCircle, AlertTriangle, XCircle, ExternalLink, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import seoData from '../data/seo.json';
import mockVehicules from '../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const VehiculeDetail = () => {
  const { id } = useParams();
  const siteInfo = useSiteInfo();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: apiVehicule, isLoading } = useQuery({
    queryKey: ['vehicule', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/vehicles/${id}?siteId=${seoData.site.slug}`);
      if (!response.ok) throw new Error('Véhicule non trouvé');
      const json = await response.json();
      return json.data;
    },
  });

  const vehicule = apiVehicule || mockVehicules.find(v => v._id === id || v.slug === id);

  if (isLoading && !vehicule) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0d1117]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/30"></div>
      </div>
    );
  }

  if (!vehicule) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <Car size={48} className="text-white/10 mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-white mb-2">Véhicule non trouvé</h2>
          <p className="text-white/40 text-sm mb-8">Ce véhicule n'existe plus ou a été retiré du catalogue.</p>
          <Link to="/vehicules" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors">
            <ArrowLeft size={14} /> Retour aux véhicules
          </Link>
        </div>
      </div>
    );
  }

  const images = vehicule.images || (vehicule.image ? [vehicule.image] : []);
  const brand = vehicule.brand || '';
  const model = vehicule.model || '';
  const year = vehicule.year || '';
  const mileage = vehicule.mileage || '';
  const fuelType = vehicule.fuelType || '';
  const transmission = vehicule.transmission || '';
  const color = vehicule.exteriorColor || vehicule.color || '';
  const price = vehicule.price;
  const title = vehicule.title || vehicule.name || `${brand} ${model}`;

  const specs = [
    { icon: Calendar, label: 'Année', value: year },
    { icon: Gauge, label: 'Kilométrage', value: mileage ? `${(typeof mileage === 'number' ? mileage.toLocaleString() : mileage)} km` : '' },
    { icon: Fuel, label: 'Carburant', value: fuelType },
    { icon: Cog, label: 'Transmission', value: transmission },
    { icon: Zap, label: 'Puissance', value: vehicule.power?.hp ? `${vehicule.power.hp} ch (${vehicule.power.kw} kW)` : '' },
    { icon: Car, label: 'Carrosserie', value: vehicule.bodyType || '' },
    { icon: Palette, label: 'Couleur', value: color },
    { icon: Shield, label: 'Garantie', value: vehicule.warranty || '' },
  ].filter(s => s.value);

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const report = vehicule.carVerticalReport;

  // Vehicle Schema.org JSON-LD
  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": title,
    "description": vehicule.description || `${title} disponible chez Greco Autogroup à Ardon, Valais.`,
    "brand": { "@type": "Brand", "name": brand },
    "model": model,
    "vehicleModelDate": year ? String(year) : undefined,
    "mileageFromOdometer": mileage ? { "@type": "QuantitativeValue", "value": mileage, "unitCode": "KMT" } : undefined,
    "fuelType": fuelType,
    "vehicleTransmission": transmission,
    "color": color,
    "bodyType": vehicule.bodyType,
    "numberOfDoors": vehicule.doors,
    "vehicleSeatingCapacity": vehicule.seats,
    "vehicleIdentificationNumber": vehicule.vin,
    "image": images,
    "offers": price ? {
      "@type": "Offer",
      "price": price,
      "priceCurrency": vehicule.currency || "CHF",
      "availability": vehicule.status === 'sold'
        ? "https://schema.org/SoldOut"
        : vehicule.status === 'reserved'
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Greco Autogroup",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rue des Aprages 2",
          "addressLocality": "Ardon",
          "postalCode": "1957",
          "addressRegion": "VS",
          "addressCountry": "CH"
        }
      }
    } : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://grecoautogroup.ch" },
      { "@type": "ListItem", "position": 2, "name": "Véhicules", "item": "https://grecoautogroup.ch/vehicules" },
      { "@type": "ListItem", "position": 3, "name": title, "item": `https://grecoautogroup.ch/vehicules/${id}` },
    ],
  };

  return (
    <>
      <SEOHead page="vehicules" />
      <Helmet>
        <title>{`${title} | Greco Autogroup`}</title>
        <meta name="description" content={`${title}${year ? ` ${year}` : ''}${mileage ? ` · ${typeof mileage === 'number' ? mileage.toLocaleString() : mileage} km` : ''}${price ? ` · CHF ${typeof price === 'number' ? price.toLocaleString() : price}` : ''}. Disponible chez Greco Autogroup à Ardon, Valais.`} />
        <link rel="canonical" href={`https://grecoautogroup.ch/vehicules/${id}`} />
        <meta property="og:title" content={`${title} | Greco Autogroup`} />
        <meta property="og:type" content="product" />
        {images[0] && <meta property="og:image" content={images[0]} />}
        <script type="application/ld+json">{JSON.stringify(vehicleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* ═══ GALLERY ═══ Full-width hero image */}
      <section className="bg-black relative">
        {/* Back nav overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-6">
            <Link to="/vehicules" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
              <ArrowLeft size={14} /> Retour aux véhicules
            </Link>
          </div>
        </div>

        {/* Main image */}
        {images.length > 0 ? (
          <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer backdrop-blur-sm">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer backdrop-blur-sm">
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-6 right-6 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white/70 text-xs font-mono rounded-full">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        ) : (
          <div className="h-[40vh] flex items-center justify-center">
            <Car size={64} className="text-white/10" />
          </div>
        )}

        {/* Thumbnails strip */}
        {images.length > 1 && (
          <div className="bg-[#0d1117] border-t border-white/5">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-4">
              <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === i ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="bg-[#0d1117]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left column — Info */}
            <div className="lg:col-span-2">
              {/* Status badges */}
              {vehicule.status === 'sold' && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-wider rounded mb-4">
                  <XCircle size={12} /> Vendu
                </div>
              )}
              {vehicule.status === 'reserved' && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs uppercase tracking-wider rounded mb-4">
                  <AlertTriangle size={12} /> Réservé
                </div>
              )}

              {/* Title */}
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
                {brand} {vehicule.condition ? `· ${vehicule.condition}` : ''}
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-[0.95] mb-8">
                {title}
              </h1>

              {/* Specs grid */}
              {specs.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-lg overflow-hidden mb-10">
                  {specs.map((spec, i) => (
                    <div key={i} className="bg-[#0d1117] p-4 md:p-5">
                      <spec.icon size={16} className="text-white/20 mb-2" />
                      <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1">{spec.label}</p>
                      <p className="text-white font-medium text-sm">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {vehicule.description && (
                <div className="mb-10">
                  <h2 className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Description</h2>
                  <div className="text-white/50 text-base leading-relaxed whitespace-pre-line font-light">
                    {vehicule.description}
                  </div>
                </div>
              )}

              {/* Équipements */}
              {vehicule.features && vehicule.features.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Équipements</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {vehicule.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                        <Check size={14} className="text-white/20 flex-shrink-0" />
                        <span className="text-white/50 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* carVertical Report */}
              {report?.summary && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <Shield size={16} className="text-blue-400" />
                    <h2 className="text-white/30 text-xs uppercase tracking-[0.3em]">Rapport d'historique</h2>
                    <span className="text-[10px] text-blue-400/60 bg-blue-400/5 px-2 py-0.5 rounded border border-blue-400/10">carVertical</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Kilométrage */}
                    {(() => {
                      const status = report.summary.mileageStatus;
                      const isOk = status === 'ok';
                      const isWarning = status === 'warning';
                      return (
                        <div className={`rounded-lg p-4 border ${isOk ? 'bg-green-500/5 border-green-500/10' : isWarning ? 'bg-yellow-500/5 border-yellow-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                          {isOk ? <CheckCircle size={16} className="text-green-400 mb-2" /> : isWarning ? <AlertTriangle size={16} className="text-yellow-400 mb-2" /> : <XCircle size={16} className="text-red-400 mb-2" />}
                          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Kilométrage</p>
                          <p className={`font-bold text-sm ${isOk ? 'text-green-400' : isWarning ? 'text-yellow-400' : 'text-red-400'}`}>
                            {isOk ? 'Vérifié' : isWarning ? 'Attention' : 'Alerte'}
                          </p>
                        </div>
                      );
                    })()}

                    {/* Dommages */}
                    <div className={`rounded-lg p-4 border ${(report.summary.damageRecords || 0) === 0 ? 'bg-green-500/5 border-green-500/10' : 'bg-yellow-500/5 border-yellow-500/10'}`}>
                      {(report.summary.damageRecords || 0) === 0 ? <CheckCircle size={16} className="text-green-400 mb-2" /> : <AlertTriangle size={16} className="text-yellow-400 mb-2" />}
                      <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Dommages</p>
                      <p className={`font-bold text-sm ${(report.summary.damageRecords || 0) === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {report.summary.damageRecords || 0} enregistré(s)
                      </p>
                    </div>

                    {/* Vol */}
                    <div className={`rounded-lg p-4 border ${report.summary.stolenCheck === 'clear' ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                      {report.summary.stolenCheck === 'clear' ? <CheckCircle size={16} className="text-green-400 mb-2" /> : <XCircle size={16} className="text-red-400 mb-2" />}
                      <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Vol</p>
                      <p className={`font-bold text-sm ${report.summary.stolenCheck === 'clear' ? 'text-green-400' : 'text-red-400'}`}>
                        {report.summary.stolenCheck === 'clear' ? 'Non signalé' : 'Signalé'}
                      </p>
                    </div>

                    {/* Propriétaires */}
                    <div className="rounded-lg p-4 border bg-blue-500/5 border-blue-500/10">
                      <Users size={16} className="text-blue-400 mb-2" />
                      <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Propriétaires</p>
                      <p className="font-bold text-sm text-blue-400">{report.summary.ownerCount || '—'}</p>
                    </div>
                  </div>

                  {report.reportUrl && (
                    <a href={report.reportUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs text-blue-400/60 hover:text-blue-400 transition-colors">
                      Voir le rapport complet <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right column — Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Price card */}
                {price !== undefined && price !== null && (
                  <div className="border border-white/10 rounded-lg p-6">
                    <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-2">Prix</p>
                    <p className="text-3xl font-display font-bold text-white">
                      CHF {typeof price === 'number' ? price.toLocaleString() : price}
                    </p>
                    {vehicule.condition && (
                      <p className="text-white/20 text-xs mt-1">{vehicule.condition}</p>
                    )}
                  </div>
                )}

                {/* VIN */}
                {vehicule.vin && (
                  <div className="border border-white/10 rounded-lg p-6">
                    <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-2">N° de châssis</p>
                    <p className="text-white/60 text-sm font-mono">{vehicule.vin}</p>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    Intéressé ?
                  </h3>
                  <p className="text-white/40 text-sm mb-5">
                    Contactez-nous pour plus d'informations ou un essai routier.
                  </p>
                  <div className="space-y-3">
                    <Link
                      to={`/contact?vehicule=${encodeURIComponent(title)}&prix=${price || ''}&annee=${year}&km=${mileage}`}
                      className="group flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
                    >
                      <Mail size={14} /> Nous contacter
                    </Link>
                    {siteInfo.contact?.phone && (
                      <a
                        href={`tel:${siteInfo.contact.phone}`}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-white/20 text-white text-sm uppercase tracking-[0.15em] font-medium hover:border-white/40 transition-colors"
                      >
                        <Phone size={14} /> {siteInfo.contact.phone}
                      </a>
                    )}
                  </div>
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
