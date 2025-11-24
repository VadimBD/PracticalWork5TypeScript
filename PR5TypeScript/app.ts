import util from "util";

// 1. Base Product Types
// Базовий тип будь-якого товару
type BaseProduct = {
    id: number;
    name: string;
    price: number;
};
// 2. Specific Product Types
// Електроніка
type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyMonths: number;
};
// Одяг
type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
};
// 3. Generic Functions for Products
/**
 * Пошук товару за ID
 * Якщо товар не знайдено — повертає undefined
 */
const findProduct = <T extends BaseProduct>(
    products: T[],
    id: number
): T | undefined => {
    return products.find(p => p.id === id);
};
// Фільтрація товарів за максимальною ціною
const filterByPrice = <T extends BaseProduct>(
    products: T[],
    maxPrice: number
): T[] => {
    return products.filter(p => p.price <= maxPrice);
};
// 4. Cart Types & Functions
// Елемент кошика
type CartItem<T> = {
    product: T;
    quantity: number;
};
/**
 * Додавання товару в кошик
 * Якщо товар вже є — збільшуємо кількість
 */
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {

    // Перевіряємо, чи товар уже є в кошику
    const existing = cart.find(item => item.product.id === product.id);

    if (existing) {
        existing.quantity += quantity;
        return cart;
    }

    // Інакше додаємо новий елемент
    return [...cart, { product, quantity }];
};
//Підрахунок загальної вартості кошика
const calculateTotal = <T extends BaseProduct>(
    cart: CartItem<T>[]
): number => {
    return cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
};
// 5. Test Data
const electronics: Electronics[] = [
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
const clothing: Clothing[] = [
    {
        id: 10,
        name: "Winter Jacket",
        price: 2500,
        category: 'clothing',
        size: "L"
    }
];
// 6. Usage Demonstration
// Знайдемо товар
const phone = findProduct(electronics, 1);
if (phone) {
    console.log("Product found:", phone);
} else {
    console.log("Product not found");
}
// Фільтрація
console.log("\nItems cheaper than 15000:");
console.log(require('util').inspect(filterByPrice(electronics, 15000), { depth: null, colors: true }));
// Робота з кошиком
let cart: CartItem<BaseProduct>[] = [];
if (phone) {
    cart = addToCart(cart, phone, 2);
}
console.log("\nCart after adding products:");
console.log(util.inspect(cart, { depth: null, colors: true }));
console.log("\nTotal cart value:");
console.log(calculateTotal(cart));

