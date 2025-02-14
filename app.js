import express from "express";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config(); // 필수!

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
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
  req.send("Success delete");
});

// products

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
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
