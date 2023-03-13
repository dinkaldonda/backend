const jwt = require('jsonwebtoken');
const userSchema = require("../Models/user.model")
const messages = require("../utils/messages.json")
const enums = require("../utils/enums.json")
require("dotenv").config()

module.exports = {
    authAdmin: async (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith("Bearer")) {
            try {
                token = authorization.split(" ")[1];
                if (!token) {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.INVALID_TOKEN })
                }
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await userSchema.findById(user._id).populate("role");
                console.log(req.user)
                if (req.user.role.role === "superAdmin") {
                    next();
                } else {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.NOT_AUTHORIZED })
                }
            } catch (err) {
                return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: err.message })
            }
        } else {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_TOKEN_TYPE })
        }
    },
    authUser: async (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith("Bearer")) {
            try {
                token = authorization.split(" ")[1];
                if (!token) {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.INVALID_TOKEN })
                }
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await userSchema.findOne({ email: user.email })
                if (req.user) {
                    console.log("first",req.user)
                    next();
                } else {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.USER_NOT_FOUND })
                }
            } catch (err) {
                return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: messages.err.message })
            }
        } else {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_TOKEN_TYPE })
        }
    }
}