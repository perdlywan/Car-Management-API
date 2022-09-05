const db = require("../models/index.js");
const Car = db.car;

exports.findAll = async () => {
  return await Car.findAll();
};

exports.findById = async (id) => {
  return await Car.findByPk(id);
};

exports.save = async (car) => {
  return await Car.create(car);
};

exports.update = async (car, ids) => {
  return await Car.update(car, { where: { id: ids } });
};

exports.delete = async (car) => {
  return await car.destroy();
};
