# Technical Documentation

## Technology Stack

- **Core**: [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org)
- **Build Tool**: [RSBuild](https://rsbuild.dev)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **UI Components**: [Radix UI](https://www.radix-ui.com) primitives, [Lucide React](https://lucide.dev), [Sonner](https://sonner.emilkowal.ski)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Form Handling**: [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) validation
- **Internationalization**: [react-i18next](https://react.i18next.com)
- **Code Quality**: [Biome](https://biomejs.dev)

## Development Setup

### Prerequisites

- Node.js (LTS version)
- Bun (for package management)
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd orbit
```

2. Install dependencies:
```bash
bun install
```

### Development Workflow

1. Start development server:
```bash
bun run dev
```

2. Build for production:
```bash
bun run build
```

3. Preview production build:
```bash
bun run preview
```

### Code Quality Tools

1. Format code:
```bash
bun run format
```

2. Check code quality:
```bash
bun run check
```