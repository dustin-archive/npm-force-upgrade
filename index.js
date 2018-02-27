
const { exec } = require('child_process')
const { readFile } = require('fs')
const { resolve } = require('path')

const x = y => Object.keys(y).map(z => `${z}@latest`).join(' ')

readFile(resolve('package.json'), (err, data) => {
  if (err) throw err

  const { dependencies, devDependencies } = JSON.parse(data)

  exec(`npm i ${x(dependencies)}; npm i -D ${x(devDependencies)}`, { maxBuffer: Infinity }).stdout.pipe(process.stdout)
})
