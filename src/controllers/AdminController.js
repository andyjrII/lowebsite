const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.render('admin_dashboard', { subscriptions });
  } catch (error) {
    res.status(400).json({ error: 'Failed to load admin dashboard!' });
  }
};
