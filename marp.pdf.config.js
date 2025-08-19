module.exports = {
  // Basic configuration for PDF generation
  allowLocalFiles: true,
  themeSet: './themes',
  
  // PDF export options
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