const User = require("../model/User");
const Catalog = require("../model/Catalog");
const Product = require("../model/Product");
const Order = require("../model/Order");

const getListOfSellers = async (req, res) => {
  try {
    // Finding all sellers in the User model with userType 'seller'
    const sellers = await User.find({ userType: "seller" }).select("-password");

    res.status(200).json({ sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSellerCatalog = async (req, res) => {
  try {
    const sellerId = req.params.seller_id;

    // Finding the catalog of the seller
    const catalog = await Catalog.findOne({ seller: sellerId })
      .populate("products") // Assuming your Catalog model references products
      .exec();

    if (!catalog) {
      return res.status(404).json({ message: "Seller catalog not found" });
    }

    res.status(200).json({ catalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const buyerEmail = req.user.email;
    const sellerId = req.params.seller_id;
    const items = req.body.items;

    // Finding the buyer and seller based on their email and ID
    const buyer = await User.findOne({ email: buyerEmail });
    const seller = await User.findById(sellerId);

    if (!buyer || !seller) {
      return res.status(404).json({ message: "Buyer or seller not found" });
    }

    // Creating a new order
    const newOrder = new Order({
      buyer: buyer._id,
      seller: seller._id,
      products: [],
    });

    // Adding products to the order
    for (const item of items) {
      const { product_id, quantity } = item;

      // Finding the product based on its ID
      const product = await Product.findById(product_id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }


      // Adding the product to the order with the specified quantity
      newOrder.products.push({
        product: product._id.toString(),
        quantity,
      });
    }

    // Saving the new order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getListOfSellers, getSellerCatalog, createOrder };
