module.exports = {
  // Marp CLI configuration
  allowLocalFiles: true,
  themeSet: './themes',
  html: true,
  
  // PDF export options
  pdf: {
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  },
  
  // PNG export options (for thumbnails)
  images: {
    jpeg: false,
    quality: 90,
  },
  
  // Engine options
  options: {
    markdown: {
      breaks: true,
      html: true,
    },
  },
  
  // Custom engine
  engine: ({ marp }) => {
    // Enable containers
    marp.use(require('markdown-it-container'));
    
    return marp;
  },
  
  // Watch mode settings
  watch: true,
  
  // Server settings for preview
  server: {
    port: 8080,
    open: true,
  },
};