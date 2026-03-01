const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const configFile = process.argv[2];
const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
const basePath = path.join(__dirname, 'src', 'content', 'mind-map');

Object.keys(config).forEach(filename => {
  const filePath = path.join(basePath, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const models = config[filename];
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  let { data, content } = matter(fileContent);

  // Update tags
  data.tags = models;

  // 1. Strip all existing <Term> tags
  // Regex matches <Term term="...">...</Term> and <Term>...</Term>
  content = content.replace(/<Term[^>]*>(.*?)<\/Term>/g, '$1');

  // 2. For each model, find its first occurrence and wrap it
  // We need to be careful not to wrap already-wrapped items or mess up markdown
  models.forEach(model => {
      // Escape model string for regex
      const escapedModel = model.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Create a regex to find the first occurrence of the model
      // We don't want to match it inside a heading or image alt text, but a simple regex might be enough
      // since we only replace the first occurrence.
      const regex = new RegExp(`(${escapedModel})`, 'i');
      
      let replaced = false;
      content = content.replace(regex, (match) => {
          if (!replaced) {
              replaced = true;
              return `<Term term="${model}">${match}</Term>`;
          }
          return match;
      });
  });

  // Re-serialize the markdown
  const newFileContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newFileContent, 'utf-8');
  console.log(`Processed: ${filename}`);
});
