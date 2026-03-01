const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const modelsDir = path.join(process.cwd(), 'src/content/models');
const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.mdx'));

const contentMap = new Map();
const duplicates = [];
const irrelevant = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(modelsDir, file), 'utf-8');
  const parsed = matter(content);
  const body = parsed.content.trim();
  
  // Ignore the default "not found" text for duplicate checking
  const isNotFound = body.includes('暂无关于此思维模型的维基百科信息');

  // Check for duplicates
  if (!isNotFound && contentMap.has(body)) {
    duplicates.push({ current: file, existing: contentMap.get(body) });
  } else if (!isNotFound) {
    contentMap.set(body, file);
  }
  
  // Check for irrelevant/inappropriate content
  if (isNotFound || body.includes('消歧义') || body.includes('可以指') || body.length < 30 || body.includes('是指：')) {
    irrelevant.push({ file: file, reason: 'disambiguation/notfound/too short' });
  }
});

fs.writeFileSync('cleanup-report.json', JSON.stringify({
  duplicates,
  irrelevant
}, null, 2));

console.log(`Found ${duplicates.length} exact content duplicates.`);
console.log(`Found ${irrelevant.length} irrelevant/not found entries.`);
