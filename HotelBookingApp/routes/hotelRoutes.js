const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

// router.param('id', hotelController.checkID);

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(hotelController.createNewHotel);

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(hotelController.updateHotel)
  .delete(hotelController.deleteHotel);

module.exports = router;
