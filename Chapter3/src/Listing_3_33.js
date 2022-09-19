import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

test("fetching inventory", async () => {
    inventory.set("cheesecake", 1).set("macarroon", 2);
    const getInventoryResponse = await sendGetInventoryRequest("lucas");

    // Copies to a new object the properties in the getInventory function's result, 
    // and includes a generatedAt property whose value is an assymmetric matches
    // For the sake of this example, let's not compare the `generatedAt``` feild's value
    const expected = {
        ...getInventory(),
        generatedAt: expect.anything()  // Allows the generatedAt property to have any value
    };

    // Because both the route and `expected` were generaetd based on `getInventory`
    // you are comparing two outputs which come from the exact same piece of code:
    // the unit under test !
    expect(await getInventoryResponse.json()).toEqual(expected);
    // Compares the server's response to hte object created within the test
});