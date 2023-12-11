const express = require("express");
const productController = require("../controllers/vehicleController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllVehicles",validateToken,productController.getAllVehicles);
router.post("/getVehicleByUserId",validateToken,productController.getVehicleByUserId);
router.get("/getVehicleById/:id",validateToken,productController.getVehicleById);
router.post("/addVehicle",validateToken,productController.addVehicle);
router.put("/updateVehicle/:id",validateToken, productController.updateVehicle);
router.delete("/deleteVehicle/:id",validateToken, productController.deleteVehicle);

module.exports = router;
