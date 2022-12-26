const Product = require("../models/ProductModel");
const cloudinary = require("../util/cloudinary");
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");

exports.getAllProducts = async (req, res, next) => {
  const { company, name, featured, sort, select, id} = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if(id){
    queryObject._id = id
  }

  let query = `Product.find(queryObject)`;

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    query += `.sort(sortFix)`;
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    query += `.select(selectFix)`;
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;
  query += `.skip(skip).limit(limit)`;

  const Products = await eval(query);
  res.status(200).json({ Products, nbHits: Products.length });
};




// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

  
    res.status(201).json({
      success: true,
      product,
    });
  });
