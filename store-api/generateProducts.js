const fs = require("fs");

const db = JSON.parse(fs.readFileSync("db.json", "utf8"));

const products = [];
for (let i = 1; i <= 1000; i++) {
  products.push({
    id: i.toString(),
    title: `Mont ${i}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste libero repudiandae quod omnis mollitia nam quo, quisquam quidem consectetur molestias ullam id aliquid, nobis, tempore repellendus iure. Vitae, vel fuga.",
    image: `${((i - 1) % 10) + 1}.jpg`,
    price: (1500 + (i % 20) * 100).toString()
  });
}

db.products = products;

fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf8");

console.log("1000 ürün başarıyla eklendi!");