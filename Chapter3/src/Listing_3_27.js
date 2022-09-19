import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

test("inventory contents", () => {
    inventory
        .set("cheesecake", 1)
        .set("macarroon", 3)
        .set("croissant", 3)
        .set("eclaire", 7);

    const result = getInventory();

    // Expects the result to match the object passed to the toEqual method
    expect(result).toEqual({
        cheesecake: 1,
        macarroon: 3,
        croissant: 3,
        eclaire: 7,
        generatedAt: expect.any(Date)  // Allows the generatedAt property to be any date
    });
});