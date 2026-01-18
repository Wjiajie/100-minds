/**
 * 一个轻量级的拼音首字母提取工具
 * 注意：由于不使用大型库，这里使用简单的 Unicode 范围映射或 localeCompare
 * 对于术语分类，我们只需要提取首字的首字母
 */

export function getPinyinInitial(str: string): string {
    if (!str) return "#";
    const firstChar = str.charAt(0);

    // 如果已经是大写或小写字母，直接返回大写
    if (/^[A-Za-z]/.test(firstChar)) {
        return firstChar.toUpperCase();
    }

    // 如果是中文字符，利用 Intl.Collator 或 localeCompare 的排序特性进行粗略判断
    // 这种方法不完全准确（多音字），但在轻量级场景（禅意设计）下足够好用
    // 复杂的拼音解析建议使用 pinyin-pro
    try {
        const letters = "ABCDEFGHJKLMNOPQRSTWXYZ"; // 排除 I, U, V (中文拼音首字母通常没有)

        // 我们使用一些代表性的字符来确定范围
        const boundaryChars = [
            '啊', '八', '擦', '搭', '蛾', '发', '噶', '哈', '击', '咔', '垃', '妈',
            '拿', '哦', '啪', '期', '然', '撒', '塌', '挖', '昔', '压', '匝'
        ];

        const initials = "ABCDEFGHJKLMNOPQRSTWXYZ".split("");

        for (let i = boundaryChars.length - 1; i >= 0; i--) {
            if (firstChar.localeCompare(boundaryChars[i], 'zh-CN') >= 0) {
                return initials[i];
            }
        }
    } catch (e) {
        console.error("Pinyin extraction error:", e);
    }

    return "#";
}

export function groupByPinyin<T>(items: T[], getStr: (item: T) => string): Record<string, T[]> {
    const grouped: Record<string, T[]> = {};

    items.forEach(item => {
        const initial = getPinyinInitial(getStr(item));
        if (!grouped[initial]) {
            grouped[initial] = [];
        }
        grouped[initial].push(item);
    });

    return grouped;
}
