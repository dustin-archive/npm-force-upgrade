#!/usr/bin/env node
var path = require('path')
var join = path.join
var resolve = path.resolve
var read = require('fs').readFileSync
var exec = require('child_process').execSync
var args = process.argv.slice(2)
var argv = require('minimist')(args, {
  alias: {
    h: 'help',
    v: 'version',
    p: 'package'
  },
  default: {
    package: 'package.json'
  }
})

if (argv.help) {
  var path = join(__dirname, 'help.txt')
  var help = read(path, 'utf8')
  console.log(help)
  process.exit()
}

if (argv.version) {
  var path = join(__dirname, '../package.json')
  var pkg = JSON.parse(read(path))
  console.log('v' + pkg.version)
  process.exit()
}

var path = resolve(argv.package)
var pkg = JSON.parse(read(path))
var deps = pkg.dependencies ? Object.keys(pkg.dependencies) : []
var devDeps = pkg.devDependencies ? Object.keys(pkg.devDependencies) : []

if (deps.length) {
  exec('npm i ' + deps.join(' '), { maxBuffer: Infinity, stdio: 'inherit' })
}

if (devDeps.length) {
  exec('npm i -D ' + devDeps.join(' '), { maxBuffer: Infinity, stdio: 'inherit' })
}
