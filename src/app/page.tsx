import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Header />
      <Hero />

      <section style={{ borderTop: "1px solid hsl(var(--border))", padding: "80px 0" }}>
        <div className="container-page">
          <div className="section-header">
            <h2 className="section-title animate-fade-up">Por que escolher a gente</h2>
            <p className="section-subtitle animate-fade-up delay-100">
              Tudo o que você precisa pra comprar produtos digitais com segurança.
            </p>
          </div>
          <div className="cards-3">
            <Feature icon={<BoltIcon />} title="Entrega instantânea" desc="Receba seu produto logo após a confirmação do pagamento — sem espera, sem burocracia." delay="0ms" />
            <Feature icon={<ShieldIcon />} title="Pagamento seguro" desc="Processado pelo Mercado Pago com criptografia de ponta a ponta e antifraude." delay="120ms" />
            <Feature icon={<SupportIcon />} title="Suporte humano" desc="Atendimento real sempre que você precisar. Sem robôs, sem enrolação." delay="240ms" />
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--muted))", padding: "100px 0" }}>
        <div className="container-page">
          <div className="section-header">
            <h2 className="section-title animate-fade-up">Como funciona</h2>
            <p className="section-subtitle animate-fade-up delay-100">
              Três passos simples entre você e o seu produto digital.
            </p>
          </div>
          <div className="cards-3">
            <Step number="01" title="Escolha o produto" desc="Navegue pelo catálogo completo e encontre exatamente o que procura." delay="0ms" />
            <Step number="02" title="Faça o pagamento" desc="Finalize com Pix, cartão ou boleto em ambiente 100% seguro." delay="120ms" />
            <Step number="03" title="Receba na hora" desc="O produto é liberado automaticamente na sua conta após aprovação." delay="240ms" />
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0" }}>
        <div className="container-page">
          <div
            className="animate-scale-in"
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              background: "linear-gradient(135deg, #18181b 0%, #27272a 45%, #3b1f6b 100%)",
              borderRadius: "28px",
              padding: "72px 32px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(124,58,237,0.25)"
            }}
          >
            <div style={{ position: "absolute", right: "-100px", top: "-100px", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "999px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "-80px", bottom: "-80px", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "999px", pointerEvents: "none" }} />

            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff", margin: "0 0 18px 0", position: "relative", lineHeight: 1.15 }}>
              Pronto para começar?
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, margin: "0 auto 36px auto", maxWidth: "480px", position: "relative" }}>
              Crie sua conta em menos de um minuto e tenha acesso imediato ao catálogo completo.
            </p>

            <div className="cta-buttons" style={{ display: "flex", gap: "12px", justifyContent: "center", position: "relative" }}>
              <Link
                href="/criar-conta"
                className="cta-btn-white"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "#ffffff",
                  color: "#18181b",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  textDecoration: "none"
                }}
              >
                Criar minha conta
                <ArrowRightIcon />
              </Link>
              <Link
                href="/produtos"
                className="cta-btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                Ver produtos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

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
      className="animate-fade-up card-base"
      style={{ display: "flex", flexDirection: "column", gap: "16px", animationDelay: delay }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "13px",
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.06) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "hsl(var(--primary))",
          flexShrink: 0
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "hsl(var(--foreground))", letterSpacing: "-0.015em" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14.5px", color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.65 }}>
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
      className="animate-fade-up card-base"
      style={{ padding: "32px 28px", animationDelay: delay }}
    >
      <div
        className="text-gradient-purple"
        style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "16px", lineHeight: 1 }}
      >
        {number}
      </div>
      <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 10px 0", color: "hsl(var(--foreground))", letterSpacing: "-0.015em" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14.5px", color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5Z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z" />
    </svg>
  );
}
