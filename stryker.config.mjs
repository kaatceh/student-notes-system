export default {
  testRunner: "jest",
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  coverageAnalysis: "off",
  mutate: [
    "lab4/**/*.js"
  ],
  jest: {
    projectType: "custom"
  }
};
