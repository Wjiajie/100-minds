const fs = require('fs');
const path = require('path');

const srcImagesDir = path.join(__dirname, 'app', 'src', 'content', 'Images');
const destImagesDir = path.join(__dirname, 'app', 'public', 'Images');
const mindMapDir = path.join(__dirname, 'app', 'src', 'content', 'mind-map');

// 1. Move Images folder
try {
  if (fs.existsSync(srcImagesDir)) {
    if (!fs.existsSync(path.join(__dirname, 'app', 'public'))) {
      fs.mkdirSync(path.join(__dirname, 'app', 'public'));
    }
    fs.renameSync(srcImagesDir, destImagesDir);
    console.log(`Moved ${srcImagesDir} to ${destImagesDir}`);
  } else {
    console.log(`${srcImagesDir} does not exist. Already moved?`);
  }
} catch (err) {
  console.error('Error moving Images folder:', err);
}

// 2. Update Image Paths in MDX files
try {
  const files = fs.readdirSync(mindMapDir).filter(file => file.endsWith('.mdx'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(mindMapDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace `](../Images/` or `]("../Images/` with `](/Images/` or `]("/Images/`
    // Also handling HTML img tags just in case
    const newContent = content
      .replace(/\.\.\/Images\//g, '/Images/')
      // specifically handle markdown image format ![](../Images/xxx)
      .replace(/\]\(\.\.\/Images\//g, '](/Images/');

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      updatedCount++;
    }
  });

  console.log(`Replaced image paths in ${updatedCount} files.`);
} catch (err) {
  console.error('Error updating MDX files:', err);
}
