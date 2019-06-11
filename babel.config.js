const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "10",
        chrome: "58",
        ie: "11"
      },
      useBuiltIns: "usage",
      corejs: "3.0.0"
    }
  ]
];

module.exports = { presets };
