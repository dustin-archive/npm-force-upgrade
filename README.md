# npm-force-upgrade
> Force upgrade each package in package.json to the latest version

```sh
$ npm-force-upgrade
```

This package provides a script that serves as a temporary fix for `npm update` not writing package versions to `package.json`. Install it using npm:

```sh
$ npm i -g npm-force-upgrade
```

## Usage
```
usage:
  $ npm-force-upgrade [options]

options:
  -h, --help     show this help message
  -v, --version  show package version
  -p, --package  package.json file to upgrade
```
