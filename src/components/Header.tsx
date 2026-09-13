"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Produtos", href: "/produtos" },
  { label: "Categorias", href: "/categorias" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Suporte", href: "/suporte" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava scroll do body quando menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="animate-fade-in"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled
            ? "hsl(var(--background) / 0.75)"
            : "hsl(var(--background))",
          backdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(var(--border))"
            : "1px solid transparent",
          transition:
            "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease"
        }}
      >
        <div
          className="container-page"
          style={{
            display: "flex",
            height: "68px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          {/* ── LOGO ─────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Ir para a página inicial"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0
            }}
          >
            <div
              className="logo-mark"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "11px",
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
                boxShadow: "0 6px 18px rgba(124,58,237,0.32)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                letterSpacing: "-0.025em",
                whiteSpace: "nowrap"
              }}
            >
              Fofoca Store
            </span>
          </Link>

          {/* ── MENU DESKTOP ────────────────────────────── */}
          <nav
            className="only-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
              justifyContent: "center"
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "hsl(var(--muted-foreground))",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "color 0.2s ease, background 0.2s ease"
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── AÇÕES (direita) ─────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0
            }}
          >
            <ThemeToggle />

            {/* botões desktop */}
            <div
              className="only-desktop"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Link
                href="/entrar"
                style={{
                  padding: "9px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                  textDecoration: "none",
                  borderRadius: "10px",
                  border: "1px solid hsl(var(--border))",
                  transition: "border-color 0.2s ease, background 0.2s ease"
                }}
              >
                Entrar
              </Link>
              <Link
                href="/criar-conta"
                className="btn-primary"
                style={{ padding: "10px 18px", fontSize: "14px" }}
              >
                Criar conta
              </Link>
            </div>

            {/* botão hambúrguer (mobile) */}
            <button
              className="only-mobile"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0
              }}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          MENU MOBILE (gaveta)
          ═══════════════════════════════════════════════════════ */}

      {/* backdrop */}
      {menuOpen && (
        <div
          className="only-mobile"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 60,
            animation: "fadeIn 0.25s ease-out both"
          }}
        />
      )}

      {/* drawer */}
      <aside
        className="only-mobile"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(360px, 85vw)",
          background: "hsl(var(--background))",
          borderLeft: "1px solid hsl(var(--border))",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: menuOpen ? "-24px 0 60px rgba(0,0,0,0.25)" : "none",
          pointerEvents: menuOpen ? "auto" : "none"
        }}
      >
        {/* topo do drawer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid hsl(var(--border))"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)"
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                letterSpacing: "-0.02em"
              }}
            >
              Fofoca Store
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* navegação */}
        <nav
          style={{
            flex: 1,
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            overflowY: "auto"
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="animate-fade-up"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                fontSize: "15px",
                fontWeight: 500,
                color: "hsl(var(--foreground))",
                textDecoration: "none",
                borderRadius: "12px",
                animationDelay: `${i * 40}ms`,
                transition: "background 0.2s ease, padding-left 0.2s ease"
              }}
            >
              {item.label}
              <ArrowIcon />
            </Link>
          ))}

          <div
            style={{
              height: "1px",
              background: "hsl(var(--border))",
              margin: "16px 4px"
            }}
          />

          <Link
            href="/sobre"
            onClick={() => setMenuOpen(false)}
            className="animate-fade-up"
            style={{
              padding: "14px 16px",
              fontSize: "15px",
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
              textDecoration: "none",
              borderRadius: "12px",
              animationDelay: "160ms"
            }}
          >
            Sobre nós
          </Link>
          <Link
            href="/suporte"
            onClick={() => setMenuOpen(false)}
            className="animate-fade-up"
            style={{
              padding: "14px 16px",
              fontSize: "15px",
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
              textDecoration: "none",
              borderRadius: "12px",
              animationDelay: "200ms"
            }}
          >
            Suporte
          </Link>
        </nav>

        {/* rodapé do drawer (botões) */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid hsl(var(--border))",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <Link
            href="/entrar"
            onClick={() => setMenuOpen(false)}
            className="btn-secondary"
            style={{ width: "100%" }}
          >
            Entrar
          </Link>
          <Link
            href="/criar-conta"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Criar conta
          </Link>
        </div>
      </aside>

      {/* estilos dos links (hover underline deslizante) */}
      <style jsx>{`
        .nav-link:hover {
          color: hsl(var(--foreground)) !important;
          background: hsl(var(--muted));
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 4px;
          height: 2px;
          background: linear-gradient(
            90deg,
            #7c3aed 0%,
            #a855f7 50%,
            #c084fc 100%
          );
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
        :global(.logo-mark):hover {
          transform: rotate(-8deg) scale(1.05);
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ÍCONES SVG
   ═══════════════════════════════════════════════════════════════ */

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.5 }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
