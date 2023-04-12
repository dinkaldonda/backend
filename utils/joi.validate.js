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
            image: Joi.string()
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
    },
    validatation4addproduct: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            category: Joi.string().required(),
            subCategory: Joi.string().allow(null, ''),
            desc: Joi.string().required(),
            material: Joi.string().required(),
            size: Joi.string().required(),
            shippingDays: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().min(1).required(),
            discPrice: Joi.number().min(1).required(),
            image: Joi.string().required()
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
    validatation4updateproduct: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string(),
            category: Joi.string(),
            subCategory: Joi.any(),
            desc: Joi.string(),
            material: Joi.string(),
            size: Joi.string(),
            shippingDays: Joi.string(),
            quantity: Joi.number().min(1),
            price: Joi.number().min(1),
            discPrice: Joi.number().min(1),
            image: Joi.string()
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
    validatation4addBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required()
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
    validatation4updateBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string(),
            desc: Joi.string(),
            image: Joi.string(),
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
    validatation4updatematerial: (req, res, next) => {
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
    validatation4addmaterial: (req, res, next) => {
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
    validatation4addcustomization: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            requirement: Joi.string().required(),
            quantity: Joi.string().required(),
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
    validatation4wishlist: (req, res, next) => {
        let schema = Joi.object().keys({
            id: Joi.string().required()
        });

        let { error } = schema.validate(req.query);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addReview: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            rating: Joi.number().required(),
            review: Joi.string().required(),
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