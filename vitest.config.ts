import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('v-'),
        },
      },
    }),
    AutoImport({
      dirs: ['./.nuxt'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
      '#head': path.resolve(__dirname, './node_modules/nuxt/dist/head/runtime'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app'),
    },
  },
})
