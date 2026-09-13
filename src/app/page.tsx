export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh" }}>

      {/* ── HEADER ───────────────────────────────── */}
      <header
        style={{
          borderBottom: "1px solid #e5e5e7",
          background: "#ffffff"
        }}
      >
        <div
          className="container-page"
          style={{
            display: "flex",
            height: "64px",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#7c3aed"
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              Minha Loja
            </span>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "14px"
            }}
          >
            <a
              href="/produtos"
              style={{ color: "#52525b", textDecoration: "none" }}
            >
              Produtos
            </a>
            <a
              href="/categorias"
              style={{ color: "#52525b", textDecoration: "none" }}
            >
              Categorias
            </a>
            <a
              href="/ofertas"
              style={{ color: "#52525b", textDecoration: "none" }}
            >
              Ofertas
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="/entrar"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#52525b",
                textDecoration: "none"
              }}
            >
              Entrar
            </a>
            <a
              href="/criar-conta"
              style={{
                background: "#7c3aed",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
            >
              Criar conta
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "80px 0 100px 0"
        }}
      >
        <div className="container-page">
          <div
            style={{
              maxWidth: "768px",
              margin: "0 auto",
              textAlign: "center"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f4f4f5",
                border: "1px solid #e5e5e7",
                borderRadius: "999px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#52525b",
                marginBottom: "20px"
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "#7c3aed"
                }}
              />
              Entrega automática e instantânea
            </div>

            <h1
              className="animate-fade-up"
              style={{
                fontSize: "42px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#18181b"
              }}
            >
              A plataforma para encontrar seus{" "}
              <span style={{ color: "#7c3aed" }}>produtos digitais</span>
            </h1>

            <p
              className="animate-fade-up"
              style={{
                marginTop: "24px",
                fontSize: "17px",
                color: "#52525b",
                lineHeight: 1.6
              }}
            >
              Streaming, jogos, gift cards, softwares e licenças —
              tudo em um só lugar, com pagamento seguro e entrega imediata.
            </p>

            <div
              className="animate-fade-up"
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center"
              }}
            >
              <a
                href="/produtos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#7c3aed",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: "280px"
                }}
              >
                Explorar produtos →
              </a>
              <a
                href="/criar-conta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  color: "#18181b",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  border: "1px solid #e5e5e7",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: "280px"
                }}
              >
                Começar agora
              </a>
            </div>
          </div>
        </div>

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
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: "600px",
              height: "300px",
              background: "#7c3aed",
              opacity: 0.1,
              filter: "blur(100px)",
              borderRadius: "999px"
            }}
          />
        </div>
      </section>

      {/* ── BENEFÍCIOS ───────────────────────────── */}
      <section style={{ borderTop: "1px solid #e5e5e7" }}>
        <div
          className="container-page"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
            padding: "64px 16px"
          }}
        >
          <Beneficio
            emoji="⚡"
            titulo="Entrega instantânea"
            texto="Receba seu produto logo após a confirmação do pagamento."
          />
          <Beneficio
            emoji="🔒"
            titulo="Pagamento seguro"
            texto="Processado pelo Mercado Pago com criptografia de ponta."
          />
          <Beneficio
            emoji="🎧"
            titulo="Suporte real"
            texto="Atendimento humano sempre que você precisar."
          />
        </div>
      </section>

      {/* ── RODAPÉ ───────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #e5e5e7" }}>
        <div
          className="container-page"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "32px 16px",
            fontSize: "14px",
            color: "#52525b"
          }}
        >
          <span>© 2026 Minha Loja Digital.</span>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="/termos" style={{ color: "inherit", textDecoration: "none" }}>
              Termos
            </a>
            <a
              href="/privacidade"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Privacidade
            </a>
            <a
              href="/suporte"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Suporte
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}

function Beneficio({
  emoji,
  titulo,
  texto
}: {
  emoji: string;
  titulo: string;
  texto: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "#ede9fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px"
        }}
      >
        {emoji}
      </div>
      <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#18181b" }}>
        {titulo}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#52525b",
          margin: 0,
          lineHeight: 1.5
        }}
      >
        {texto}
      </p>
    </div>
  );
}
