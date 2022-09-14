const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// Stores the content of the users' carts. Each username leads to an array of strings representing the item in teh cart.
const carts = new Map();
// Stores the inventory's state. Each item name leads to a number representing its quantity.
const inventory = new Map();

router.post("/carts/:username/items/:item", ctx => {
    // Handles requests to POST/carts/:username/items/:item adding items to a user's cart
    const { username, item } = ctx.params;
    if(!inventory.get(item)) {
        ctx.status = 404;
        return;
    }

    inventory.set(item, inventory.get(item) - 1);
    const newItems = (carts.get(username) || []).concat(item);
    carts.set(username, newItems);
    ctx.body = newItems;
});

app.use(router.routes());

module.exports = {
    app: app.listen(3000),
    inventory,
    carts
};