import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Não deve criar um pedido com CPF inválido", function () {
	expect(() => new Order("111.111.111-11")).toThrow(new Error("CPF Inválido"));
});

test("Deve criar um pedido com 3 itens", function () {
	const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
	const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
	const coupon = new Coupon("VALE20", 20, new Date("2022-12-31T23:59:59"));
	order.addCoupon(coupon);
	const total = order.getTotal();
	expect(total).toBe(4872);
});

test("Não deve aplicar cupom de desconto expirado", function () {
    const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
	const coupon = new Coupon("VALE20", 20, new Date("2022-02-20T23:59:59"));
	order.addCoupon(coupon);
	const total = order.getTotal();
	expect(total).toBe(6090);
});