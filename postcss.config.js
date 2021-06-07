module.exports = {
  content: [
    './public/index.html',
    './public/script/script.js'
  ],
  css: ['./public/style.css'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
}