import Atelier from "@/components/atelier/Atelier";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    titleEn: p.titleEn,
    date: p.date,
    description: p.description,
    descriptionEn: p.descriptionEn,
    minutes: Math.max(1, parseInt(p.readingTime, 10) || 1),
  }));

  return (
    <main>
      <h1 className="sr-only">谷昊埜 | Koya Tani</h1>
      <Atelier posts={posts} />
    </main>
  );
}
