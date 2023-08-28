import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import inquirer from 'inquirer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function getUserInput () {
  return await inquirer.prompt([
    { type: 'input', name: 'projectName', message: 'Enter project name:' },
    { type: 'input', name: 'authorEmail', message: 'Enter author email:' },
    { type: 'list', name: 'framework', message: 'Choose a framework:', choices: ['lit', 'react'] },
    { type: 'confirm', name: 'storybook', message: 'Install Storybook?', default: false },
    { type: 'confirm', name: 'useSCSS', message: 'Use SCSS?', default: true },
    { type: 'confirm', name: 'useTypeScript', message: 'Use TypeScript?', default: false }
  ])
}

async function createProjectSkeleton (choices) {
  const language = choices.useTypescript ? 'ts' : 'js'
  const cssType = choices.useSCSS ? 'scss' : 'css'
  const templatePath = path.join(__dirname, '../templates', `vite-project-${choices.framework}-${language}`)
  const projectPath = path.join(process.cwd(), choices.projectName)

  await fs.copy(templatePath, projectPath)
  return projectPath
}

async function updatePackageJson(projectPath, choices) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  let packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');

  packageJsonContent = packageJsonContent.replace('{{PROJECT_NAME}}', choices.projectName)
    .replace('{{AUTHOR_EMAIL}}', choices.authorEmail);

  await fs.writeFile(packageJsonPath, packageJsonContent, 'utf-8');
}

function execPromise (command, dir) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

async function additionalSetup (projectPath, choices) {
  if (choices.storybook) {
    await execPromise('npx sb init', projectPath)
  }
  // Add any other additional setup tasks here, e.g., npm install
}

export {
  createProjectSkeleton,
  updatePackageJson,
  execPromise,
  additionalSetup,
  getUserInput
};

