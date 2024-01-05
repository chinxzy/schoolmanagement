// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/css/styles.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
      ],
    
      postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
          
          
        },
      },
      components: {
        dirs: [
          {
            path: "~/components/global",
            global: true,
          },
          "~/components",
          
        ],
      },
      modules: [
        // ...
        '@pinia/nuxt',
        'nuxt-headlessui'
        
      ],
      build: {
        transpile: ['chart.js']
      },
      plugins: [
        { src: '~/plugins/apexChart.ts', mode: 'client' }
      ]
     
})
