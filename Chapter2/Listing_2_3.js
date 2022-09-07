import assert from 'assert';
import Cart from './Listing_2_1';

const cart = new Cart();
cart.addToCart("cheesecake");

// Compares the first and second arguments, and throws an insightful error if their values are different
assert.deepStrictEqual(cart.items, ["cheesecake"]);

console.log("The addToCart function can add an item to the cart");