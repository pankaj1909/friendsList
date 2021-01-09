module.exports = {
    bail: false,
    silent: true,
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "html", "cobertura"],
    moduleFileExtensions: ["js", "json", "jsx", "css", "scss"],
    setupFiles: ["<rootDir>/enzyme.config.js"],
    testEnvironment: "jsdom",
    testMatch: ["**/?(*.)+(spec|test).js?(x)"],
    coveragePathIgnorePatterns: [
        "\\\\node_modules\\\\",
        "src/index.js"
    ],
    verbose: false,
    watchman: true,
    collectCoverageFrom: [
        "<rootDir>/src/component/**/*.js",
        "<rootDir>/src/App.js",
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.js"
    }
};
