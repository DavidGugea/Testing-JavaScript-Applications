import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

// Empties the inventory
beforeEach(() => inventory.clear());

test("returned value", () => {
    const result = addToInventory("cheesecake", 2);

    // Checks whether the result is a number
    expect(typeof result).toBeGreaterThan(1);
});