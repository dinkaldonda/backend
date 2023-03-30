const materialSchema = require("../Models/material.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");

module.exports = {

    addMaterial: async (req, res) => {

        const { name } = req.body
        try {
            const findMaterial = await materialSchema.findOne({ name })
            if (findMaterial) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.MATERIAL_EXISTS });
            }

            await materialSchema.create(req.body)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.MATERIAL_ADDED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getMaterial: async (req, res) => {

        try {

            const allMaterial = await materialSchema.find()
            if (allMaterial.length > 0) {
                return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, Material: allMaterial });
            } else {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.MATERIAL_NOT_FOUND });
            }

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateMaterial: async (req, res) => {
        const { id } = req.query

        try {
            const findMaterial = await materialSchema.findById(id)
            if (!findMaterial) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.MATERIAL_NOT_FOUND });
            }
            await materialSchema.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.MATERIAL_UPDATED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteMaterial: async (req, res) => {
        const { id } = req.query

        try {
            const findMaterial = await materialSchema.findById(id)
            if (!findMaterial) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.MATERIAL_NOT_FOUND });
            }

            await materialSchema.findByIdAndDelete(id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.MATERIAL_DELETED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}