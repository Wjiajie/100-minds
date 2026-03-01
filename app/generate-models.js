const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');

const mindMapDir = path.join(__dirname, 'src', 'content', 'mind-map');
const modelsDir = path.join(__dirname, 'src', 'content', 'models');

// Ensure output directory exists
if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
}

// 1. Get all unique tags from Mind Map articles
const tags = new Set();
fs.readdirSync(mindMapDir).forEach(f => {
    if(f.endsWith('.mdx')) {
        const m = matter(fs.readFileSync(path.join(mindMapDir, f), 'utf-8'));
        (m.data.tags || []).forEach(t => tags.add(t));
    }
});

const allModels = Array.from(tags);
console.log(`Found ${allModels.length} unique mental models.`);

// HTTP GET wrapper with User-Agent
function fetchJSON(urlStr) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            headers: {
                'User-Agent': 'AntigravityAgent/1.0 (https://github.com; developer@example.com)'
            }
        };
        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch(e) {
                    resolve({ error: true, reason: 'parse error', data });
                }
            });
        }).on('error', reject);
    });
}

async function searchWikipedia(query) {
    const url = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
    return fetchJSON(url);
}

async function getExtract(title) {
    const url = `https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}&format=json`;
    return fetchJSON(url);
}

// Delay helper
const delay = ms => new Promise(res => setTimeout(res, ms));

async function processModels() {
    let successCount = 0;
    for (let i = 0; i < allModels.length; i++) {
        const model = allModels[i];
        const outPath = path.join(modelsDir, `${model.replace(/\//g, '-')}.mdx`);
        
        // Skip if already exists
        if (fs.existsSync(outPath)) {
            continue;
        }

        console.log(`[${i+1}/${allModels.length}] Fetching ${model}...`);
        
        let contentExtract = "暂无关于此思维模型的维基百科信息。建议通过搜索引擎获取更详细的解释。";
        
        try {
            const searchRes = await searchWikipedia(model);
            if (!searchRes.error && searchRes.query && searchRes.query.search && searchRes.query.search.length > 0) {
                // Get the closest match (first result)
                const closestTitle = searchRes.query.search[0].title;
                const extractRes = await getExtract(closestTitle);
                
                if (!extractRes.error && extractRes.query && extractRes.query.pages) {
                    const pages = extractRes.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].extract) {
                        contentExtract = pages[pageId].extract;
                    }
                }
            }
        } catch (e) {
            console.error(`Error fetching ${model}:`, e.message);
        }

        // Generate MDX file
        const mdxContent = `---
title: ${model}
description: 关于${model}的详细解释
---

## ${model}

${contentExtract}
`;
        fs.writeFileSync(outPath, mdxContent, 'utf-8');
        successCount++;
        
        // Wait 300ms to avoid rate limits
        await delay(300);
    }
    
    console.log(`Finished generating ${successCount} new model explanation files.`);
}

processModels();
