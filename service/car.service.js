const carRepository = require("../repository/car.repository.js");
const cloudinaryConfig = require("../config/cloudinary.config.js");
const { car } = require("../models/index.js");

exports.findAllCars = async () => {
  return await carRepository.findAll();
};

exports.findCarById = async (id) => {
  return await carRepository.findById(id);
};

exports.createNewCar = async (payload) => {
  try {
    const uploadFoto = await cloudinaryConfig.uploader.upload(
      payload.files.foto.path
    );

    const car = {
      nama: payload.fields.nama,
      sewa: payload.fields.sewa,
      ukuran: payload.fields.ukuran,
      foto: uploadFoto.secure_url,
    };
    return await carRepository.save(car);
  } catch (err) {
    console.error(err);
  }
};

exports.updateCar = async (payload, ids) => {
  try {
    const uploadFoto = await cloudinaryConfig.uploader.upload(
      payload.files.foto.path
    );

    const car = {
      nama: payload.fields.nama,
      sewa: payload.fields.sewa,
      ukuran: payload.fields.ukuran,
      foto: uploadFoto.secure_url,
    };

    const carById = await carRepository.findById(ids);

    if (carById == null) {
      return null;
    } else {
      return await carRepository.update(car, ids);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.deleteCar = async(car) => {
    carRepository.delete(car);
};