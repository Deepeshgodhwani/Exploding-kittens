const {
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  REQUEST_TIMED_OUT,
} = require("./httpConstants");



export const handleError =(error)=>{
          
    switch (error.response? error.response.status:null){
        case FORBIDDEN:
        return "FORBIDDEN"
        case NOT_FOUND:
        return "Server could not find the requested information."
        case UNAUTHORIZED:
        return "UNAUTHORIZED"
        case BAD_REQUEST:
        return "BAD_REQUEST"
        case INTERNAL_SERVER_ERROR:
        return "INTERNAL_SERVER_ERROR"
        case REQUEST_TIMED_OUT:
        return "REQUEST_TIMED_OUT"
        default :
         return error.message
    }
}
