const express = require("express");
const productController = require("../controllers/vehicleController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllBooks",productController.getAllBooks);
router.post("/getBooksByUserId", productController.getBooksByUserId);
router.get("/getBookById/:id",productController.getBookById);
router.post("/addBook",productController.addBook);
router.put("/updateBook/:id", productController.updateBook);
router.delete("/deleteBook/:id", productController.deleteBook);

module.exports = router;
