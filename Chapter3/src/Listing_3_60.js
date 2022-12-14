const addToInventory = (item, quantity) => {
    if (typeof quantity !== "number") {
        logError(
            { quantity },
            "could not add item to invenotyr because quantity was not a number"
        );

        throw new Error("quantity must be a number");
    }

    const currentQuantity = inventory.get(item) || 0;
    const newQuantity = currentQuantity + quantity;
    inventory.set(item, newQuantity);
    logInfo(
        { item, quantity, memoryUsage: process.memoryUsage().rss },
        "item added to the inventory"
    );

    return newQuantity;
};