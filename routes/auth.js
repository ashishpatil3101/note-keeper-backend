import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import  auth from '../middleware/auth.js'
import {login, logout, register} from '../controller/authController.js';

const router = express.Router();

// router.post('/register', async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ email, password: hashedPassword });
//     await user.save();

//     const payload = { user: { id: user.id } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.post('/login', async (req, res) => {
//   console.log('in log in')
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const payload = { user: { id: user.id } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${60 * 60 * 24}s` });
//    // send token
//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });


// router.post('/logout', async(req, res)=>{

//   try {
//     let token = req.headers.authorization.split(' ')[1];
//     revokedTokens.add(token);
//     res.status(200).json({message: "User logout successfully."})
    
//   } catch (error) {
//      res.status(500).json({message: "Not able logout."})
//   }
// })


router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

export default router;
