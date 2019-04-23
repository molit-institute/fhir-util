import * as fhirUtil from "../index";

import humanNameText from "./fixtures/HumanName-Text.json";
import humanNameNoText from "./fixtures/HumanName-NoText.json";
import humanNameMultiple from "./fixtures/HumanName-Multiple.json";

import identifier from "./fixtures/Identifier.json";

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
});
