const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")

module.exports = {

    uploadImage: async (req, res) => {
        if (!req.files) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.IMAGE_REQUIRE });
        }
        const productImage = req.files.image
        if (!productImage.mimetype.startsWith("image")) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_FILE_TYPE });
        }
        const maxFileSize = 1024 * 1024;
        if (productImage.size > maxFileSize) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_FILE_SIZE });
        }
        try {
            const fileResult = await cloudinary.uploader.upload(
                productImage.tempFilePath,
                {
                    use_filename: true,
                    folder: "Product Images",
                }
            );

            fs.unlink(productImage.tempFilePath, () => { });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, url: fileResult.secure_url });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
        }

    },
    deleteImage: async (imageUrl) => {
        let imagePublicID = `Product Images${imageUrl.split("Product%20Images")[1].split(".")[0]}`;
        cloudinary.uploader.destroy(imagePublicID);
    }

}