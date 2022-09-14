import { describe, test, beforeEach, beforeAll } from 'jest';

describe("addItem", () => {
    test("inventory update", async () => {
        // Sets to 1 the nubmer of cheesecakes available, and hcecks wheter adding once cheesecake to a cart updates the inventory adequately
        inventory.set("cheesecake", 1);
        await addItem("lucas", "cheesecake");
        expect(inventory.get("cheesecake")).toBe(0);
    });
    
    test("cart update", async () => {
        // Tries to add a piece of cheesecake to a user's cart, and checks wheter the cart's content is an array containing a single cheesecake
        await addItem("keith", "cheesecake");

        expect(carts.get("keith")).toEqual(["cheesecake"]);
    });

    test("soldout items", async () => {
        // Tries to add a cheescake, and expects the server's response's status to be 404
        const failedAddItem = await addItem("lucas", "cheesecake");
        expect(failedAddItem.status).toBe(404);
    });
});