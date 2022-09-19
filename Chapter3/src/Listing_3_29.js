import { inventory, addToInventory } from "./inventoryController";
import { describe, test, beforeEach, beforeAll } from 'jest';

const inventory = new Map();

const getInventory = () => {
    const contentArray = Array.from(inventory.entries());

    const contents = contentArray.reduce((contents, [name, quantity]) => {
        return {...contents, [name]: quantity};
    });

    return {
        ...contents,
        generatedAt: new Date(new Date().setFullYear(3000))  // Creates a date in the year 3000
    };
};