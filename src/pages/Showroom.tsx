import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import Seo from '../components/Seo';

export default function Showroom() {
  return (
    <div className="min-h-screen">
      <Seo
        title="Notre showroom — Nuances Décoration, Marseille"
        description="Découvrez notre showroom de 100 m² à Marseille : plus de 500 références de tissus, réalisations finies et conseils personnalisés. 63 Av. de Montredon, 13008 Marseille."
        path="/showroom"
      />
      {/* Bannière — texte gauche, visuel droite */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] bg-[var(--grege-p)]">
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-20 order-2 md:order-1">
          <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[4px] uppercase text-[var(--primary)] mb-5 block">
            Notre showroom
          </span>
          <h1 className="font-['FreeSerif'] font-black text-[44px] md:text-[60px] text-[var(--moka)] leading-[1.05] mb-6">
            Un espace dédié
            <br />à vos inspirations
          </h1>
          <div className="w-16 h-[2px] bg-[var(--primary)] mb-8"></div>
          <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.9] max-w-md">
            100&nbsp;m² de tissus nobles, d'échantillons et de réalisations finies pour vous aider
            à visualiser et concrétiser votre projet sur mesure.
          </p>
        </div>
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto order-1 md:order-2">
          <img
            src={`${import.meta.env.BASE_URL}header-showroom.jpg`}
            alt="Notre showroom"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Infos + carte */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Colonne gauche — adresse, horaires, tél, conseil */}
          <div className="px-8 py-14 md:px-16 md:py-20 flex flex-col justify-center space-y-8 border-r border-[var(--pale)]">
            <div className="flex gap-4">
              <MapPin size={22} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-2">
                  Adresse
                </p>
                <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.7]">
                  63 Av. de Montredon
                  <br />
                  13008 Marseille, France
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock size={22} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-2">
                  Horaires d'ouverture
                </p>
                <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.7]">
                  Lundi – Vendredi : 9h00 – 18h00
                  <br />
                  Samedi : sur rendez-vous
                  <br />
                  Dimanche : Fermé
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={22} className="text-[var(--primary)] flex-shrink-0 mt-1" />
              <div>
                <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-2">
                  Téléphone
                </p>
                <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.7]">
                  07 59 57 40 98<br />06 03 65 79 97
                </p>
              </div>
            </div>

            <div className="bg-[var(--linen)] p-6">
              <p className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] uppercase text-[var(--primary)] mb-3">
                Bon à savoir
              </p>
              <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                Nous vous recommandons de prendre rendez-vous pour bénéficier d'un conseil
                personnalisé et d'une attention entièrement dédiée à votre projet.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-5 font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-8 no-underline transition-colors hover:bg-[var(--charcoal)]"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Colonne droite — Google Maps embed */}
          <div className="relative min-h-[400px] md:min-h-0">
            <iframe
              title="Localisation Nuance Décoration"
              src="https://maps.google.com/maps?q=63+Av.+de+Montredon,+13008+Marseille,+France&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--linen)] px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-['FreeSerif'] font-black text-[32px] md:text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
              Ce que vous découvrirez
            </h2>
            <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
          </div>

          {/* Mobile: cartes horizontales — Desktop: grille 3 colonnes verticales */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8 mb-16">
            <div className="flex gap-4 md:flex-col md:gap-0 md:text-center bg-white md:bg-transparent p-4 md:p-0">
              <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden md:w-full md:h-auto md:aspect-square md:mb-6">
                <img
                  src={`${import.meta.env.BASE_URL}500-references.jpg`}
                  alt="Collections de tissus"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center md:block">
                <h3 className="font-['FreeSerif'] font-black text-[18px] md:text-[22px] text-[var(--moka)] leading-[1.1] mb-2 md:mb-3">
                  Collection de tissus
                </h3>
                <p className="font-['MaisonNeue'] font-light text-[12px] md:text-[13px] text-[var(--warm)] leading-[1.8]">
                  Plus de 500 références de tissus d'ameublement, voilages et matières techniques
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:flex-col md:gap-0 md:text-center bg-white md:bg-transparent p-4 md:p-0">
              <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden md:w-full md:h-auto md:aspect-square md:mb-6">
                <img
                  src={`${import.meta.env.BASE_URL}revetement_interieur.jpg`}
                  alt="Réalisations finies"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center md:block">
                <h3 className="font-['FreeSerif'] font-black text-[18px] md:text-[22px] text-[var(--moka)] leading-[1.1] mb-2 md:mb-3">
                  Réalisations finies
                </h3>
                <p className="font-['MaisonNeue'] font-light text-[12px] md:text-[13px] text-[var(--warm)] leading-[1.8]">
                  Exemples de nos créations pour vous inspirer et visualiser les possibilités
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:flex-col md:gap-0 md:text-center bg-white md:bg-transparent p-4 md:p-0">
              <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden md:w-full md:h-auto md:aspect-square md:mb-6">
                <img
                  src={`${import.meta.env.BASE_URL}showroom2.jpg`}
                  alt="Conseil personnalisé"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center md:block">
                <h3 className="font-['FreeSerif'] font-black text-[18px] md:text-[22px] text-[var(--moka)] leading-[1.1] mb-2 md:mb-3">
                  Conseils personnalisés
                </h3>
                <p className="font-['MaisonNeue'] font-light text-[12px] md:text-[13px] text-[var(--warm)] leading-[1.8]">
                  Nos experts vous accompagnent pour définir le projet qui vous correspond
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-12 py-16 bg-[var(--moka)] text-center">
        <h2 className="font-['FreeSerif'] italic font-normal text-[32px] text-[var(--linen)] leading-[1.5] mb-8">
          Concrétisons votre projet ensemble
        </h2>
        <p className="font-['MaisonNeue'] font-light text-[14px] text-[rgba(248,244,240,0.8)] leading-[1.9] max-w-2xl mx-auto mb-8">
          Notre équipe vous accueille avec plaisir pour échanger sur votre projet et vous faire découvrir
          notre univers.
        </p>
        <Link
          to="/contact"
          className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase text-[var(--moka)] bg-[var(--linen)] py-4 px-8 no-underline transition-colors hover:bg-[var(--pale)]"
        >
          Prendre rendez-vous
        </Link>
      </section>
    </div>
  );
}
