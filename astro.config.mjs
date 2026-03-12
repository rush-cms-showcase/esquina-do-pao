// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import node from '@astrojs/node';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  env: {
    schema: {
      RUSH_API_TOKEN: envField.string({ context: 'server', access: 'secret' }),
      RUSH_API_URL: envField.string({ context: 'server', access: 'public', url: true }),
      RUSH_URL: envField.string({ context: 'client', access: 'public', url: true }),
      RUSH_SLUG: envField.string({ context: 'server', access: 'public' }),
      RUSH_ROUTE_ROOT_ID: envField.number({ context: 'server', access: 'public' }),
      RUSH_ROUTE_BLOG_ID: envField.number({ context: 'server', access: 'public' }),
      RUSH_MENU_ID: envField.number({ context: 'server', access: 'public' }),
      RUSH_NAV_MAIN_ID: envField.string({ context: 'server', access: 'public' }),
      RUSH_NAV_FOOTER_ID: envField.string({ context: 'server', access: 'public' }),
      RUSH_FORM_CONTACT_ID: envField.string({ context: 'server', access: 'public' }),
      
      PUBLIC_INSTAGRAM: envField.string({ context: 'client', access: 'public', url: true, optional: true }),
      PUBLIC_FACEBOOK: envField.string({ context: 'client', access: 'public', url: true, optional: true }),
      PUBLIC_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_WHATSAPP: envField.string({ context: 'client', access: 'public', optional: true }),
      
      GA_TAG: envField.string({ context: 'client', access: 'public', optional: true }),

      WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'astro',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});