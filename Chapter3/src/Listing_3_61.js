const { addToInventory } = require("./inventoryController");

// Replaces logger with a test double to make sure the test's output won't be polluted with the logger's messages
jest.mock("./logger");

// A test that covers approximately 80% of the lines in the addToInventory functino
test("passing valid arguments", () => {
    addToInventory("cheesecake", 2);
});