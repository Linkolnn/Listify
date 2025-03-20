import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo'],
  alias: {
    '@color' : resolve(__dirname, 'assets/color.sass'),
    '@mixin' : resolve(__dirname, 'assets/mixin.sass'),
    '@global' : resolve(__dirname, 'assets/global.sass'),
    '@fonts' : resolve(__dirname, 'assets/fonts.sass'),
    '@composables' : resolve(__dirname, '/composables'),
    '@services' : resolve(__dirname, '/services'),
    '@utils' : resolve(__dirname, '/utils'),
  },
  app: {
    head: {
      title: 'Listify',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/faviconDark.ico',
          media: '(prefers-color-scheme: light)',
          sizes: 'any'
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/faviconLight.ico',
          media: '(prefers-color-scheme: dark)',
          sizes: 'any'
        }
      ]
    }
  },
  svgo: {
    autoImportPath: "./assets/icons/",
    componentPrefix: "Icon",
    svgoConfig: {
      plugins: [
        { 
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            }
          }
        }
      ]
    }
  },
})