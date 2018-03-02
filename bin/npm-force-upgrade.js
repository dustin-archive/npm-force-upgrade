#!/usr/bin/env node
var readFileSync = require('fs').readFileSync
var execSync = require('child_process').execSync
var resolve = require('path').resolve
var pkg = JSON.parse(readFileSync(resolve('package.json')))
var deps = expand(pkg.dependencies)
var devDeps = expand(pkg.devDependencies)

if (deps) {
  execSync('npm i ' + deps, { maxBuffer: Infinity, stdio: 'inherit' })
}

if (devDeps) {
  execSync('npm i -D ' + devDeps, { maxBuffer: Infinity, stdio: 'inherit' })
}

function expand(deps) {
  var result = ''
  for (var name in deps) {
    if (result) result += ' '
    result += name + '@latest'
  }
  return result
}
