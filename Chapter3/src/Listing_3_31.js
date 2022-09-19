import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';


test("generatedAt in the past", () => {
    const result = getInventory();

    // Creates a date that is one millisecond ahead of the current time.
    // Alternatively, you could wait for a millisecond before generating a Date.
    const currentTime = new Date(Date.now() + 1);

    // Expects the result's generatedAt property to be before the date generated in the line above
    expect(result.generatedAt).toBeBefore(currentTime);
});