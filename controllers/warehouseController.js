const Warehouse = require('../models/warehouse');
const mongoose = require('mongoose');


exports.getAllWarehouses = async (req, res, next) => {
  try {
    const { city, type } = req.query;

    let filter = {};

    if (city) {
      filter['address.city'] = { $regex: city, $options: 'i' };
    }

    if (type) {
      filter.type = type; 
    }

    const warehouses = await Warehouse.find(filter);

    res.status(200).json({
      total: warehouses.length,
      warehouses
    });
  } catch (error) {
    next(error);
  }
};


exports.getWarehouseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid warehouse ID' });
    }

    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};
