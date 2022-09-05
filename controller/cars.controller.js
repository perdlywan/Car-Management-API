const carService = require("../service/car.service");

exports.findAllCarsApi = async (request, response) => {
  const cars = await carService.findAllCars();

  response.json({ data: cars });
};

exports.findCarByIdApi = async (request, response) => {
  const cars = await carService.findCarById(request.params.id);

  if (cars != null) {
    response.json({ data: cars });
  } else {
    response
      .status(404)
      .json({ error: `Car with id ${request.params.id} not found` });
  }
};

exports.createNewCarApi = async (request, response) => {
  const car = await carService.createNewCar(request);

  response.status(201).json({ data: car });
};

exports.updateCarApi = async (request, response) => {
  const car = await carService.updateCar(request, request.params.id);

  if (car == null) {
    response
      .status(404)
      .json({ error: `Car with id ${request.params.id} not found` });
  } else {
    response.json({ message: "Updated successfully" });
  }
};

exports.deleteCarApi = async (request, response) => {
  const carById = await carService.findCarById(request.params.id);

  if (carById == null) {
    response
      .status(404)
      .json({ error: `Car with id ${request.params.id} not found` });
  } else {
    carService.deleteCar(carById);
    response.json({ message: "Delete Successfully" });
  }
};
