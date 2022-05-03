const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "fhir-util.umd.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "fhirUtil",
      type: "umd"
    },
    globalObject: "this"
  },
  mode: "production"
};
