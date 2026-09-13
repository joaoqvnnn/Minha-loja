import Link from "next/link";
import { getHeroConfig } from "@/lib/settings";

export default async function Hero() {
  const hero = await getHeroConfig();

  const { before, highlight, after } = splitTitle(
    hero.title,
    hero.titleHighlight
  );

  return (
    <section className="hero-section">
      <div className="container-page hero-content">
        {hero.badge && (
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "hsl(var(--primary) / 0.08)",
              border: "1px solid hsl(var(--primary) / 0.18)",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 500,
              color: "hsl(var(--primary))",
              marginBottom: "28px"
            }}
          >
            <span
              className="animate-float"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "999px",
                background: "hsl(var(--primary))",
                boxShadow: "0 0 12px hsl(var(--primary) / 0.6)",
                flexShrink: 0
              }}
            />
            {hero.badge}
          </div>
        )}

        <h1
          className="animate-fade-up delay-100"
          style={{
            fontSize: "clamp(34px, 6.5vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "hsl(var(--foreground))"
          }}
        >
          {before}
          {highlight && (
            <span className="text-gradient-purple">{highlight}</span>
          )}
          {after}
        </h1>

        {hero.subtitle && (
          <p
            className="animate-fade-up delay-200"
            style={{
              marginTop: "26px",
              fontSize: "17px",
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {hero.subtitle}
          </p>
        )}

        <div
          className="animate-fade-up delay-300 hero-buttons"
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "14px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {hero.button1Text && (
            <Link href={hero.button1Link} className="btn-primary hero-button">
              {hero.button1Text}
              <ArrowRightIcon />
            </Link>
          )}
          {hero.button2Text && (
            <Link href={hero.button2Link} className="btn-secondary hero-button">
              {hero.button2Text}
            </Link>
          )}
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
          className="animate-glow"
          style={{
            position: "absolute",
            left: "50%",
            top: "5%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "450px",
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.22) 0%, hsl(var(--primary) / 0.08) 40%, transparent 72%)",
            filter: "blur(60px)",
            borderRadius: "999px"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "35%",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)",
            filter: "blur(80px)",
            borderRadius: "999px"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "15%",
            width: "340px",
            height: "340px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            borderRadius: "999px"
          }}
        />
      </div>
    </section>
  );
}

function splitTitle(
  full: string,
  highlight: string
): { before: string; highlight: string; after: string } {
  if (!highlight || !full.includes(highlight)) {
    return { before: full, highlight: "", after: "" };
  }

  const index = full.indexOf(highlight);
  const before = full.slice(0, index);
  const after = full.slice(index + highlight.length);

  return { before, highlight, after };
}

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
