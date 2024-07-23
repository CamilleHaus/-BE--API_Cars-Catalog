/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__test__/(integrations)/**/*.[jt]s?(x)"],
};
