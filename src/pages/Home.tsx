import { useState, useRef, TouchEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstagramFeed from '../components/InstagramFeed';

const steps = [
  {
    number: '1',
    label: 'Conseils à domicile',
    description: 'En showroom ou à domicile, venez découvrir nos collections, parcourir nos échantillons et échanger sur votre projet.',
    image: `${import.meta.env.BASE_URL}conseil-domicile.jpg`,
  },
  {
    number: '2',
    label: 'Prise des mesures',
    description: 'Nous nous déplaçons à domicile pour relever vos cotes avec précision. Chaque détail est consigné pour garantir un résultat parfait à la pose.',
    image: `${import.meta.env.BASE_URL}prise-mesure.jpg`,
  },
  {
    number: '3',
    label: 'Fabrication locale',
    description: 'Vos créations prennent vie dans notre atelier. Coupe, assemblage, finitions — chaque pièce est réalisée avec soin par notre équipe.',
    image: `${import.meta.env.BASE_URL}fabrication-locale.jpg`,
  },
  {
    number: '4',
    label: 'Pose & Installation',
    description: 'Notre équipe assure l\'installation chez vous avec minutie. Nous veillons à ce que chaque détail soit impeccable, pour un résultat à la hauteur de votre projet.',
    image: `${import.meta.env.BASE_URL}pose-installation.jpg`,
  },
];

const GAP = 8; // px between cards
const PEEK = 16; // px of left padding so first card doesn't touch edge

function StepsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = steps.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        // container width - left padding, show 2 cards + peek of 3rd (~30px)
        const containerW = trackRef.current.offsetWidth - PEEK;
        setCardWidth(Math.floor((containerW - GAP - 30) / 2));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const maxMobile = total - 1;
  const offset = current * (cardWidth + GAP);

  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((p) => Math.min(p + 1, maxMobile));
      else setCurrent((p) => Math.max(p - 1, 0));
    }
  };

  return (
    <section className="bg-[var(--grege-p)] pt-14 md:pt-20 animate-[fadeUp_0.7s_0.15s_ease_both]">
      <div className="px-4 md:px-12 mb-10 md:mb-12 text-center">
        <h2 className="font-['FreeSerif'] font-normal text-[22px] md:text-[30px] text-[var(--moka)] leading-[1.4]">
          Un service <em>sur mesure</em>
        </h2>
      </div>

      {/* Desktop: 4 cards static */}
      <div className="hidden md:grid md:grid-cols-4 gap-[2px] px-0">
        {steps.map((step, i) => (
          <div key={i} className="bg-[var(--grege-p)] flex flex-col">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={step.image}
                alt={step.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,20,10,0.45)] to-transparent" />
            </div>
            <div className="px-8 py-8 flex flex-col flex-1 bg-[var(--grege-p)]">
              <div className="w-6 h-[1px] bg-[var(--primary)] mb-4"></div>
              <span className="font-['MaisonNeue'] font-light text-[11px] tracking-[2px] text-[var(--primary)] mb-2">{step.number}</span>
              <h3 className="font-['FreeSerif'] font-black text-[21px] text-[var(--moka)] mb-3 leading-tight">
                {step.label}
              </h3>
              <p className="font-['MaisonNeue'] font-light text-[12px] text-[var(--warm)] leading-[1.85] flex-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: swipeable — 2 full cards + peek of 3rd */}
      <div
        ref={trackRef}
        className="md:hidden overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            paddingLeft: PEEK,
            gap: GAP,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[var(--grege-p)] flex flex-col flex-shrink-0"
              style={{ width: cardWidth || 'calc(50% - 20px)' }}
            >
              <div className="relative overflow-hidden aspect-[2/3]">
                <img
                  src={step.image}
                  alt={step.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,20,10,0.5)] to-transparent" />
              </div>
              <div className="px-4 py-5 flex flex-col bg-[var(--grege-p)]">
                <div className="w-5 h-[1px] bg-[var(--primary)] mb-3"></div>
                <span className="font-['MaisonNeue'] font-light text-[10px] tracking-[2px] text-[var(--primary)] mb-1">{step.number}</span>
                <h3 className="font-['FreeSerif'] font-black text-[17px] text-[var(--moka)] mb-2 leading-tight">
                  {step.label}
                </h3>
                <p className="font-['MaisonNeue'] font-light text-[11px] text-[var(--warm)] leading-[1.8]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-5 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === i ? 'bg-[var(--moka)]' : 'bg-[var(--warm)] opacity-30'
              }`}
              aria-label={`Étape ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visible = 4;
  const slides = [
    {
      title: 'Rideaux',
      subtitle: 'Décoratifs & occultants',
      image: `${import.meta.env.BASE_URL}header-rideaux.jpg`,
      link: '/realisations/rideaux',
    },
    {
      title: 'Voilages',
      subtitle: 'Transparents & légers',
      image: `${import.meta.env.BASE_URL}voilages-home.jpg`,
      link: '/realisations/voilages',
    },
    {
      title: 'Stores',
      subtitle: 'Bateau & romain',
      image: `${import.meta.env.BASE_URL}nos_stores.jpg`,
      link: '/realisations/stores',
    },
    {
      title: 'Indoor',
      subtitle: 'Banquettes, coussins & Linge de maison',
      image: `${import.meta.env.BASE_URL}linge_maison.jpg`,
      link: '/realisations/banquettes',
    },
    {
      title: 'Outdoor',
      subtitle: 'Banquettes, coussins & transat',
      image: `${import.meta.env.BASE_URL}outdoor-home.jpg`,
      link: '/realisations/bateaux',
    },
  ];
  const total = slides.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slide = (dir: number) => {
    const max = total - visible;
    setCurrentSlide((prev) => Math.max(0, Math.min(prev + dir, max)));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => Math.min(prev + 1, total - 1));
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }
  };


  return (
    <div className="min-h-screen">
      <section className="animate-[fadeUp_0.6s_0.1s_ease_both] hidden md:block">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${(100 / visible) * currentSlide}%)` }}
          >
            {slides.map((s, i) => (
              <Link
                key={i}
                to={s.link}
                className="min-w-[25%] pr-[2px] last:pr-0 cursor-pointer no-underline group"
              >
                <div className="w-full h-[520px] block relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(40,20,10,0.65)] after:via-[rgba(40,20,10,0.1)] after:to-transparent after:pointer-events-none">
                  <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" />
                  <div className="absolute bottom-7 left-7 right-7 z-[2]">
                    <h3 className="font-['FreeSerif'] font-black text-[30px] text-[var(--linen)] leading-[1.1] mb-[5px]">
                      {s.title}
                    </h3>
                    <p className="font-['MaisonNeue'] font-normal text-[8px] tracking-[3px] uppercase text-[var(--linen)]">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="absolute bottom-7 right-[6px] flex gap-[6px] z-10">
            {currentSlide > 0 && (
              <button
                onClick={() => slide(-1)}
                className="w-[42px] h-[42px] bg-[rgba(248,244,240,0.15)] border border-[rgba(248,244,240,0.45)] cursor-pointer flex items-center justify-center transition-all text-[var(--linen)] text-[15px] hover:bg-[var(--moka)] hover:border-[var(--moka)]"
              >
                ←
              </button>
            )}
            {currentSlide < total - visible && (
              <button
                onClick={() => slide(1)}
                className="w-[42px] h-[42px] bg-[rgba(248,244,240,0.15)] border border-[rgba(248,244,240,0.45)] cursor-pointer flex items-center justify-center transition-all text-[var(--linen)] text-[15px] hover:bg-[var(--moka)] hover:border-[var(--moka)]"
              >
                →
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="pt-4 pb-8 animate-[fadeUp_0.6s_0.1s_ease_both] md:hidden">        <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-hide">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`px-4 py-2 rounded-none font-['MaisonNeue'] font-light text-[10px] tracking-[1.5px] uppercase whitespace-nowrap transition-all border ${
                currentSlide === i
                  ? 'bg-[var(--moka)] text-[var(--linen)] border-[var(--moka)]'
                  : 'bg-transparent text-[var(--warm)] border-[var(--warm)] hover:border-[var(--moka)] hover:text-[var(--moka)]'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div
          className="relative px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Link
            to={slides[currentSlide].link}
            className="block relative overflow-hidden no-underline"
          >
            <div className="w-full aspect-[4/5] relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(40,20,10,0.7)] after:via-[rgba(40,20,10,0.1)] after:to-transparent after:pointer-events-none">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 z-[2]">
                <h3 className="font-['FreeSerif'] font-black text-[28px] text-[var(--linen)] leading-none mb-2 uppercase">
                  {slides[currentSlide].title}
                </h3>
                <p className="font-['MaisonNeue'] font-normal text-[11px] tracking-[2.5px] uppercase text-[rgba(248,244,240,0.85)]">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>
          </Link>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === i
                    ? 'bg-[var(--moka)]'
                    : 'bg-[var(--warm)] opacity-40'
                }`}
                aria-label={`Aller à la slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-7 md:py-10 px-6 md:px-12 bg-white text-center animate-[fadeUp_0.7s_0.2s_ease_both]">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-10 no-underline transition-colors hover:bg-[var(--charcoal)]"
            >
              Prendre rendez-vous
            </Link>
            <Link
              to="/contact"
              className="inline-block font-['MaisonNeue'] font-light text-[10px] tracking-[3px] uppercase bg-transparent text-[var(--moka)] border border-[var(--moka)] py-4 px-10 no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <StepsCarousel />

      <div className="bg-white py-10 flex justify-center">
        <Link
          to="/contact"
          className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-12 no-underline transition-colors hover:bg-[var(--charcoal)]"
        >
          Prendre rendez-vous
        </Link>
      </div>

      <section className="grid grid-cols-2 gap-[2px] bg-[var(--pale)]">
        <Link
          to="/realisations/rideaux"
          className="relative overflow-hidden cursor-pointer aspect-[4/3] no-underline group"
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
            <img
              src={`${import.meta.env.BASE_URL}nos-realisation.jpg`}
              alt="Nos réalisations"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,20,10,0.6)] to-transparent transition-opacity group-hover:opacity-85"></div>
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
            <div className="font-['FreeSerif'] font-black text-[24px] md:text-[32px] text-[var(--linen)] leading-[1.05]">
              Nos
              <br />
              réalisations
            </div>
            <span className="inline-block mt-2 md:mt-3 font-['MaisonNeue'] font-thin text-[11px] md:text-[9px] tracking-[2.5px] md:tracking-[3px] uppercase text-[rgba(248,244,240,0.75)] md:text-[rgba(248,244,240,0.55)] border-b border-[rgba(248,244,240,0.25)] pb-[2px] transition-all group-hover:text-[rgba(248,244,240,0.9)] group-hover:border-[rgba(248,244,240,0.6)]">
              Découvrir →
            </span>
          </div>
        </Link>

        <Link
          to="/showroom"
          className="relative overflow-hidden cursor-pointer aspect-[4/3] no-underline group"
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
            <img
              src={`${import.meta.env.BASE_URL}header-showroom.jpg`}
              alt="Notre showroom"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,20,10,0.6)] to-transparent transition-opacity group-hover:opacity-85"></div>
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
            <div className="font-['FreeSerif'] font-black text-[24px] md:text-[32px] text-[var(--linen)] leading-[1.05]">
              Notre
              <br />
              showroom
            </div>
            <span className="inline-block mt-2 md:mt-3 font-['MaisonNeue'] font-thin text-[11px] md:text-[9px] tracking-[2.5px] md:tracking-[3px] uppercase text-[rgba(248,244,240,0.75)] md:text-[rgba(248,244,240,0.55)] border-b border-[rgba(248,244,240,0.25)] pb-[2px] transition-all group-hover:text-[rgba(248,244,240,0.9)] group-hover:border-[rgba(248,244,240,0.6)]">
              Nous trouver →
            </span>
          </div>
        </Link>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-12 bg-white text-center">
        <p className="font-['FreeSerif'] italic font-normal text-[20px] md:text-[30px] text-[var(--moka)] leading-[1.5] max-w-[680px] mx-auto px-4">
          L'art du sur-mesure, au fil du détail.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 bg-[var(--linen)]">
        <div className="px-6 py-10 md:px-14 md:py-16 flex flex-col justify-center order-2 md:order-1">
          <h2 className="font-['FreeSerif'] font-black text-[28px] md:text-[36px] text-[var(--moka)] leading-[1.1] mb-4">
            Notre Histoire
          </h2>
          <div className="w-8 h-[1px] bg-[var(--primary)] mb-5"></div>
          <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.9] mb-8 text-justify">
            Née de la rencontre entre deux passionnées de création, de décoration et de belles matières, Nuances Décoration est une maison marseillaise dédiée au textile sur mesure. Rideaux, voilages, banquettes d'intérieur et d'extérieur, coussins et aménagements personnalisés prennent vie dans notre atelier, où chaque pièce est confectionnée avec soin. De la première inspiration à la pose finale, nous accompagnons chaque projet pour créer des espaces uniques.
          </p>
          <Link
            to="/histoire"
            className="inline-block font-['MaisonNeue'] font-light text-[9px] tracking-[3px] uppercase text-[var(--moka)] border-b border-[var(--primary)] pb-[3px] no-underline transition-colors hover:text-[var(--primary)] w-fit"
          >
            Découvrir notre histoire
          </Link>
        </div>
        <div className="relative overflow-hidden order-1 md:order-2 bg-[var(--linen)]">
          <img
            src={`${import.meta.env.BASE_URL}HISTOIRE_HOME.jpg`}
            alt="Notre histoire"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      <section className="py-10 px-6 md:px-12 bg-white text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-10 no-underline transition-colors hover:bg-[var(--charcoal)]"
          >
            Prendre rendez-vous
          </Link>
          <Link
            to="/contact"
            className="inline-block font-['MaisonNeue'] font-light text-[10px] tracking-[3px] uppercase bg-transparent text-[var(--moka)] border border-[var(--moka)] py-4 px-10 no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      <InstagramFeed />
    </div>
  );
}
