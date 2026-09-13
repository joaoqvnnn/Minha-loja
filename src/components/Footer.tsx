"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: enviar pro backend
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  }

  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid hsl(var(--border))",
        background: "hsl(var(--card))",
        marginTop: "80px"
      }}
    >
      <div className="container-page" style={{ padding: "64px 20px 32px 20px" }}>
        {/* ═══ GRID PRINCIPAL ═══════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px"
          }}
          className="footer-grid"
        >
          {/* coluna 1 — marca + newsletter */}
          <div style={{ maxWidth: "360px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px"
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
                  boxShadow: "0 6px 18px rgba(124,58,237,0.3)"
                }}
              />
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                  letterSpacing: "-0.025em"
                }}
              >
                Fofoca Store
              </span>
            </Link>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.65,
                color: "hsl(var(--muted-foreground))",
                margin: "0 0 22px 0"
              }}
            >
              Produtos digitais com entrega automática, pagamento seguro e
              suporte humano.
            </p>

            {/* newsletter */}
            <form onSubmit={handleSubscribe}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                  marginBottom: "8px"
                }}
              >
                Receba novidades
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  required
                  className="input-base"
                  style={{ fontSize: "14px", padding: "11px 14px" }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: "11px 16px",
                    fontSize: "14px",
                    borderRadius: "11px",
                    flexShrink: 0
                  }}
                >
                  <SendIcon />
                </button>
              </div>
              {subscribed && (
                <p
                  className="animate-fade-in"
                  style={{
                    fontSize: "13px",
                    color: "#22c55e",
                    marginTop: "8px",
                    margin: "8px 0 0 0",
                    fontWeight: 500
                  }}
                >
                  Inscrição feita. Obrigado!
                </p>
              )}
            </form>
          </div>

          {/* coluna 2 — loja */}
          <FooterColumn
            title="Loja"
            links={[
              { label: "Produtos", href: "/produtos" },
              { label: "Categorias", href: "/categorias" },
              { label: "Ofertas", href: "/ofertas" },
              { label: "Mais vendidos", href: "/mais-vendidos" },
              { label: "Novidades", href: "/novidades" }
            ]}
          />

          {/* coluna 3 — suporte */}
          <FooterColumn
            title="Suporte"
            links={[
              { label: "Central de ajuda", href: "/ajuda" },
              { label: "Fale conosco", href: "/suporte" },
              { label: "Perguntas frequentes", href: "/faq" },
              { label: "Meus pedidos", href: "/conta/pedidos" },
              { label: "Status do sistema", href: "/status" }
            ]}
          />

          {/* coluna 4 — legal */}
          <FooterColumn
            title="Legal"
            links={[
              { label: "Termos de uso", href: "/termos" },
              { label: "Privacidade", href: "/privacidade" },
              { label: "Política de cookies", href: "/cookies" },
              { label: "Reembolso", href: "/reembolso" },
              { label: "LGPD", href: "/lgpd" }
            ]}
          />
        </div>

        {/* ═══ DIVISOR COM GRADIENTE ═════════════════════════════ */}
        <div
          style={{
            height: "1px",
            margin: "48px 0 28px 0",
            background:
              "linear-gradient(90deg, transparent 0%, hsl(var(--border)) 20%, hsl(var(--primary) / 0.4) 50%, hsl(var(--border)) 80%, transparent 100%)"
          }}
        />

        {/* ═══ BASE — copyright + redes ══════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            justifyContent: "space-between"
          }}
          className="footer-base"
        >
          <p
            style={{
              fontSize: "13.5px",
              color: "hsl(var(--muted-foreground))",
              margin: 0,
              textAlign: "center"
            }}
          >
            © {year} Fofoca Store. Todos os direitos reservados.
          </p>

          <div style={{ display: "flex", gap: "8px" }}>
            <SocialLink
              href="https://instagram.com"
              label="Instagram"
              icon={<InstagramIcon />}
            />
            <SocialLink
              href="https://wa.me/"
              label="WhatsApp"
              icon={<WhatsAppIcon />}
            />
            <SocialLink
              href="https://discord.com"
              label="Discord"
              icon={<DiscordIcon />}
            />
          </div>
        </div>
      </div>

      {/* ═══ ESTILOS RESPONSIVOS ════════════════════════════════ */}
      <style jsx>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1fr !important;
            gap: 48px !important;
          }
          .footer-base {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES AUXILIARES
   ═══════════════════════════════════════════════════════════════ */

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "hsl(var(--foreground))",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: "0 0 18px 0"
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "11px"
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="footer-link"
              style={{
                fontSize: "14px",
                color: "hsl(var(--muted-foreground))",
                textDecoration: "none",
                transition: "color 0.2s ease, padding-left 0.2s ease",
                display: "inline-block"
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .footer-link:hover {
          color: hsl(var(--primary)) !important;
          padding-left: 4px !important;
        }
      `}</style>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "11px",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
        color: "hsl(var(--muted-foreground))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition:
          "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, color 0.2s ease, background 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "hsl(var(--primary))";
        e.currentTarget.style.color = "hsl(var(--primary))";
        e.currentTarget.style.background = "hsl(var(--accent))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "hsl(var(--border))";
        e.currentTarget.style.color = "hsl(var(--muted-foreground))";
        e.currentTarget.style.background = "hsl(var(--background))";
      }}
    >
      {icon}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ÍCONES SVG
   ═══════════════════════════════════════════════════════════════ */

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function InstagramIcon() {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon() {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function DiscordIcon() {
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
      <path d="M8 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
      <path d="M14 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
      <path d="M7.5 7.21A13.5 13.5 0 0 1 12 6.5c1.6 0 3.1.25 4.5.71" />
      <path d="M15.5 16.79A13.5 13.5 0 0 1 12 17.5c-1.6 0-3.1-.25-4.5-.71" />
      <path d="M5.5 7.5C3.9 9.9 3 13 3 16.5c1.5 2 3.8 3.5 6.5 4.5.5-.7.9-1.4 1.2-2.1" />
      <path d="M18.5 7.5c1.6 2.4 2.5 5.5 2.5 9-1.5 2-3.8 3.5-6.5 4.5-.5-.7-.9-1.4-1.2-2.1" />
    </svg>
  );
}
