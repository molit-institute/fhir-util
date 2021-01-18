## FHIR Util

![build](https://github.com/molit-institute/fhir-util/workflows/Test%20and%20publish/badge.svg)
![npm](https://img.shields.io/npm/v/@molit/fhir-util.svg)
![NPM](https://img.shields.io/npm/l/@molit/fhir-util.svg)

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

### Documentation

See full documentation here: https://docs.molit.eu/fhir-util/
