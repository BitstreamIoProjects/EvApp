import axios from "axios";

export const getAllEvByIdApi= async(headers,EvId) => {
  
    var x = `http://ec2-18-235-255-201.compute-1.amazonaws.com:8080/evstation/`+EvId
    console.warn(x)
    return await axios({
        method: "GET",
        url: x,
        headers: headers,
    
      })
    };