import ApiManager from "./ApiManager";


export const user_Login = async data => {
 
  try {
    const result = await ApiManager('signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
