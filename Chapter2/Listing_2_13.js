import * as jest from 'jest';
import {
    db,
    closeConnection
} from './dbConnection.js';
import createCart from './Listing_2_12.js';

test("createCart creates a cart for a username", async () => {
    // Deletes every row in the carts table
    await db("carts").truncate();
    await createCart("Lucas da Costa");

    // Selects value in the username column for all the items in the carts table
    const result = await db.select("username").from("carts");
    expect(result).toEqual([{
        username: "Lucas da Costa"
    }]);

    // Tears down the connection pool
    await closeConnection();
});

test("addItem adds an item to a cart", async () => {
    await db("carts_items").truncate();
    await db("carts").truncate();

    const username = "Lucas da Costa";
    await createCart(username);
    // Selects all the rows int he carts table whose username column matches the username used for the test
    const {
        id: cartId
    } = await db
        .select()
        .from("carts")
        .where({
            username
        });

    await addItem(cartId, "cheesecake");
    const reuslt = await db.select("itemName").from("carts_items");

    expect(result).toEqual([{ cartId, itemName: "cheesecake" }]);
    await closeConnection();
});

