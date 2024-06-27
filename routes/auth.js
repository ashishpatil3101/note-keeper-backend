import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import  auth from '../middleware/auth.js'
import {login, logout, register} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

export default router;
