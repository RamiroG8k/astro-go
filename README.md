# Astro Custom Template

A modern, production-ready Astro template with built-in TypeScript support, Biome for code quality, and essential integrations. Built with [Bun](https://bun.sh) for lightning-fast performance.

> **Package Manager Support**: This template is optimized for [Bun](https://bun.sh) but fully compatible with npm, yarn, or pnpm. Simply replace `bun` with your preferred package manager in the commands below.

## ✨ Features

- 🚀 **Modern Stack**: Built with Astro 5.x and TypeScript
- 🎨 **Code Quality**: Configured with Biome for linting and formatting
- 📝 **MDX Support**: Write content in MDX with full component support
- 🗺️ **SEO Ready**: Includes sitemap generation
- 🔍 **Type Safety**: Strict TypeScript configuration
- 🛠️ **Developer Experience**: Optimized for VS Code with Biome integration
- ⚡ **Fast Package Management**: Optimized for Bun with npm/yarn/pnpm compatibility

## 🚀 Getting Started

First, make sure you have [Bun](https://bun.sh) installed on your system or similar, choose your preferred package manager:

### Using Bun (Recommended)
```sh
# Install Bun if you haven't already
curl -fsSL https://bun.sh/install | bash

# Clone this repository
git clone https://github.com/yourusername/astro-template.git

# Install dependencies with Bun
bun install

# Start the development server
bun run start:local
```

## 🛠️ Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── biome.jsonc
├── tsconfig.json
└── package.json
```

## ⚙️ Configuration

### Astro Configuration

The project is configured with essential integrations and optimizations in `astro.config.mjs`:

- **MDX Support**: Write content using MDX with full component support
- **Sitemap Generation**: Automatic sitemap generation for SEO
- **Static Output**: Pre-rendered static site generation
- **SVG Support**: Built-in SVG optimization and support
- **TypeScript Integration**: Full TypeScript support with strict mode

### Editor Configuration

This project uses Biome for code formatting, linting, and type checking. To get the best development experience, install the following editor extensions:

- [Biome VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - Provides first-class support for Biome in VS Code with features like:
  - Format on save
  - Code refactoring
  - Inline suggestions and quick fixes
  - Real-time diagnostics

### TypeScript Configuration

The project uses strict TypeScript configuration extending from Astro's recommended settings. The configuration is set up in `tsconfig.json` to provide:

- Strict type checking
- TypeScript support for Astro files
- Proper module resolution

### Code Quality Tools

The project is configured with Biome for code quality and formatting. The configuration in `biome.jsonc` includes:

- Strict linting rules
- Code formatting preferences
- Import organization
- TypeScript-specific rules
- Performance optimizations

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun start:local`         | Starts local dev server at `localhost:4321`      |
| `bun build:production`    | Build your production site to `./dist/`          |
| `bun preview`             | Preview your build locally, before deploying     |
| `bun format:all`          | Format all files using Biome                     |
| `bun lint:all`            | Lint all files using Biome                       |
| `bun lint:fix`            | Fix linting issues automatically                 |
| `bun check:all`           | Run Biome check on all files                     |
| `bun health:check`        | Run Astro health check and info                  |
| `bun astro ...`           | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help`     | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [astro's documentation](https://docs.astro.build) or jump into their [Discord server](https://astro.build/chat).
