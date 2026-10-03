# Product Inventory Manager — TypeScript assignment

A browser inventory app built with TypeScript. Part A covers types, functions,
scope, interfaces, debugging, and compiler configuration. Part B uses those
same modules to add products, filter stock, and preview discounts in the browser.

## Run locally

Requires Node.js 24 (used for verification) and Python 3 (local server).

```bash
npm ci
npm run dev
```

Open the URL printed in the terminal. The server tries port 8000, then the next
available port through 8099. Press `Ctrl+C` to stop it.

`npm run dev` builds once and starts the server. After editing a TypeScript file,
run `npm run build` in another terminal and refresh the page. HTML/CSS changes
only need a refresh. `npm start` serves the existing build.

## Assignment requirements

| Requirement | Implementation / evidence |
| --- | --- |
| Basic typed variables and a union ID | `src/inventory.ts` |
| Display product details | `printProductInfo()` in the browser console |
| `any` refactored to a safer specific type | `demonstrateSpecificType()` and the explanation below |
| Default 10% discount and bulk `map()` | `src/functions.ts` |
| Block scope | `demonstrateBlockScope()` in `src/functions.ts` |
| Product interface, optional tags, at least four products | `src/products.ts` |
| Filter available products | `getAvailableProducts()` and the stock filter in the UI |
| Extended interface and product discounts | `DiscountedProduct`, `applyDiscountToProducts()`, discount preview |
| Two compiler errors, messages, explanations, corrections | `docs/assignment-notes.md`, `docs/compiler-errors.txt`, `src/errors.ts` |
| Successful compilation | `docs/build-output.txt`; reproducible with `npm run build` |
| Compiler configuration | `tsconfig.json` and the explanation below |
| Browser project using TypeScript | `src/app.ts` compiled to `dist/app.js` |
| GitHub / hosting | [GitHub repository](https://github.com/vjjoswin/inventory-manager); Pages workflow prepared |

## Why a specific type is safer than `any`

The before example gives `productDetails` the type `any`, so TypeScript permits
invalid assignments such as changing its numeric price to a string. The after
example represents the same object with the `Product` interface, which checks
required fields and their types during compilation. This catches mistakes before
they reach the browser; it does not replace runtime validation of form inputs.

## Functions and scope

`calculateDiscount(1000)` returns `900`, using the default 10% discount.
`calculateDiscount(1000, 20)` returns `800`. `applyBulkDiscount([1000, 2000, 3000])`
uses `map()` to return `[900, 1800, 2700]` without modifying the source array.

In `demonstrateBlockScope()`, `i` and `message` are declared inside the loop.
They cannot be accessed after its block ends. Uncommenting the line
`console.log(message)` outside the loop would produce `Cannot find name 'message'`.

## Compiler configuration

| Option | Value | Explanation |
| --- | --- | --- |
| `target` | `ES2020` | Controls which JavaScript language version is emitted; suitable for modern browsers. |
| `strict` | `true` | Enables the strict family of type checks, including implicit `any` and null checks. |
| `outDir` | `./dist` | Writes generated JavaScript into `dist`, keeping it separate from TypeScript source. |
| `module` | `ES2020` | Emits ES modules, loaded by the browser's module script. |
| `lib` | `ES2020`, `DOM` | Provides type definitions for JavaScript and browser APIs. |
| `rootDir` | `./src` | Keeps compiled paths aligned with source module paths. |
| `noEmitOnError` | `true` | Prevents a failed compile from emitting new JavaScript. |

The `include` pattern compiles `src/**/*.ts`. The deliberately broken example
lives outside `src` and is compiled separately to keep the final application valid.
See the official TypeScript references for [target](https://www.typescriptlang.org/tsconfig/target.html),
[strict](https://www.typescriptlang.org/tsconfig/strict.html), and
[outDir](https://www.typescriptlang.org/tsconfig/outDir.html).

## Verify the assignment

```bash
npm run verify
```

This compiles the working app, runs six core tests, checks that the separate error
example produces exactly TS2322 and TS7006, saves those messages, and prepares
`_site/` for GitHub Pages. The error checker succeeds when the expected diagnostics
are found. Run `node dist/examples.js` or open the browser console for the Part A
examples. More detail is in [assignment notes](docs/assignment-notes.md).

## Browser functionality

- Starts with four products, including one out of stock and one without tags.
- Adds products with a name, non-negative price, stock status, and optional tags.
- Filters to in-stock products through `getAvailableProducts()`.
- Previews a default 10% or custom discount through `applyDiscountToProducts()`.
- Combines filtering and discount previews without changing original prices.
- Rejects invalid prices/discounts and displays entered text safely.

Products are held in memory and reset when the page reloads. Prices use INR and
are rounded to two decimal places. The browser loads `dist/app.js`, whose imports
use the same TypeScript functions and interfaces demonstrated in Part A.

## Publish to GitHub Pages

The project repository is [vjjoswin/inventory-manager](https://github.com/vjjoswin/inventory-manager).
The workflow in `.github/workflows/pages.yml` is ready for the `main` branch.
GitHub Pages must be enabled separately before the workflow can publish the site.

In the repository, open **Settings → Pages → Build and deployment → Source**
and select **GitHub Actions**. If the first run happened before Pages was enabled,
rerun the workflow from the Actions tab. It installs locked dependencies, runs
verification, uploads only `_site/`, and deploys it to GitHub Pages. See GitHub's
[custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

After deployment, the project site URL will normally be
`https://vjjoswin.github.io/inventory-manager/`. All asset paths are relative,
so the app works under the repository subpath.

## Project structure

```text
src/                         TypeScript source, including the browser app
examples/intentional-errors.ts  Separate deliberately broken example
dist/                        Generated JavaScript (included for easy local serving)
docs/                        Explanations and compiler evidence
tests/                       Core behavior tests
scripts/                     Local server, error check, static site packaging
.github/workflows/pages.yml  GitHub Pages deployment workflow
index.html                   Browser markup
style.css                    Browser styling
tsconfig.json                Compiler configuration
```
