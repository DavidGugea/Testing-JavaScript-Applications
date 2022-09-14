import { describe, test, beforeEach, beforeAll } from 'jest';

describe("addItemToCart", () => {
    const insertInventoryItem = () => { /* */ };

    let item;
    beforeEach(async () => {
        // Runs before each test in the addItemToCart describe block
        item = await insertInventoryItem();
    });

    // Tests...
});

describe("checkout", () => {
    const mockPaymentService = () => { /* */ };

    // Runs once before all tests in the checkout describe block
    beforeAll(mockPaymentService);

    test("checkout non-existing cart", () => { /* */ });
});