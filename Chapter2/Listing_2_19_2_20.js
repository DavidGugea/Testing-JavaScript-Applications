import * as fetch from 'isomorphic-fetch';
import * as jest from 'jest';
const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
    // Sends POST requests to the route that adds items to a user's cart
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: "POST"
    });
};

const getItems = username => {
    // Sends GET requests to the route that lists the contents of a user's carts
    return fetch(`${apiRoot}/carts/${username}/items`, {
        method: "GET"
    });
};

test("adding items to a cart", async () => {
    // Lists the items in a user's cart
    const initialItemsResponse = await getItems("lucas");
    // Checks wheter the response's status is 404
    expect(initialItemsResponse.status).toEqual(404);

    // Sends a request to add an item to a user's cart
    const addItemResponse = await addItem("lucas", "cheesecake");
    // Checks wheter the server responded with the cart's new contents
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);

    // Sends another request to list the items in the user's cart
    const finalItemsResponse = await getItems("lucas");
    // Checks wheter the server's response includes the item you've added
    expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
});