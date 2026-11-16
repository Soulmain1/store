import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description: "Conocé la historia de Flavio y Josefina y el significado detrás de CAUSAY, comida saludable.",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 py-6">
      {/* Navegación superior */}
      <div className="flex flex-col items-center text-center gap-3">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1.5 self-start rounded-full border bg-muted/40 px-4 py-1.5 text-sm font-medium transition hover:bg-muted"
        >
          <span>←</span>
          <span>Volver al menú</span>
        </Link>

        <span className="rounded-full bg-brand-600/10 px-3 py-0.5 text-xs font-semibold tracking-wide text-brand-700 dark:text-brand-400 uppercase">
          Nuestra Historia
        </span>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Sobre Nosotros
        </h1>

        <p className="max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed">
          Somos <span className="font-semibold text-foreground">Flavio y Josefina</span>. Hace 20 años que elegimos caminar juntos. 
        </p>

        {/* Imagen completa de Flavio, Josefina y la torta */}
        <div className="mt-2 w-full overflow-hidden rounded-2xl border bg-muted/20 shadow-sm">
          <img
            src="https://i.imgur.com/8pNGrqN.jpeg"
            alt="Flavio y Josefina - Causay Comida Saludable"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* Bloque destacado: ¿Qué significa Causay? */}
      <section className="rounded-xl border border-brand-600/30 bg-brand-600/5 p-6 flex flex-col gap-3">
        <span className="w-fit rounded-full bg-brand-600 px-3.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          ¿Qué significa Causay?
        </span>
        <p className="text-base leading-relaxed">
          <strong>Causay</strong> es una palabra quichua cuyo significado es <strong>vida</strong>, en referencia a una vida digna, en armonía con el universo y el ser humano. Este nombre fue elegido con el fin de representar eso en nuestros productos, ya que son de elaboración propia y 100% naturales.
        </p>
      </section>

      {/* Historia principal */}
      <section className="flex flex-col gap-4 text-base leading-relaxed">
        <p>
          En todo este tiempo soñamos, cambiamos, crecimos y aprendimos que crecer también significa permitirnos cambiar. Nuestros sueños fueron cambiando con el tiempo, y entendimos que a veces soñamos a través de la mirada del otro, imaginando lo que creemos que el otro quiere, sin detenernos a preguntarnos qué queremos realmente nosotros.
        </p>
        <p>
          Y ahí apareció <strong>Causay</strong>. Hace más de 4 años nació este emprendimiento que, sin saberlo, iba a transformar nuestras vidas.
        </p>
        <p>
          Causay nos enseñó a no estancarnos. A entender que cambiar de rumbo no significa abandonar un sueño, sino que los sueños también pueden modificarse, crecer, transformarse y encontrar nuevas formas de hacerse realidad. <strong>Causay significa vida</strong>, y estamos convencidos de que eso fue exactamente lo que nos dio: vida.
        </p>
        <p>
          Nos da vida en cada charla con nuestros clientes, en cada risa, en cada sugerencia, en cada desafío y en cada aprendizaje. Nos recuerda todos los días que siempre hay algo nuevo por aprender y que nunca dejamos de crecer.
        </p>
      </section>

      {/* Frase / Cierre */}
      <section className="rounded-lg border bg-muted/20 p-6 flex flex-col gap-3">
        <p className="italic text-muted-foreground">
          &ldquo;Hoy miramos todo lo recorrido y entendemos que quizás la vida no nos llevó exactamente hacia donde alguna vez imaginamos, nos llevó hacia algo que no sabíamos que necesitábamos. Y hoy queremos seguir soñando, no con los sueños de antes, sino con los que todavía estamos descubriendo. Juntos, como hace más de 20 años.&rdquo; 
        </p>
        <p className="font-medium text-sm">
          Causay es una parte de nuestra vida, que ahora también puede ser parte de la tuya. 
        </p>
      </section>

      {/* Llamado a la acción */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-muted/30 p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold">Conocé nuestra propuesta</h3>
          <p className="text-sm text-muted-foreground">
            Explorá el menú y hacé tu pedido directo por WhatsApp.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Ver el menú
        </Link>
      </section>
    </div>
  );
}