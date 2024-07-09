/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__test__/(units)/**/*.[jt]s?(x)"],
  setupFilesAfterEnv: ["./src/__test__/__mock__/prisma.ts"],
};