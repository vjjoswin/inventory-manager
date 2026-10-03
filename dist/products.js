import { calculateDiscount } from "./functions.js";
export const products = [
    { id: 1, name: "Laptop", price: 55000, inStock: true, tags: ["Electronics", "Computer"] },
    { id: 2, name: "Wireless Mouse", price: 1200, inStock: true, tags: ["Accessories"] },
    { id: 3, name: "Keyboard", price: 1800, inStock: false, tags: ["Accessories"] },
    { id: 4, name: "Monitor", price: 15000, inStock: true },
];
export function getAvailableProducts(items) {
    return items.filter((product) => product.inStock);
}
export function applyDiscountToProducts(items, discountPercent = 10) {
    return items.map((product) => ({
        ...product,
        price: calculateDiscount(product.price, discountPercent),
        discountPercent,
    }));
}
