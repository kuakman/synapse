## Synapse

![.github/workflows/ci.yml](https://github.com/kuakman/synapse/workflows/.github/workflows/ci.yml/badge.svg)
![.github/workflows/deploy.yml](https://github.com/kuakman/synapse/workflows/.github/workflows/deploy.yml/badge.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/kuakman/synapse?color=00dd00)
[![Coverage Status](https://coveralls.io/repos/github/kuakman/synapse/badge.svg?branch=master)](https://coveralls.io/github/kuakman/synapse?branch=master)
![APM](https://img.shields.io/apm/l/synapse?color=%2500ff00&label=License&style=flat)
![GitHub stars](https://img.shields.io/github/stars/kuakman/synapse?color=00dd00&label=Github%20Stars)

```TODO: Project Description```

---
#### Available CLI Commands

* ```synapse init``` - Bootstrap and initializes a project.
* ```synapse clean``` - Clean all the output folders.
* ```synapse test``` - Runs project unit tests.
* ```synapse dev``` - Runs project in development mode.
* ```synapse prod``` - Runs project in production mode.

#### Options
* ```synapse init --config [realtime|remote|file|package]``` Scaffolds project initialization configuration consumption.
* ```synapse [env] --regen``` Cleans and regenerates outputs ONLY for the given environment.
* ```synapse prod --release``` Runs production profile and executes release script.
(This option is only available when prod profile is used and will not run serve target).

---
### Agnostic Pipeline Life-Cycle

<h4>For ```synapse [env]```</h4>

* ```pre-start``` (_Placeholder_)

<h4>[Clean - Only runs with option ```--clean```]</h4>
    * ```pre-clean``` (_Placeholder_)<br />
    * ```run-clean``` (Default Clean All)<br />
    * ```post-clean``` (_Placeholder_)<br />
<h4>[/End Clean]</h4>

<h4>[Configuration] Always Runs</h4>
    * ```pre-config``` (_Placeholder_)<br />
    * ```run-config``` (Default Configuration [realtime|remote|file|package]) - default is ```package```<br />
    * ```post-config``` (_Placeholder_)<br />
<h4>[/End Configuration]</h4>

<h4>[Environment]</h4>
    * ```pre-test``` (_Placeholder_)<br />
    * **See Default Test Pipeline**<br />
    * ```post-test``` (_Placeholder_)<br /><br />
    * ```pre-dev``` (_Placeholder_)<br />
    * **See Default Dev Pipeline**<br />
    * ```post-dev``` (_Placeholder_)<br /><br />
    * ```pre-prod``` (_Placeholder_)<br />
    * **See Production Pipeline**<br />
    * ```post-prod``` (_Placeholder_)<br />
<h4>[End Environment]</h4>

<h4>[Serve - Only runs when option ```--release``` is omitted]</h4>
    * ```pre-serve``` (_Placeholder_)<br />
    * ```run-serve```<br />
    * ```post-serve``` (_Placeholder_)<br />
<h4>[End Serve]</h4>

<h4>[Release - Only runs when option ```--release``` is specified]</h4>
    * ```pre-release``` (_Placeholder_)<br />
    * ```run-release``` (No Default Release Process, this step needs to be provided by the consumer)<br />
    * ```post-release``` (_Placeholder_)<br />
    * ```post-end``` (_Placeholder_)
<h4>[End Release]</h4>

---
### Profile Default Technology stack

* Loader/HotReloader - SystemJs + SystemHMR
* Bundler - Rollup
* Template Engine - Nunjucks
* DevServer - express 

##### Production
* Libraries (prod)
* SystemJs Config Read/Write
* Templates
* Serve

##### Dev
* Libraries (dev + prod)
* SystemJs Config Read/Write
* Templates
* Serve

##### Test
* Libraries (test + dev + prod)
* SystemJs Config Read/Write
* Templates
* Test Runner

---
```TODO Wiki```
