#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validate slide content against CLAUDE.md guidelines
 * @param {string} slidePath - Path to the slide markdown file
 * @returns {Object} Validation results
 */
function validateSlide(slidePath) {
  const content = fs.readFileSync(slidePath, 'utf8');
  const slides = content.split(/^---$/m);
  const errors = [];
  const warnings = [];
  const info = [];

  // Remove front matter
  const actualSlides = slides.slice(1);

  // Count slides
  const slideCount = actualSlides.length;
  info.push(`Total slides: ${slideCount}`);

  // Validate each slide
  actualSlides.forEach((slide, index) => {
    const lines = slide.trim().split('\n').filter(line => !line.startsWith('<!--'));
    const charCount = slide.replace(/<!--[\s\S]*?-->/g, '').length;
    const lineCount = lines.length;

    // Check character limit (400 chars per slide)
    if (charCount > 400) {
      warnings.push(`Slide ${index + 1}: ${charCount} characters (exceeds 400 char limit)`);
    }

    // Check line limit (12 lines per slide)
    if (lineCount > 12) {
      warnings.push(`Slide ${index + 1}: ${lineCount} lines (exceeds 12 line limit)`);
    }

    // Check title length (max 30 chars)
    const titleMatch = slide.match(/^# (.+)$/m);
    if (titleMatch && titleMatch[1].length > 30) {
      warnings.push(`Slide ${index + 1}: Title "${titleMatch[1]}" exceeds 30 characters`);
    }

    // Check for speaker notes
    if (!slide.includes('<!--')) {
      info.push(`Slide ${index + 1}: No speaker notes`);
    }

    // Check for images without alt text
    const imageMatches = slide.matchAll(/!\[([^\]]*)\]\([^)]+\)/g);
    for (const match of imageMatches) {
      if (!match[1]) {
        warnings.push(`Slide ${index + 1}: Image without alt text`);
      }
    }

    // Check heading hierarchy
    const headings = slide.match(/^#{1,6} /gm);
    if (headings) {
      headings.forEach(heading => {
        const level = heading.trim().length;
        if (level > 3) {
          warnings.push(`Slide ${index + 1}: Heading level ${level} (h4+ not recommended)`);
        }
      });
    }
  });

  // Time-based validation
  const estimatedDuration = Math.ceil(slideCount / 2); // Assume ~2 slides per minute
  info.push(`Estimated duration: ${estimatedDuration} minutes`);

  // Check for required slides
  const hasTitle = content.includes('# ');
  const hasAgenda = content.toLowerCase().includes('アジェンダ') || content.toLowerCase().includes('agenda');
  const hasConclusion = content.includes('まとめ') || content.toLowerCase().includes('thank') || content.includes('ありがとう');

  if (!hasTitle) errors.push('Missing title slide');
  if (slideCount > 5 && !hasAgenda) warnings.push('Consider adding an agenda slide');
  if (!hasConclusion) warnings.push('Consider adding a conclusion/thank you slide');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    info,
    stats: {
      slideCount,
      estimatedDuration,
    },
  };
}

/**
 * Format validation results for output
 * @param {Object} results - Validation results
 * @returns {string} Formatted output
 */
function formatResults(results) {
  let output = '';

  if (results.errors.length > 0) {
    output += '❌ Errors:\n';
    results.errors.forEach(error => {
      output += `  - ${error}\n`;
    });
    output += '\n';
  }

  if (results.warnings.length > 0) {
    output += '⚠️ Warnings:\n';
    results.warnings.forEach(warning => {
      output += `  - ${warning}\n`;
    });
    output += '\n';
  }

  if (results.info.length > 0) {
    output += 'ℹ️ Information:\n';
    results.info.forEach(item => {
      output += `  - ${item}\n`;
    });
    output += '\n';
  }

  output += `📊 Statistics:\n`;
  output += `  - Slides: ${results.stats.slideCount}\n`;
  output += `  - Estimated duration: ${results.stats.estimatedDuration} minutes\n`;

  return output;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node validate-slide.js <slide.md>');
    process.exit(1);
  }

  try {
    const slidePath = args[0];
    
    if (!fs.existsSync(slidePath)) {
      console.error(`File not found: ${slidePath}`);
      process.exit(1);
    }

    const results = validateSlide(slidePath);
    console.log(formatResults(results));
    
    // Exit with error code if validation failed
    if (!results.valid) {
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  validateSlide,
  formatResults,
};