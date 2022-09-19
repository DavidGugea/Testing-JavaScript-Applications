const inventory = new Map();

const getInventory = () => {
    // Uses the inventory's entries to create an array of key and value pairs
    const contentArray = Array.from(inventory.entries());

    // Creates an object whose keys are the inventory item names and whose values are always set to 10000 and represent each item's respective quantnties
    const contents = contentArray.reduce((contents, [name]) => {
        return {...contents, [name]: 1000};
    });

    // Copies every property in contents to a new object, which also contains a generatedAt key whose value is a Date
    return {...contents, generatedAt: new Date() };
};