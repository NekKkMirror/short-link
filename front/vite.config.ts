import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import vuetify from 'vite-plugin-vuetify'
import inspect from 'vite-plugin-inspect'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import Components from 'unplugin-vue-components/vite'
import envCompatible from 'vite-plugin-env-compatible'

const { APP_NAME, APP_PORT, NODE_ENV } = process.env

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    ViteEjsPlugin(
      {
        title: APP_NAME,
      },
      {
        ejs: () => ({
          beautify: mode === 'development',
          minify: mode === 'production',
          entry: path.resolve(__dirname, '/index.html'),
        }),
      },
    ),
    inspect(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
    }),
    envCompatible(),
    mode === 'development' && vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@router': path.resolve(__dirname, './src/router'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  optimizeDeps: {
    include: ['axios', 'pinia'],
  },
  server: {
    port: APP_PORT ? parseInt(APP_PORT) : 3000,
    host: '0.0.0.0',
    open: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  },
}))
