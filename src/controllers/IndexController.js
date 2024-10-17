require('dotenv').config();

exports.getLinks = async (req, res) => {
  res.render('home', {
    urls: {
      allAboutLove: process.env.ALL_ABOUT_LOVE,
      godsTreasury: process.env.GODS_TREASURY,
      praiseGates: process.env.PRAISE_GATES,
      canadaClothings: process.env.CANADA_CLOTHINGS,
      simartPlace: process.env.SIMART_PLACE,
      LOPublications: process.env.LO_PUBLICATIONS,
      spiritualWoman: process.env.SPIRITUAL_WOMAN,
    },
  });
};

exports.getOrgLinks = async (req, res) => {
  res.render('organisations', {
    urls: {
      allAboutLove: process.env.ALL_ABOUT_LOVE,
      godsTreasury: process.env.GODS_TREASURY,
      praiseGates: process.env.PRAISE_GATES,
      canadaClothings: process.env.CANADA_CLOTHINGS,
      simartPlace: process.env.SIMART_PLACE,
      LOPublications: process.env.LO_PUBLICATIONS,
      spiritualWoman: process.env.SPIRITUAL_WOMAN,
    },
  });
};
