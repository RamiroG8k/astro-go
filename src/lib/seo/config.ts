const config = {
	baseURL: 'https://dainty-cassata-e4d44e.netlify.app',
	description: 'PWA app config with astro as main framework',
	image: {
		url: '/og-image.webp',
		alt: 'PWA Starter template with Astro',
		width: 1200,
		height: 630
	},
	siteName: 'Astro - PWA Starter',
	twitter: {
		card: 'summary_large_image'
	},
	type: 'website'
} as const;

export { config };
