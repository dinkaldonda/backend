const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const reviewSchema = require("../Models/review.model")

module.exports = {

    addReview: async (req, res) => {

        try {
            const review = await reviewSchema.create({ ...req.body, email: req.user.email });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, review });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }

    },
    getReview: async (req, res) => {
        try {
            const review = await reviewSchema.find().sort({ "createdAt": -1 });
            const countData = await reviewSchema.aggregate([
                {
                    $group: {
                        _id: "$rating",
                        count: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $sort: {
                        _id: -1,
                    },
                },
            ])
            const count = {
                five: 0,
                four: 0,
                three: 0,
                two: 0,
                one: 0,
            }
            for (i = 0; i < countData.length; i++) {
                if (countData[i]._id == 5) count.five = countData[i].count
                else if (countData[i]._id == 4) count.four = countData[i].count
                else if (countData[i]._id == 3) count.three = countData[i].count
                else if (countData[i]._id == 2) count.two = countData[i].count
                else if (countData[i]._id == 1) count.one = countData[i].count
            }
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, review, count });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            const review = await reviewSchema.findByIdAndDelete(req.query.id);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, review });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}