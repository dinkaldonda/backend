const Joi = require('joi')
const enums = require("../utils/enums.json")

module.exports = {

    validatation4signup: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            phone: Joi.any(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4login: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateuser: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string(),
            address: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            pincode: Joi.number().allow(null, ""),
            country: Joi.string(),
            phone: Joi.number().allow(null, ""),
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4forgotpass: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifyOTP: (req, res, next) => {
        let schema = Joi.object().keys({
            otp: Joi.number().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifypassword: (req, res, next) => {
        let schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4changepassword: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            oldPassword: Joi.string().required(),
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addsubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            categoryId: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatesubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatecategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addcolor: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            categoryId: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4createvendor: (req, res, next) => {
        let schema = Joi.object().keys({
            bankName: Joi.string().required(),
            accountNumber: Joi.number().required(),
            ifscCode: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4loginadmin: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    }

}