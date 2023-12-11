const express = require("express");
const vehicleController = require("../controllers/vehicleController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllVehicles",validateToken,vehicleController.getAllVehicles);
router.post("/getVehicleByUserId",validateToken,vehicleController.getVehicleByUserId);
router.get("/getVehicleById/:id",validateToken,vehicleController.getVehicleById);
router.post("/addVehicle",validateToken,vehicleController.addVehicle);
router.put("/updateVehicle/:id",validateToken, vehicleController.updateVehicle);
router.delete("/deleteVehicle/:id",validateToken, vehicleController.deleteVehicle);

module.exports = router;
