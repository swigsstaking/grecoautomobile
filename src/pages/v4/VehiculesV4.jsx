import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { Search, X, Car, ArrowRight, SlidersHorizontal } from 'lucide-react';
import seoData from '../../data/seo.json';
import mockVehicules from '../../data/mockVehicules';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const VehiculesV4 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ brand: '', fuelType: '', priceRange: '', sortBy: 'newest' });
  const [showFilters, setShowFilters] = useState(false);

  const { data: vehiculesData, isLoading } = useQuery({
    queryKey: ['vehicules', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/sites/${seoData.site.slug}/products`);
      if (!response.ok) throw new Error('Erreur');
      return (await response.json()).data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const vehicules = (vehiculesData?.length > 0) ? vehiculesData : mockVehicules;
  const brands = useMemo(() => [...new Set(vehicules.map(v => v.brand || v.metadata?.brand).filter(Boolean))].sort(), [vehicules]);
  const fuelTypes = useMemo(() => [...new Set(vehicules.map(v => v.fuelType || v.metadata?.fuelType).filter(Boolean))].sort(), [vehicules]);

  const filteredVehicules = useMemo(() => {
    let result = [...vehicules];
    if (searchTerm) { const t = searchTerm.toLowerCase(); result = result.filter(v => (v.name||'').toLowerCase().includes(t) || (v.brand||v.metadata?.brand||'').toLowerCase().includes(t)); }
    if (filters.brand) result = result.filter(v => (v.brand || v.metadata?.brand) === filters.brand);
    if (filters.fuelType) result = result.filter(v => (v.fuelType || v.metadata?.fuelType) === filters.fuelType);
    if (filters.priceRange) { const [min, max] = filters.priceRange.split('-').map(Number); result = result.filter(v => { const p = v.price||0; return max ? p>=min&&p<=max : p>=min; }); }
    switch (filters.sortBy) { case 'price-asc': result.sort((a,b)=>(a.price||0)-(b.price||0)); break; case 'price-desc': result.sort((a,b)=>(b.price||0)-(a.price||0)); break; default: result.sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0)); }
    return result;
  }, [vehicules, searchTerm, filters]);

  const hasActiveFilters = filters.brand || filters.fuelType || filters.priceRange;
  const clearFilters = () => { setFilters({ brand: '', fuelType: '', priceRange: '', sortBy: 'newest' }); setSearchTerm(''); };

  return (
    <>
      <SEOHead page="vehicules" />

      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">Catalogue</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-[0.9] mb-4">Nos Véhicules</h1>
          <p className="text-black/40 text-lg font-light">{filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''}</p>
        </div>
      </section>

      {/* ═══ SEARCH ═══ */}
      <section className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-lg border-y border-black/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
              <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-black/10 text-gray-900 placeholder:text-black/25 focus:border-black/20 focus:outline-none transition-colors text-sm" />
            </div>
            <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-4 py-3 bg-gray-50 border border-black/10 text-gray-900 text-sm focus:outline-none cursor-pointer">
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-sm cursor-pointer transition-colors ${showFilters||hasActiveFilters ? 'bg-gray-100 border-black/15 text-gray-900' : 'bg-gray-50 border-black/10 text-black/50 hover:text-gray-900'}`}>
              <SlidersHorizontal size={14} /> Filtres {hasActiveFilters && <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>}
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-black/5 grid grid-cols-1 md:grid-cols-4 gap-3">
              <select value={filters.brand} onChange={(e) => setFilters({...filters, brand: e.target.value})} className="px-4 py-3 bg-gray-50 border border-black/10 text-gray-900 text-sm cursor-pointer focus:outline-none">
                <option value="">Toutes les marques</option>{brands.map(b=><option key={b} value={b}>{b}</option>)}
              </select>
              <select value={filters.fuelType} onChange={(e) => setFilters({...filters, fuelType: e.target.value})} className="px-4 py-3 bg-gray-50 border border-black/10 text-gray-900 text-sm cursor-pointer focus:outline-none">
                <option value="">Tous carburants</option>{fuelTypes.map(f=><option key={f} value={f}>{f}</option>)}
              </select>
              <select value={filters.priceRange} onChange={(e) => setFilters({...filters, priceRange: e.target.value})} className="px-4 py-3 bg-gray-50 border border-black/10 text-gray-900 text-sm cursor-pointer focus:outline-none">
                <option value="">Tous les prix</option>
                <option value="0-10000">&lt; 10'000 CHF</option><option value="10000-20000">10-20k</option><option value="20000-30000">20-30k</option><option value="30000-50000">30-50k</option><option value="50000-">&gt; 50k</option>
              </select>
              {hasActiveFilters && <button onClick={clearFilters} className="flex items-center justify-center gap-2 text-black/40 hover:text-gray-900 text-sm cursor-pointer"><X size={14}/>Effacer</button>}
            </div>
          )}
        </div>
      </section>

      {/* ═══ GRID ═══ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          {filteredVehicules.length === 0 ? (
            <div className="text-center py-32">
              <Car size={48} className="text-black/10 mx-auto mb-6" />
              <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Aucun résultat</h3>
              <p className="text-black/40 text-sm mb-6">Modifiez vos critères.</p>
              {hasActiveFilters && <button onClick={clearFilters} className="text-black/40 text-sm underline hover:text-gray-900 cursor-pointer">Effacer</button>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5">
              {filteredVehicules.map((v) => {
                const image = v.images?.[0]||v.image;
                const year = v.year||v.metadata?.year||'';
                const mileage = v.mileage||v.metadata?.mileage||'';
                const fuelType = v.fuelType||v.metadata?.fuelType||'';
                return (
                  <Link key={v._id||v.id} to={`/vehicules/${v._id||v.id}`} className="group bg-white block">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {image ? <img src={image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Car size={48} className="text-black/10"/></div>}
                      {v.status==='sold' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="text-gray-900 text-xs uppercase tracking-[0.3em]">Vendu</span></div>}
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-black/60 transition-colors mb-2">{v.name}</h3>
                      <p className="text-black/30 text-sm mb-4">{[year, mileage&&`${typeof mileage==='number'?mileage.toLocaleString():mileage} km`, fuelType].filter(Boolean).join(' · ')}</p>
                      {v.price!=null && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-display font-bold text-xl">CHF {typeof v.price==='number'?v.price.toLocaleString():v.price}</span>
                          <ArrowRight size={16} className="text-black/15 group-hover:text-black/40 group-hover:translate-x-1 transition-all" />
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

export default VehiculesV4;
