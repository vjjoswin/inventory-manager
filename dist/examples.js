import { printProductInfo, demonstrateSpecificType } from "./inventory.js";
import { calculateDiscount, applyBulkDiscount, demonstrateBlockScope } from "./functions.js";
import { products, getAvailableProducts, applyDiscountToProducts } from "./products.js";
import { productPrice, calculateTotal } from "./errors.js";
// Open the browser console to see the Part A demonstrations.
printProductInfo();
demonstrateSpecificType();
console.log("Default 10% discount:", calculateDiscount(1000));
console.log("Custom 20% discount:", calculateDiscount(1000, 20));
console.log("Bulk discounts:", applyBulkDiscount([1000, 2000, 3000]));
demonstrateBlockScope();
console.log("Available products:", getAvailableProducts(products));
console.log("Discounted products:", applyDiscountToProducts(products));
console.log("Corrected errors:", productPrice, calculateTotal(1000, 2));
