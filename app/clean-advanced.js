const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const modelsDir = path.join(process.cwd(), 'src/content/models');
const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.mdx'));

const contentMap = new Map();
const duplicates = [];
const modifiedFiles = [];

files.forEach(file => {
  const filePath = path.join(modelsDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(rawContent);
  let body = parsed.content;
  
  // 1. Extract the core text (everything after the first ## Header)
  const headerMatch = body.match(/##\s+.*\n+/);
  if (!headerMatch) return;
  
  let coreText = body.substring(headerMatch.index + headerMatch[0].length).trim();
  const isNotFound = coreText.includes('暂无关于此思维模型的维基百科信息');
  
  // 2. Exact Duplicate Check (based on core text)
  if (!isNotFound && contentMap.has(coreText)) {
    duplicates.push({ 
      fileToDelete: file, 
      keeper: contentMap.get(coreText) 
    });
    return; // Don't process or keep this duplicate
  } else if (!isNotFound) {
    contentMap.set(coreText, file);
  }

  // 3. Clean up inappropriate/irrelevant content
  let originalCoreText = coreText;
  
  // Remove Wikipedia disambiguation artifacts and "See also"
  coreText = coreText.replace(/有关.*?的更多信息，请参阅.*?[。\n]/g, '');
  coreText = coreText.replace(/关于.*?，请见.*?[。\n]/g, '');
  coreText = coreText.replace(/有关本条目名称的.*?[。\n]/g, '');
  coreText = coreText.replace(/这是一个消歧义页.*?[。\n]/g, '');
  
  // Remove MathML/LaTeX broken extraction (like in 动量.mdx)
  // These usually look like a block of highly indented characters ending with {\displaystyle ... }
  // or standalone isolated characters with multiple newlines.
  // We can use a regex to look for {\displaystyle ... } and remove it along with preceding non-word formatting.
  coreText = coreText.replace(/\s*\{?\\displaystyle[^\}]+\}?\s*/g, '');
  
  // Clean up weird empty brackets () or （） left behind
  coreText = coreText.replace(/（\s*）/g, '');
  coreText = coreText.replace(/\(\s*\)/g, '');
  
  // Clean up excessive newlines
  coreText = coreText.replace(/\n\s*\n\s*\n+/g, '\n\n');

  if (coreText !== originalCoreText) {
    // Rebuild the file
    parsed.content = body.substring(0, headerMatch.index + headerMatch[0].length) + coreText + '\n';
    const newFileContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newFileContent, 'utf-8');
    modifiedFiles.push(file);
  }
});

// Delete the duplicate files
duplicates.forEach(dup => {
  fs.unlinkSync(path.join(modelsDir, dup.fileToDelete));
});

console.log(`Deleted ${duplicates.length} duplicate files:`);
duplicates.forEach(d => console.log(` - ${d.fileToDelete} (Duplicate of ${d.keeper})`));
console.log(`\nCleaned up irrelevant text in ${modifiedFiles.length} files.`);
