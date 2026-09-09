import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const categories = [
  { label: 'Rideaux', subtitle: 'Décoratifs & occultants', link: '/realisations/rideaux' },
  { label: 'Voilages', subtitle: 'Transparents & légers', link: '/realisations/voilages' },
  { label: 'Stores', subtitle: 'Bateau & romain', link: '/realisations/stores' },
  { label: 'Indoor', subtitle: 'Banquettes & linge de maison', link: '/realisations/banquettes' },
  { label: 'Outdoor & bateaux', subtitle: 'Banquettes, coussins & transats', link: '/realisations/bateaux' },
];

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white animate-[fadeUp_0.5s_ease_both]">
      <div className="flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
        <Link to="/" className="no-underline" onClick={() => setShowMobileMenu(false)}>
          <img
            src={`${import.meta.env.BASE_URL}logo_final.png`}
            alt="Nuances"
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        <ul className="hidden md:flex gap-9 list-none items-center">
          <li
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="font-['MaisonNeue'] font-light text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] no-underline transition-colors hover:text-[var(--charcoal)] flex items-center gap-1 bg-transparent border-none cursor-pointer py-2">
              Nos réalisations
              <ChevronDown size={12} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-0 bg-white border border-[var(--pale)] shadow-lg min-w-[280px] py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.link}
                    to={cat.link}
                    className="block px-6 py-3 no-underline transition-colors hover:bg-[var(--linen)] group"
                  >
                    <span className="block font-['MaisonNeue'] font-light text-[11px] tracking-[2.5px] uppercase text-[var(--moka)] group-hover:text-[var(--charcoal)]">
                      {cat.label}
                    </span>
                    <span className="block font-['MaisonNeue'] font-light text-[10px] tracking-[1px] uppercase text-[var(--warm)] mt-[2px] opacity-70">
                      {cat.subtitle}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link
              to="/showroom"
              className="font-['MaisonNeue'] font-light text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] no-underline transition-colors hover:text-[var(--charcoal)]"
            >
              Notre showroom
            </Link>
          </li>

          <li>
            <Link
              to="/histoire"
              className="font-['MaisonNeue'] font-light text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] no-underline transition-colors hover:text-[var(--charcoal)]"
            >
              Notre histoire
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="font-['MaisonNeue'] font-light text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] no-underline transition-colors hover:text-[var(--charcoal)]"
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link
          to="/contact"
          className="hidden md:inline-block font-['MaisonNeue'] font-light text-[12px] tracking-[2.5px] uppercase text-[var(--linen)] bg-[var(--moka)] border-none py-3 px-6 cursor-pointer no-underline transition-colors hover:bg-[var(--charcoal)]"
        >
          Prendre rendez-vous
        </Link>

        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden bg-transparent border-none cursor-pointer text-[var(--moka)] p-2"
          aria-label="Menu"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-white px-4 py-4">
          <ul className="list-none space-y-4">
            <li>
              <button
                onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                className="w-full text-left font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--moka)] no-underline transition-colors flex items-center justify-start gap-2 bg-transparent border-none cursor-pointer py-2"
              >
                Nos réalisations
                <ChevronDown size={19} strokeWidth={2.2} className={`transition-transform ${showMobileDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showMobileDropdown && (
                <div className="pl-4 mt-2 space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.link}
                      to={cat.link}
                      onClick={() => setShowMobileMenu(false)}
                      className="block py-2 no-underline transition-colors"
                    >
                      <span className="block font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--warm)]">
                        {cat.label}
                      </span>
                      <span className="block font-['MaisonNeue'] font-light text-[10px] tracking-[0.5px] uppercase text-[var(--warm)] opacity-55 mt-[1px]">
                        {cat.subtitle}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                to="/showroom"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--moka)] no-underline transition-colors"
              >
                Notre showroom
              </Link>
            </li>

            <li>
              <Link
                to="/histoire"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--moka)] no-underline transition-colors"
              >
                Notre histoire
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--moka)] no-underline transition-colors"
              >
                Contact
              </Link>
            </li>

            <li className="pt-2">
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block text-center font-['MaisonNeue'] font-light text-[11px] tracking-[2px] uppercase text-[var(--linen)] bg-[var(--moka)] border-none py-3 px-6 cursor-pointer no-underline transition-colors"
              >
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
