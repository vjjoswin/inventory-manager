import "./examples.js";
import { products, getAvailableProducts, applyDiscountToProducts } from "./products.js";
function input(id) {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Missing input: ${id}`);
    }
    return element;
}
function element(id) {
    const result = document.getElementById(id);
    if (!result)
        throw new Error(`Missing element: ${id}`);
    return result;
}
const form = document.getElementById("productForm");
if (!(form instanceof HTMLFormElement))
    throw new Error("Missing product form.");
const nameInput = input("productName");
const priceInput = input("productPrice");
const stockInput = input("productStock");
const tagsInput = input("productTags");
const availableOnly = input("availableOnly");
const discountEnabled = input("discountEnabled");
const discountInput = input("discountPercent");
const productList = element("productList");
const status = element("formStatus");
const summary = element("inventorySummary");
const discountError = element("discountError");
// Keep originals unchanged so previews never apply discounts repeatedly.
const inventory = products.map((product) => ({ ...product }));
let nextId = 5;
const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
function paragraph(label, value, className) {
    const row = document.createElement("p");
    const heading = document.createElement("strong");
    heading.textContent = `${label}: `;
    row.append(heading, document.createTextNode(value));
    if (className)
        row.className = className;
    return row;
}
function renderProducts() {
    const visible = availableOnly.checked ? getAvailableProducts(inventory) : inventory;
    const validDiscount = discountInput.checkValidity();
    const preview = discountEnabled.checked && validDiscount;
    discountInput.setAttribute("aria-invalid", String(discountEnabled.checked && !validDiscount));
    discountError.textContent = discountEnabled.checked && !validDiscount
        ? "Enter a discount between 0 and 100. Showing original prices until corrected."
        : "";
    const displayed = preview
        ? applyDiscountToProducts(visible, Number(discountInput.value))
        : visible;
    productList.replaceChildren();
    displayed.forEach((product, index) => {
        const card = document.createElement("article");
        card.className = "product-card";
        const heading = document.createElement("h3");
        // User-supplied values are text, never interpreted as HTML.
        heading.textContent = product.name;
        card.append(heading, paragraph("ID", String(product.id)));
        if (preview) {
            card.append(paragraph("Original price", currency.format(visible[index].price), "original-price"));
        }
        card.append(paragraph(preview ? "Discounted price" : "Price", currency.format(product.price)), paragraph("Tags", product.tags?.join(", ") || "No tags"), paragraph("Stock", product.inStock ? "In stock" : "Out of stock", product.inStock ? "available" : "unavailable"));
        if (preview && "discountPercent" in product) {
            card.append(paragraph("Discount", `${product.discountPercent}%`));
        }
        productList.append(card);
    });
    if (displayed.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No products match this filter.";
        productList.append(empty);
    }
    summary.textContent = `Showing ${displayed.length} of ${inventory.length} products · ${getAvailableProducts(inventory).length} in stock`;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    if (!name || !priceInput.value.trim() || !Number.isFinite(price) || price < 0) {
        status.textContent = "Enter a product name and a valid, non-negative price.";
        return;
    }
    const newProduct = {
        id: nextId++,
        name,
        price,
        inStock: stockInput.checked,
        tags: tagsInput.value.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    inventory.push(newProduct);
    form.reset();
    status.textContent = `${newProduct.name} added successfully.`;
    renderProducts();
});
availableOnly.addEventListener("change", renderProducts);
discountEnabled.addEventListener("change", renderProducts);
discountInput.addEventListener("input", renderProducts);
renderProducts();
