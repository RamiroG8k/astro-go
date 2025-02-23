// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from "@astrojs/sitemap";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    experimental: {
        svg: true
    },
    integrations: [mdx(), sitemap()],
    output: 'static',
    site: 'http://localhost:4321'
});
