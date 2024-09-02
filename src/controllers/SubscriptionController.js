const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createSubscription = async (req, res) => {
  const { email } = req.body;
  try {
    await prisma.subscription.create({
      data: {
        email: email,
      },
    });
    req.flash('success_msg', 'You have successfully subscribed');
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};
