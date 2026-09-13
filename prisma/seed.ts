import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // ═══ 1. Configurações do site ════════════════════════════
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      siteName: "Fofoca Store",
      primaryColor: "262 83% 58%",
      accentColor: "262 83% 96%",
      contactEmail: "empresadefofocas@gmail.com",
      seoTitle: "Fofoca Store — Produtos digitais com entrega instantânea",
      seoDescription:
        "Streaming, jogos, gift cards, softwares e licenças com pagamento seguro e entrega imediata.",
      animationsEnabled: true,
      animationsLevel: "normal"
    }
  });
  console.log("✅ SiteSettings criado");

  // ═══ 2. Seção Hero da homepage ═══════════════════════════
  const heroExists = await prisma.homepageSection.findFirst({
    where: { type: "hero" }
  });

  if (!heroExists) {
    await prisma.homepageSection.create({
      data: {
        type: "hero",
        title: "A plataforma para encontrar seus produtos digitais",
        subtitle:
          "Streaming, jogos, gift cards, softwares e licenças — tudo em um só lugar, com pagamento seguro e entrega imediata.",
        position: 0,
        active: true,
        content: {
          badge: "Entrega automática e instantânea",
          title:
            "A plataforma para encontrar seus produtos digitais",
          titleHighlight: "produtos digitais",
          subtitle:
            "Streaming, jogos, gift cards, softwares e licenças — tudo em um só lugar, com pagamento seguro e entrega imediata.",
          button1Text: "Explorar produtos",
          button1Link: "/produtos",
          button2Text: "Começar agora",
          button2Link: "/criar-conta"
        }
      }
    });
    console.log("✅ Hero criado");
  } else {
    console.log("ℹ️  Hero já existe, pulando");
  }

  // ═══ 3. Categorias de exemplo ════════════════════════════
  const categories = [
    { name: "Streaming", slug: "streaming", icon: "tv", color: "#ec4899", position: 1 },
    { name: "Jogos", slug: "jogos", icon: "gamepad", color: "#8b5cf6", position: 2 },
    { name: "Gift Cards", slug: "gift-cards", icon: "gift", color: "#f59e0b", position: 3 },
    { name: "Software", slug: "software", icon: "code", color: "#3b82f6", position: 4 },
    { name: "Licenças", slug: "licencas", icon: "key", color: "#10b981", position: 5 },
    { name: "Serviços", slug: "servicos", icon: "wrench", color: "#ef4444", position: 6 }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        color: cat.color,
        position: cat.position,
        active: true
      }
    });
  }
  console.log(`✅ ${categories.length} categorias criadas`);

  // ═══ 4. FAQ ══════════════════════════════════════════════
  const faqCount = await prisma.faqItem.count();

  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          question: "Como faço para comprar?",
          answer:
            "Escolha o produto, adicione ao carrinho, faça o pagamento pelo Mercado Pago e receba automaticamente.",
          position: 1,
          active: true
        },
        {
          question: "Quais formas de pagamento vocês aceitam?",
          answer:
            "Aceitamos Pix, cartão de crédito e boleto através do Mercado Pago.",
          position: 2,
          active: true
        },
        {
          question: "Como recebo meu produto?",
          answer:
            "Após a confirmação do pagamento, o produto é liberado automaticamente na sua conta em Meus Produtos.",
          position: 3,
          active: true
        },
        {
          question: "Onde vejo meus pedidos?",
          answer:
            "Acesse sua conta e vá em Meus Pedidos para acompanhar todas as suas compras.",
          position: 4,
          active: true
        },
        {
          question: "Como falo com o suporte?",
          answer:
            "Você pode abrir um ticket em Suporte dentro da sua conta, ou entrar em contato pelas nossas redes sociais.",
          position: 5,
          active: true
        }
      ]
    });
    console.log("✅ FAQ criado com 5 perguntas");
  } else {
    console.log("ℹ️  FAQ já tem itens, pulando");
  }

  console.log("🌱 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
