// @ts-check
/*
* For a detailed explanation regarding each configuration property, visit:
* https://astro.build/config
*/
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import { config } from './src/lib/seo/config';

// NOTE: The below config options cover all available top-level settings and build options in Astro.
// You can uncomment and modify any of these to suit your project needs.
export default defineConfig({
    experimental: {
        // Enable SVG support
        svg: true,
    },
    // The full URL of your deployed site. Astro uses this for sitemaps and canonical URLs.
    site: config.baseURL,

    // The base path to deploy to. All static asset URLs will be prefixed with this value.
    // base: '/',

    // Controls how trailing slashes are handled on routes.
    // Options: 'always' | 'never' | 'ignore'
    // trailingSlash: 'ignore',

    // Define URL redirects.
    // Example:
    // redirects: {
    //   '/old': '/new',
    //   '/blog/[...slug]': '/articles/[...slug]',
    //   '/about': 'https://example.com/about',
    //   '/news': {
    //     status: 302,
    //     destination: 'https://example.com/news'
    //   }
    // },

    // Specifies the output target for builds.
    // Options: 'static' (pre-rendered) or 'server' (SSR)
    output: 'static',

    // Set your build adapter (for SSR deployments). For example:
    // import netlify from '@astrojs/netlify';
    // adapter: netlify(),

    // Array of integrations to extend Astro (e.g. React, MDX, etc.).
    integrations: [
        mdx(), // Add support for MDX
        sitemap(), // Generate a sitemap
        compress(),
        AstroPWA({
          base: './',
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true,
          },
          injectRegister: 'auto',
          workbox: {
            globDirectory: 'dist',
            globPatterns: [
  				    '**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ttf,ico}',
  				  ],
            navigateFallback: '/404'
          },
          includeAssets: ['favicon.ico', 'robots.txt'],
          manifest: {
            name: 'Astro PWA Starter',
           	short_name: 'Astro',
           	description: 'Astro PWA Starter is an opinionated Astro starter for building robust static websites.',
           	icons: [
          		{
           			src: '/favicon/web-app-manifest-192x192.png',
           			sizes: '192x192',
           			type: 'image/png'
          		},
          		{
           			src: '/favicon/web-app-manifest-512x512.png',
           			sizes: '512x512',
           			type: 'image/png'
          		},
          		{
           			src: '/favicon/web-app-manifest-512x512.png',
           			sizes: '512x512',
           			type: 'image/png',
           			purpose: 'any maskable'
          		}
           	]
          }
        }),
        // Add other integrations here
    ],

    // The project root directory (if different from the current working directory).
    // root: '.',

    // Directory where Astro reads your site content.
    // srcDir: './src',

    // Directory for static assets (served as-is during dev and copied at build).
    // publicDir: './public',

    // Directory where Astro writes your final build output.
    // outDir: './dist',

    // Directory to cache build artifacts.
    // cacheDir: './node_modules/.astro',

    // Option to minify (compress) HTML output.
    // compressHTML: true,

    // Strategy for scoping component styles.
    // Options: 'where' | 'class' | 'attribute'
    // scopedStyleStrategy: 'attribute',

    // Security options (only applicable for SSR or non-prerendered pages).
    // security: {
    //   // If true, Astro will check that the request's "origin" header matches the URL.
    //   checkOrigin: true
    // },

    // Experimental session support configuration (requires experimental flag to be enabled).
    // session: {
    //   driver: 'redis', // or any supported Unstorage driver name or 'custom'
    //   options: {
    //     url: process.env.REDIS_URL,
    //   },
    //   // Optional cookie options can be provided here.
    //   // cookie: 'session-id' or { name: 'session-id', path: '/', ... }
    // },

    // Pass additional configuration options to Vite.
    // vite: {
    //   plugins: [],
    //   ssr: {
    //     external: ['some-package']
    //   }
    // },

    /* -------------------------------------------------------------------------
     * Build Options
     * ------------------------------------------------------------------------- */
    build: {
        // Controls the output file format for each page.
        // Options: 'file' (each page becomes an HTML file),
        // 'directory' (each page gets its own folder with index.html),
        // or 'preserve' (keeps the source folder structure as-is)
        // format: 'directory',

        // Directory (relative to outDir) for client-side JS/CSS when using SSR.
        // client: './client',

        // Directory (relative to outDir) for server-side JS when building SSR.
        // server: './server',

        // Specifies the subdirectory for Astro-generated assets (like bundled CSS/JS).
        // assets: '_astro',

        // Optional: Specifies a prefix (or mapping) for asset URLs if serving them from a CDN.
        // assetsPrefix: 'https://cdn.example.com'
        // or, for different file types:
        // assetsPrefix: {
        //   js: 'https://js.cdn.example.com',
        //   css: 'https://css.cdn.example.com',
        //   fallback: 'https://cdn.example.com'
        // },

        // The filename for the SSR server entry (should end with .mjs).
        // serverEntry: 'entry.mjs',

        // Whether to output HTML-based redirects (applies in static mode).
        // redirects: true,

        // Controls whether project styles are inlined or sent as external stylesheets.
        // Options: 'always' | 'auto' | 'never'
        // inlineStylesheets: 'auto',

        // Number of pages to build in parallel (default is 1).
        // concurrency: 1,
    },

    /* -------------------------------------------------------------------------
     * Server Options (for dev and preview)
     * ------------------------------------------------------------------------- */
    // server: {
    //   // Network IP to bind the dev server to.
    //   // Options: false (only localhost), true (all addresses), or a specific IP string.
    //   // host: false,
    //
    //   // Port for the dev server.
    //   // port: 4321,
    //
    //   // Automatically open the browser when the server starts.
    //   // Provide a URL or a pathname.
    //   // open: false,
    //
    //   // Custom HTTP headers for the dev server.
    //   // headers: {},
    // },

    /* -------------------------------------------------------------------------
     * Dev Toolbar Options
     * ------------------------------------------------------------------------- */
    // devToolbar: {
    //   // Enable or disable the Astro Dev Toolbar.
    //   // enabled: true,
    // },

    /* -------------------------------------------------------------------------
     * Prefetch Options
     * ------------------------------------------------------------------------- */
    // prefetch: {
    //   // Enable prefetching for all links automatically (when using ClientRouter).
    //   // prefetchAll: false,
    //
    //   // Default prefetch strategy for links without an explicit value.
    //   // Options: 'tap' | 'hover' | 'viewport' | 'load'
    //   // defaultStrategy: 'hover',
    // },

    /* -------------------------------------------------------------------------
     * Image Options
     * ------------------------------------------------------------------------- */
    // image: {
    //   // Configure the image optimization endpoint.
    //   // endpoint: { route: '/_image', entrypoint: undefined },
    //
    //   // Specify the image service and its config (e.g., using Sharp).
    //   // service: { entrypoint: 'astro/assets/services/sharp', config: {} },
    //
    //   // Array of permitted domains for remote image optimization.
    //   // domains: [],
    //
    //   // Array of URL patterns for allowed remote images.
    //   // remotePatterns: [],
    //
    //   // Default responsive image layout. Options: 'responsive', 'fixed', 'full-width'
    //   // experimentalLayout: undefined,
    //
    //   // Default object-fit value for images.
    //   // experimentalObjectFit: 'cover',
    //
    //   // Default object-position value for images.
    //   // experimentalObjectPosition: 'center',
    //
    //   // Breakpoints for responsive images.
    //   // experimentalBreakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
    // },

    /* -------------------------------------------------------------------------
     * Markdown Options
     * ------------------------------------------------------------------------- */
    // markdown: {
    //   // Configuration for Shiki syntax highlighting.
    //   // shikiConfig: { theme: 'dracula' },
    //
    //   // Which syntax highlighter to use: 'shiki', 'prism', or false.
    //   // syntaxHighlight: 'shiki',
    //
    //   // Array of Remark plugins.
    //   // remarkPlugins: [],
    //
    //   // Array of Rehype plugins.
    //   // rehypePlugins: [],
    //
    //   // Enable GitHub-flavored Markdown.
    //   // gfm: true,
    //
    //   // Enable SmartyPants formatting.
    //   // smartypants: true,
    //
    //   // Options for remark-rehype conversion.
    //   // remarkRehype: {},
    // },

    /* -------------------------------------------------------------------------
     * i18n Options
     * ------------------------------------------------------------------------- */
    // i18n: {
    //   // List of supported locales.
    //   // locales: ['en', 'fr', 'pt-br'],
    //
    //   // The default locale.
    //   // defaultLocale: 'en',
    //
    //   // Fallback configuration for missing translations.
    //   // fallback: { fr: 'en' },
    //
    //   // Routing options for i18n.
    //   // routing: {
    //   //   // If false, only non-default languages get a URL prefix.
    //   //   prefixDefaultLocale: false,
    //   //   // Automatically redirect the root URL to the default locale.
    //   //   redirectToDefaultLocale: true,
    //   //   // How to handle fallback pages: 'redirect' or 'rewrite'
    //   //   fallbackType: 'redirect',
    //   //   // If you want to handle routing manually, set this to a string.
    //   //   manual: undefined,
    //   // },
    // },

    /* -------------------------------------------------------------------------
     * Environment Variables Options
     * ------------------------------------------------------------------------- */
    // env: {
    //   // Define a schema for type-safe environment variables.
    //   // schema: {},
    //
    //   // Whether to validate secret variables on start.
    //   // validateSecrets: false,
    // }
});
