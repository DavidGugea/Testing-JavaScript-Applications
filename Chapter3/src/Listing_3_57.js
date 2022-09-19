const db = require("knex")(require("./knexfile").development);

const addItem = (cartId, itemName) => {
    return db("carts_items").insert({cartId, itemName});
};

module.exports = { createCart };