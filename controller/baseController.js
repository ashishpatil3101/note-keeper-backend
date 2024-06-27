/**
 * sendResponse : It sends the success response on triggering the api
 * @param {response message} message 
 * @param {response data} data 
 * @returns success response
 */
const sendResponse = (message, data) => {
    const response = {
        success: true,
        message: message,
        data: data
    };
    return response;
};


export default sendResponse;