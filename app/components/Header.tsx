"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#autoconhecimento", label: "Autoconhecimento" },
  { href: "/#atendimento", label: "Atendimento" },
  { href: "/#depoimentos", label: "Depoimentos" },
  // { href: "/blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-off-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col shrink-0">
            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-charcoal tracking-wide whitespace-nowrap">
              Dra. Simone Caceres
            </span>
            <span className="text-xs text-warm-gray tracking-widest uppercase">
              Psicóloga Clínica
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal-light hover:text-sage-dark transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agendamento"
              className="ml-4 px-5 py-2.5 bg-sage text-white text-sm rounded-full hover:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
            >
              Agendar Consulta
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-off-white/98 backdrop-blur-lg shadow-lg transition-all duration-500 ${
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 py-8 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-charcoal-light hover:text-sage-dark transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/agendamento"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-sage text-white text-sm rounded-full hover:bg-sage-dark transition-all duration-300"
          >
            Agendar Consulta
          </Link>
        </nav>
      </div>
    </header>
  );
}
