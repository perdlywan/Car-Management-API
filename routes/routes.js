const express = require("express");
const cors = require("cors");
const router = express.Router();
const authMiddleware = require("../middleware/middleware.js");
const userController = require("../controller/users.controller.js");
const carController = require("../controller/cars.controller.js");


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions));
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", (request, response) => {
  response.json("Index page");
});
// ===============================================

/**
 * @swagger
 * definitions:
 *   Register:
 *     required:
 *       - email
 *       - password
 *       - role
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Create_Update_Car:
 *     required:
 *       - nama
 *       - sewa
 *       - foto
 *       - ukuran
 *     properties:
 *       nama:
 *         type: string
 *       sewa:
 *         type: string
 *       foto:
 *         type: string
 *       ukuran:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authenticate User
 *   - name: Cars
 *     description: Cars
 */

// AUTH ENDPOINT
/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register member and admin
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: User's password.
 *         required: true
 *         type: string
 *       - name: role
 *         description: User's role.
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Register'
 */
router.post("/auth/register", userController.createNewUserApi);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login to app
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: User's password.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 */
router.post("/auth/login", userController.loginUserApi);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     description: Current user
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: profile
 */
router.get(
  "/auth/profile",
  authMiddleware.authorizationToken,
  userController.userProfileApi
);

//============================================================

// CAR ENDPOINT
/**
 * @swagger
 * /cars:
 *   get:
 *     description: Get all cars
 *     tags: [Cars]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: cars
 */
router.get(
  "/cars",
  authMiddleware.authorizationToken,
  carController.findAllCarsApi
);

/**
 * @swagger
 * /cars/:id:
 *   get:
 *     description: Get all cars
 *     tags: [Cars]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *       - type: string
 *     responses:
 *       200:
 *         description: cars by id
 */
router.get(
  "/cars/:id",
  authMiddleware.authorizationToken,
  carController.findCarByIdApi
);

/**
 * @swagger
 * /cars:
 *   post:
 *     description: Create new cars
 *     tags: [Cars]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nama
 *         description: Car's name.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: sewa
 *         description: Car's price.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: ukuran
 *         description: Car's size.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: foto
 *         description: Car's photo.
 *         required: true
 *         in: formData
 *         type: string/file
 *     responses:
 *       201:
 *         description: create car
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Create_Update_Car'
 */
router.post(
  "/cars",
  authMiddleware.authorizationToken,
  carController.createNewCarApi
);

/**
 * @swagger
 * /cars/:id:
 *   put:
 *     description: Update cars by id
 *     tags: [Cars]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Car's id.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: nama
 *         description: Car's name.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: sewa
 *         description: Car's price.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: ukuran
 *         description: Car's size.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: foto
 *         description: Car's photo.
 *         required: true
 *         in: formData
 *         type: string/file
 *     responses:
 *       200:
 *         description: update car
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Create_Update_Car'
 */
router.put(
  "/cars/:id",
  authMiddleware.authorizationToken,
  carController.updateCarApi
);

/**
 * @swagger
 * /cars/:id:
 *   delete:
 *     description: Delete cars by id
 *     tags: [Cars]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *       - type: string
 *     responses:
 *       200:
 *         description: cars by id
 */
router.delete(
  "/cars/:id",
  authMiddleware.authorizationToken,
  carController.deleteCarApi
);

module.exports = router;
