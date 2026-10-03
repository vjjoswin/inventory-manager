import type { Product } from "./products.js";

export const productName: string = "Laptop";
export const price: number = 55000;
export const inStock: boolean = true;
export const tags: string[] = ["Electronics", "Computer"];

// A union accepts either a numeric ID or a string ID.
export let productId: number | string = "P1001";

export function printProductInfo(): void {
  console.log(
    `Product: ${productName}, Price: ₹${price}, In stock: ${inStock}, Tags: ${tags.join(", ")}, ID: ${productId}`
  );
}

export function demonstrateSpecificType(): void {
  // Before refactoring: any disables checks on this value.
  const productDetails: any = {
    id: productId, name: productName, price, inStock, tags,
  };
  console.log("Before refactoring (any):", productDetails);
  // TypeScript would allow productDetails.price = "expensive" here.

  // After refactoring: the same data has a checked Product shape.
  const typedProductDetails: Product = {
    id: productId, name: productName, price, inStock, tags,
  };
  console.log("After refactoring (Product):", typedProductDetails);
  // typedProductDetails.price = "expensive"; // Rejected: price must be a number.
}
