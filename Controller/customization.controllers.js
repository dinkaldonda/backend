const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const customizationSchema = require("../Models/customization.model")

module.exports = {

    addCustomization: async (req, res) => {

        try {
            const data = await customizationSchema.create(req.body);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, data });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }

    },
    getCustomization: async (req, res) => {
        try {
            const data = await customizationSchema.find().sort({ "createdAt": -1 });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, data });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteCustomization: async (req, res) => {
        try {
            const data = await customizationSchema.findByIdAndDelete(req.query.id);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, data });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}