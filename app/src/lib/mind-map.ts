import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/mind-map');

export interface MindMapPost {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
    content: string;
}

export function getAllMindMapPosts(): MindMapPost[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                description: data.description || '',
                tags: data.tags || [],
                date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                content,
            };
        });

    // Sort by date desc
    return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getMindMapPostBySlug(slug: string): MindMapPost | null {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(contentDirectory, `${decodedSlug}.md`);
    const fullPathMdx = path.join(contentDirectory, `${decodedSlug}.mdx`);

    let filePath = '';
    if (fs.existsSync(fullPath)) {
        filePath = fullPath;
    } else if (fs.existsSync(fullPathMdx)) {
        filePath = fullPathMdx;
    } else {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        tags: data.tags || [],
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        content,
    };
}

export function getAllTags(): { tag: string; count: number }[] {
    const posts = getAllMindMapPosts();
    const tagsCount: Record<string, number> = {};

    posts.forEach((post) => {
        post.tags.forEach((tag) => {
            if (tag) {
                tagsCount[tag] = (tagsCount[tag] || 0) + 1;
            }
        });
    });

    return Object.entries(tagsCount)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
}
