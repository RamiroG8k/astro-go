# Astro Go Template

> 🧑‍🚀 **Astro + Go Template** - A modern web development template combining Astro with Go tooling

## 🚀 Getting Started

1. Install dependencies:
   ```sh
   bun install
   ```

2. Prepare the project (sets up git hooks):
   ```sh
   bun run prepare
   ```

3. Start the development server:
   ```sh
   bun run start:local
   ```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── astro.svg
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── package.json
└── README.md
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

### Setup Commands
| Command               | Action                               |
| :-------------------- | :----------------------------------- |
| `bun install`         | Installs dependencies                |
| `bun run prepare`     | Setup husky git hooks                |

### Development Commands
| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun run start:local`     | Starts local dev server with host binding        |
| `bun run start:prod`      | Build and preview production site with host      |
| `bun run health:check`    | Run Astro type checking and copy system info     |
| `bun run test:file`       | Run tests for specific files                     |
| `bun run test:coverage`   | Run tests with coverage report                   |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🛠️ Development Tools

This template includes several development tools to enhance your workflow:

- **TypeScript**: For type safety and better developer experience
- **Husky**: Git hooks for automated checks
- **Astro Check**: Type checking for Astro projects

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).