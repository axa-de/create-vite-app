#! /usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { createProjectSkeleton, updatePackageJson, additionalSetup, getUserInput } from './setup.js';


async function main () {
  const userInput = await getUserInput()
  const projectPath = await createProjectSkeleton(userInput)
  await updatePackageJson(projectPath, userInput)
  await additionalSetup(projectPath, userInput)

  console.log(`Project ${userInput.projectName} created successfully!`)
}

main()
