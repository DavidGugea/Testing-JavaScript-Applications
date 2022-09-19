const { db, closeConnection } = require("./dbConnection");
const { createCart } = require("./cart");

test("addItem adds an item to a cart", async () => {
    await db("carts_items").truncate();
    await db("carts").truncate();

    const [cartId] = await createCart("Lucas da Costa");
    await addItem("cheesecake");

    const result = await db.select().from("carts_items");
    expect(result).toEqual([{ cartId, itemName: "cheesecake" }]);
    await closeConnection();
});