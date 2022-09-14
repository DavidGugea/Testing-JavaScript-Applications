import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

test("cancels operation for invalid quantities", () => {
    // Causes the test to fail if the addToInventory function throws an error
    expect(() => addToInventory("cheesecake", "not a number")).not.toThrow();
    expect(inventory.get("cheesecake")).toBe(0);
    expect(Array.from(inventory.entires())).toHaveLength(1);
});