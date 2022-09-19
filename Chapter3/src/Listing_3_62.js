// A test that covers approximately 75% of the lines in the addToInventory function
test("passing valid arguments", () => {
    addToInventory("cheesecake", 2);
});

// A test that covers the remaining lines in the addToInventory function
test("passing invalid arguments", () => {
    try {
        addToInventory("cheesecake", "should throw");
    } catch(e) {
        // ...
    }
});