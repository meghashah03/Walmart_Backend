const Delivery = require('../models/deliveries');
const Order = require('../models/order');
const mongoose = require('mongoose');

// GET /deliveries
exports.getAllDeliveries = async (req, res, next) => {
  try {
    const { status, assignedDriver, from, to } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (assignedDriver) filter.assignedDriver = assignedDriver;

    if (from || to) {
      filter.scheduledStart = {};
      if (from) {
        const fromDate = new Date(from);
        if (isNaN(fromDate.getTime())) {
          return res.status(400).json({ message: 'Invalid from date format' });
        }
        filter.scheduledStart.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        if (isNaN(toDate.getTime())) {
          return res.status(400).json({ message: 'Invalid to date format' });
        }
        filter.scheduledStart.$lte = toDate;
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const deliveries = await Delivery.find(filter).skip(skip).limit(limit);
    const total = await Delivery.countDocuments(filter);
    
    res.status(200).json({
      count: deliveries.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      deliveries
    });
  } catch (err) {
    next(err);
  }
};

// GET /deliveries/:deliveryId
exports.getDeliveryById = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
      return res.status(400).json({ message: 'Invalid delivery ID format' });
    }

    const delivery = await Delivery.findById(deliveryId).populate('orderId', 'customerId status orderDate');

    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json(delivery);
  } catch (err) {
    next(err);
  }
};

//POST /deliveries
exports.scheduleDelivery = async (req, res, next) => {
    try {
      const { orderId, assignedDriver, status, scheduledStart, deliveryWindow, origin, destination, priority } = req.body;
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      if (!deliveryWindow) {
        return res.status(400).json({ message: 'Delivery window is required' });
      }
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      // Simulated logic for route generation (mock route points between origin & destination)
      const mockRoute = [
        { latitude: 23.8315, longitude: 91.2820 }, // Sample coord for origin (Agartala)
        { latitude: 22.5726, longitude: 88.3639 }  // Sample coord for destination (Kolkata)
      ];
  
      // Simulate ETA
      const estimatedArrival = new Date(new Date(deliveryWindow).getTime() + 60 * 60 * 1000); // +1 hour
  
      const newDelivery = new Delivery({
        orderId,
        assignedDriver: assignedDriver || 'driver_001',
        status: status || 'Scheduled',
        scheduledStart: scheduledStart || new Date(),
        estimatedArrival,
        route: mockRoute
      });
  
      const savedDelivery = await newDelivery.save();
  
      res.status(201).json({
        message: 'Delivery scheduled successfully',
        delivery: savedDelivery
      });
  
    } catch (error) {
      console.error('Error scheduling delivery:', error);
      next(error);
    }
  };

  /*CHATGPT- Optional Improvements You Can Add Later:
Pull coordinates from Google Maps using the origin/destination strings.
Calculate real ETA using distance and traffic.
Assign available drivers based on a pool.
Would you like help integrating Google Maps Directions API 
to generate real coordinates and ETA for this route?*/


// PATCH /deliveries/:deliveryId
exports.updateDelivery = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { status, location, delayReason, trafficNote } = req.body;
    
    if (location) {
      const { latitude, longitude } = location;
      if (latitude && (latitude < -90 || latitude > 90)) {
        return res.status(400).json({ message: 'Latitude must be between -90 and 90' });
      }
      if (longitude && (longitude < -180 || longitude > 180)) {
          return res.status(400).json({ message: 'Longitude must be between -180 and 180' });
        }
     }
    const updateFields = {};

    if (status) {
      updateFields.status = status;
      if (status === 'Delivered') {
        updateFields.actualArrival = new Date();
      }
    }

    if (delayReason) {
      updateFields.delayReason = delayReason;
    }

    // Push driver’s current location to the route (if provided)
    const updateOps = {};

    if (location?.latitude && location?.longitude) {
      updateOps.$push = {
        route: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      };
    }

    // Push traffic updates if provided
    if (trafficNote) {
      if (!updateOps.$push) updateOps.$push = {};
      updateOps.$push.trafficUpdates = {
        timestamp: new Date(),
        note: trafficNote
      };
    }

    // Merge other fields
    updateOps.$set = updateFields;

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      updateOps,
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json({
      message: 'Delivery updated successfully',
      delivery: updatedDelivery
    });
  } catch (error) {
    console.error('Error updating delivery:', error);
    next(error);
  }
};