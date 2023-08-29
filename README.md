
# Vite Project Creator

A simple CLI tool that automates the creation of new projects using Vite with an option for the `lit` or `react` framework. It also supports integrating Storybook and allows you to choose between JavaScript or TypeScript.

## Features

- Interactive CLI prompts to customize your project.
- Choice between `lit` and `react` as the framework.
- Option to include Storybook.
- Use TypeScript or default to JavaScript.
- Automatically sets up a new Vite project with selected preferences.

## Prerequisites

- Node.js
- npm or Yarn (optional, for package management)

## Installation

You can install the CLI tool globally with:

```bash
npm install -g your-package-name
```

## Usage

Run the CLI tool with:

```bash
npx create-vite-project
```

Follow the prompts to configure your project.

## Prompts Explained

1. **Project Name**: This will be the directory name and will also be used within `package.json`.
2. **Author Email**: Used for setting the author field in `package.json`.
3. **Framework**: Choose between `lit` and `react`.
4. **Storybook**: Decide if you want to integrate Storybook for component development.
5. **TypeScript**: Use TypeScript or JavaScript for development.

## Contributing

If you find a bug or have an idea for an improvement, feel free to open an issue or a pull request.

