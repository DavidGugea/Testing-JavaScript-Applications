import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

// The Map that stores the application's state
const carts = new Map();

router.get("/carts/:username/items", ctx => {
    // Handles requeste to GET /carts/:username/items, listing the items in a user's cart
    const cart = carts.get(ctx.params.username);
    cart ? (ctx.body = cart) : (ctx.status=404);
});

router.post("/carts/:username/items/:item", ctx => {
    // Handles requests to POST /carts/:username/items/:item, adding items to a user's cart
    const { username, item } = ctx.params;
    const newItems = (carts.get(username) || []).concat(item);

    carts.set(username, newItems);

    // Responds with the cart's new content
    ctx.body = newItems;
});

app.use(router.routes());
app.listen(3000);