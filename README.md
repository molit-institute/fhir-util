## FHIR Util

[![Build Status](https://travis-ci.org/molitinstitute/fhir-util.svg?branch=master)](https://travis-ci.org/molitinstitute/fhir-util)
[![Coverage Status](https://coveralls.io/repos/github/molitinstitute/fhir-util/badge.svg?branch=master)](https://coveralls.io/github/molitinstitute/fhir-util?branch=master)
![npm](https://img.shields.io/npm/v/@molit/fhir-util.svg)
![NPM](https://img.shields.io/npm/l/@molit/fhir-util.svg)

This is a utility library to handle FHIR resources.

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

Tree shakging is also supported. 🌲

```js
import { getStringFromHumanName } from "@molit/fhir-util";

let name = getStringFromHumanName(patient.name);
```

### Documentation

See full documentation here: https://molitinstitute.github.io/fhir-util/