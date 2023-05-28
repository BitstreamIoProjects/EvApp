import ApiManager from './ApiManager';

export const userRegistration = async data=>{
    // console.warn("Reached Userreg" +JSON.stringify(data))
    try {
        const result= await ApiManager('signup',{
            method:'POST',
            headers:{
                'content-type': 'application/json',
            },
            data:data
        });
        console.log('API Hit success'+ JSON.stringify(result))
        return result;
        
    } catch (error) {
        return error.response.data;
    }
}