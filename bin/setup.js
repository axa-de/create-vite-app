import fs from 'fs-extra'
import path, { dirname } from 'path'
import { exec } from 'child_process'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function getUserInput () {
  return await inquirer.prompt([
    {
      type: 'input', name: 'projectName', message: 'Enter project name:', validate: function (value) {
        // Check for leading or trailing spaces
        if (value.trim() !== value) {
          return 'The name cannot have leading or trailing spaces.'
        }

        // Check for invalid characters and naming constraints
        if (!/^[a-z0-9][-a-z0-9_]*$/.test(value)) {
          return 'Invalid name. Only lowercase alphanumeric characters, hyphens, and underscores are allowed. It cannot start with a period or underscore.'
        }
        return true
      }
    },
    {
      type: 'input', name: 'authorEmail', message: 'Enter author email:', validate: function (value) {
        // Basic validation for an email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(value)) {
          return true
        }
        return 'Please enter a valid email format.'
      }
    },
    { type: 'list', name: 'framework', message: 'Choose a framework:', choices: ['lit', 'react'] },
    { type: 'confirm', name: 'storybook', message: 'Install Storybook?', default: true },
    { type: 'confirm', name: 'useTypeScript', message: 'Use TypeScript?', default: true }
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

async function updatePackageJson (projectPath, choices) {
  const packageJsonPath = path.join(projectPath, 'package.json')
  let packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8')

  packageJsonContent = packageJsonContent.replace('{{PROJECT_NAME}}', choices.projectName)
    .replace('{{AUTHOR_EMAIL}}', choices.authorEmail)

  await fs.writeFile(packageJsonPath, packageJsonContent, 'utf-8')
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
    await execPromise('npx sb@latest init', projectPath)
  }
  updatePackageJsonAfterSBInit(projectPath, choices)
}

async function updatePackageJsonAfterSBInit (projectPath, choices) {
  // Construct the path to package.json
  const packageJsonPath = path.join(projectPath, 'package.json')

  // Read the file
  let rawData = await fs.readFile(packageJsonPath, 'utf-8')

  // Parse it as JSON
  const packageData = JSON.parse(rawData);

  // Modify the desired script values
  if (packageData.scripts) {
    packageData.scripts.storybook = "sb dev";
    packageData.scripts['build-storybook'] = "sb build";
  }

  // Convert the object back to a string
  const updatedData = JSON.stringify(packageData, null, 2); // 2 spaces for indentation

  await fs.writeFile(packageJsonPath, updatedData, 'utf-8')
}

export {
  createProjectSkeleton,
  updatePackageJson,
  execPromise,
  additionalSetup,
  getUserInput
}

