const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (await bcrypt.compare(password, admin.password)) {
        return done(null, admin);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: 'username' }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return prisma.admin
      .findUnique({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}

module.exports = initialize;
