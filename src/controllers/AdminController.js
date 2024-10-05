const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

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

    res.redirect('/admin/books');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    await prisma.book.delete({
      where: { id: bookId },
    });
    res.redirect('/admin/books');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Server Error');
  }
};

// GET Edit Book
exports.getEditBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('admin_edit_book', { book });
  } catch (error) {
    console.error('Error fetching book for edit:', error);
    res.status(500).send('Server Error');
  }
};

// POST Edit Book

exports.postEditBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, description, amazonLink } = req.body;
  let coverImageUrl;

  try {
    // Check if a new image was uploaded
    if (req.file) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'LO', // Specify folder
      });
      coverImageUrl = result.secure_url;

      // Remove the file from the server after uploading to Cloudinary
      fs.unlinkSync(req.file.path);
    }

    // Update the book in the database, including the new coverImageUrl if uploaded
    await prisma.book.update({
      where: { id: bookId },
      data: {
        title,
        description,
        amazonLink,
        ...(coverImageUrl && { coverImage: coverImageUrl }), // Only update if a new image was uploaded
      },
    });

    res.redirect('/admin/books');
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Server Error');
  }
};
