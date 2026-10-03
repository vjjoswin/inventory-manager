import test from "node:test";
import assert from "node:assert/strict";
import { calculateDiscount, applyBulkDiscount } from "../dist/functions.js";
import { products, getAvailableProducts, applyDiscountToProducts } from "../dist/products.js";
import { productPrice, calculateTotal } from "../dist/errors.js";

test("default/custom discounts, boundary percentages, and decimal currency", () => {
  assert.equal(calculateDiscount(1000), 900);
  assert.equal(calculateDiscount(1000, 20), 800);
  assert.equal(calculateDiscount(1000, 0), 1000);
  assert.equal(calculateDiscount(1000, 100), 0);
  assert.equal(calculateDiscount(99.99), 89.99);
  assert.equal(calculateDiscount(0), 0);
});

test("invalid prices and discounts are rejected", () => {
  for (const value of [-1, NaN, Infinity]) {
    assert.throws(() => calculateDiscount(value), RangeError);
  }
  for (const value of [-1, 101, NaN, Infinity]) {
    assert.throws(() => calculateDiscount(100, value), RangeError);
  }
});

test("bulk discounts return a new array and leave the input unchanged", () => {
  const prices = [1000, 2000, 3000];
  assert.deepEqual(applyBulkDiscount(prices), [900, 1800, 2700]);
  assert.deepEqual(prices, [1000, 2000, 3000]);
  assert.deepEqual(applyBulkDiscount([]), []);
});

test("the inventory has four products, handles optional tags, and filters stock", () => {
  assert.equal(products.length, 4);
  assert.equal(products[3].tags, undefined);
  assert.deepEqual(getAvailableProducts(products).map((product) => product.id), [1, 2, 4]);
  assert.deepEqual(getAvailableProducts([]), []);
  assert.deepEqual(getAvailableProducts([{ id: "none", name: "Sample", price: 0, inStock: false }]), []);
});

test("discount previews preserve originals and compose with stock filtering", () => {
  const before = structuredClone(products);
  const discounted = applyDiscountToProducts(getAvailableProducts(products));
  assert.deepEqual(discounted.map((product) => product.price), [49500, 1080, 13500]);
  assert.ok(discounted.every((product) => product.discountPercent === 10));
  assert.deepEqual(products, before);
  assert.equal(applyDiscountToProducts(products, 20)[0].price, 44000);
  assert.equal(applyDiscountToProducts(products)[0].price, 49500);
});

test("the corrected examples use numeric values and typed parameters", () => {
  assert.equal(productPrice, 5000);
  assert.equal(calculateTotal(1000, 2), 2000);
});
