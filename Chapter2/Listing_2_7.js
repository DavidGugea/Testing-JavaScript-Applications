import * as jest from 'jest';
import assert from 'assert';
import Cart from './Listing_2_4.js';

test("The addToCart function cna add an item to the cart", () => { 
    const cart = new Cart();
    cart.addToCart("cheesecake");

    // Compares the value of the assertion's target - the argument provided to expect - to the value of the argument passed to toEqual
    expect(cart.items).toEqual(["cheesecake"]);
});