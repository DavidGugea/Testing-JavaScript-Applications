import { describe, test, beforeEach, beforeAll } from 'jest';

// Runs before each tes tin the file, no matter in which describe block the test is
beforeEach(clearDatabase);

describe("addItemToCart", () => {
    const insertInventoryItem = () => { /* */ };

    let item;
    beforeEach(async () => {
        // Runs before each test in the addItemToCart describe block
        item = await insertInventoryItem();
    });

    test("add an available item to cart", () => { /* */ });
});

describe("checkout", () => {
    const mockPaymentService = () => { /* */ };

    // Runs once before all tests in the checkout describe block
    beforeAll(mockPaymentService);

    test("checkout nonexisting cart", () => { /* */ });
});

// Runs once after all tests in the file finish
afterAll(destroyDbConnection);