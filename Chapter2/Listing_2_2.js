import Cart from './Listing_2_1';

const cart = new Cart();
cart.addToCart("cheesecake");


const hasOneItem = cart.items.length === 1;
const hasACheesecake = cart.items[0] === 'cheesecake';

// If both cheks have succeeded, prints a success message to the console
if (hasOneItem && hasACheesecake) {
    console.log("The addToCart function can add an item to the cart");
} else {
    // If any of the tests failed, prints error messages

    // Creates a comma-separated list of the actual items in the cart to display in the test's error message
    const actualContent = cart.items.join(", ");

    console.error("The addToCart function didn't do what we expect!");
    console.error(`Here is the actual content of the cart: ${actualContent}`);

    throw new Error("Test failed!");
}