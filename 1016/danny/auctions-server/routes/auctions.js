const express = require('express');
const router = express.Router();
const { Auctions } = require('../models');

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
  await Auctions.create(auction);
  res.status(201).json(auction).end();
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
