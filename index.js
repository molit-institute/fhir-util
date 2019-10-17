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
 * @param {Boolean} lastNameFirst - if true will put the Family-Name first
 * @return {String} the human name
 */
export function getStringFromHumanName(humanName, lastNameFirst) {
  if (!humanName || !humanName[0]) {
    return "";
  }

  let givenFamilyName = "";
  humanName.forEach((name, index, array) => {
    if (lastNameFirst) {
      if (name.family) {
        givenFamilyName += name.family + " ";
      }
      if (name.given) {
        givenFamilyName += name.given.join(" ");
      }
    } else {
      if (name.given) {
        givenFamilyName += name.given.join(" ");
      }
      if (name.family) {
        givenFamilyName += " " + name.family;
      }
    }

    if (index < array.length - 1) {
      givenFamilyName += ", ";
    }
  });

  if (givenFamilyName && givenFamilyName !== "") {
    return givenFamilyName;
  }

  let textName = humanName
    .map(name => name.text)
    .filter(text => text && text !== "" && text !== " ")
    .join(", ");

  if (textName && textName !== "") {
    return textName;
  } else {
    return "";
  }
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
      return false;
    }
    let code = component.code.coding.find(
      code =>
        code.system === "http://loinc.org" ||
        code.system ===
          "http://hl7.org/fhir/uv/genomics-reporting/CodeSystem/LOINC-TBD"
    );
    if (!code) {
      return false;
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
  } else if (component.valueRange) {
    let value = "";

    if (component.valueRange.low && component.valueRange.low.value) {
      value += component.valueRange.low.value;
    } else {
      value += "unknown";
    }

    value += "-";

    if (component.valueRange.high && component.valueRange.high.value) {
      value += component.valueRange.high.value;
    } else {
      value += "unknown";
    }

    return value;
  } else {
    return undefined;
  }
}
