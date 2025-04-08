import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Optionally clear DB
});

afterAll(async () => {
  await prisma.$disconnect();
});
