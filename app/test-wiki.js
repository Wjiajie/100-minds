const https = require('https');

function searchWikipedia(query) {
    return new Promise((resolve, reject) => {
        const url = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function getExtract(title) {
    return new Promise((resolve, reject) => {
        const url = `https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}&format=json`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function test(modelName) {
    try {
        console.log(`Searching for: ${modelName}`);
        const searchResult = await searchWikipedia(modelName);
        if (searchResult.query.search.length > 0) {
            const firstHit = searchResult.query.search[0].title;
            console.log(`Found best match: ${firstHit}`);
            const extractData = await getExtract(firstHit);
            const pages = extractData.query.pages;
            const extract = pages[Object.keys(pages)[0]].extract;
            console.log(`Extract:\n${extract.substring(0, 200)}...`);
        } else {
            console.log("No Wikipedia results found.");
        }
    } catch(e) {
        console.error(e);
    }
}

test("奥卡姆剃刀");
test("彼得原理");
