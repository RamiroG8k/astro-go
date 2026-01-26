// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Roboto",
        cssVariable: "--font-roboto",
      },
      {
        provider: fontProviders.fontshare(),
        name: "Clash Display",
        cssVariable: "--font-clash-display",
      },
      {
        provider: fontProviders.local(),
        name: "Custom",
        cssVariable: "--font-custom",
        options: {
          variants: [
            {
              weight: "100 900",
              style: "normal",
              src: ["./src/assets/fonts/recia/Recia-Variable.ttf"],
            },
            {
              weight: "100 900",
              style: "italic",
              src: ["./src/assets/fonts/recia/Recia-VariableItalic.ttf"],
            },
          ],
        },
      },
    ],
  },
});
