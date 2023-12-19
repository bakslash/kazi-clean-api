
const { sendEmail } = require('../services/emailService');
const { sendSms } = require('../services/smsService');
const randomstring  = require("randomstring");
const jwt = require('jsonwebtoken');
const models = require('../models'); 
const bcrypt = require('bcrypt');


const authService = require('../services/authService');

// Separate function for creating a user


// Separate function for sending a test email
// const sendTestEmail = async (email ,randomPassword) => {
//   try {
//     // Adjust this part based on your actual email content and subject
//     const subject = 'Test Email Subject';
//     const recipientName = 'Recipient Name'; // You might fetch this from the user's data
//    // const customMessage = 'This is a test email from your application.';

//     // Assuming you have a sendEmail function
//     await sendEmail(email, subject, recipientName, randomPassword);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// Register a new user
const createUser = async (email, role,hashedPassword) => {
  return models.Users.create({
    email,
  
    role,
    password: hashedPassword,
    //status: 1, // Assuming 1 means "active"
  })
}

exports.getUsers = async (req, res) => {
    try {
      // Retrieve a list of all students from the database
      const roles = await models.Role.findAll({
        // include: [
        //   {
        //     model: models.role, 
             
        //   }]
      });
  
      return res.status(200).json(roles);
    } catch (error) {
      console.error('Error retrieving users:', error);
      return res.status(500).json({ error: 'Unable to retrieve users.' });
    }
  };

  // routes/auth.js or wherever your route/controller is defined

 // Adjust the path based on your project structure

 const { users } = require('../models'); // Adjust the path based on your project structure

 exports.registerUser = async (req, res) => {
   try {
     const { email, password, role } = req.body;
 
     // Check if the email already exists
     const existingUser = await models.Users.findOne({ where: { email } });
     
     if (existingUser) {
       return res.status(400).json({ success: false, message: 'Email already exists' });
     }
 
     // Hash the provided password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create a new user with the provided role and hashed password
     const newUser = await createUser(email, role, hashedPassword);
 
     return res.status(201).json({
       success: true,
       message: 'User registered successfully',
       user: { email: newUser.email, role: newUser.role }, // Removed the password from the response
     });
   } catch (error) {
     console.error('Error registering user:', error);
     return res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };



 exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await models.Users.findOne({ where: { email } });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    //bug for later admin login bypass
   

    // Compare the entered password with the hashed password in the database
   // const passwordMatch = await bcrypt.compare(password, user.password);
//admin by pass
   const passwordMatch = (password == user.password)
   console.log('check',passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  
    // Create a JWT token for the user
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token and user information in the response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        // Add other user properties you want to include
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};