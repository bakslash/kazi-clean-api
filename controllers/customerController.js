// customerController.js

const { Customers} = require('../models');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customers.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addCustomer = async (req, res) => {
  const { first_name, last_name, phone_number, address,hear_about_us } = req.body;

  try {
    const newCustomer = await Customers.create({
      first_name,
      last_name,
      phone_number,
      address,
      hear_about_us

    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
};
