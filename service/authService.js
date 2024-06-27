import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {

    async login(req) {
        console.log('in log in')
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return { data: null, message: "User not found.", status:404 }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { data: null, message: "Invalid credentials.", status:401 }
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${60 * 60 * 24}s` });
        // send token
        return { data: {token}, message: "User loged in successfully.", status:200 }
    }

   async register(req){
    console.log(req.body)
    const {email, password} = req.body;
    let user = await User.findOne({ email });
    console.log("in regiser", user)
    if (user !== null) return {data: null, status: 400, message: "User already exists."}
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {data: {token}, status: 201, message: "User registered successfully."}
   }

   async logout(req) {
    let token = req.headers.authorization.split(' ')[1];
    revokedTokens.add(token);
    return "User logout successfully."
   }
}

export default new AuthService();