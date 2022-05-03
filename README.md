## FHIR Util

![build](https://github.com/molit-institute/fhir-util/workflows/Build/badge.svg)
![publish](https://github.com/molit-institute/fhir-util/workflows/Publish/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/molitinstitute/fhir-util/badge.svg?branch=master)](https://coveralls.io/github/molitinstitute/fhir-util?branch=master)
![npm version](https://img.shields.io/npm/v/@molit/fhir-util.svg)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@molit/fhir-util)
![npm license](https://img.shields.io/npm/l/@molit/fhir-util.svg)

This is a small utility library to handle FHIR resources.

### Installation

Install like a normal npm dependency.

```bash
npm i @molit/fhir-util
```

### Usage

Import the library and use the functions of the library.

```js
import * as fhirUtil from "@molit/fhir-util";

let name = fhirUtil.getStringFromHumanName(patient.name);
```

Tree shaking is also supported. 🌲

```js
import { getStringFromHumanName } from "@molit/fhir-util";

let name = getStringFromHumanName(patient.name);
```

### Browser Example

An example for browser usage can be seen here: https://jsfiddle.net/molitinstitut/k5edr4z3/latest/

### Documentation

See full documentation here: https://docs.molit.eu/fhir-util/
