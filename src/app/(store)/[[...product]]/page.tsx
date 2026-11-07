import { Suspense } from "react";
import type { Metadata } from "next";

import api from "~/product/api";
import Drawer from "./drawer";

export async function generateStaticParams() {
  const products = await api.list();

  return [{ product: [] }, ...products.map((product) => ({ product: [product.id] }))];
}

export async function generateMetadata({
  params,
}: PageProps<"/[[...product]]">): Promise<Metadata | undefined> {
  const { product: segments } = await params;

  if (!segments) return;

  const product = await api.fetch(segments[0]);

  return {
    title: product.title,
    description: product.description,
  };
}

async function ProductContent({ params }: PageProps<"/[[...product]]">) {
  const { product: segments } = await params;

  if (!segments) return null;

  const product = await api.fetch(segments[0]);

  return <Drawer product={product} />;
}

export default function Page(props: PageProps<"/[[...product]]">) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Cargando producto...</div>}>
      <ProductContent {...props} />
    </Suspense>
  );
}