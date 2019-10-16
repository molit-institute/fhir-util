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
 * @param {Boolean} switchNameOrder
 * @return {String} the human name
 */
export function getStringFromHumanName(humanName, switchNameOrder) {
  if (!humanName || !humanName[0]) {
    return "";
  }

  let givenFamilyName = "";
  humanName.forEach((name, index, array) => {
    if (switchNameOrder) {
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
