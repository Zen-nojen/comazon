import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
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
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  });
  res.send(user);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on ${process.env.PORT}`)
); // 서버를 구동시키려면 꼭 써야 함!
