const fs = require("fs");
const path = require("path");

const draftsDir =
  "c:\\Users\\jiaji\\Documents\\github-project\\100-minds\\app\\src\\content\\drafts";
const mindMapDir =
  "c:\\Users\\jiaji\\Documents\\github-project\\100-minds\\app\\src\\content\\mind-map";

function getMasterList() {
  const chapter004Path = path.join(draftsDir, "chapter_004.md");
  const content = fs.readFileSync(chapter004Path, "utf8");
  const regex = /\[(.*?)\]\(part.*?(?:#.*?)\)/g;
  const titles = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    let title = match[1].trim();
    titles.push(title);
  }
  return titles;
}

function getExistingArticles() {
  const existing = new Set();
  const files = fs.readdirSync(mindMapDir);
  for (const file of files) {
    if (file.endsWith(".mdx")) {
      existing.add(file.replace(".mdx", ""));
    }
  }
  return existing;
}

function extractArticles() {
  const masterList = getMasterList();
  const existing = getExistingArticles();
  const missing = masterList.filter((title) => !existing.has(title));
  console.log(
    `Found ${missing.length} missing articles out of ${masterList.length} total.`,
  );

  const draftFiles = fs
    .readdirSync(draftsDir)
    .filter(
      (f) =>
        f.startsWith("chapter_") && f.endsWith(".md") && f !== "chapter_004.md",
    );

  let extractedCount = 0;

  for (const missingTitle of missing) {
    let titleFound = false;

    for (const draftFile of draftFiles) {
      const draftPath = path.join(draftsDir, draftFile);
      const content = fs.readFileSync(draftPath, "utf8");

      // Look for `### {missingTitle}` ignoring whitespace
      const searchStr = `### ${missingTitle}`;
      let startIndex = content.indexOf(searchStr);
      if (startIndex === -1) {
        // Try to find it loosely
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (
            lines[i].trim().startsWith("### ") &&
            lines[i].trim().substring(4).trim() === missingTitle
          ) {
            startIndex = content.indexOf(lines[i]);
            break;
          }
        }
      }

      if (startIndex !== -1) {
        // Find end of article
        // End is either next `### `, or `**本章要点**`, or `---` or end of file
        const searchArea = content.substring(startIndex + searchStr.length);
        let endIndex = searchArea.length;

        const nextTitleMatch = searchArea.match(/\n### /);
        if (nextTitleMatch) endIndex = Math.min(endIndex, nextTitleMatch.index);

        const summaryMatch = searchArea.match(/\n\*\*本章要点\*\*/);
        if (summaryMatch) endIndex = Math.min(endIndex, summaryMatch.index);

        const footnoteMatch = searchArea.match(/\n---/);
        if (footnoteMatch) endIndex = Math.min(endIndex, footnoteMatch.index);

        let articleContent = searchArea.substring(0, endIndex).trim();

        // Build frontmatter
        const frontmatter = `---
title: ${missingTitle}
description: ""
tags: []
date: '${new Date().toISOString().split("T")[0]}'
---
`;
        // Handle invalid characters in filename
        const safeTitle = missingTitle.replace(/[\\/:"*?<>|]/g, "_");
        const outPath = path.join(mindMapDir, `${safeTitle}.mdx`);

        fs.writeFileSync(outPath, frontmatter + articleContent + "\n", "utf8");
        console.log(`Extracted: ${missingTitle} to ${safeTitle}.mdx`);
        extractedCount++;
        titleFound = true;
        break;
      }
    }
    if (!titleFound) {
      console.log(`WARNING: Could not find content for title: ${missingTitle}`);
    }
  }

  console.log(`Extraction complete. ${extractedCount} articles extracted.`);
}

extractArticles();
