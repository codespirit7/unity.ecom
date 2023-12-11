const Catalog = require("../model/Catalog");
const Product = require("../model/Product");
const User = require("../model/User");

const createCatalog = async (req, res) => {
  try {
    const sellerEmail = req.user.email;
    const items = req.body.items;

    // Check if the seller already has a catalog
    const existingCatalog = await Catalog.findOne({ seller: req.user.id });

    console.log(existingCatalog);

    if (existingCatalog) {
      for (const item of items) {
        const { name, price } = item;
        const newProduct = new Product({ name, price });
        await newProduct.save();
        existingCatalog.products.push(newProduct);
      }
      await existingCatalog.save();
      return res.status(201).json({ message: "Catalog created successfully" });
    }

    const seller = await User.findOne({ email: sellerEmail });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    console.log(seller._id);

    // Create a new catalog
    const newCatalog = new Catalog({
      seller: seller._id, // Use the ObjectId of the user document
      products: [],
    });

    // Adding products to the catalog
    for (const item of items) {
      const { name, price } = item;
      const newProduct = new Product({ name, price });
      await newProduct.save();
      newCatalog.products.push(newProduct);
    }

    // Savinging the catalog to the database
    await newCatalog.save();

    res.status(201).json({ message: "Catalog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { createCatalog };
