import * as fhirUtil from "../index";

import humanNameText from "./fixtures/HumanName-Text.json";
import humanNameNoText from "./fixtures/HumanName-NoText.json";
import humanNameMultiple from "./fixtures/HumanName-Multiple.json";
import humanNameNoGivenOrFamily from "./fixtures/HumanName-NoGivenOrFamily.json";
import humanNameNothing from "./fixtures/humanName-Nothing.json";

describe("FHIR Util", () => {
  describe("getStringFromHumanName(humanName)", () => {
    it("should return empty string if either parameter is null or undefined", () => {
      expect(fhirUtil.getStringFromHumanName()).toEqual("");
    });
    it("should return the value of the text field if present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameText, false)).toEqual(
        "Maxi Musterfrau"
      );
    });
    it("should return the value of given and family if no text is present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameNoText, false)).toEqual(
        "Peter James Chalmers"
      );
    });
    it("should return the value of given and family if no text is present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameNoText, true)).toEqual(
        "Chalmers Peter James"
      );
    });
    it("should return the value of text if no given or family is present", () => {
      expect(
        fhirUtil.getStringFromHumanName(humanNameNoGivenOrFamily, false)
      ).toEqual("Peter James Chalmers");
    });
    it("should return '' if nothing is present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameNothing, false)).toEqual(
        ""
      );
    });
    it("should return a String with comma-separated names if multiple names are present", () => {
      expect(fhirUtil.getStringFromHumanName(humanNameMultiple, false)).toEqual(
        "Peter James Chalmers, Jim, Peter James Windsor"
      );
    });
  });
});
