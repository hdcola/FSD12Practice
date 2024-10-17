const express = require('express');
const router = express.Router();
const { Auctions } = require('../models');
const { Sequelize } = require('sequelize');

/* GET auctions listing. */
router.get('/', async function (req, res, next) {
  const auctions = await Auctions.findAll();
  res.json(auctions).end();
});

router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const auction = await Auctions.findByPk(id);
  res.json(auction).end();
});

router.post('/', async function (req, res, next) {
  const auction = req.body;
  try {
    await Auctions.create(auction);
    res.status(201).json(auction).end();
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errors = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      console.log(errors);
      return res.status(400).json(errors).end();
    } else {
      return res.status(500).json(error).end();
    }
  }
});

router.patch('/:id/bid', function (req, res, next) {
  const id = req.params.id;
  const { lastPrice, sellerEmail } = req.body;
  Auctions.findByPk(id).then((auction) => {
    if (auction.lastPrice < lastPrice) {
      auction.lastPrice = lastPrice;
      auction.sellerEmail = sellerEmail;
      auction.save().then(() => {
        res.json(auction).end();
      });
    } else {
      res.status(400).end();
    }
  });
});

router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  await Auctions.destroy({ where: { id } });
  res.status(204).end();
});

module.exports = router;
