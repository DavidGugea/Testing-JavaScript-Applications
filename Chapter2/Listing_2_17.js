import dbConnection from "./dbConnection";

// Clears the carts and carts_items tables before each test
beforeEach(
    async () => {
        await db("carts").truncate();
        await db("cart_items").truncate();
    }
);