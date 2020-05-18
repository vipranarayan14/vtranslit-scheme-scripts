# vtranslit-scheme-scripts

Scripts to validate and export vtranslit schemes written in YAML as a plugin for vtranslit.

## Usage

Install:

```sh
$ npm i vtranslit-scheme
```

In 'package.json':

```json
{
  "...": "...",

  "scripts": {
    "build": "vtranslit-scheme build",
    "test": "vtranslit-scheme validate"
  }
}
```
