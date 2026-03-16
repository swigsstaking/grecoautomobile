import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { useContact } from '../../hooks/useContact';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Clock, ArrowRight, MessageSquare } from 'lucide-react';

const ContactV2 = () => {
  const siteInfo = useSiteInfo();
  const contactMutation = useContact();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

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

  const contactCards = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: siteInfo.contact?.phone,
      href: siteInfo.contact?.phone ? `tel:${siteInfo.contact.phone}` : null,
      description: 'Appelez-nous directement',
      color: 'from-blue-500/20',
    },
    {
      icon: Mail,
      title: 'Email',
      value: siteInfo.contact?.email,
      href: siteInfo.contact?.email ? `mailto:${siteInfo.contact.email}` : null,
      description: 'Envoyez-nous un email',
      color: 'from-emerald-500/20',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: siteInfo.contact?.address,
      description: 'Venez nous rencontrer',
      color: 'from-amber-500/20',
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: siteInfo.contact?.hours || 'Lun - Ven: 8h00 - 18h00\nSam: Sur rendez-vous',
      description: 'Nos heures d\'ouverture',
      color: 'from-purple-500/20',
    },
  ].filter(item => item.value);

  return (
    <>
      <SEOHead page="contact" />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
            alt="Contactez-nous"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"></div>
        </div>
        <div className="container-site relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full px-5 py-2 mb-8">
            <MessageSquare size={14} className="text-primary-200" />
            <span className="text-primary-200 text-sm font-medium tracking-wide">Parlons-en</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Contactez-<span className="text-primary-300">nous</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Une question ? Un projet ? N'hésitez pas à nous contacter,
            notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      {/* Contact Cards - Floating */}
      <section className="relative -mt-16 z-20 pb-4">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((item, index) => {
              const Wrapper = item.href ? 'a' : 'div';
              const wrapperProps = item.href ? { href: item.href } : {};
              return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className={`group bg-primary-700/40 backdrop-blur-xl border border-primary-500/15 rounded-2xl p-5 hover:border-primary-400/25 transition-all duration-300 ${item.href ? 'cursor-pointer' : ''}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} to-transparent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon size={22} className="text-primary-300" />
                  </div>
                  <h3 className="font-display font-bold text-text-primary text-sm mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-xs mb-2">{item.description}</p>
                  {item.href ? (
                    <p className="text-primary-300 font-medium text-sm group-hover:text-primary-200 transition-colors">{item.value}</p>
                  ) : (
                    <p className="text-text-secondary text-sm whitespace-pre-line">{item.value}</p>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                Formulaire
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mt-3 mb-8">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-primary-300" size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    Message envoyé !
                  </h3>
                  <p className="text-text-secondary mb-8">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary-300 hover:text-primary-200 font-semibold cursor-pointer inline-flex items-center gap-2"
                  >
                    Envoyer un autre message <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-primary-400/40 focus:ring-1 focus:ring-primary-400/30 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-primary-400/40 focus:ring-1 focus:ring-primary-400/30 transition-all"
                        placeholder="votre@email.ch"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-primary-400/40 focus:ring-1 focus:ring-primary-400/30 transition-all"
                        placeholder="079 XXX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-3.5 bg-primary-700/20 border border-primary-500/15 rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-primary-400/40 focus:ring-1 focus:ring-primary-400/30 transition-all resize-none"
                      placeholder="Décrivez votre projet ou votre question..."
                    />
                  </div>

                  {contactMutation.isError && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/15 p-4 rounded-xl">
                      <AlertCircle size={20} />
                      <span>Une erreur est survenue. Veuillez réessayer.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer le message
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <span className="text-primary-300 font-medium uppercase tracking-widest text-sm">
                Localisation
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mt-3 mb-8">
                Nous trouver
              </h2>

              <div className="rounded-3xl overflow-hidden border border-primary-500/15 h-[400px] mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.5!2d6.63!3d46.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGreco+Autogroup!5e0!3m2!1sfr!2sch"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Greco Autogroup"
                />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-4">
                {siteInfo.contact?.phone && (
                  <a
                    href={`tel:${siteInfo.contact.phone}`}
                    className="flex items-center gap-3 bg-primary-700/20 border border-primary-500/15 rounded-2xl p-4 hover:border-primary-400/25 transition-all group"
                  >
                    <div className="w-10 h-10 bg-primary-500/15 rounded-xl flex items-center justify-center group-hover:bg-primary-500/25 transition-colors">
                      <Phone size={18} className="text-primary-300" />
                    </div>
                    <div>
                      <p className="text-text-primary font-bold text-sm">Appeler</p>
                      <p className="text-text-secondary text-xs">{siteInfo.contact.phone}</p>
                    </div>
                  </a>
                )}
                {siteInfo.contact?.email && (
                  <a
                    href={`mailto:${siteInfo.contact.email}`}
                    className="flex items-center gap-3 bg-primary-700/20 border border-primary-500/15 rounded-2xl p-4 hover:border-primary-400/25 transition-all group"
                  >
                    <div className="w-10 h-10 bg-primary-500/15 rounded-xl flex items-center justify-center group-hover:bg-primary-500/25 transition-colors">
                      <Mail size={18} className="text-primary-300" />
                    </div>
                    <div>
                      <p className="text-text-primary font-bold text-sm">Email</p>
                      <p className="text-text-secondary text-xs">{siteInfo.contact.email}</p>
                    </div>
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

export default ContactV2;
