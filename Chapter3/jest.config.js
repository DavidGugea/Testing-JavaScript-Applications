module.exports = {
    testEnvironment: "node",
    // Jest runs this file's exported asyn function once before all tests.
    globalSetup: "./globalSetup.js",
    // Jest runs this file's exported async function once after all tests.
    globalTeardown: "./globalTeardown.js"
}