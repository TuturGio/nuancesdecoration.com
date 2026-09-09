import { Link } from 'react-router-dom';
import CanvasImage from '../components/CanvasImage';

interface CategoryPageProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  heroDraw: (canvas: HTMLCanvasElement) => void;
  heroImage?: string;
  galleryDraws?: Array<(canvas: HTMLCanvasElement) => void>;
  extraContent?: React.ReactNode;
}

export default function CategoryPage({
  title,
  subtitle,
  description,
  features,
  heroDraw,
  heroImage,
  extraContent,
}: CategoryPageProps) {
  return (
    <div className="min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] bg-[var(--grege-p)]">
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-20 order-2 md:order-1">
          <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[4px] uppercase text-[var(--primary)] mb-5 block">
            {subtitle}
          </span>
          <h1 className="font-['FreeSerif'] font-black text-[44px] md:text-[60px] text-[var(--moka)] leading-[1.05] mb-6">
            {title}
          </h1>
          <div className="w-16 h-[2px] bg-[var(--primary)] mb-8"></div>
          <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.9] max-w-md">
            {description}
          </p>
        </div>
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto order-1 md:order-2">
          {heroImage ? (
            <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <CanvasImage draw={heroDraw} className="absolute inset-0 w-full h-full block" />
          )}
        </div>
      </section>

      <section className="px-8 md:px-12 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
              Nos prestations
            </h3>
            <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="flex-1">
              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.7] flex items-start gap-3"
                  >
                    <span className="text-[var(--primary)] mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-none md:w-64 flex flex-col gap-4 md:pt-10">
              <Link
                to="/contact"
                className="text-center font-['MaisonNeue'] font-bold text-[10px] tracking-[3px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-8 no-underline transition-colors hover:bg-[var(--charcoal)]"
              >
                Prendre rendez-vous
              </Link>
              <Link
                to="/contact"
                className="text-center font-['MaisonNeue'] font-light text-[10px] tracking-[3px] uppercase border border-[var(--moka)] text-[var(--moka)] py-4 px-8 no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {extraContent}

      <section className="px-12 py-16 bg-[var(--moka)] text-center">
        <h2 className="font-['FreeSerif'] italic font-normal text-[32px] text-[var(--linen)] leading-[1.5] mb-8">
          Concrétisons votre projet ensemble
        </h2>
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
