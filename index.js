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
