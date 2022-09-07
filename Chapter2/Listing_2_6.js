import * as jest from 'jest';
import assert from 'assert';
import Cart from './Listing_2_4.js';


// Encapsulates the first test into a different namespace, isolating its varialbes and prodcuing more readable output
test("The addToCart function can add an item to the cart", () => {
    // Arrange: create an empty cart
    const cart = new Cart();

    // Act: exercises the addToCart function
    cart.addToCart("cheesecake");

    // Assert: checks whether cart contains the newly added item
    assert.deepStrictEqual(cart.items, ["cheesecake"]);
});


// Encapsulates the second test into a different namespace
test("The removeFromCart function can remove an item from the cart", () => {
    // Arrange: creates an empty cart, and adds an item to it
    const cart = new Cart();
    cart.addToCart("cheesecake");

    // Act: exercises the removeFromCart function
    cart.removeFromCart("cheesecake");

    // Assert: checks whether the cart is empty
    assert.deepStrictEqual(cart.items, []);
})