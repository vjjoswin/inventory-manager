// Compile this file separately; it is excluded from the working application.
const productPrice: number = "5000";

function calculateTotal(price, quantity: number): number {
  return price * quantity;
}

console.log(productPrice, calculateTotal(1000, 2));
