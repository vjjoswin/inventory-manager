# Compilation and debugging evidence

The project uses the installed TypeScript compiler from the lockfile
(TypeScript 5.9.3 at verification time).

## Successful compilation

```bash
npm run build
```

The working files in `src/` compiled successfully with exit code 0 and no compiler
diagnostics. Actual output is recorded in [build-output.txt](build-output.txt).
The compiler generated `dist/app.js`, `dist/examples.js`, `dist/inventory.js`,
`dist/functions.js`, `dist/products.js`, and `dist/errors.js`.

## Reproduce the two intentional errors

```bash
npm run check:errors
```

This runs the equivalent compiler command:

```bash
npx tsc --strict --noEmit --pretty false --target ES2020 examples/intentional-errors.ts
```

The direct compiler command intentionally exits with code 2. The checker verifies
exactly the two expected diagnostics and then exits successfully. Actual compiler
output is saved in [compiler-errors.txt](compiler-errors.txt).

### Error 1 — assigning a string to a number

Broken code:

```ts
const productPrice: number = "5000";
```

Compiler message:

```text
examples/intentional-errors.ts(2,7): error TS2322: Type 'string' is not assignable to type 'number'.
```

`productPrice` is declared as a number, but `"5000"` is a string because it is
quoted. TypeScript rejects that assignment to prevent numeric code from receiving
the wrong kind of value. Removing the quotes assigns the numeric value `5000`
and corrects the error.

Corrected code in `src/errors.ts`:

```ts
export const productPrice: number = 5000;
```

### Error 2 — an implicitly untyped parameter

Broken code:

```ts
function calculateTotal(price, quantity: number): number {
  return price * quantity;
}
```

Compiler message:

```text
examples/intentional-errors.ts(4,25): error TS7006: Parameter 'price' implicitly has an 'any' type.
```

The `price` parameter has no type annotation and cannot get a specific type from
this function declaration, so it becomes implicit `any`. With `strict` enabled,
TypeScript rejects implicit `any` to avoid unchecked values entering the function.
Adding `price: number` fixes the error and checks callers' arguments.

Corrected code in `src/errors.ts`:

```ts
export function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

After applying both corrections, `npm run build` succeeds. The broken original
is retained only as a separate demonstration outside the application build.

## Browser verification

Core automated checks cover default/custom discounts, percentage boundaries,
invalid numeric inputs, bulk mapping, stock filtering, optional tags, preservation
of original prices, and the corrected function. Run `npm run verify` to reproduce.
The project repository is https://github.com/vjjoswin/inventory-manager.

Manual browser checks in Brave also confirmed:

- Initial view: four products, three in stock, and the Monitor without tags.
- Stock filter: three visible products; the out-of-stock Keyboard is omitted.
- Default discount: Laptop ₹49,500, Mouse ₹1,080, Monitor ₹13,500.
- Adding a USB-C cable for ₹250: new ID 5, tags displayed, updated stock count.
- Custom 20% discount: Laptop ₹44,000 and the new cable ₹200.
- Disabling the preview: original Laptop ₹55,000 and cable ₹250 prices return.
- Entering 101%: an inline validation message appears and original prices remain.

The packaged `_site/` HTML, CSS, and all six compiled modules also returned
HTTP 200 with the expected MIME types when served under `/_site/`.
