// jest.config.ts
import { Config } from '@jest/types';
type JestConfig = Config.InitialOptions;

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const config: JestConfig = {
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\.+\\.d\\.ts$\\\\'],

	// A list of paths to directories that Jest should use to search for files in
	roots: ['<rootDir>/src', './src'],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// A map from regular expressions to paths to transformers
	transform: {
		'.+\\.ts$': 'ts-jest',
	},

	// All imported modules in your tests should be mocked automatically
	automock: false,

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/*.spec.ts'],
};

export default config;
