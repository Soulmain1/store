import { connection } from "next/server";
import type { Metadata } from "next";

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
  };
}

async function RootLayout({children}: {children: React.ReactNode}) {
  await connection(); // <--- Le indica a Next.js 16 que este layout es dinámico por request
  const store = await api.fetch();

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="m-auto max-w-7xl rounded-sm">
            <header className="flex flex-col gap-4 p-4">
              <img
                alt={store.title}
                className="h-32 w-full rounded-lg object-cover sm:h-64"
                fetchPriority="high"
                height={256}
                src={store.banner}
                width={1248}
              />
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-4">
                <div className="-mt-20 rounded-full p-1 sm:-mt-12">
                  <img
                    alt={store.title}
                    className="h-32 w-32 min-w-32 rounded-full border-8 border-background"
                    height={128}
                    src={store.logo}
                    width={128}
                  />
                </div>
                <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:gap-2 sm:text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold sm:text-4xl">{store.title}</p>
                    <p className="font-medium text-muted-foreground">{store.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    {Boolean(store.instagram) && (
                      <a
                        aria-label="Instagram"
                        href={store.instagram}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                          <WhatsappIcon />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <main className="px-4">
              <CartProvider>{children}</CartProvider>
            </main>

            <footer className="mt-8 px-4">
              <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row text-sm text-muted-foreground border-t">
                <p>© 2026 CAUSAY - Comida Saludable. Todos los derechos reservados.</p>
                
                <div className="flex items-center gap-6">
                  <div className="flex gap-4">
                    <a href="/nosotros" className="hover:underline">Sobre Nosotros</a>
                    <a href="/contacto" className="hover:underline">Contacto</a>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-full border px-3 py-1 bg-muted/30">
                    <span className="text-xs font-medium">Tema:</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              <p className="sm:text-md border-t py-4 text-center text-xs text-muted-foreground">
                Hecho con Next.js, por{" "}
                <a
                  className="underline"
                  href="https://twitter.com/goncy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  goncy
                </a>
                .
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;