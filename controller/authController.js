import sendResponse from './baseController.js';
import createError from '../utils/error.js';
import authService  from '../service/authService.js';
import validator from 'validator';

const login = async(req, res, next)=>{
    console.log("in log int")
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
        console.log(error)
        next(createError(500, error.message));
    }
}


/**
 * register : It registered the user with email and password
 * @param {body(email, password)} req
 * @param {success message} res
 */
const register = async (req, res, next) => {
    try {
        const {password, email} = req.body;
        if (email !== undefined && email !== '' && validator.isEmail(email) && password !== undefined && password !== '' ) {
            const data = await authService.register(req);
            if (data.data && data.data !== null) {
                console.log("success")
                res.status(201).send(sendResponse(data.message, data.data));
            }
            else {
                console.log(data)
                next(createError(data.status, data.message));
            }
        }
        else {
            next(createError(400, "Provide correct input data."));
        }
    }
    catch (error) {
        console.log(error);
        next(createError(500, error.message));
    }
}

/**
 * logout : It logs out the user
 * @param {token} req
 * @param {success message} res
 */
const logout = async (req, res, next) => {
    try {
        const data = await authService.logout(req, res);
        res.status(200).send(sendResponse("Logged out.", data));
    } catch (err) {
        next(createError(500, err.message));
    }
};

export {login, logout, register}