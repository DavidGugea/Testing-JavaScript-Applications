import { describe, test, beforeEach, beforeAll } from 'jest';

describe("addItem", () => {
    beforeEach(() => carts.clear());
    beforeEach(() => inventory.set("cheesecake", 1));

    test("inventory update", async () => {
        await addItem("lucas", "cheesecake");
        expect(inventory.get("cheesecake")).toBe(0);
    });
    
    test("cart update", async () => {
        await addItem("keith", "cheesecake");
        expect(carts.get("keith")).toEqual(["cheesecake"]);
    });

    test("soldout items", async () => {
        const failedAddItem = await addItem("lucas", "cheesecake");
        expect(failedAddItem.status).toBe(404);
    });
});