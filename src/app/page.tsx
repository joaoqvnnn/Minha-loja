import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>

      {/* ═══ HEADER ═══════════════════════════════════════ */}
      <header
        className="animate-fade-in"
        style={{
          borderBottom: "1px solid #e5e5e7",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50
        }}
      >
        <div
          className="container-page"
          style={{
            display: "flex",
            height: "68px",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none"
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                boxShadow: "0 4px 12px rgba(124,58,237,0.25)"
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#18181b",
                letterSpacing: "-0.02em"
              }}
            >
              Fofoca Store
            </span>
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              fontSize: "14px"
            }}
          >
            <Link
              href="/produtos"
              style={{
                color: "#52525b",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease"
              }}
            >
              Produtos
            </Link>
            <Link
              href="/categorias"
              style={{
                color: "#52525b",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease"
              }}
            >
              Categorias
            </Link>
            <Link
              href="/ofertas"
              style={{
                color: "#52525b",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease"
              }}
            >
              Ofertas
            </Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/entrar"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#52525b",
                textDecoration: "none"
              }}
            >
              Entrar
            </Link>
            <Link
              href="/criar-conta"
              className="hover-lift"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(124,58,237,0.25)"
              }}
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "120px 0 140px 0"
        }}
      >
        <div className="container-page">
          <div
            style={{
              maxWidth: "840px",
              margin: "0 auto",
              textAlign: "center"
            }}
          >
            <div
              className="animate-fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.18)",
                borderRadius: "999px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#7c3aed",
                marginBottom: "28px"
              }}
            >
              <span
                className="animate-float"
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "999px",
                  background: "#7c3aed",
                  boxShadow: "0 0 12px rgba(124,58,237,0.6)"
                }}
              />
              Entrega automática e instantânea
            </div>

            <h1
              className="animate-fade-up delay-100"
              style={{
                fontSize: "clamp(38px, 7vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                margin: 0,
                color: "#18181b"
              }}
            >
              A plataforma para encontrar seus{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a855f7 60%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                produtos digitais
              </span>
            </h1>

            <p
              className="animate-fade-up delay-200"
              style={{
                marginTop: "28px",
                fontSize: "18px",
                color: "#52525b",
                lineHeight: 1.65,
                maxWidth: "640px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Streaming, jogos, gift cards, softwares e licenças —
              tudo em um só lugar, com pagamento seguro e entrega imediata.
            </p>

            <div
              className="animate-fade-up delay-300"
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                alignItems: "center"
              }}
            >
              <Link
                href="/produtos"
                className="hover-lift"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                  color: "#ffffff",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: "300px",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.28)"
                }}
              >
                Explorar produtos
                <ArrowRightIcon />
              </Link>
              <Link
                href="/criar-conta"
                className="hover-lift"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  color: "#18181b",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  border: "1px solid #e5e5e7",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: "300px"
                }}
              >
                Começar agora
              </Link>
            </div>
          </div>
        </div>

        {/* glow fundo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            overflow: "hidden",
            pointerEvents: "none"
          }}
        >
          <div
            className="animate-glow"
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "400px",
              background:
                "radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
              borderRadius: "999px"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: "40%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
              filter: "blur(80px)",
              borderRadius: "999px"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "20%",
              width: "320px",
              height: "320px",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
              filter: "blur(80px)",
              borderRadius: "999px"
            }}
          />
        </div>
      </section>

      {/* ═══ BENEFÍCIOS ═══════════════════════════════════ */}
      <section style={{ borderTop: "1px solid #f4f4f5" }}>
        <div className="container-page" style={{ padding: "80px 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px"
            }}
          >
            <Feature
              icon={<BoltIcon />}
              title="Entrega instantânea"
              desc="Receba seu produto logo após a confirmação do pagamento."
              delay="0ms"
            />
            <Feature
              icon={<ShieldIcon />}
              title="Pagamento seguro"
              desc="Processado pelo Mercado Pago com criptografia de ponta."
              delay="100ms"
            />
            <Feature
              icon={<SupportIcon />}
              title="Suporte real"
              desc="Atendimento humano sempre que você precisar."
              delay="200ms"
            />
          </div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA ════════════════════════════════ */}
      <section style={{ borderTop: "1px solid #f4f4f5", background: "#fafafa" }}>
        <div className="container-page" style={{ padding: "100px 16px" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto 64px auto"
            }}
          >
            <h2
              className="animate-fade-up"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#18181b",
                margin: "0 0 16px 0"
              }}
            >
              Como funciona
            </h2>
            <p
              className="animate-fade-up delay-100"
              style={{
                fontSize: "17px",
                color: "#52525b",
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Três passos simples entre você e o seu produto digital.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}
          >
            <Step
              number="01"
              title="Escolha o produto"
              desc="Navegue pelo catálogo e encontre exatamente o que você procura."
              delay="0ms"
            />
            <Step
              number="02"
              title="Faça o pagamento"
              desc="Finalize com Pix, cartão ou boleto em ambiente 100% seguro."
              delay="120ms"
            />
            <Step
              number="03"
              title="Receba na hora"
              desc="O produto é liberado automaticamente na sua conta após a aprovação."
              delay="240ms"
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid #f4f4f5" }}>
        <div className="container-page" style={{ padding: "100px 16px" }}>
          <div
            className="animate-scale-in"
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f1f6b 100%)",
              borderRadius: "24px",
              padding: "64px 32px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: "0 0 16px 0",
                position: "relative"
              }}
            >
              Pronto para começar?
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                margin: "0 auto 32px auto",
                maxWidth: "480px",
                position: "relative"
              }}
            >
              Crie sua conta em menos de um minuto e tenha acesso imediato ao
              catálogo completo.
            </p>
            <Link
              href="/criar-conta"
              className="hover-lift"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#18181b",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                position: "relative"
              }}
            >
              Criar minha conta
              <ArrowRightIcon />
            </Link>

            {/* brilho decorativo */}
            <div
              style={{
                position: "absolute",
                right: "-80px",
                top: "-80px",
                width: "300px",
                height: "300px",
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
                filter: "blur(40px)",
                borderRadius: "999px"
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid #e5e5e7" }}>
        <div
          className="container-page"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "40px 16px",
            fontSize: "14px",
            color: "#52525b"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
              }}
            />
            <span style={{ fontWeight: 600, color: "#18181b" }}>
              Fofoca Store
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/termos" style={{ color: "inherit", textDecoration: "none" }}>
              Termos
            </Link>
            <Link href="/privacidade" style={{ color: "inherit", textDecoration: "none" }}>
              Privacidade
            </Link>
            <Link href="/suporte" style={{ color: "inherit", textDecoration: "none" }}>
              Suporte
            </Link>
          </div>
          <span style={{ fontSize: "13px", color: "#a1a1aa" }}>
            © 2026 Fofoca Store. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES AUXILIARES
   ═══════════════════════════════════════════════════════════════ */

function Feature({
  icon,
  title,
  desc,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="animate-fade-up hover-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "28px 24px",
        borderRadius: "16px",
        border: "1px solid #f4f4f5",
        background: "#ffffff",
        animationDelay: delay
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7c3aed"
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          margin: 0,
          color: "#18181b",
          letterSpacing: "-0.01em"
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14.5px",
          color: "#52525b",
          margin: 0,
          lineHeight: 1.6
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  desc,
  delay
}: {
  number: string;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="animate-fade-up"
      style={{
        padding: "32px 28px",
        borderRadius: "16px",
        background: "#ffffff",
        border: "1px solid #f4f4f5",
        animationDelay: delay
      }}
    >
      <div
        style={{
          fontSize: "36px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          background:
            "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "16px",
          lineHeight: 1
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          margin: "0 0 10px 0",
          color: "#18181b",
          letterSpacing: "-0.01em"
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14.5px",
          color: "#52525b",
          margin: 0,
          lineHeight: 1.65
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ÍCONES SVG (linha, sem emoji)
   ═══════════════════════════════════════════════════════════════ */

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5Z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z" />
    </svg>
  );
}
