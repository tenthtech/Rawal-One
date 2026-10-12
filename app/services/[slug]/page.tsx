import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { getServiceDetail, serviceDetails } from "@/data/service-details";

type ServicePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceDetail((await params).slug);
  if (!service) notFound();
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceDetail((await params).slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
