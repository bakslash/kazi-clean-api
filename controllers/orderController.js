// orderController.js

const { Orders, Customers } = require('../models');

const addOrder = async (req, res) => {
  const {
    phone_number,
    first_name,
    last_name,
    address,
    hear_about_us,
    discountAmount,
    discountReason,
    totalPrice,
    pickUpTime,
    pickDate,
    quantity,
  } = req.body;

  try {
    // Find or create a customer with the given phone number
    const [customer, created] = await Customers.findOrCreate({
      where: { phone_number },
      defaults: {
        first_name,
        last_name,
        address,
        phone_number,
        hear_about_us
        // Add other customer details here
      },
    });

    // Create a new order with customer information
    const newOrder = await Orders.create({
      customerId: customer.id,
      discountAmount,
      discountReason,
      totalPrice,
      pickUpTime,
      pickDate,
      quantity,
    });

    res.status(201).json({ newOrder, created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    // Fetch all orders with associated customer information
    const orders = await Orders.findAll({
      include: [
        {
          model: Customers,
          attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address'],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addOrder,
  getOrders,
};
