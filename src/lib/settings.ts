import { prisma } from "./prisma";

// ─────────────────────────────────────────────────────────────
// VALORES DEFAULT
// Quando o banco ainda não tem config, esses valores são criados
// ─────────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS = {
  id: "main",
  siteName: "Fofoca Store",
  logoUrl: null,
  faviconUrl: null,
  primaryColor: "262 83% 58%",
  accentColor: "262 83% 96%",
  contactEmail: "empresadefofocas@gmail.com",
  contactPhone: null,
  instagram: null,
  discord: null,
  whatsapp: null,
  seoTitle: "Fofoca Store — Produtos digitais com entrega instantânea",
  seoDescription:
    "Streaming, jogos, gift cards, softwares e licenças com pagamento seguro e entrega imediata.",
  animationsEnabled: true,
  animationsLevel: "normal",
  footerText: null
};

// ─────────────────────────────────────────────────────────────
// CONFIG DO HERO (editável pelo admin depois)
// ─────────────────────────────────────────────────────────────

export const DEFAULT_HERO = {
  badge: "Entrega automática e instantânea",
  title: "A plataforma para encontrar seus produtos digitais",
  titleHighlight: "produtos digitais",
  subtitle:
    "Streaming, jogos, gift cards, softwares e licenças — tudo em um só lugar, com pagamento seguro e entrega imediata.",
  button1Text: "Explorar produtos",
  button1Link: "/produtos",
  button2Text: "Começar agora",
  button2Link: "/criar-conta"
};

// ─────────────────────────────────────────────────────────────
// BUSCAR CONFIGURAÇÕES (cria se não existir)
// ─────────────────────────────────────────────────────────────

export type SiteSettings = {
  siteName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  accentColor: string;
  contactEmail: string | null;
  contactPhone: string | null;
  instagram: string | null;
  discord: string | null;
  whatsapp: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  animationsEnabled: boolean;
  animationsLevel: string;
  footerText: string | null;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "main" }
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: DEFAULT_SETTINGS
    });
  }

  return {
    siteName: settings.siteName,
    logoUrl: settings.logoUrl,
    faviconUrl: settings.faviconUrl,
    primaryColor: settings.primaryColor,
    accentColor: settings.accentColor,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    instagram: settings.instagram,
    discord: settings.discord,
    whatsapp: settings.whatsapp,
    seoTitle: settings.seoTitle,
    seoDescription: settings.seoDescription,
    animationsEnabled: settings.animationsEnabled,
    animationsLevel: settings.animationsLevel,
    footerText: settings.footerText
  };
}

// ─────────────────────────────────────────────────────────────
// BUSCAR CONFIG DO HERO
// Lê da seção de homepage tipo "hero". Se não existir, retorna
// os valores default acima.
// ─────────────────────────────────────────────────────────────

export type HeroConfig = typeof DEFAULT_HERO;

export async function getHeroConfig(): Promise<HeroConfig> {
  const heroSection = await prisma.homepageSection.findFirst({
    where: {
      type: "hero",
      active: true
    },
    orderBy: { position: "asc" }
  });

  if (!heroSection || !heroSection.content) {
    return DEFAULT_HERO;
  }

  // mescla com os defaults pra garantir que todos os campos existam
  const content = heroSection.content as Partial<HeroConfig>;

  return {
    ...DEFAULT_HERO,
    ...content
  };
}
