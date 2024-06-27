import sendResponse from './baseController.js';
import createError from '../utils/error.js';
import authService  from '../service/authService.js';


const login = async(req, res, next)=>{
    try {
        const data = await authService.login(req, res);
        if (data.data) {
            res.status(200).send(sendResponse("User logged-in successfully.", data.data));
        }
        else {
            next(createError(data.status, data.message));
        }
    }
    catch (error) {
        next(createError(500, error.message));
    }
}


/**
 * register : It registered the user with email and password
 * @param {body(name, email, password)} req
 * @param {data{email}} res
 */
const register = async (req, res, next) => {
    try {
        const {password, email} = req.body;
        if (email !== undefined && email !== '' && validator.isEmail(email) && password !== undefined && password !== '' && password.length > 7 ) {
            const data = await userService.signUp(req);
            if (data.data) {
                res.status(201).send(sendResponse(data.message, data.data));
            }
            else {
                next(createError(data.status, data.message));
            }
        }
        else {
            let msg = 'Please provide correct input data.';
            if ( password !== undefined && password !== '' && password.length <= 7){
                msg='Password must contain at least 8 charcters.';
            }
            if( email !== undefined &&  email !== '' && !validator.isEmail(email)){
                msg= msg === undefined ? 'Please type correct email id.' : `${msg} Please type correct email id.`
            }
            next(createError(400, msg));
        }
    }
    catch (error) {
        next(createError(500, error.message));
    }
}