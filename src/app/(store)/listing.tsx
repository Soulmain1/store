"use client";

import type {Product} from "~/product/types";

import {useMemo, useState} from "react";
import {SearchIcon, X, Table, StretchHorizontal, ChevronDown} from "lucide-react";
import Link from "next/link";

import ProductCard from "~/product/components/ProductCard";
import Carousel from "@/components/Carousel";

import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Toggle} from "@/components/ui/toggle";

const storeBanners = [
  {
    image: "https://i.imgur.com/nGtaNvA.jpeg",
    alt: "Platos y Menú Saludable",
    badge: "Destacado",
    title: "Opciones Frescas y Saludables",
    description: "Conoce nuestra variedad de platos preparados día a día con ingredientes naturales.",
  },
  {
    image: "https://i.imgur.com/miXTv3J.jpeg",
    alt: "Especialidades de la Casa",
    badge: "Recomendado",
    title: "Sabor Nutritivo",
    description: "Disfruta de combinaciones ideales para mantener tus objetivos de bienestar.",
  },
  {
    image: "https://i.imgur.com/LeGn7B1.jpeg",
    alt: "Ingredientes Selección",
    badge: "Calidad Premium",
    title: "Ingredientes Seleccionados",
    description: "Frescura garantizada en cada una de nuestras recetas.",
  },
  {
    image: "https://i.imgur.com/0jOrNfk.jpeg",
    alt: "Ensaladas y Bowls",
    badge: "Especial",
    title: "Bowls & Ensaladas",
    description: "Arma tu combinación favorita cargada de nutrientes.",
  },
  {
    image: "https://i.imgur.com/4yFLROq.jpeg",
    alt: "Promociones Semanales",
    badge: "Imperdible",
    title: "Promociones de la Semana",
    description: "Aprovecha los descuentos en nuestros combos saludables.",
  },
  {
    image: "https://i.imgur.com/0XhTZ2h.jpeg",
    alt: "Menú Equilibrado",
    badge: "Nuevo",
    title: "Variedad para Cada Día",
    description: "Platos balanceados para tu almuerzo o cena.",
  },
  {
    image: "https://i.imgur.com/6KU98LX.jpeg",
    alt: "Alimentación Consciente",
    badge: "Saludable",
    title: "Alimentación Consciente",
    description: "Cuidamos cada detalle de tu nutrición sin perder el buen sabor.",
  },
  {
    image: "https://i.imgur.com/gssiKp3.jpeg",
    alt: "Platos Especiales",
    badge: "Favorito",
    title: "Los Más Pedidos",
    description: "Descubre cuáles son los platos preferidos por nuestros clientes.",
  },
  {
    image: "https://i.imgur.com/XaAoaTZ.jpeg",
    alt: "CAUSAY Comida Saludable",
    badge: "CAUSAY",
    title: "Vive una Experiencia Saludable",
    description: "Haz tu pedido hoy y disfruta de la mejor comida rápida y sana.",
  },
];

function Listing({products}: {products: Product[]}) {
  const [query, setQuery] = useState<string>("");
  const [layout, setLayout] = useState<"list" | "grid">(() =>
    (products?.length || 0) > 30 ? "list" : "grid",
  );
  const [selectedCategory, setSelectedCategory] = useState<Product["category"] | null>(null);

  const categories = useMemo<[Product["category"], Product[]][]>(() => {
    let draft = products || [];

    if (query) {
      draft = draft.filter(({title, description}) =>
        (title.toLowerCase() + description.toLowerCase()).includes(query.toLowerCase()),
      );
    }

    const groups: Record<string, Product[]> = {};
    for (const product of draft) {
      const category = product.category || "General";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
    }

    return Object.entries(groups);
  }, [query, products]);

  function handleSelectCategory(category: Product["category"]) {
    setSelectedCategory((currentSelectedCategory) =>
      currentSelectedCategory === category ? null : category,
    );

    queueMicrotask(() => {
      const categoryElement = document.getElementById(category);
      const filtersElement = document.getElementById("filters");
      if (!categoryElement || !filtersElement) return;

      const offset = filtersElement.getBoundingClientRect().height;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = categoryElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
      });
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="pt-2">
        <Carousel slides={storeBanners} />
      </div>

      <div
        className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background py-4"
        id="filters"
      >
        <div className="relative flex w-full items-center sm:max-w-xs">
          <SearchIcon className="absolute left-3 h-4 w-4 opacity-40" />
          <Input
            className="px-9"
            placeholder="Buscar..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          {Boolean(query) && (
            <X
              className="absolute right-3 h-4 w-4 cursor-pointer opacity-40"
              onClick={() => {
                setQuery("");
              }}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Toggle
            aria-label="Vista de lista"
            pressed={layout === "list"}
            onClick={() => {
              setLayout("list");
            }}
          >
            <div className="text-2xl">
              <StretchHorizontal className="h-6 w-6 cursor-pointer opacity-40" />
            </div>
          </Toggle>
          <Toggle
            aria-label="Vista de grilla"
            pressed={layout === "grid"}
            onClick={() => {
              setLayout("grid");
            }}
          >
            <div className="text-2xl">
              <Table className="h-6 w-6 cursor-pointer opacity-40" />
            </div>
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col">
        {categories.length ? (
          categories.map(([category, categoryProducts]) => (
            <div key={category} className="flex flex-col gap-4 border-t py-4" id={category}>
              <div
                className={cn("flex items-center justify-between gap-4", {
                  "cursor-pointer": layout === "list",
                })}
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleSelectCategory(category);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelectCategory(category);
                  }
                }}
              >
                <h2 className="text-xl font-medium sm:text-2xl">
                  {category} <span className="opacity-70">({categoryProducts.length})</span>
                </h2>
                {layout === "list" && <ChevronDown className="h-6 w-6 opacity-40" />}
              </div>
              {((layout === "list" && selectedCategory === category) || layout === "grid") && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.length ? (
                    categoryProducts.map((product) => (
                      <Link key={product.id} href={`/${product.id}`} scroll={false}>
                        <ProductCard product={product} />
                      </Link>
                    ))
                  ) : (
                    <div className="my-12 flex flex-col gap-4">
                      <h2 className="text-center text-xl text-muted-foreground">
                        No hay productos
                      </h2>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="my-12 flex flex-col gap-4">
            <h2 className="text-center text-xl text-muted-foreground">No hay productos</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;