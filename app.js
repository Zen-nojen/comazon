import express from "express";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config(); // 필수!

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// users
app.get("/users", async (req, res) => {
  const { offset = 0, limit = 10, order = "newest" } = req.query;
  let orderBy;
  switch (order) {
    case "oldset":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
    default:
      orderBy = { createdAt: "desc" };
  } // switch 조건문
  const users = await prisma.user.findMany({
    orderBy: orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.send(users);
}); // await 는 async 를 써야 호출 가능!

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  // Destructuring assignment
  const user = await prisma.user.findUnique({
    where: { id },
  });
  res.send(user);
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).send(user);
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
  });
  res.send(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id },
  });
  res.send("Success delete");
});

// products
app.get("/products", async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", category } = req.query;
  let orderBy;
  switch (order) {
    case "priceLowest":
      orderBy = { price: "asc" };
      break;
    case "priceHighest":
      orderBy = { price: "desc" };
      break;
    case "oldest":
      orderBy = { price: "asc" };
      break;
    case "newest":
      orderBy = { price: "desc" };
    default:
      orderBy = { price: "desc" };
  }
  const products = await prisma.product.findMany({
    where: where,
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // Destructuring assignment
  const product = await prisma.product.findUnique({
    where: { id },
  });
  res.send(product);
});

app.post("/products", async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.send(product);
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  req.sendStatus(204);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on ${process.env.PORT}`)
); // 서버를 구동시키려면 꼭 써야 함!
