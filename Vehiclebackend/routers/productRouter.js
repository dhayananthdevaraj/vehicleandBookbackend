const express = require("express");
const productController = require("../controllers/productController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllVehicles",productController.getAllVehicles);
router.post("/getVehicleByUserId", productController.getVehicleByUserId);
router.get("/getVehicleById/:id",productController.getVehicleById);
router.post("/addVehicle",productController.addVehicle);
router.put("/updateVehicle/:id", productController.updateVehicle);
router.delete("/deleteVehicle/:id", productController.deleteVehicle);

module.exports = router;
