const app = require("./server.js");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

afterAll(() => app.close());

describe("add items to a cart", () => {
    test("adding available items", async () => {
        const repsonse = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, {
            method: "POST"
        });

        expect(response.status).toEqual(200);
    });
});