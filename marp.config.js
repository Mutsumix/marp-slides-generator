module.exports = {
  // Basic configuration for GitHub Actions
  allowLocalFiles: true,
  themeSet: './themes',
  
  // Export options
  html: true,
  pdf: {
    printBackground: true,
    preferCSSPageSize: true,
  },
  
  // Engine options
  options: {
    markdown: {
      breaks: true,
      html: true,
    },
  },
};