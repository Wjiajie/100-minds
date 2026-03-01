const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const mindMapDir = path.join(__dirname, 'src', 'content', 'mind-map');
const files = fs.readdirSync(mindMapDir).filter(file => file.endsWith('.mdx'));

const allTags = new Set();
const tagsPerFile = {};

files.forEach(file => {
  const filePath = path.join(mindMapDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);
  
  if (parsed.data.tags && Array.isArray(parsed.data.tags)) {
    tagsPerFile[file] = parsed.data.tags;
    parsed.data.tags.forEach(tag => allTags.add(tag));
  } else {
    tagsPerFile[file] = [];
  }
});

console.log(`\n=== All Unique Tags Found (${allTags.size}) ===`);
console.log(Array.from(allTags).join(', '));

// Write to a temporary JSON file to easily examine them
fs.writeFileSync('tags-review.json', JSON.stringify({
  allUniqueTags: Array.from(allTags),
  perFile: tagsPerFile
}, null, 2));

console.log('\nWrote details to tags-review.json');
