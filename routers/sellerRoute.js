const router = require('express').Router();
const sellerController = require('../controllers/sellerController')
const authenticateSeller = require('../middlewares/sellerAuthMiddleware');

router.post("/create-catalog",authenticateSeller.sellerAuthMiddleware, sellerController.createCatalog);

module.exports = router;