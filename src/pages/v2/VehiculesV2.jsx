import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { Search, SlidersHorizontal, Car, Fuel, Gauge, Calendar, X, ArrowUpDown, Grid3X3, LayoutList } from 'lucide-react';
import seoData from '../../data/seo.json';
import mockVehicules from '../../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const VehiculesV2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    priceRange: '',
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const { data: vehiculesData, isLoading } = useQuery({
    queryKey: ['vehicules', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/sites/${seoData.site.slug}/products`);
      if (!response.ok) throw new Error('Erreur');
      const json = await response.json();
      return json.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

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
        (v.name || '').toLowerCase().includes(term) ||
        (v.brand || v.metadata?.brand || '').toLowerCase().includes(term) ||
        (v.model || v.metadata?.model || '').toLowerCase().includes(term)
      );
    }
    if (filters.brand) result = result.filter(v => (v.brand || v.metadata?.brand) === filters.brand);
    if (filters.fuelType) result = result.filter(v => (v.fuelType || v.metadata?.fuelType) === filters.fuelType);
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(v => {
        const price = v.price || 0;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }
    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-desc': result.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      default: result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return result;
  }, [vehicules, searchTerm, filters]);

  const hasActiveFilters = filters.brand || filters.fuelType || filters.priceRange;
  const clearFilters = () => { setFilters({ brand: '', fuelType: '', priceRange: '', sortBy: 'newest' }); setSearchTerm(''); };

  return (
    <>
      <SEOHead page="vehicules" />

      {/* Hero - Compact */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=800&fit=crop"
            alt="Nos véhicules"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"></div>
        </div>
        <div className="container-site relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
            Nos <span className="text-primary-300">Véhicules</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Découvrez notre sélection de véhicules d'occasion soigneusement
            inspectés et préparés pour vous.
          </p>
        </div>
      </section>

      {/* Search & Filter - Glassmorphism bar */}
      <section className="sticky top-[73px] z-30 bg-dark-bg/80 backdrop-blur-xl border-b border-primary-600/20">
        <div className="container-site py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-grow w-full md:w-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Rechercher par marque, modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:border-primary-400/40 focus:ring-1 focus:ring-primary-400/30 transition-all"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-text-secondary" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-3 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary focus:border-primary-400/40 transition-all cursor-pointer"
              >
                <option value="newest">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            {/* View mode */}
            <div className="hidden md:flex items-center bg-primary-700/20 border border-primary-500/15 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-l-xl transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-300' : 'text-text-secondary hover:text-text-primary'}`}
                aria-label="Vue grille"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-r-xl transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-300' : 'text-text-secondary hover:text-text-primary'}`}
                aria-label="Vue liste"
              >
                <LayoutList size={18} />
              </button>
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                showFilters || hasActiveFilters
                  ? 'bg-primary-500/20 border-primary-400/30 text-primary-300'
                  : 'bg-primary-700/20 border-primary-500/15 text-text-secondary hover:text-text-primary'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filtres
              {hasActiveFilters && <span className="w-2 h-2 bg-primary-400 rounded-full"></span>}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-primary-500/10 grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-4 py-3 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary focus:border-primary-400/40 transition-all cursor-pointer"
              >
                <option value="">Toutes les marques</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="px-4 py-3 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary focus:border-primary-400/40 transition-all cursor-pointer"
              >
                <option value="">Tous les carburants</option>
                {fuelTypes.map((fuel) => <option key={fuel} value={fuel}>{fuel}</option>)}
              </select>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="px-4 py-3 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary focus:border-primary-400/40 transition-all cursor-pointer"
              >
                <option value="">Tous les prix</option>
                <option value="0-10000">Moins de 10'000 CHF</option>
                <option value="10000-20000">10'000 - 20'000 CHF</option>
                <option value="20000-30000">20'000 - 30'000 CHF</option>
                <option value="30000-50000">30'000 - 50'000 CHF</option>
                <option value="50000-">Plus de 50'000 CHF</option>
              </select>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-2 text-primary-300 hover:text-primary-200 text-sm cursor-pointer justify-center">
                  <X size={16} /> Effacer les filtres
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-primary-700/20 border border-primary-500/10 rounded-3xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-primary-700/30"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-primary-700/30 rounded w-3/4"></div>
                    <div className="h-4 bg-primary-700/30 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVehicules.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary-500/40" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Aucun résultat</h3>
              <p className="text-text-secondary mb-6">Essayez de modifier vos critères de recherche.</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-outline cursor-pointer">Effacer les filtres</button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-text-secondary">
                  <span className="text-text-primary font-bold">{filteredVehicules.length}</span> véhicule{filteredVehicules.length > 1 ? 's' : ''} disponible{filteredVehicules.length > 1 ? 's' : ''}
                </p>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVehicules.map((vehicule) => (
                    <VehiculeCardV2 key={vehicule._id || vehicule.id} vehicule={vehicule} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVehicules.map((vehicule) => (
                    <VehiculeListItemV2 key={vehicule._id || vehicule.id} vehicule={vehicule} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

const VehiculeCardV2 = ({ vehicule }) => {
  const image = vehicule.images?.[0] || vehicule.image;
  const brand = vehicule.brand || vehicule.metadata?.brand || '';
  const year = vehicule.year || vehicule.metadata?.year || '';
  const mileage = vehicule.mileage || vehicule.metadata?.mileage || '';
  const fuelType = vehicule.fuelType || vehicule.metadata?.fuelType || '';
  const price = vehicule.price;

  return (
    <Link
      to={`/vehicules/${vehicule._id || vehicule.id}`}
      className="group bg-gradient-to-br from-primary-700/20 to-primary-800/10 border border-primary-500/10 rounded-3xl overflow-hidden hover:border-primary-400/25 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] bg-primary-700/20 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={vehicule.name || `${brand}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={48} className="text-primary-500/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent"></div>
        {vehicule.status === 'sold' && (
          <div className="absolute inset-0 bg-dark-bg/70 flex items-center justify-center">
            <span className="bg-red-600/90 backdrop-blur text-white px-5 py-2 rounded-xl text-sm font-bold">Vendu</span>
          </div>
        )}
        {price !== undefined && price !== null && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary-500/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg">
              CHF {typeof price === 'number' ? price.toLocaleString() : price}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-display font-bold text-text-primary mb-3 group-hover:text-primary-300 transition-colors">
          {vehicule.name || `${brand}`}
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {year && (
            <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">
              <Calendar size={12} /> {year}
            </span>
          )}
          {mileage && (
            <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">
              <Gauge size={12} /> {typeof mileage === 'number' ? `${mileage.toLocaleString()} km` : mileage}
            </span>
          )}
          {fuelType && (
            <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg">
              <Fuel size={12} /> {fuelType}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const VehiculeListItemV2 = ({ vehicule }) => {
  const image = vehicule.images?.[0] || vehicule.image;
  const brand = vehicule.brand || vehicule.metadata?.brand || '';
  const year = vehicule.year || vehicule.metadata?.year || '';
  const mileage = vehicule.mileage || vehicule.metadata?.mileage || '';
  const fuelType = vehicule.fuelType || vehicule.metadata?.fuelType || '';
  const price = vehicule.price;

  return (
    <Link
      to={`/vehicules/${vehicule._id || vehicule.id}`}
      className="group flex flex-col md:flex-row bg-gradient-to-br from-primary-700/20 to-primary-800/10 border border-primary-500/10 rounded-3xl overflow-hidden hover:border-primary-400/25 transition-all duration-300"
    >
      <div className="w-full md:w-80 flex-shrink-0 aspect-[16/10] md:aspect-auto relative overflow-hidden">
        {image ? (
          <img src={image} alt={vehicule.name || brand} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-700/20"><Car size={40} className="text-primary-500/30" /></div>
        )}
        {vehicule.status === 'sold' && (
          <div className="absolute top-3 left-3"><span className="bg-red-600/90 text-white px-3 py-1 rounded-lg text-xs font-bold">Vendu</span></div>
        )}
      </div>
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-primary-300 transition-colors mb-2">
            {vehicule.name || brand}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {year && <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg"><Calendar size={12} /> {year}</span>}
            {mileage && <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg"><Gauge size={12} /> {typeof mileage === 'number' ? `${mileage.toLocaleString()} km` : mileage}</span>}
            {fuelType && <span className="flex items-center gap-1 bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-lg"><Fuel size={12} /> {fuelType}</span>}
          </div>
        </div>
        {price !== undefined && price !== null && (
          <div className="mt-4">
            <span className="text-2xl font-display font-bold text-primary-300">
              CHF {typeof price === 'number' ? price.toLocaleString() : price}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default VehiculesV2;
