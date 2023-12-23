const { Role } = require('../models'); // Import your Role model
const models = require('../models');
exports.getRoles = async (req, res) => {
  try {
    // Retrieve a list of all Roles from the database
    const roles = await models.role.findAll();

    return res.status(200).json(roles);
  } catch (error) {
    console.error('Error retrieving roles:', error);
    return res.status(500).json({ error: 'Unable to retrieve roles. Please try again later.' });
  }
};

exports.createRoles = async (req, res) => {
  try {
    // Get the Role data from the request body
    const { role, userId } = req.body;

    // Create a new Role in the database
    const newRole = await models.role.create({ role, userId });

    return res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);

    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors (e.g., required fields missing)
      return res.status(400).json({ error: 'Validation error. Please check your input data.' });
    }

    return res.status(500).json({ error: 'Unable to create the role. Please try again later.' });
  }
};
