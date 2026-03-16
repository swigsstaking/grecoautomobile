import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Search, SlidersHorizontal, Car, Fuel, Gauge, Calendar, X } from 'lucide-react';
import seoData from '../data/seo.json';
import mockVehicules from '../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const Vehicules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    priceRange: '',
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: vehiculesData, isLoading } = useQuery({
    queryKey: ['vehicules', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/vehicles?siteId=${seoData.site.slug}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const json = await response.json();
      return json.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  // Utiliser les données de l'API si disponibles, sinon les données fictives
  const vehicules = (vehiculesData && vehiculesData.length > 0) ? vehiculesData : mockVehicules;

  const brands = useMemo(() => {
    const allBrands = vehicules.map(v => v.brand || v.metadata?.brand).filter(Boolean);
    return [...new Set(allBrands)].sort();
  }, [vehicules]);

  const fuelTypes = useMemo(() => {
    const allFuels = vehicules.map(v => v.fuelType || v.metadata?.fuelType).filter(Boolean);
    return [...new Set(allFuels)].sort();
  }, [vehicules]);

  const filteredVehicules = useMemo(() => {
    let result = [...vehicules];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v =>
        (v.title || v.name || '').toLowerCase().includes(term) ||
        (v.brand || v.metadata?.brand || '').toLowerCase().includes(term) ||
        (v.model || v.metadata?.model || '').toLowerCase().includes(term)
      );
    }

    if (filters.brand) {
      result = result.filter(v => (v.brand || v.metadata?.brand) === filters.brand);
    }

    if (filters.fuelType) {
      result = result.filter(v => (v.fuelType || v.metadata?.fuelType) === filters.fuelType);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(v => {
        const price = v.price || 0;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    return result;
  }, [vehicules, searchTerm, filters]);

  const hasActiveFilters = filters.brand || filters.fuelType || filters.priceRange;

  const clearFilters = () => {
    setFilters({ brand: '', fuelType: '', priceRange: '', sortBy: 'newest' });
    setSearchTerm('');
  };

  return (
    <>
      <SEOHead page="vehicules" />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=800&fit=crop"
            alt="Nos véhicules"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/50"></div>
        </div>
        <div className="container-site relative z-10">
          <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-4">
            Notre catalogue
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Nos Véhicules
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Découvrez notre sélection de véhicules d'occasion soigneusement
            inspectés et préparés pour vous.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-dark-section border-b border-primary-600/20">
        <div className="container-site py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-grow w-full md:w-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Rechercher un véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-primary-600/30 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-3 bg-dark-bg border border-primary-600/30 rounded-lg text-text-primary focus:border-primary-500 transition-colors cursor-pointer"
            >
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors cursor-pointer ${
                showFilters || hasActiveFilters
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                  : 'bg-dark-bg border-primary-600/30 text-text-secondary hover:text-text-primary'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filtres
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-primary-600/20 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-4 py-3 bg-dark-bg border border-primary-600/30 rounded-lg text-text-primary focus:border-primary-500 transition-colors cursor-pointer"
              >
                <option value="">Toutes les marques</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="px-4 py-3 bg-dark-bg border border-primary-600/30 rounded-lg text-text-primary focus:border-primary-500 transition-colors cursor-pointer"
              >
                <option value="">Tous les carburants</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>

              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="px-4 py-3 bg-dark-bg border border-primary-600/30 rounded-lg text-text-primary focus:border-primary-500 transition-colors cursor-pointer"
              >
                <option value="">Tous les prix</option>
                <option value="0-10000">Moins de 10'000 CHF</option>
                <option value="10000-20000">10'000 - 20'000 CHF</option>
                <option value="20000-30000">20'000 - 30'000 CHF</option>
                <option value="30000-50000">30'000 - 50'000 CHF</option>
                <option value="50000-">Plus de 50'000 CHF</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-primary-300 hover:text-primary-200 text-sm cursor-pointer"
                >
                  <X size={16} />
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          {isLoading && !mockVehicules.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-dark-section border border-primary-600/20 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-primary-700/20"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-primary-700/20 rounded w-3/4"></div>
                    <div className="h-4 bg-primary-700/20 rounded w-1/2"></div>
                    <div className="h-8 bg-primary-700/20 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVehicules.length === 0 ? (
            <div className="text-center py-20">
              <Search size={64} className="text-primary-500/30 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                Aucun résultat
              </h3>
              <p className="text-text-secondary mb-6">
                Essayez de modifier vos critères de recherche.
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-outline">
                  Effacer les filtres
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-text-secondary mb-8">
                {filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''} disponible{filteredVehicules.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicules.map((vehicule) => (
                  <VehiculeCard key={vehicule._id || vehicule.id} vehicule={vehicule} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const VehiculeCard = ({ vehicule }) => {
  const image = vehicule.images?.[0] || vehicule.image;
  const brand = vehicule.brand || vehicule.metadata?.brand || '';
  const model = vehicule.model || vehicule.metadata?.model || '';
  const year = vehicule.year || vehicule.metadata?.year || '';
  const mileage = vehicule.mileage || vehicule.metadata?.mileage || '';
  const fuelType = vehicule.fuelType || vehicule.metadata?.fuelType || '';
  const price = vehicule.price;

  return (
    <Link
      to={`/vehicules/${vehicule.slug || vehicule._id || vehicule.id}`}
      className="group bg-dark-section border border-primary-600/20 rounded-2xl overflow-hidden hover:border-primary-500/40 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-primary-700/20 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={vehicule.title || vehicule.name || `${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={48} className="text-primary-500/30" />
          </div>
        )}
        {vehicule.status === 'sold' && (
          <div className="absolute inset-0 bg-dark-bg/70 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Vendu
            </span>
          </div>
        )}
        {vehicule.status === 'reserved' && (
          <div className="absolute inset-0 bg-dark-bg/50 flex items-center justify-center">
            <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Réservé
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-display font-bold text-text-primary mb-1 group-hover:text-primary-300 transition-colors">
          {vehicule.title || vehicule.name || `${brand} ${model}`}
        </h3>

        <div className="flex flex-wrap gap-3 text-sm text-text-secondary mt-3">
          {year && (
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-primary-400" />
              {year}
            </span>
          )}
          {mileage && (
            <span className="flex items-center gap-1">
              <Gauge size={14} className="text-primary-400" />
              {typeof mileage === 'number' ? `${mileage.toLocaleString()} km` : mileage}
            </span>
          )}
          {fuelType && (
            <span className="flex items-center gap-1">
              <Fuel size={14} className="text-primary-400" />
              {fuelType}
            </span>
          )}
        </div>

        {price !== undefined && price !== null && (
          <div className="mt-4 pt-4 border-t border-primary-600/20">
            <span className="text-2xl font-display font-bold text-primary-300">
              CHF {typeof price === 'number' ? price.toLocaleString() : price}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Vehicules;
