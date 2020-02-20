// IMPORTANT: Necessary to can use process.env
require('dotenv').config()

console.log('process---------', process.env.BASE_URL)

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,400italic&display=swap' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/css/flatly.min.css' },
    { src: '~/assets/css/navbar.css' },
    { src: '~/assets/css/panel.css' },
    { src: '~/assets/css/main.scss', lang: 'scss' }

  ],
  bootstrapVue: {
    componentPlugins: ['IconsPlugin']
  },
  // serverMiddleware: [
  //   // Will register file from project api directory to handle /api/* requires
  //   { path: '/api', handler: '~/api/index.js' }
  // ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/Vuelidate',
    '~plugins/date.filter'
    // '~plugins/axios'
    // { src: '~plugins/onesait', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'https://easy-answer-nuxt-2.herokuapp.com/api'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // vendor: ['tiptap'],
    // transpile: ['tiptap'],
    extend (config, ctx) {}

    // ESLint on Save
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
