import { toast } from "react-toastify";

const getData = async (baseUrl, url, headers = {}) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        ...headers,
      },
    });
    const responseData = await response.json();
    if (responseData.ackbool === 0) {
      toast.error(responseData.message);
      throw new Error(responseData.message);
    } else {
      return responseData;
    }
  } catch (error) {
    throw error;
  }
};
const postData = async (baseUrl, url, data={}, headers={}) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        ...headers,
      },
      body: JSON.stringify({...data}),
    });
    const responseData = await response.json();
    if (responseData.ackbool === 0) {
      toast.error(responseData.message);
    }
    else{
      return responseData;
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message);
    throw error;
  }
};
const putData = async(baseUrl,url, data , headers={})=>{
  try {
    const response = await fetch(`${baseUrl}${url}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        ...headers
      },
      body:JSON.stringify({
        ...data
      })
    });
    const responseData = await response.json();
    if(responseData.ackbool===0){
      toast.error(responseData.message);
      throw new Error(responseData.message);
    }
    else{
      return responseData;
    }
  } catch (error) {
    throw error;
  }
}
const deleteData = async (baseUrl, url, headers = {}) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "Delete",
      headers: {
        ...headers,
      },
    });
    const responseData = await response.json();
    if (responseData.ackbool === 0) {
      toast.error(responseData.message);
      throw new Error(responseData.message);
    } else {
      return responseData;
    }
  } catch (error) {
    throw error;
  }
};
export{
    getData,
    postData,
    putData,
    deleteData,
}
