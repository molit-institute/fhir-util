import * as fhirUtil from "../index";

import humanNameEmpty from "./fixtures/HumanName-Empty.json";
import humanNameText from "./fixtures/HumanName-Text.json";
import humanNameNoText from "./fixtures/HumanName-NoText.json";
import humanNameMultiple from "./fixtures/HumanName-Multiple.json";

import identifier from "./fixtures/Identifier.json";

import observationVariant from "./fixtures/Observation-variant.json";

const identifierResultObject = {
  fhir_comments: ["MRN assigned by ACME healthcare on 6-May 2001"],
  use: "usual",
  type: {
    coding: [
      {
        system: "http://hl7.org/fhir/v2/0203",
        code: "MR"
      }
    ]
  },
  system: "urn:oid:1.2.36.146.595.217.0.1",
  value: "12345",
  period: {
    start: "2001-05-06"
  },
  assigner: {
    display: "Acme Healthcare"
  }
};

const testResource = {
  identifier: identifier
};

describe("FHIR Util", () => {
  describe("getStringFromHumanName(humanName)", () => {
    it("should return empty string if either parameter is null or undefined", () => {
      expect(fhirUtil.getStringFromHumanName()).toEqual("");
    });

    it("should return empty string if either parameter is empty", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameEmpty)).toEqual("");
    });

    it("should return the value of the text field if present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameText)).toEqual(
        "Maxi Musterfrau"
      );
    });

    it("should return the value of given and family if no text is present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameNoText)).toEqual(
        "Peter James Chalmers"
      );
    });

    it("should return a String with comma-separated names if multiple names are present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameMultiple)).toEqual(
        "Peter James Chalmers, Jim, Peter James Windsor"
      );
    });
  });

  describe("getIdentifierBySystem(identifier, system)", () => {
    it("should return the correct identifier", () => {
      expect(
        fhirUtil.getIdentifierBySystem(
          identifier,
          "urn:oid:1.2.36.146.595.217.0.1"
        )
      ).toMatchObject(identifierResultObject);
    });
  });

  describe("getIdentifierValueByIdentifierString(identifierString)", () => {
    it("should return the correct value", () => {
      expect(
        fhirUtil.getIdentifierValueByIdentifierString(
          "urn:oid:1.2.36.146.595.217.0.1|12345"
        )
      ).toEqual("12345");
    });

    it("should return null", () => {
      expect(fhirUtil.getIdentifierValueByIdentifierString(null)).toBeNull;
    });
  });

  describe("getIdentifierValueBySystem(identifiers, system)", () => {
    it("should return the correct value", () => {
      expect(
        fhirUtil.getIdentifierValueBySystem(
          identifier,
          "urn:oid:1.2.36.146.595.217.0.1"
        )
      ).toEqual("12345");
    });

    it("should return null", () => {
      expect(fhirUtil.getIdentifierValueBySystem(identifier, null)).toBeNull;
    });
  });

  describe("getIdentifierByResourceAndSystem(resource, system)", () => {
    it("should return the first correct identifier", () => {
      expect(
        fhirUtil.getIdentifierByResourceAndSystem(
          testResource,
          "urn:oid:1.2.36.146.595.217.0.1"
        )
      ).toMatchObject(identifierResultObject);
    });

    it("should return null", () => {
      expect(fhirUtil.getIdentifierByResourceAndSystem(identifier, null))
        .toBeNull;
    });
  });

  describe("getValueByLoincCode(components, loincCode)", () => {
    it("should return the correct value of the codeable concept", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "48018-6")
      ).toEqual("PIK3CA");
    });

    it("should return the correct value quantity", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "81258-6")
      ).toEqual(0.12000000000000002);
    });

    it("should return the correct value range", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "81254-6")
      ).toEqual("472917478-2133213211");
    });

    it("should return the correct value range with upper bound missing", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "81254-5")
      ).toEqual("472917478-unknown");
    });

    it("should return the correct value range with lower bound missing", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "81254-7")
      ).toEqual("unknown-472917478");
    });

    it("should return the correct value range with lower and higher bound missing", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "81254-8")
      ).toEqual("unknown-unknown");
    });

    it("should return the correct value for variant type", () => {
      expect(
        fhirUtil.getValueByLoincCode(observationVariant, "variant-type")
      ).toEqual("CNV");
    });

    it("should return undefined if at least one paramter is null or undefined", () => {
      expect(fhirUtil.getValueByLoincCode(observationVariant, undefined))
        .toBeUndefined;
      expect(fhirUtil.getValueByLoincCode(observationVariant, null))
        .toBeUndefined;
      expect(fhirUtil.getValueByLoincCode(null, "48018-6")).toBeUndefined;
      expect(fhirUtil.getValueByLoincCode(undefined, "48018-6")).toBeUndefined;
      expect(fhirUtil.getValueByLoincCode(null, null)).toBeUndefined;
      expect(fhirUtil.getValueByLoincCode(undefined, undefined)).toBeUndefined;
    });

    it("should return undefined if value could not be found", () => {
      expect(fhirUtil.getValueByLoincCode(observationVariant, "invalid-code"))
        .toBeUndefined;
    });

    it("should return undefined if value type invalid", () => {
      expect(fhirUtil.getValueByLoincCode(observationVariant, "invalid-type"))
        .toBeUndefined;
    });
  });
});
