import os
import json

print('Starting scan...')

directory = r'c:\Users\jiaji\Documents\github-project\100-minds\app\src\content\models'
files = [f for f in os.listdir(directory) if f.endswith('.mdx')]

traditional_chars = set('羅爾斯納什極決較總學變實對無機圖觀覺個這論與為會動現後業來網說從於點麼讓應當們過')
wiki_keywords = ['参见', '參考資料', '外部联结', '外部連結', '维基百科', '維基百科', '此条目', '本條目', '英语：', '英语:']

analysis = []
for f in files:
    path = os.path.join(directory, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    lines = content.split('\n')
    body_lines = []
    frontmatter_count = 0
    desc = ''
    for line in lines:
        if line.startswith('---'):
            frontmatter_count += 1
            continue
        if frontmatter_count == 1:
            pass
        elif frontmatter_count >= 2:
            body_lines.append(line)
            
    body = '\n'.join(body_lines).strip()
    
    # Check for traditional chinese
    tc_count = sum(1 for c in body if c in traditional_chars)
    
    # Check for wiki keywords
    has_wiki = any(kw in body for kw in wiki_keywords)
    
    # Brief?
    char_count = len(body)
    is_brief = char_count < 100
    
    if tc_count > 2 or has_wiki or is_brief or '暂无关于此思维模型的维基百科信息' in body:
        analysis.append({'file': f})

print(f'Total files needing processing: {len(analysis)}')
for x in analysis:
    print(x['file'])
