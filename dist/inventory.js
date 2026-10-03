export const productName = "Laptop";
export const price = 55000;
export const inStock = true;
export const tags = ["Electronics", "Computer"];
// A union accepts either a numeric ID or a string ID.
export let productId = "P1001";
export function printProductInfo() {
    console.log(`Product: ${productName}, Price: ₹${price}, In stock: ${inStock}, Tags: ${tags.join(", ")}, ID: ${productId}`);
}
export function demonstrateSpecificType() {
    // Before refactoring: any disables checks on this value.
    const productDetails = {
        id: productId, name: productName, price, inStock, tags,
    };
    console.log("Before refactoring (any):", productDetails);
    // TypeScript would allow productDetails.price = "expensive" here.
    // After refactoring: the same data has a checked Product shape.
    const typedProductDetails = {
        id: productId, name: productName, price, inStock, tags,
    };
    console.log("After refactoring (Product):", typedProductDetails);
    // typedProductDetails.price = "expensive"; // Rejected: price must be a number.
}
