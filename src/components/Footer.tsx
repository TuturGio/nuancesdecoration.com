import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#8d6963] px-4 md:px-12 py-8 md:py-12 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-center border-t-[3px] border-[var(--primary)]">
      <div>
        <img
          src={`${import.meta.env.BASE_URL}logo_blanc.png`}
          alt="Nuances"
          className="h-9 w-auto"
        />
      </div>

      <ul className="flex flex-wrap justify-center gap-4 md:gap-7 list-none max-w-[280px] md:max-w-none">
        <li>
          <Link
            to="/realisations/rideaux"
            className="font-['MaisonNeue'] font-normal text-[10px] md:text-[9px] tracking-[2px] uppercase text-white no-underline transition-colors hover:text-white/70"
          >
            Nos réalisations
          </Link>
        </li>
        <li>
          <Link
            to="/showroom"
            className="font-['MaisonNeue'] font-normal text-[10px] md:text-[9px] tracking-[2px] uppercase text-white no-underline transition-colors hover:text-white/70"
          >
            Notre showroom
          </Link>
        </li>
        <li>
          <Link
            to="/histoire"
            className="font-['MaisonNeue'] font-normal text-[10px] md:text-[9px] tracking-[2px] uppercase text-white no-underline transition-colors hover:text-white/70"
          >
            Notre histoire
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="font-['MaisonNeue'] font-normal text-[10px] md:text-[9px] tracking-[2px] uppercase text-white no-underline transition-colors hover:text-white/70"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/cgv"
            className="font-['MaisonNeue'] font-normal text-[10px] md:text-[9px] tracking-[2px] uppercase text-white no-underline transition-colors hover:text-white/70"
          >
            CGV
          </Link>
        </li>
      </ul>

      <span className="font-['MaisonNeue'] font-thin text-[10px] md:text-[8px] tracking-[1.5px] text-white/70">
        © 2026 - Nuances Décoration
      </span>
    </footer>
  );
}
