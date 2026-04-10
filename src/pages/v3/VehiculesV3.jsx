import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { Search, X, Car, ArrowRight, SlidersHorizontal } from 'lucide-react';
import seoData from '../../data/seo.json';
import mockVehicules from '../../data/mockVehicules';
import { useTranslation } from '../../i18n/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const VehiculesV3 = () => {
  const [searchParams] = useSearchParams();
  const vehicleType = searchParams.get('type'); // 'neuf' or 'occasion'
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ brand: '', fuelType: '', priceRange: '', sortBy: 'newest' });
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  const { data: vehiculesData, isLoading } = useQuery({
    queryKey: ['vehicules', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/vehicles?siteId=${seoData.site.slug}`);
      if (!response.ok) throw new Error('Erreur');
      const json = await response.json();
      return json.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const vehicules = (vehiculesData && vehiculesData.length > 0) ? vehiculesData : mockVehicules;

  const brands = useMemo(() => [...new Set(vehicules.map(v => v.brand || v.metadata?.brand).filter(Boolean))].sort(), [vehicules]);
  const fuelTypes = useMemo(() => [...new Set(vehicules.map(v => v.fuelType || v.metadata?.fuelType).filter(Boolean))].sort(), [vehicules]);

  const pageTitle = vehicleType === 'neuf' ? t('vehicles.new') : vehicleType === 'occasion' ? t('vehicles.used') : t('vehicles.all');

  const filteredVehicules = useMemo(() => {
    let result = [...vehicules];
    // Filter by vehicle type (neuf/occasion) from URL
    if (vehicleType === 'neuf') {
      result = result.filter(v => (v.condition || v.metadata?.condition || '').toLowerCase() === 'neuf');
    } else if (vehicleType === 'occasion') {
      result = result.filter(v => {
        const cond = (v.condition || v.metadata?.condition || '').toLowerCase();
        return cond !== 'neuf'; // Everything that's not "neuf" is occasion
      });
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v =>
        (v.title || v.name || '').toLowerCase().includes(term) ||
        (v.brand || v.metadata?.brand || '').toLowerCase().includes(term) ||
        (v.model || v.metadata?.model || '').toLowerCase().includes(term)
      );
    }
    if (filters.brand) result = result.filter(v => (v.brand || v.metadata?.brand) === filters.brand);
    if (filters.fuelType) result = result.filter(v => (v.fuelType || v.metadata?.fuelType) === filters.fuelType);
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(v => { const p = v.price || 0; return max ? p >= min && p <= max : p >= min; });
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

      {/* ═══ HERO ═══ Minimal */}
      <section className="bg-[#0d1117] pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('vehicles.catalog')}</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] mb-4">
            {pageTitle}
          </h1>
          <p className="text-white/40 text-lg font-light max-w-xl">
            {filteredVehicules.length} {filteredVehicules.length > 1 ? t('vehicles.vehicles') : t('vehicles.vehicle')} {filteredVehicules.length > 1 ? t('vehicles.available_plural') : t('vehicles.available')}
          </p>
        </div>
      </section>

      {/* ═══ SEARCH ═══ */}
      <section className="sticky top-[73px] z-30 bg-[#0d1117]/95 backdrop-blur-lg border-y border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder={t('vehicles.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-colors text-sm"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:border-white/20 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest">{t('vehicles.newest')}</option>
              <option value="price-asc">{t('vehicles.price_asc')}</option>
              <option value="price-desc">{t('vehicles.price_desc')}</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-sm transition-colors cursor-pointer ${
                showFilters || hasActiveFilters ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={14} />
              {t('vehicles.filters')}
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-3">
              <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 text-white text-sm cursor-pointer focus:outline-none">
                <option value="">{t('vehicles.all_brands')}</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={filters.fuelType} onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 text-white text-sm cursor-pointer focus:outline-none">
                <option value="">{t('vehicles.all_fuels')}</option>
                {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 text-white text-sm cursor-pointer focus:outline-none">
                <option value="">{t('vehicles.all_prices')}</option>
                <option value="0-10000">&lt; 10'000 CHF</option>
                <option value="10000-20000">10'000 - 20'000</option>
                <option value="20000-30000">20'000 - 30'000</option>
                <option value="30000-50000">30'000 - 50'000</option>
                <option value="50000-">&gt; 50'000 CHF</option>
              </select>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center justify-center gap-2 text-white/40 hover:text-white text-sm cursor-pointer">
                  <X size={14} /> {t('vehicles.clear')}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══ GRID ═══ Audi-style product grid */}
      <section className="bg-[#0d1117] py-12 md:py-16">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          {filteredVehicules.length === 0 ? (
            <div className="text-center py-32">
              <Car size={48} className="text-white/10 mx-auto mb-6" />
              <h3 className="text-xl font-display font-bold text-white mb-2">{t('vehicles.no_results')}</h3>
              <p className="text-white/40 text-sm mb-6">{t('vehicles.no_results_desc')}</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-white/50 text-sm underline underline-offset-4 hover:text-white cursor-pointer">
                  {t('vehicles.clear_filters')}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {filteredVehicules.map((vehicule) => {
                const image = vehicule.images?.[0] || vehicule.image;
                const brand = vehicule.brand || vehicule.metadata?.brand || '';
                const year = vehicule.year || vehicule.metadata?.year || '';
                const mileage = vehicule.mileage || vehicule.metadata?.mileage || '';
                const fuelType = vehicule.fuelType || vehicule.metadata?.fuelType || '';
                const price = vehicule.price;

                return (
                  <Link
                    key={vehicule._id || vehicule.id}
                    to={`/vehicules/${vehicule.slug || vehicule._id || vehicule.id}`}
                    className="group bg-[#0d1117] block"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {image ? (
                        <img
                          src={image}
                          alt={vehicule.title || vehicule.name || brand}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <Car size={48} className="text-white/10" />
                        </div>
                      )}
                      {vehicule.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xs uppercase tracking-[0.3em]">{t('vehicles.sold')}</span>
                        </div>
                      )}
                      {vehicule.status === 'reserved' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs uppercase tracking-[0.3em]">{t('vehicles.reserved')}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-white/70 transition-colors mb-2">
                        {vehicule.title || vehicule.name || `${brand}`}
                      </h3>
                      <p className="text-white/30 text-sm mb-4">
                        {[year, mileage && `${typeof mileage === 'number' ? mileage.toLocaleString() : mileage} km`, fuelType].filter(Boolean).join(' · ')}
                      </p>
                      {price !== undefined && price !== null && (
                        <div className="flex items-center justify-between">
                          <span className="text-white font-display font-bold text-xl">
                            CHF {typeof price === 'number' ? price.toLocaleString() : price}
                          </span>
                          <ArrowRight size={16} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VehiculesV3;
