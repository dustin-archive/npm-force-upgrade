#!/usr/bin/env node
var readFileSync = require('fs').readFileSync
var execSync = require('child_process').execSync
var resolve = require('path').resolve
var path = resolve('package.json')
var pkg = JSON.parse(readFileSync(path))
var deps = expand(pkg.dependencies)
var devDeps = expand(pkg.devDependencies)
var opts = { maxBuffer: Infinity, stdio: 'inherit' }

if (deps) {
  execSync('npm i ' + deps, opts)
}

if (devDeps) {
  execSync('npm i -D ' + devDeps, opts)
}

function expand(deps) {
  var result = ''
  for (var name in deps) {
    if (result) result += ' '
    result += name + '@latest'
  }
  return result
}
