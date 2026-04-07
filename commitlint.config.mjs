const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 50],
    "subject-case": [2, "always", ["sentence-case", "lower-case", "kebab-case"]],
    "body-max-line-length": [2, "always", 120],
  },
};

export default config;
