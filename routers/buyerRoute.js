const router = require('express').Router();
const buyerController = require("../controllers/buyerController");
const authenticateBuyer = require("../middlewares/buyerAuthMiddleware");


router.get("/list-of-sellers",authenticateBuyer.buyerAuthMiddleware, buyerController.getListOfSellers);
router.get("/seller-catalog/:seller_id", authenticateBuyer.buyerAuthMiddleware, buyerController.getSellerCatalog)
router.post("/create-order/:seller_id", authenticateBuyer.buyerAuthMiddleware,buyerController.createOrder);
module.exports = router;