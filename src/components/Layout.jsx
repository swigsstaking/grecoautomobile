import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSiteInfo } from '../hooks/useSiteInfo';

const TikTokIcon = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.17v-3.46a4.85 4.85 0 01-1.59-.27 4.83 4.83 0 01-1.41-.76v.01z"/>
  </svg>
);

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const siteInfo = useSiteInfo();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Notre Histoire', path: '/notre-histoire' },
    { name: 'Vehicules', path: '/vehicules' },
    {
      name: 'Services',
      path: '/services',
      children: [
        { name: 'Achat', path: '/services#achat' },
        { name: 'Vente', path: '/services#vente' },
        { name: 'Depot-vente', path: '/services#depot-vente' },
      ],
    },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    const cleanPath = path.split('#')[0];
    if (cleanPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(cleanPath);
  };

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
              {siteInfo.social?.tiktok && (
                <a href={siteInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  <TikTokIcon size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-dark-bg/95 backdrop-blur-md border-b border-primary-700/30">
          <div className="container-site py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="group flex-shrink-0">
                <img src="/logo.png" alt="Greco Autogroup" className="h-12 md:h-14 w-auto" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
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
              <Link to="/" className="inline-block mb-4">
                <img src="/logo.png" alt="Greco Autogroup" className="h-10 w-auto" />
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed">
                {siteInfo.description || "Votre partenaire de confiance pour l'achat, la vente et le depot-vente de vehicules d'occasion."}
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
                <li><Link to="/services#achat" className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Achat</Link></li>
                <li><Link to="/services#vente" className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Vente</Link></li>
                <li><Link to="/services#depot-vente" className="text-text-secondary hover:text-primary-300 transition-colors text-sm">Depot-vente</Link></li>
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
                  {siteInfo.social?.tiktok && (
                    <a href={siteInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-300 transition-colors">
                      <TikTokIcon size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-700/30 mt-10 pt-8 text-center text-text-secondary text-sm">
            <p>
              &copy; {new Date().getFullYear()} {siteInfo.siteName || 'Greco Autogroup'}. Tous droits reserves.
              {' | '}
              <a
                href="https://swigs.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
              >
                Site cree par Swigs SA
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
