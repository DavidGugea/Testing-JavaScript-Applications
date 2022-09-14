import {inventory, addToInventory} from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

beforeEach(() => inventory.set("cheesecake", 0));

test("cancels operation for invalid quantities", () => {
    try {
        addToInventory("cheesecake", "not a number");
    } catch (e) {
        /// An assertion that runs only when th eaddToInventory call throws an error
        expect(inventory.get("cheesecake")).toBe(0);
    }
});

