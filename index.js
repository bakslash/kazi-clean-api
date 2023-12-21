const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const listEndpoints = require('express-list-endpoints');

const app = express();

app.use(cors({ origin: '*' }));
// Middleware for parsing JSON in request body
app.use(express.json());
app.use(bodyParser.json());

// Apply route handlers
app.use('/admin', adminRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// Display the list of endpoints
console.log(listEndpoints(app));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
