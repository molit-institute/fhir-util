/**
 * Extracts the name as a String from a FHIR HumanName. Returns an empty String ("") if any of the parameters is null or undefined.
 *
 * @example
 * <caption>Basic usage</caption>
 * import fhirUtil from "molit-fhir-util";
 *
 * fhirUtil.getStringFromHumanName(patient.name);
 *
 * @param {Object[]} humanName - the HumanNames Array
 * @return {String} the human name
 */
export function getStringFromHumanName(humanName) {
  if (!humanName || !humanName[0]) {
    return "";
  }

  let textName = humanName
    .map(name => name.text)
    .filter(text => text && text !== "" && text !== " ")
    .join(", ");

  if (textName && textName !== "") {
    return textName;
  }

  let givenFamilyName = "";

  humanName.forEach((name, index, array) => {
    if (name.given) {
      givenFamilyName += name.given.join(" ");
    }
    if (name.family) {
      givenFamilyName += " " + name.family;
    }
    if (index < array.length - 1) {
      givenFamilyName += ", ";
    }
  });

  return givenFamilyName;
}

/**
 * Returns the first identifier with the given system. If you just want to get the identifier value, use {@link getIdentifierValueBySystem}. Returns null if any of the parameters is null or undefined.
 *
 * @param {Object[]} identifier - the identifier Array
 * @param {String} system - the system String
 * @return {Object} the identifier
 */
export function getIdentifierBySystem(identifier, system) {
  if (!identifier || !system) {
    return null;
  }
  return identifier.find(identifier => identifier.system === system);
}

/**
 * Returns the value as String of an identifier String inthe format system|value. Returns null if any of the parameters is null or undefined.
 *
 * @param {String} identifierString
 */
export function getIdentifierValueByIdentifierString(identifierString) {
  if (!identifierString) {
    return null;
  }
  return identifierString.substring(identifierString.indexOf("|") + 1);
}

/**
 * Returns the first identifier <b>value</b> it finds with the given system. If no identifier is found, null is returned. Returns "" if any of the parameters is null or undefined.
 *
 * @param {Array} identifiers
 * @param {String} system
 * @return {String|null} the identifier value
 */
export function getIdentifierValueBySystem(identifiers, system) {
  let identifier = getIdentifierBySystem(identifiers, system);
  if (!identifier) {
    return null;
  }
  return identifier.value;
}

/**
 * Returns the first identifier it finds with the given system. If no identifier is found, null is returned.
 *
 * @param {Object} resource - the FHIR resource
 * @param {String} system - the system of the identifier
 * @return {Object|null} the identifier
 */
export function getIdentifierByResourceAndSystem(resource, system) {
  if (!resource || !system) {
    return null;
  }
  return getIdentifierBySystem(resource.identifier, system);
}

/**
 * Returns the value that is annotated with the given loinc code from the given Observation components
 * complying to the obs-variant profile (http://hl7.org/fhir/uv/genomics-reporting/StructureDefinition/obs-variant).
 *
 * @param {Array} components - the components from the obs-variant
 * @param {String} loincCode - the loinc code
 * @returns - the value or undefined, if the loinc code could not be found within the components
 */
export function getValueByLoincCode(components, loincCode) {
  if (!components || !components.length) {
    return undefined;
  }

  let component = components.find(component => {
    if (
      !component ||
      !component.code ||
      !component.code.coding ||
      !component.code.coding.length
    ) {
      return undefined;
    }
    let code = component.code.coding.find(
      code =>
        code.system === "http://loinc.org" ||
        code.system ===
          "http://hl7.org/fhir/uv/genomics-reporting/CodeSystem/LOINC-TBD"
    );
    if (!code) {
      return undefined;
    }
    return code.code === loincCode;
  });

  if (!component) {
    return undefined;
  }

  if (
    component.valueCodeableConcept &&
    component.valueCodeableConcept.coding &&
    component.valueCodeableConcept.coding.length
  ) {
    return component.valueCodeableConcept.coding[0].display;
  } else if (component.valueQuantity) {
    return component.valueQuantity.value;
  }
}
