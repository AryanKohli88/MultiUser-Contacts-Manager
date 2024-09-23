const {constants} = require("../constants")

const errorHandelder = (err, req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR: res.json({title: "Validation Failed",message: err.message, stackTrace: err.stack});
        break;
        case constants.NOT_FOUND:
            res.json({title: "Not Found",message: err.message, stackTrace: err.stack});
        break;
        case constants.UNAUTHORISED:
            res.json({title: "Unauthorised",message: err.message, stackTrace: err.stack});
        break;
        case constants.FORBIDDEN:
            res.json({title: "FORBIDDEN",message: err.message, stackTrace: err.stack});
        break;
        case constants.Server_error:
            res.json({title: "Server error",message: err.message, stackTrace: err.stack});
        break;
        default: console.log("No error");
    }
};
module.exports = errorHandelder;