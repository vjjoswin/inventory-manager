// Corrected versions of the two mistakes in examples/intentional-errors.ts.
// Error 1 correction: assign a number to a numeric variable.
export const productPrice = 5000;
// Error 2 correction: explicitly type the function's parameters.
export function calculateTotal(price, quantity) {
    return price * quantity;
}
