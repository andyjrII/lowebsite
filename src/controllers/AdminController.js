const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

// Dashboard
exports.getDashboard = async (req, res) => {
  const totalSubscribers = await prisma.subscription.count();
  const totalBooks = await prisma.book.count();
  res.render('admin_dashboard', { totalSubscribers, totalBooks });
};

// Subscribers
exports.getSubscriptions = async (req, res) => {
  const subscribers = await prisma.subscription.findMany();
  res.render('admin_subscriptions', { subscribers });
};

// Books
exports.getBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.render('admin_books', { books });
};

// Add Book (GET and POST)
exports.getAddBook = (req, res) => {
  res.render('admin_add_book');
};

exports.postAddBook = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'LO', // Upload to LO folder in Cloudinary
    });

    // Create book record in the database
    const { title, description, amazonLink } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        description,
        amazonLink,
        coverImage: result.secure_url, // Save Cloudinary URL
      },
    });

    res.status(201).json(book);
    res.redirect('/admin/books');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};
