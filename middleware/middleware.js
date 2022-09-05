const jwt = require("jsonwebtoken");
const jwtUtil = require("../util/jwt.util.js");

exports.authorizationToken = async(request, response, next) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = await jwtUtil.decodeToken(token);

    if (token == null) return response.sendStatus(401);

    if (decodedToken.role == 'admin' || decodedToken.role == 'superadmin') return next();

    if (decodedToken.role == 'member') return response.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return response.sendStatus(401)

        request.user = user

        next();
    });
};