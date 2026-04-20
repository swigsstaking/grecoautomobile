import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useSiteInfo } from '../../hooks/useSiteInfo';
import { useContact } from '../../hooks/useContact';
import { useTranslation } from '../../i18n/LanguageContext';
import { Phone, Mail, MapPin, Check, AlertCircle, ArrowRight, Car, Calendar } from 'lucide-react';

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

  const phoneNumber = siteInfo.contact?.phone || '079 191 90 89';
  const phoneLandline = siteInfo.contact?.phoneLandline || '027 306 90 90';
  const email = siteInfo.contact?.email || 'info@grecoautogroup.ch';
  const address = siteInfo.contact?.address || 'Rue des Aprages 2, 1957 Ardon';

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

      {/* ═══ MAIN CONTENT ═══ 3 columns: phones | form | map */}
      <section className="bg-[#0d1117] py-16 md:py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_1fr] gap-12 lg:gap-16">

            {/* ── LEFT SIDEBAR: Contact cards ── */}
            <div className="space-y-4">
              {/* Téléphone Mobile */}
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0">
                  <Phone size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Mobile</p>
                  <p className="text-white text-lg font-display font-bold group-hover:text-green-400 transition-colors">{phoneNumber}</p>
                </div>
              </a>

              {/* Téléphone Fixe */}
              <a
                href={`tel:${phoneLandline.replace(/\s/g, '')}`}
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                  <Phone size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Fixe</p>
                  <p className="text-white text-lg font-display font-bold group-hover:text-blue-400 transition-colors">{phoneLandline}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <Mail size={18} className="text-white/20 flex-shrink-0" />
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Email</p>
                  <p className="text-white text-sm">{email}</p>
                </div>
              </a>

              {/* Adresse */}
              <a
                href="https://maps.google.com/?q=Greco+Auto+Group+Ardon"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <MapPin size={18} className="text-white/20 flex-shrink-0" />
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-0.5">Adresse</p>
                  <p className="text-white text-sm">{address}</p>
                </div>
              </a>

              {/* Rendez-vous */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 justify-center w-full px-6 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                <Calendar size={16} />
                Prendre rendez-vous
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* ── CENTER: Form ── */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">{t('contact.form_title')}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-10">
                {t('contact.form_title')}
              </h2>

              {vehiculeName && !submitted && (
                <div className="flex items-center gap-3 border border-white/10 rounded-lg p-4 mb-8">
                  <Car size={18} className="text-white/30 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Demande pour : {vehiculeName}</p>
                    <p className="text-white/30 text-xs">Le message a été pré-rempli avec les détails du véhicule.</p>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="border border-white/10 rounded-lg p-12 text-center">
                  <Check size={32} className="text-green-400 mx-auto mb-6" />
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

            {/* ── RIGHT: Map ── */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">Localisation</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[0.95] mb-10">
                Nous trouver
              </h2>

              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
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

              <div className="border border-white/10 rounded-lg p-6">
                <p className="text-white font-display font-bold mb-2">Greco Autogroup</p>
                <p className="text-white/40 text-sm mb-1">{address}</p>
                <p className="text-white/40 text-sm">Lun-Ven : 8h-18h | Sam : sur RDV</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactV3;
