import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { useContact } from '../../hooks/useContact';
import { Phone, Mail, MapPin, Send, Check, AlertCircle, Clock, ArrowRight } from 'lucide-react';

const ContactV3 = () => {
  const siteInfo = useSiteInfo();
  const contactMutation = useContact();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEOHead page="contact" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=90"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-16 md:pb-24 w-full">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Parlons-en</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9]">
            Contact
          </h1>
        </div>
      </section>

      {/* ═══ CONTACT INFO ═══ Horizontal strip */}
      <section className="bg-[#0d1117] border-b border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {[
              {
                icon: Phone,
                label: 'Téléphone',
                value: siteInfo.contact?.phone,
                href: siteInfo.contact?.phone ? `tel:${siteInfo.contact.phone}` : null,
              },
              {
                icon: Mail,
                label: 'Email',
                value: siteInfo.contact?.email,
                href: siteInfo.contact?.email ? `mailto:${siteInfo.contact.email}` : null,
              },
              {
                icon: MapPin,
                label: 'Adresse',
                value: siteInfo.contact?.address || 'Suisse',
              },
              {
                icon: Clock,
                label: 'Horaires',
                value: siteInfo.contact?.hours || 'Lun-Ven: 8h-18h',
              },
            ].filter(c => c.value).map((item, i) => (
              <div key={i} className="py-8 sm:first:pl-0 sm:pl-8 sm:last:pr-0 sm:pr-8">
                <item.icon size={16} className="text-white/20 mb-3" />
                <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white text-sm hover:text-white/70 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white text-sm">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM + MAP ═══ */}
      <section className="bg-[#0d1117] py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Form */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Formulaire</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-10">
                Envoyez-nous<br />un message
              </h2>

              {submitted ? (
                <div className="border border-white/10 p-12 text-center">
                  <Check size={32} className="text-white/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3">Message envoyé</h3>
                  <p className="text-white/40 text-sm mb-8">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-white/50 text-sm underline underline-offset-4 hover:text-white cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/30 text-xs uppercase tracking-[0.2em] mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/15 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-white/30 text-xs uppercase tracking-[0.2em] mb-3">
                        Email *
                      </label>
                      <input
                        type="email" id="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/15 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                        placeholder="votre@email.ch"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white/30 text-xs uppercase tracking-[0.2em] mb-3">
                        Téléphone
                      </label>
                      <input
                        type="tel" id="phone" name="phone"
                        value={formData.phone} onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/15 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                        placeholder="079 XXX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/30 text-xs uppercase tracking-[0.2em] mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message" name="message" required rows={4}
                      value={formData.message} onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/15 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors resize-none"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  {contactMutation.isError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      Une erreur est survenue. Veuillez réessayer.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer mt-4"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Envoi...
                      </>
                    ) : (
                      <>
                        Envoyer
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Localisation</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-10">
                Nous trouver
              </h2>

              <div className="aspect-[4/3] overflow-hidden mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.5!2d6.63!3d46.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGreco+Autogroup!5e0!3m2!1sfr!2sch"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Greco Autogroup"
                />
              </div>

              {/* Quick contact */}
              <div className="grid grid-cols-2 gap-px bg-white/5">
                {siteInfo.contact?.phone && (
                  <a href={`tel:${siteInfo.contact.phone}`} className="bg-[#0d1117] p-6 group block">
                    <Phone size={16} className="text-white/20 mb-2 group-hover:text-white/40 transition-colors" />
                    <p className="text-white text-sm font-medium">{siteInfo.contact.phone}</p>
                    <p className="text-white/30 text-xs mt-1">Appeler</p>
                  </a>
                )}
                {siteInfo.contact?.email && (
                  <a href={`mailto:${siteInfo.contact.email}`} className="bg-[#0d1117] p-6 group block">
                    <Mail size={16} className="text-white/20 mb-2 group-hover:text-white/40 transition-colors" />
                    <p className="text-white text-sm font-medium">{siteInfo.contact.email}</p>
                    <p className="text-white/30 text-xs mt-1">Écrire</p>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactV3;
