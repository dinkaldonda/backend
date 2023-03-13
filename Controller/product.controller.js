const productModel = require("../Models/product.model");
const fileModel = require("../Models/file.model");

var insertProduct = (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    productModel
      .create({
        c_id: req.body.c_id,
        s_c_id: req.body.s_c_id,
        price: req.body.price,
        description: req.body.description,
        color_id: req.body.color,
        age: req.body.age,
        weight: req.body.weight,
        // gender: req.body.gender,
        seller_mobile: req.body.seller_mobile,
        milk: req.body.milk,
        lactation: req.body.lactation,
      })
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.p_media.length == undefined) {
            media.push(req.files.p_media);
          } else {
            media = req.files.p_media;
          }
          for (let index = 0; index < media.length; index++) {
            fileModel
              .create({
                p_media: media[index].name,
              })
              .then((result) => {
                if (result) {
                  const filePath = media[index];
                  filePath.mv(
                    `${__dirname}/../public/assets/images/${media[index].name}`,
                    (error) => {
                      if (error) {
                        console.log(error, "error1");
                      }
                    }
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          res.send({
            status: 1,
            result: result,
            msg: "Product Inserted successfully...",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

var getProduct = (req, res) => {
  try {
    productModel
      .find()
      .populate({ path: "s_c_id", select: "s_c_name" })
      .populate({ path: "c_id", select: "c_name" })
      .populate({ path: "color_id", select: "color_name" })
      .then((services) => {
        console.log(services);
        if (services) {
          res.send({ status: 1, data: services, msg: "gotted" });
        } else {
          res.send({ status: 0, data: [], msg: "" });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { insertProduct, getProduct };
