import { Metadata } from "next";

export const metadata: Metadata = {
    title: "术语表 | 100-minds",
    description: "按首字母索引排列的核心概念。点击任意术语，深入探索其背后的多维逻辑。",
};

export default function GlossaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
