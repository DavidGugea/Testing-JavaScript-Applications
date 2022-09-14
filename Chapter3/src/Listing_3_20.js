import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

beforeEach(() => inventory.set("cheesecake", 0));

test("cancels operation for invalid quantities", () => {
    // Causes the test to fail if it doesn't execute at least one assertion
    expect.hasAssertions();

    try {
        addToInventory("cheesecake", "not a number");
    } catch (e) {
        // An assertion that runs only when th eaddToInventory call throws an error
        expect(inventory.get("cheesecake")).toBe(0);
    }

    // An assertion that is always executed
    expect(Array.from(inventory.entries())).toHaveLength(1);
});