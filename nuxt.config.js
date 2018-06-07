const nodeExternals = require('webpack-node-externals')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.min.css'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/vue-awesome',
    { src: '~/plugins/vue-awesome-swiper', ssr: false }
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
      [
        '/api', 
        { 
          target: 'http://vue-sample.virola.me/', // api主机
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ],

  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isServer, isDev, isClient }) {
      
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        config.externals = [
          nodeExternals({
            // `whitelist` 选项的默认值是
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
          })
        ]
      }
    }
  }
}
