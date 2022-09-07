import * as db from './dbConnection.js';

const createCart = username => {
    return db("carts").insert({ username });
};

const addItem = (cartId, itemName) => {
    return db("carts_items").insert({ cartId, itemName });
};

export default {
    createCart,
    addItem
};