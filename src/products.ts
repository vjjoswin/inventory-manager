import { calculateDiscount } from "./functions.js";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  inStock: boolean;
  tags?: string[];
}

export const products: Product[] = [
  { id: 1, name: "Laptop", price: 55000, inStock: true, tags: ["Electronics", "Computer"] },
  { id: 2, name: "Wireless Mouse", price: 1200, inStock: true, tags: ["Accessories"] },
  { id: 3, name: "Keyboard", price: 1800, inStock: false, tags: ["Accessories"] },
  { id: 4, name: "Monitor", price: 15000, inStock: true },
];

export function getAvailableProducts(items: Product[]): Product[] {
  return items.filter((product) => product.inStock);
}

export interface DiscountedProduct extends Product {
  discountPercent: number;
}

export function applyDiscountToProducts(
  items: Product[],
  discountPercent: number = 10
): DiscountedProduct[] {
  return items.map((product) => ({
    ...product,
    price: calculateDiscount(product.price, discountPercent),
    discountPercent,
  }));
}
