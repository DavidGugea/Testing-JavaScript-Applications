import knex from "knex";

export default knex = async () => {
    await knex.schema.createTable("carts", table => {
        table.increments("id");
        table.string("username");
    });

    await knex.schema.createTable("carts_items", table => {
        table.integer("cartId").references("carts.id");
        table.string("itemName");
    });
};