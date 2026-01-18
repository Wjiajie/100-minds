import fs from "fs";
import path from "path";
import matter from "gray-matter";

const modelsDirectory = path.join(process.cwd(), "src/content/models");

export interface ModelMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  difficulty: "入门" | "进阶" | "高级";
  tags: string[];
  relatedModels?: string[];
  publishedAt?: string;
}

export interface Model extends ModelMeta {
  content: string;
}

export function getAllModels(): ModelMeta[] {
  if (!fs.existsSync(modelsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(modelsDirectory);
  const allModels = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(modelsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "未分类",
        icon: data.icon || "💡",
        difficulty: data.difficulty || "入门",
        tags: data.tags || [],
        relatedModels: data.relatedModels || [],
        publishedAt: data.publishedAt,
      } as ModelMeta;
    });

  return allModels.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
}

export function getModelBySlug(slug: string): Model | null {
  const fullPath = path.join(modelsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "未分类",
    icon: data.icon || "💡",
    difficulty: data.difficulty || "入门",
    tags: data.tags || [],
    relatedModels: data.relatedModels || [],
    publishedAt: data.publishedAt,
    content,
  };
}

export function getModelsByCategory(): Record<string, ModelMeta[]> {
  const models = getAllModels();
  const grouped: Record<string, ModelMeta[]> = {};

  models.forEach((model) => {
    if (!grouped[model.category]) {
      grouped[model.category] = [];
    }
    grouped[model.category].push(model);
  });

  return grouped;
}

export function getAllCategories(): string[] {
  const models = getAllModels();
  const categories = new Set(models.map((m) => m.category));
  return Array.from(categories).sort();
}
