#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Parse issue body and extract form fields
 * @param {string} issueBody - The raw issue body text
 * @returns {Object} Parsed fields
 */
function parseIssueBody(issueBody) {
  const extractField = (fieldName) => {
    const regex = new RegExp(`### ${fieldName}[\\s\\S]*?(?:###|$)`);
    const match = issueBody.match(regex);
    if (!match) return "";
    return match[0]
      .replace(new RegExp(`### ${fieldName}\\s*`), "")
      .replace(/### .*$/m, "")
      .trim();
  };

  return {
    title: extractField("📝 プレゼンタイトル（英数字とハイフンのみ）"),
    titleJa: extractField("📋 プレゼンタイトル（日本語）"),
    theme: extractField("🎨 テーマ")
      .replace(/（.*）/, "")
      .toLowerCase(),
    duration: extractField("⏱️ 発表時間").match(/\d+/)?.[0] || "10",
    presenter: extractField("👤 発表者名"),
    organization: extractField("🏢 所属組織（任意）"),
    date: extractField("📅 発表日") || new Date().toISOString().split("T")[0],
    content: extractField("📝 スライド内容"),
    speakerNotes: extractField("💬 全体的なスピーカーノート（任意）"),
    resources: extractField("🔗 参考リソース（任意）"),
  };
}

/**
 * Generate slide markdown content
 * @param {Object} data - Parsed issue data
 * @returns {string} Markdown content for the slide
 */
function generateSlideContent(data) {
  const {
    titleJa,
    theme,
    duration,
    presenter,
    organization,
    date,
    content,
    speakerNotes,
    resources,
  } = data;

  let slideContent = `---
marp: true
theme: ${theme === "default" ? "default" : theme}
paginate: true
footer: '${titleJa} - ${presenter}'
---

# ${titleJa}

${organization ? `${presenter}\n${organization}` : presenter}

${date}

---

`;

  // Add content from issue or use template
  if (content && content.length > 50) {
    // If substantial content is provided, use it
    slideContent += content;
  } else {
    // Otherwise, use the appropriate template
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      `${duration}min-template.md`
    );
    if (fs.existsSync(templatePath)) {
      const template = fs.readFileSync(templatePath, "utf8");
      // Skip the front matter and first slide from template
      const templateContent = template.split("---").slice(3).join("---");
      slideContent += templateContent;
    }
  }

  // Add global speaker notes if provided
  if (speakerNotes) {
    slideContent += `\n\n---\n\n<!--
全体的なスピーカーノート:
${speakerNotes}
-->`;
  }

  // Add resources slide if provided
  if (resources) {
    slideContent += `\n\n---\n\n# 参考リソース\n\n${resources}`;
  }

  return slideContent;
}

/**
 * Create slide directory and files
 * @param {Object} data - Parsed issue data
 * @returns {string} Created directory path
 */
function createSlideFiles(data) {
  const { title } = data;
  const today = new Date().toISOString().split("T")[0];
  const dirName = `${today}-${title}`;
  const slideDir = path.join("slides", dirName);

  // Create directories
  fs.mkdirSync(slideDir, { recursive: true });
  fs.mkdirSync(path.join(slideDir, "images"), { recursive: true });
  fs.mkdirSync(path.join(slideDir, "output"), { recursive: true });

  // Generate and write slide content
  const slideContent = generateSlideContent(data);
  const slidePath = path.join(slideDir, "slide.md");
  fs.writeFileSync(slidePath, slideContent);

  // Create a README for the slide directory
  const readmeContent = `# ${data.titleJa}

- **発表者**: ${data.presenter}
- **日付**: ${data.date}
- **時間**: ${data.duration}分
- **テーマ**: ${data.theme}

## ファイル構成

- \`slide.md\`: メインのスライドファイル
- \`images/\`: スライド用の画像ディレクトリ
- \`output/\`: 生成されたHTML/PDFの出力ディレクトリ

## ビルド方法

\`\`\`bash
# HTML生成
marp slide.md --html -o output/index.html

# PDF生成
marp slide.md --pdf -o output/slide.pdf
\`\`\`
`;

  fs.writeFileSync(path.join(slideDir, "README.md"), readmeContent);

  return dirName;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node generate-slide.js <issue-body-file>");
    process.exit(1);
  }

  try {
    const issueBodyFile = args[0];
    const issueBody = fs.readFileSync(issueBodyFile, "utf8");

    const data = parseIssueBody(issueBody);
    const dirName = createSlideFiles(data);

    console.log(
      JSON.stringify({
        success: true,
        dirName,
        title: data.titleJa,
      })
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        success: false,
        error: error.message,
      })
    );
    process.exit(1);
  }
}

module.exports = {
  parseIssueBody,
  generateSlideContent,
  createSlideFiles,
};
