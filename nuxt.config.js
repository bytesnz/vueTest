module.exports = {
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    /*
    ** Run ESLint on save
    */
    vendor: ['plotly.js'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.node = {
          fs: 'empty'
        }
      }
    }
  }
}
