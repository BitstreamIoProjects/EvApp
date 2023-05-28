import axios from "axios";

export const getAllEvstationApi= async(headers) => {
    return await axios({
        method: "GET",
        url: `http://ec2-18-235-255-201.compute-1.amazonaws.com:8080/evstation`,
        headers: headers,
      })
    };