const { execSync } = require('child_process')
const fs = require('fs') // Require the built-in 'fs' module

// Read the contents of package.json file
fs.readFile('package.json', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const packageData = JSON.parse(data)

  const deps = Object.keys(packageData.dependencies || {})
  const devDeps = Object.keys(packageData.devDependencies || {})

  const depCmd = `yarn add ${deps.join(' ')}`
  const devDepCmd = `yarn add -D ${devDeps.join(' ')}`

  execSync(depCmd)
  execSync(devDepCmd)
})
