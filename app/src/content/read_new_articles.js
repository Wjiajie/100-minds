const fs = require('fs');
const path = require('path');
const dir = path.join('c:\\', 'Users', 'jiaji', 'Documents', 'github-project', '100-minds', 'app', 'src', 'content', 'mind-map');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
let output = '';
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (content.includes('description: ""')) {
    output += '\n=====================\n';
    output += 'TITLE: ' + f + '\n';
    output += content.substring(0, 800) + '\n';
  }
}
fs.writeFileSync(path.join('c:\\', 'Users', 'jiaji', 'Documents', 'github-project', '100-minds', 'app', 'src', 'content', 'summary_input.txt'), output, 'utf8');
console.log('Done.');
