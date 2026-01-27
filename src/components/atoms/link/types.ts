export interface LinkProps {
	/**
	 * The visual style of the link.
	 * 'primary' uses the main accent color. 'subtle' is less prominent.
	 * @default 'primary'
	 */
	variant?: "primary" | "subtle";
	/**
	 * A type-safe path for an INTERNAL page route.
	 */
	to?: string;
	/**
	 * A standard URL for EXTERNAL links (e.g., https://google.com).
	 */
	href?: string;
}
