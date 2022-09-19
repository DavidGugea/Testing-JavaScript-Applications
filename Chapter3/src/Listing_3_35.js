import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

test("fetching inventory", async () => {
    inventory.set("cheescake", 1).set("macarroon", 2);

    const getInventoryResponse = await sendGetInventoryRequest("lucas");

    // Creates an object literal without using any dependencies
    const expected = {
        cheesecake: 1,
        macarroon: 2,
        generatedAt: expect.anything()
    };

    // Notice how both the `actual` and `expected` outputs come from different places.
    // Expects the server's response to match the object literal created within the test
    expect(await getInventoryResponse.json()).toEqual(expected);
});