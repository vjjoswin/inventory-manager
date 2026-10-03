/** Return the price after a discount; the default discount is 10%. */
export function calculateDiscount(
  price: number,
  discountPercent: number = 10
): number {
  if (!Number.isFinite(price) || price < 0) {
    throw new RangeError("Price must be a finite, non-negative number.");
  }
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new RangeError("Discount must be between 0 and 100.");
  }
  // Prices are rounded to the nearest paise.
  return Math.round((price * (1 - discountPercent / 100) + Number.EPSILON) * 100) / 100;
}

export function applyBulkDiscount(
  prices: number[],
  discountPercent: number = 10
): number[] {
  return prices.map((price) => calculateDiscount(price, discountPercent));
}

export function demonstrateBlockScope(): void {
  for (let i = 0; i < 3; i++) {
    const message: string = `Inside loop: ${i}`;
    console.log(message);
  }
  // console.log(message); // TS2304: Cannot find name 'message'.
  // Both i and message exist only inside the loop's block.
}
