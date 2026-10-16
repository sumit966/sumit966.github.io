import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROLES, getRoleWithProjects } from "@/data/roles";
import { ROLE_IDS, type RoleId } from "@/data/projects";
import RolePortfolioLayout from "@/components/RolePortfolioLayout";
import ContactSection from "@/components/ContactSection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES.find((item) => item.id === slug);
  if (!role) return { title: "Role" };
  return {
    title: role.title,
    description: role.intro,
    alternates: { canonical: role.href },
  };
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  if (!ROLE_IDS.includes(slug as RoleId)) notFound();
  const data = getRoleWithProjects(slug as RoleId);
  if (!data) notFound();

  return (
    <>
      <RolePortfolioLayout role={data.role} projects={data.projects} />
      <ContactSection />
    </>
  );
}
