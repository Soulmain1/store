import type { Metadata } from "next";
import Link from "next/link";

import api from "~/store/api";
import CartProvider from "~/cart/context";
import ThemeProvider from "~/theme/context";
import ThemeToggle from "~/theme/components/ThemeToggle";

import InstagramIcon from "@/components/icons/instagram";
import WhatsappIcon from "@/components/icons/whatsapp";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const store = await api.fetch();

  return {
    title: {
      template: `${store.title} - %s`,
      default: store.title,
    },
    description: store.subtitle,
    icons: {
      icon: [
        { url: "/favicon.ico?v=2" },
        { url: "/favicon.png?v=2", type: "image/png" },
      ],
      shortcut: "/favicon.ico?v=2",
      apple: "/favicon.png?v=2",
    },
  };
}

async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await api.fetch();

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body className="font-sans antialiased">
        <ThemeProvider>
          {/* Contenedor principal con ancho normal de PC */}
          <div className="m-auto max-w-7xl rounded-sm">
            <header className="flex flex-col gap-6 p-4">
              {/* Banner superior */}
              <img
                alt={store.title}
                className="h-32 w-full rounded-lg object-cover sm:h-64"
                fetchPriority="high"
                height={256}
                src={store.banner}
                width={1248}
              />

             {/* Sección del perfil centrada */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="-mt-20 rounded-full border-4 border-background bg-background p-1 sm:-mt-16">
                  <Link href="/">
                    <img
                      alt={store.title}
                      className="h-32 w-32 min-w-32 rounded-full object-cover bg-white"
                      height={128}
                      src="/assets/avatar.png"
                      width={128}
                    />
                  </Link>
                </div>

                <div className="flex flex-col gap-1">
                  <Link href="/">
                    <p className="text-3xl font-bold sm:text-4xl">{store.title}</p>
                  </Link>
                  <p className="font-medium text-muted-foreground">{store.subtitle}</p>
                </div>

                {/* Botones de redes y Sobre Nosotros centrados */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Boolean(store.instagram) && (
                    <a
                      aria-label="Instagram"
                      href={store.instagram}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white transition hover:opacity-90">
                        <InstagramIcon />
                      </div>
                    </a>
                  )}
                  {Boolean(store.whatsapp) && (
                    <a
                      aria-label="Whatsapp"
                      href={store.whatsapp}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white transition hover:opacity-90">
                        <WhatsappIcon />
                      </div>
                    </a>
                  )}

                  <Link
                    href="/nosotros"
                    className="flex h-10 items-center rounded-full border bg-muted/40 px-4 text-sm font-medium transition hover:bg-muted"
                  >
                    Sobre Nosotros
                  </Link>
                </div>
              </div>
            </header>

            <main className="px-4">
              <CartProvider>{children}</CartProvider>
            </main>

            <footer className="mt-12 px-4 pb-6">
              {/* Sección de Preguntas Frecuentes desplegables (acordeón exclusivo) */}
              <div className="border-t pt-6 pb-6">
                <h2 className="mb-4 text-center text-lg font-semibold sm:text-left">
                  Preguntas Frecuentes
                </h2>
                <div className="grid items-start gap-3 sm:grid-cols-2">
                  <details
                    name="faq"
                    className="group rounded-xl border bg-muted/20 p-4 text-sm transition hover:bg-muted/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>¿Cómo hago mi pedido?</span>
                      <span className="transition group-open:rotate-180">▾</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Agregá los platos que quieras al catálogo y tocá finalizar pedido. Se abrirá nuestro WhatsApp automáticamente con el detalle listo para confirmar.
                    </p>
                  </details>

                  <details
                    name="faq"
                    className="group rounded-xl border bg-muted/20 p-4 text-sm transition hover:bg-muted/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>¿Qué medios de pago aceptan?</span>
                      <span className="transition group-open:rotate-180">▾</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Aceptamos transferencia bancaria, Mercado Pago y efectivo al recibir tu pedido.
                    </p>
                  </details>

                  <details
                    name="faq"
                    className="group rounded-xl border bg-muted/20 p-4 text-sm transition hover:bg-muted/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>¿Hacen envíos a domicilio?</span>
                      <span className="transition group-open:rotate-180">▾</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Sí, realizamos envíos en San Miguel de Tucumán. Coordinamos la franja horaria de entrega apenas confirmás por WhatsApp.
                    </p>
                  </details>

                  <details
                    name="faq"
                    className="group rounded-xl border bg-muted/20 p-4 text-sm transition hover:bg-muted/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>¿Cómo se conservan los platos?</span>
                      <span className="transition group-open:rotate-180">▾</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Nuestros productos son 100% naturales y de elaboración propia. Duran hasta 3-4 días en heladera y hasta 3 meses en el freezer.
                    </p>
                  </details>
                </div>
              </div>

              {/* Barra inferior del Footer */}
              <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
                <p>© 2026 CAUSAY - Comida Saludable. Todos los derechos reservados.</p>

                <div className="flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1">
                  <span className="text-xs font-medium">Tema:</span>
                  <ThemeToggle />
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;