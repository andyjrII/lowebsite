const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

async function createAdmin() {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  console.log('Admin user created');
}

createAdmin()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
