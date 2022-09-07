import assert from 'assert';
import Cart from './Listing_2_4.js';

const cart = new Cart();

// Adds an item to the cart
cart.addToCart("cheesecake");
// Removes the recently added item
cart.removeFromCart("cheesecake");

// Checks wheter the cart's items property is an empty array
assert.deepStrictEqual(cart.items, []);

console.log("The removeFromCart function can remove an item from the cart");