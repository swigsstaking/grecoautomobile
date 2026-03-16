import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Menu, X, ChevronDown, Layers } from 'lucide-react';
import { useState } from 'react';
import { useSiteInfo } from '../hooks/useSiteInfo';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const siteInfo = useSiteInfo();
  const location = useLocation();

  const isV2 = location.pathname.startsWith('/v2');
  const isV3 = location.pathname.startsWith('/v3');
  const isV4 = location.pathname.startsWith('/v4');
  const isV5 = location.pathname.startsWith('/v5');
  const isV6 = location.pathname.startsWith('/v6');
  const isV8 = location.pathname.startsWith('/v8');
  const currentVersion = isV8 ? 'v8' : isV6 ? 'v6' : isV5 ? 'v5' : isV4 ? 'v4' : isV3 ? 'v3' : isV2 ? 'v2' : 'v1';

  const getVersionPath = (base) => {
    if (currentVersion === 'v8') return `/v8${base}`;
    if (currentVersion === 'v6') return `/v6${base}`;
    if (currentVersion === 'v5') return `/v5${base}`;
    if (currentVersion === 'v4') return `/v4${base}`;
    if (currentVersion === 'v3') return `/v3${base}`;
    if (currentVersion === 'v2') return `/v2${base}`;
    return base || '/';
  };

  const navigation = [
    {
      name: 'Accueil',
      path: getVersionPath(''),
      versions: { v1: '/', v2: '/v2', v3: '/v3', v4: '/v4', v5: '/v5', v6: '/v6', v8: '/v8' },
    },
    {
      name: 'Notre Histoire',
      path: getVersionPath('/notre-histoire'),
      versions: { v1: '/notre-histoire', v2: '/v2/notre-histoire', v3: '/v3/notre-histoire', v4: '/v4/notre-histoire', v5: '/v5', v6: '/v6', v8: '/v8' },
    },
    {
      name: 'Véhicules',
      path: getVersionPath('/vehicules'),
      versions: { v1: '/vehicules', v2: '/v2/vehicules', v3: '/v3/vehicules', v4: '/v4/vehicules', v5: '/v5', v6: '/v6', v8: '/v8' },
    },
    {
      name: 'Services',
      path: getVersionPath('/services'),
      versions: { v1: '/services', v2: '/v2/services', v3: '/v3/services', v4: '/v4/services', v5: '/v5', v6: '/v6', v8: '/v8' },
      children: [
        { name: 'Achat', path: getVersionPath('/services') + '#achat' },
        { name: 'Vente', path: getVersionPath('/services') + '#vente' },
        { name: 'Dépôt-vente', path: getVersionPath('/services') + '#depot-vente' },
      ],
    },
    {
      name: 'Contact',
      path: getVersionPath('/contact'),
      versions: { v1: '/contact', v2: '/v2/contact', v3: '/v3/contact', v4: '/v4/contact', v5: '/v5', v6: '/v6', v8: '/v8' },
    },
  ];

  const isActive = (path) => {
    const cleanPath = path.split('#')[0];
    if (['/', '/v2', '/v3', '/v4', '/v5', '/v6'].includes(cleanPath)) return location.pathname === cleanPath;
    return location.pathname.startsWith(cleanPath);
  };

  const getCurrentVersionLabel = () => isV8 ? 'V8' : isV6 ? 'V6' : isV5 ? 'V5' : isV4 ? 'V4' : isV3 ? 'V3' : isV2 ? 'V2' : 'V1';

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-primary-700 border-b border-primary-600/50">
          <div className="container-site flex flex-wrap justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-4">
              {siteInfo.contact?.phone && (
                <a href={`tel:${siteInfo.contact.phone}`} className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
                  <Phone size={13} />
                  <span>{siteInfo.contact.phone}</span>
                </a>
              )}
              {siteInfo.contact?.email && (
                <a href={`mailto:${siteInfo.contact.email}`} className="hidden sm:flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
                  <Mail size={13} />
                  <span>{siteInfo.contact.email}</span>
                </a>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Version Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-primary-300 hover:text-primary-200 transition-colors text-xs font-bold uppercase tracking-wider bg-primary-600/40 px-3 py-1 rounded-md cursor-pointer">
                  <Layers size={12} />
                  {getCurrentVersionLabel()}
                  <ChevronDown size={12} />
                </button>
                <div className="absolute top-full right-0 mt-1 bg-dark-section border border-primary-600/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[120px] z-50">
                  {[
                    { label: 'V1 - Original', path: '/', key: 'v1' },
                    { label: 'V2 - Premium', path: '/v2', key: 'v2' },
                    { label: 'V3 - Cinematic', path: '/v3', key: 'v3' },
                    { label: 'V4 - Light', path: '/v4', key: 'v4' },
                    { label: 'V5 - Garage', path: '/v5', key: 'v5' },
                    { label: 'V6 - Garage+', path: '/v6', key: 'v6' },
                    { label: 'V8 - Light', path: '/v8', key: 'v8' },
                  ].map((v, i, arr) => (
                    <Link
                      key={v.key}
                      to={v.path}
                      className={`block px-4 py-2.5 text-sm transition-colors ${i === 0 ? 'rounded-t-lg' : ''} ${i === arr.length - 1 ? 'rounded-b-lg' : ''} ${
                        currentVersion === v.key ? 'text-primary-300 bg-primary-500/10' : 'text-text-secondary hover:text-text-primary hover:bg-primary-500/10'
                      }`}
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-px h-4 bg-primary-600/50"></div>

              {siteInfo.social?.facebook && (
                <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  <Facebook size={15} />
                </a>
              )}
              {siteInfo.social?.instagram && (
                <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  <Instagram size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-dark-bg/95 backdrop-blur-md border-b border-primary-700/30">
          <div className="container-site py-4">
            <div className="flex items-center justify-between">
              <Link to={getVersionPath('')} className="group">
                <span className="text-2xl font-display font-bold text-text-primary group-hover:text-primary-300 transition-colors">
                  GRECO
                </span>
                <span className="text-2xl font-display font-light text-primary-400 ml-1">
                  AUTOGROUP
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-md font-medium text-sm uppercase tracking-wider transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-text-primary bg-primary-500/20'
                            : 'text-text-secondary hover:text-text-primary hover:bg-primary-500/10'
                        }`}
                      >
                        {item.name}
                        {item.children && <ChevronDown size={14} className="inline ml-1" />}
                      </Link>
                    </div>
                    {item.children && (
                      <div className="absolute top-full left-0 mt-1 bg-dark-section border border-primary-600/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-primary-500/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                        {/* Version links in dropdown */}
                        <div className="border-t border-primary-600/30 mt-1 pt-1">
                          {['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v8'].map((v) => (
                            <Link
                              key={v}
                              to={item.versions[v]}
                              className={`block px-4 py-2 text-xs uppercase tracking-wider transition-colors last:rounded-b-lg ${
                                currentVersion === v ? 'text-primary-300' : 'text-text-secondary/50 hover:text-text-secondary'
                              }`}
                            >
                              {v.toUpperCase()}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {!item.children && (
                      <div className="absolute top-full left-0 mt-1 bg-dark-section border border-primary-600/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px]">
                        {[
                          { label: 'V1', key: 'v1' },
                          { label: 'V2', key: 'v2' },
                          { label: 'V3', key: 'v3' },
                          { label: 'V4', key: 'v4' },
                          { label: 'V5', key: 'v5' },
                          { label: 'V6', key: 'v6' },
                          { label: 'V8', key: 'v8' },
                        ].map((v, i, arr) => (
                          <Link
                            key={v.key}
                            to={item.versions[v.key]}
                            className={`block px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${i === 0 ? 'rounded-t-lg' : ''} ${i === arr.length - 1 ? 'rounded-b-lg' : ''} ${
                              currentVersion === v.key ? 'text-primary-300 bg-primary-500/10' : 'text-text-secondary hover:text-text-primary hover:bg-primary-500/10'
                            }`}
                          >
                            {v.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {siteInfo.contact?.phone && (
                  <a href={`tel:${siteInfo.contact.phone}`} className="btn-primary ml-4 text-sm">
                    <Phone size={16} />
                    Appeler
                  </a>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-text-primary hover:bg-primary-500/10 rounded-lg transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-primary-700/30 pt-4">
                {/* Mobile version switcher */}
                <div className="flex gap-1 mb-4 p-1 bg-primary-700/20 rounded-xl">
                  {[
                    { label: 'V1', path: '/', key: 'v1' },
                    { label: 'V2', path: '/v2', key: 'v2' },
                    { label: 'V3', path: '/v3', key: 'v3' },
                    { label: 'V4', path: '/v4', key: 'v4' },
                    { label: 'V5', path: '/v5', key: 'v5' },
                    { label: 'V6', path: '/v6', key: 'v6' },
                    { label: 'V8', path: '/v8', key: 'v8' },
                  ].map((v) => (
                    <Link
                      key={v.key}
                      to={v.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 text-center py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                        currentVersion === v.key ? 'bg-primary-500/20 text-primary-300' : 'text-text-secondary'
                      }`}
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.path}
                          onClick={() => !item.children && setMobileMenuOpen(false)}
                          className={`flex-grow block px-4 py-3 rounded-lg font-medium text-sm uppercase tracking-wider transition-colors ${
                            isActive(item.path)
                              ? 'text-text-primary bg-primary-500/20'
                              : 'text-text-secondary hover:text-text-primary hover:bg-primary-500/10'
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            className="p-3 text-text-secondary hover:text-text-primary cursor-pointer"
                          >
                            <ChevronDown size={16} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      {item.children && openDropdown === item.name && (
                        <div className="ml-4 border-l border-primary-600/30">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {siteInfo.contact?.phone && (
                    <a href={`tel:${siteInfo.contact.phone}`} className="btn-primary justify-center mt-2 text-sm">
                      <Phone size={16} />
                      Appeler
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 border-t border-primary-700/30">
        <div className="container-site py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to={getVersionPath('')} className="inline-block mb-4">
                <span className="text-xl font-display font-bold text-text-primary">GRECO</span>
                <span className="text-xl font-display font-light text-primary-400 ml-1">AUTOGROUP</span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed">
                {siteInfo.description || "Votre partenaire de confiance pour l'achat, la vente et le dépôt-vente de véhicules d'occasion."}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-text-secondary hover:text-primary-300 transition-colors text-sm">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to={getVersionPath('/services') + '#achat'} className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Achat</Link></li>
                <li><Link to={getVersionPath('/services') + '#vente'} className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Vente</Link></li>
                <li><Link to={getVersionPath('/services') + '#depot-vente'} className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Dépôt-vente</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                {siteInfo.contact?.address && (
                  <p className="text-text-secondary">{siteInfo.contact.address}</p>
                )}
                {siteInfo.contact?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-primary-400" />
                    <a href={`tel:${siteInfo.contact.phone}`} className="text-text-secondary hover:text-primary-300 transition-colors">
                      {siteInfo.contact.phone}
                    </a>
                  </p>
                )}
                {siteInfo.contact?.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-primary-400" />
                    <a href={`mailto:${siteInfo.contact.email}`} className="text-text-secondary hover:text-primary-300 transition-colors">
                      {siteInfo.contact.email}
                    </a>
                  </p>
                )}
                <div className="flex items-center gap-3 pt-2">
                  {siteInfo.social?.facebook && (
                    <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-300 transition-colors">
                      <Facebook size={18} />
                    </a>
                  )}
                  {siteInfo.social?.instagram && (
                    <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-300 transition-colors">
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-700/30 mt-10 pt-8 text-center text-text-secondary text-sm">
            <p>
              &copy; {new Date().getFullYear()} {siteInfo.siteName || 'Greco Autogroup'}. Tous droits réservés.
              {' | '}
              <a
                href="https://swigs.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
              >
                Site créé par Swigs SA
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
