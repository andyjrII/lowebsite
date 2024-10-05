const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.render('books', { books });
};
