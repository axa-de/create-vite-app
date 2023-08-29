
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

Given that this package is hosted on GitHub Package Registry under a scope, you'll need to set up npm to use GitHub's registry for scoped packages:

1. **Option A**: Use an `.npmrc` file:

    - Create an `.npmrc` file in your project's root (or in your home directory for global settings).
    - Add the following lines to the `.npmrc`:

      ```
      @axa-de:registry=https://npm.pkg.github.com
      //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
      ```

   Replace `YOUR_PERSONAL_ACCESS_TOKEN` with your GitHub personal access token. Ensure it has the `read:packages` scope.

    - Save the file.

2. **Option B**: Authenticate using the command line:

   ```bash
   npm login --registry=https://npm.pkg.github.com --scope=@axa-de
   ```

   Provide your GitHub username, personal access token, and email address.

3. Install the CLI tool globally:

   ```bash
   npm install -g @axa-de/create-vite-app
   ```

## Usage

Run the CLI tool with:

```bash
npx @axa-de/create-vite-app
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

---

Make sure to be careful with the `.npmrc` file, especially if it contains your personal access token. If you're adding it to a project, **do not commit this file** to public repositories, as others will have access to your token.
