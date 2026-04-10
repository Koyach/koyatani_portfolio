import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects, getProject, getAllSlugs } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: `${project.title.ja} | 谷昊埜`,
    description: project.description.ja,
    openGraph: {
      title: `${project.title.ja} | 谷昊埜`,
      description: project.description.ja,
      images: project.image ? [{ url: project.image }] : [{ url: "/images/og.JPG" }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
