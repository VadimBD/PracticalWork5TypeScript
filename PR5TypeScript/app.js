"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
// 3. Generic Functions for Products
/**
 * ����� ������ �� ID
 * ���� ����� �� �������� � ������� undefined
 */
const findProduct = (products, id) => {
    return products.find(p => p.id === id);
};
// Գ�������� ������ �� ������������ �����
const filterByPrice = (products, maxPrice) => {
    return products.filter(p => p.price <= maxPrice);
};
/**
 * ��������� ������ � �����
 * ���� ����� ��� � � �������� �������
 */
const addToCart = (cart, product, quantity) => {
    // ����������, �� ����� ��� � � ������
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
        return cart;
    }
    // ������ ������ ����� �������
    return [...cart, { product, quantity }];
};
//ϳ�������� �������� ������� ������
const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};
// 5. Test Data
const electronics = [
    {
        id: 1,
        name: "Xiaomi Smartphone",
        price: 10000,
        category: 'electronics',
        warrantyMonths: 12
    },
    {
        id: 2,
        name: "ASUS Laptop",
        price: 35000,
        category: 'electronics',
        warrantyMonths: 24
    }
];
const clothing = [
    {
        id: 10,
        name: "Winter Jacket",
        price: 2500,
        category: 'clothing',
        size: "L"
    }
];
// 6. Usage Demonstration
// �������� �����
const phone = findProduct(electronics, 1);
if (phone) {
    console.log("Product found:", phone);
}
else {
    console.log("Product not found");
}
// Գ��������
console.log("\nItems cheaper than 15000:");
console.log(require('util').inspect(filterByPrice(electronics, 15000), { depth: null, colors: true }));
// ������ � �������
let cart = [];
if (phone) {
    cart = addToCart(cart, phone, 2);
}
console.log("\nCart after adding products:");
console.log(util_1.default.inspect(cart, { depth: null, colors: true }));
console.log("\nTotal cart value:");
console.log(calculateTotal(cart));
//# sourceMappingURL=app.js.map