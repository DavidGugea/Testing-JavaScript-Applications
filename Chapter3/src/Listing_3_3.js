import { describe, test, beforeEach } from 'jest';

describe("addItemToCart", () => {
    const insertInventoryItem = () => { /* */ };

    let item;

    beforeEach(async () => {
        // Runs once before each test in the addItemToCart describe block
        item = await insertInventoryItem();
    });

    // Tests...
    test("add an available item to cart", () => {
        // You can use 'item' in here
    });
});

describe("checkout", () => {
    test("checkout non-existing cart", () => {
        // The previous 'beforeEach' hook does not run before this test
    });
});