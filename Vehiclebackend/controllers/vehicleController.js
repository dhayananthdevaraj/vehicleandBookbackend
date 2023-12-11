const Vehicle = require('../models/vehicleModel');


const getAllVehicles = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const products = await Vehicle.find({ vehicleName: searchRegex })
      .sort({ rentalPrice: parseInt(sortValue) });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("came in getbyid");
    const product = await Vehicle.findById(id);

    if (!product) {
      res.status(200).json({ "message": "Cannot find any vehicle" });

    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVehicleByUserId = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const { userId } = req.body;
    console.log("came in getbyuserid");

    const product = await Vehicle.find({ userId, vehicleName: searchRegex }).sort({ rentalPrice: parseInt(sortValue) });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addVehicle = async (req, res) => {
  try {
    const product = await Vehicle.create(req.body);
    res.status(200).json({ message: 'Vehicle added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
    if(product)

    res.status(200).json({ message: 'Vehicle updated successfully' });
    else
    res.status(404).json({ message: 'Cannot find any vehicle' });
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Vehicle.findByIdAndDelete(id);
if(product)
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  else
  res.status(404).json({ message: 'Cannot find any vehicle' });

  // git remote add origin https://github.com/dhayananthdevaraj/VehicleBackend.git
  // git branch -M main
  // git push -u origin main
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllVehicles,
  deleteVehicle,
  updateVehicle,
  addVehicle,
  getVehicleById,
  getVehicleByUserId

};
