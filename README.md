# FHIR Util

This is a utility library to handle FHIR resources.

## Installation

Install like a normal npm dependency.

```bash
npm i @molit/fhir-util
```

## Usage

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
