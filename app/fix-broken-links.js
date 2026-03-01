const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');

const mindMapDir = path.join(process.cwd(), 'src', 'content', 'mind-map');
const modelsDir = path.join(process.cwd(), 'src', 'content', 'models');

// HTTP GET wrapper
function fetchJSON(urlStr) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            headers: { 'User-Agent': 'AntigravityAgent/1.0' }
        };
        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    // 1. Build content -> keeper title map from existing models
    const contentMap = new Map();
    const existingModels = fs.readdirSync(modelsDir).filter(f => f.endsWith('.mdx'));
    for (const file of existingModels) {
        const parsed = matter(fs.readFileSync(path.join(modelsDir, file), 'utf-8'));
        const headerMatch = parsed.content.match(/##\s+.*\n+/);
        if (headerMatch) {
            const coreText = parsed.content.substring(headerMatch.index + headerMatch[0].length).trim();
            contentMap.set(coreText, file.replace('.mdx', ''));
        }
    }

    // 2. Find all used tags in mind-map
    const files = fs.readdirSync(mindMapDir).filter(f => f.endsWith('.mdx'));
    const missingTags = new Set();
    const tagToFile = new Map();

    files.forEach(file => {
        const m = matter(fs.readFileSync(path.join(mindMapDir, file), 'utf-8'));
        (m.data.tags || []).forEach(tag => {
            if (!existingModels.includes(`${tag}.mdx`)) {
                missingTags.add(tag);
            }
        });
    });

    console.log(`Found ${missingTags.size} missing tags pointing to deleted models.`);
    const tagReplacementMap = {};

    // 3. For each missing tag, find its keeper
    for (const tag of missingTags) {
        console.log(`Checking Wikipedia for missing tag: ${tag}...`);
        try {
            const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(tag)}&utf8=&format=json`;
            const searchRes = await fetchJSON(searchUrl);
            let contentExtract = "暂无关于此思维模型的维基百科信息。建议通过搜索引擎获取更详细的解释。";
            
            if (searchRes.query && searchRes.query.search.length > 0) {
                const title = searchRes.query.search[0].title;
                const extUrl = `https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}&format=json`;
                const extRes = await fetchJSON(extUrl);
                const pages = extRes.query.pages;
                const pageId = Object.keys(pages)[0];
                if (pages[pageId].extract) contentExtract = pages[pageId].extract.trim();
            }

            // Clean the extract the exact same way
            let coreText = contentExtract;
            coreText = coreText.replace(/有关.*?的更多信息，请参阅.*?[。\n]/g, '');
            coreText = coreText.replace(/关于.*?，请见.*?[。\n]/g, '');
            coreText = coreText.replace(/有关本条目名称的.*?[。\n]/g, '');
            coreText = coreText.replace(/这是一个消歧义页.*?[。\n]/g, '');
            coreText = coreText.replace(/\s*\{?\\displaystyle[^\}]+\}?\s*/g, '');
            coreText = coreText.replace(/（\s*）/g, '');
            coreText = coreText.replace(/\(\s*\)/g, '');
            coreText = coreText.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();

            if (contentMap.has(coreText)) {
                const keeper = contentMap.get(coreText);
                console.log(` -> Mapped ${tag} to ${keeper}`);
                tagReplacementMap[tag] = keeper;
            } else {
                console.log(` -> Could not find match for ${tag}. Will leave as is.`);
            }
        } catch (e) {
            console.error(`Error with ${tag}: ${e.message}`);
        }
        await delay(300);
    }

    // 4. Update the mind-map files
    let updatedFiles = 0;
    files.forEach(file => {
        const filePath = path.join(mindMapDir, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        let { data, content } = matter(raw);
        let modified = false;

        // update tags array
        if (data.tags) {
            const newTags = data.tags.map(t => {
                if (tagReplacementMap[t]) {
                    modified = true;
                    return tagReplacementMap[t];
                }
                return t;
            });
            // remove duplicates if replacing caused them
            data.tags = [...new Set(newTags)];
        }

        // update <Term term="old"> to <Term term="new">
        Object.keys(tagReplacementMap).forEach(oldTag => {
            const newTag = tagReplacementMap[oldTag];
            const oldTermStr = `term="${oldTag}"`;
            if (content.includes(oldTermStr)) {
                content = content.replace(new RegExp(`term="${oldTag}"`, 'g'), `term="${newTag}"`);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, matter.stringify(content, data), 'utf-8');
            updatedFiles++;
        }
    });

    console.log(`Successfully updated ${updatedFiles} mind-map files to fix broken references.`);
}

run();
