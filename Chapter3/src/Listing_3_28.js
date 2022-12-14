import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

test("generatedAt in the past", () => {
    const result = getInventory();

    // Adds one millisecond to the current timestamp to ensure that the timestamps compared won't be the same. Alternatively, you could wait for one millisecond before calling Date.now.
    const currentTime = Date.now() + 1;

    // Checks whether the result's generatedAt property is smaller than the one generated by the test and stores a Boolean value
    const isPastTimestamp = result.generatedAt().getTime() < currentTime;

    // Checks whether the stored Boolean value is true
    expect(isPastTimestamp).toBe(true);
});