import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useContact } from '../hooks/useContact';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Clock, Car } from 'lucide-react';

const Contact = () => {
  const siteInfo = useSiteInfo();
  const contactMutation = useContact();
  const [searchParams] = useSearchParams();

  const vehiculeName = searchParams.get('vehicule');
  const vehiculePrix = searchParams.get('prix');
  const vehiculeAnnee = searchParams.get('annee');
  const vehiculeKm = searchParams.get('km');

  const buildVehicleMessage = () => {
    if (!vehiculeName) return '';
    let msg = `Bonjour,\n\nJe suis intéressé(e) par le véhicule suivant :\n- ${vehiculeName}`;
    if (vehiculeAnnee) msg += ` (${vehiculeAnnee})`;
    if (vehiculeKm && vehiculeKm !== '0') msg += `\n- Kilométrage : ${Number(vehiculeKm).toLocaleString('fr-CH')} km`;
    if (vehiculePrix) msg += `\n- Prix affiché : CHF ${Number(vehiculePrix).toLocaleString('fr-CH')}.–`;
    msg += '\n\nMerci de me recontacter pour plus d\'informations.\n\nCordialement,';
    return msg;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: buildVehicleMessage(),
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: buildVehicleMessage() });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: siteInfo.contact?.phone,
      href: siteInfo.contact?.phone ? `tel:${siteInfo.contact.phone}` : null,
    },
    {
      icon: Mail,
      title: 'Email',
      value: siteInfo.contact?.email,
      href: siteInfo.contact?.email ? `mailto:${siteInfo.contact.email}` : null,
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: siteInfo.contact?.address,
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: siteInfo.contact?.hours || 'Lun - Ven: 8h00 - 18h00 | Sam: Sur rendez-vous',
    },
  ].filter(item => item.value);

  return (
    <>
      <SEOHead page="contact" />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
            alt="Contactez-nous"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/50"></div>
        </div>
        <div className="container-site relative z-10">
          <p className="text-primary-300 font-medium uppercase tracking-widest text-sm mb-4">
            Parlons-en
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Contact
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Une question ? Un projet ? N'hésitez pas à nous contacter,
            notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="section-title mb-8">Nos Coordonnées</h2>

              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-dark-section border border-primary-600/20 rounded-xl p-5"
                  >
                    <div className="w-12 h-12 bg-primary-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary-300" size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-primary-300 hover:text-primary-200 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="section-title mb-8">Envoyez-nous un message</h2>

              {vehiculeName && !submitted && (
                <div className="flex items-center gap-3 bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 mb-6">
                  <Car className="text-primary-300 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-text-primary text-sm font-medium">Demande pour : {vehiculeName}</p>
                    <p className="text-text-secondary text-xs">Le message a été pré-rempli avec les détails du véhicule.</p>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-8 text-center">
                  <CheckCircle className="text-primary-300 mx-auto mb-4" size={52} />
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary-300 hover:text-primary-200 font-semibold cursor-pointer"
                  >
                    Envoyer un autre message
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
                      className="w-full px-4 py-3 bg-dark-section border border-primary-600/30 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
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
                        className="w-full px-4 py-3 bg-dark-section border border-primary-600/30 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
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
                        className="w-full px-4 py-3 bg-dark-section border border-primary-600/30 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
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
                      className="w-full px-4 py-3 bg-dark-section border border-primary-600/30 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  {contactMutation.isError && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                      <AlertCircle size={20} />
                      <span>Une erreur est survenue. Veuillez réessayer.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Google Maps */}
      <section className="bg-dark-section">
        <div className="container-site py-12">
          <h2 className="section-title mb-8 text-center">Nous trouver</h2>
          <div className="rounded-2xl overflow-hidden border border-primary-600/20" style={{ height: '400px' }}>
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
        </div>
      </section>
    </>
  );
};

export default Contact;
