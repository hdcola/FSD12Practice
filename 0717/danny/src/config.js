require("dotenv").config();

const config = {
  telegraphAccessToken: process.env.TELEGRAPH_ACCESS_TOKEN,
  authorName: process.env.AUTHOR_NAME,
  authorUrl: process.env.AUTHOR_URL,
};

module.exports = config;
