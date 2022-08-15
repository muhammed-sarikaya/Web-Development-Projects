const Hotel = require('../models/hotelModel');

/* 

exports.checkID = (req, res, next, val) => {
  if (hotels.length < req.params.id * 1) {
    return res.status(404).json({
      status: 'error',
      message: 'You are not allowed to access this hotel.',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter a name and price',
    });
  }
  next();
}; 

*/

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      status: 'success',
      results: hotels.length,
      data: {
        hotels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: 'There was an error fetching the hotels.',
    });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: 'There was an error fetching the hotels.',
    });
  }
};

exports.createNewHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
