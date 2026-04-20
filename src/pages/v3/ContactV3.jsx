import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { useContact } from '../../hooks/useContact';
import { useTranslation } from '../../i18n/LanguageContext';
import { Phone, Mail, MapPin, Send, Check, AlertCircle, Clock, ArrowRight, Car, Calendar } from 'lucide-react';

const BOOKING_URL = 'https://calendar.app.google/XXBtoLywzECtVDKJ8';

const ContactV3 = () => {
  const siteInfo = useSiteInfo();
  const contactMutation = useContact();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const vehiculeName = searchParams.get('vehicule');
  const vehiculePrix = searchParams.get('prix');
  const vehiculeAnnee = searchParams.get('annee');
  const vehiculeKm = searchParams.get('km');

  const buildVehicleMessage = () => {
    if (!vehiculeName) return '';
    let msg = `Bonjour,\n\nJe suis intéressé(e) par le véhicule suivant :\n- ${vehiculeName}`;
    if (vehiculeAnnee) msg += ` (${vehiculeAnnee})`;
    if (vehiculeKm && vehiculeKm !== '0') msg += `\n- Kilométrage : ${Number(vehiculeKm).toLocaleString('fr-CH')} km`;
    if (vehiculePrix) msg += `\n- Prix affiché : CHF ${Number(vehiculePrix).toLocaleString('fr-CH')}.-`;
    msg += '\n\nMerci de me recontacter pour plus d\'informations.\n\nCordialement,';
    return msg;
  };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: buildVehicleMessage() });
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

  return (
    <>
      <SEOHead page="contact" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://swigs.online/uploads/grecoautogroup/1775542048321-636143732.webp" alt="Greco Autogroup" className="w-full h-full object-cover" style={{ objectPosition: 'center 60%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-[#0a1628]/30"></div>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-16 md:pb-24 w-full">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('contact.label')}</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9]">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      {/* ═══ CONTACT INFO ═══ Phone-first layout */}
      <section className="bg-[#0d1117] border-b border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-10">
          {/* Phone buttons — prominent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {siteInfo.contact?.phone && (
              <a
                href={`tel:${siteInfo.contact.phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-5 p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <Phone size={22} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Mobile</p>
                  <p className="text-white text-xl font-display font-bold">{siteInfo.contact.phone}</p>
                </div>
              </a>
            )}
            {siteInfo.contact?.phoneLandline && (
              <a
                href={`tel:${siteInfo.contact.phoneLandline.replace(/\s/g, '')}`}
                className="group flex items-center gap-5 p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Phone size={22} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Fixe</p>
                  <p className="text-white text-xl font-display font-bold">{siteInfo.contact.phoneLandline}</p>
                </div>
              </a>
            )}
          </div>

          {/* Other info — secondary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {siteInfo.contact?.email && (
              <a href={`mailto:${siteInfo.contact.email}`} className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <Mail size={16} className="text-white/30" />
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Email</p>
                  <p className="text-white text-sm">{siteInfo.contact.email}</p>
                </div>
              </a>
            )}
            <a href="https://maps.google.com/?q=Rue+des+Aprages+2,+1957+Ardon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
              <MapPin size={16} className="text-white/30" />
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Adresse</p>
                <p className="text-white text-sm">{siteInfo.contact?.address || 'Ardon, Valais'}</p>
              </div>
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
              <Calendar size={16} className="text-white/30" />
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Rendez-vous</p>
                <p className="text-white text-sm">Réserver en ligne</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ BOOKING CTA ═══ */}
      <section className="bg-[#0d1117] border-b border-white/5 py-16 md:py-20">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="relative overflow-hidden border border-white/10 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] opacity-50"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 p-8 md:p-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-white/40" />
                  <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Réservation en ligne</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-4">
                  Prenez rendez-vous<br />en quelques clics
                </h2>
                <p className="text-white/50 text-base font-light leading-relaxed max-w-xl">
                  Choisissez un créneau qui vous convient pour découvrir un véhicule, faire estimer le vôtre ou discuter de votre projet. Confirmation immédiate par email.
                </p>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                <Calendar size={16} />
                Réserver un créneau
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FORM + MAP ═══ */}
      <section className="bg-[#0d1117] py-20 md:py-32">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Form */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('contact.form_title')}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-10">
                {t('contact.form_title')}
              </h2>

              {vehiculeName && !submitted && (
                <div className="flex items-center gap-3 border border-white/10 p-4 mb-8">
                  <Car size={18} className="text-white/30 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Demande pour : {vehiculeName}</p>
                    <p className="text-white/30 text-xs">Le message a été pré-rempli avec les détails du véhicule.</p>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="border border-white/10 p-12 text-center">
                  <Check size={32} className="text-white/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{t('contact.success')}</h3>
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
                      {t('contact.name')} *
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
                        {t('contact.email')} *
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
                        {t('contact.phone')}
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
                      {t('contact.message')} *
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
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.send')}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.5!2d7.2686508!3d46.204933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ec5c829a2b641%3A0xfaed480cb0b961a9!2sGreco+Auto+Group!5e0!3m2!1sfr!2sch"
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
                {siteInfo.contact?.phone && (
                  <a href={`tel:${siteInfo.contact.phone.replace(/\s/g, '')}`} className="bg-[#0d1117] p-6 group block">
                    <Phone size={16} className="text-white/20 mb-2 group-hover:text-white/40 transition-colors" />
                    <p className="text-white text-sm font-medium">{siteInfo.contact.phone}</p>
                    <p className="text-white/30 text-xs mt-1">Mobile</p>
                  </a>
                )}
                {siteInfo.contact?.phoneLandline && (
                  <a href={`tel:${siteInfo.contact.phoneLandline.replace(/\s/g, '')}`} className="bg-[#0d1117] p-6 group block">
                    <Phone size={16} className="text-white/20 mb-2 group-hover:text-white/40 transition-colors" />
                    <p className="text-white text-sm font-medium">{siteInfo.contact.phoneLandline}</p>
                    <p className="text-white/30 text-xs mt-1">Fixe</p>
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
