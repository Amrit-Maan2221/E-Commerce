const Product = require("../models/ProductModel");
const cloudinary = require("../util/cloudinary");
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");


// Get All Products
exports.getAllProducts = async (req, res, next) => {
  const { company, category, name, featured, sort, price, select, color, id } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (category) {
    queryObject.category = category;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (id) {
    queryObject._id = id
  }

  if (color) {
    queryObject.colors = color
  }

  if (price && price > 0) {
    queryObject.price = { $gt: Number(price), $lt: 100000 };
  }

  let query = `Product.find(queryObject)`;

  if (sort) {
    var sortFix = sort.split(",").join(" ");
    query += `.sort(sortFix)`;
  }

  if (select) {
    var selectFix = select.split(",").join(" ");
    query += `.select(selectFix)`;
  }




  // let page = Number(req.query.page) || 1;
  // let limit = Number(req.query.limit) || 10;

  // let skip = (page - 1) * limit;
  // query += `.skip(skip).limit(limit)`;

  const filteredProducts = await eval(query);
  const Products = await Product.find();
  res.status(200).json({ Products, filteredProducts, nbHits: Products.length });
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



// Delete Product -- Admin
exports.deleteProductController = catchAsyncErrors(async (req, res, next) => {
  console.log("Trying to Delete a Product");
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json("Product has been deleted...");
});





// Update Product -- Admin
exports.updateProductController = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  
  // Images Start Here
  if (req.body.images) {
  let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    console.log(images)

    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
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
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});



