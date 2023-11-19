// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  mode: 'spa',
  ssr: false,
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/css/main.css',
    '@/assets/css/main.scss',
  ],
  build: {
    transpile: ['vuetify'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    provider: {
        type: 'local',
        endpoints: {
          signOut: {path: 'logout', method: 'delete'},
          signUp: {path: 'signup', method: 'post'}
        }
    },
    baseURL: 'http://127.0.0.1:3000/'
  },
})
