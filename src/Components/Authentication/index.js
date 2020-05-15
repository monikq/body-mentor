import axios from 'axios'


const link = 'http://localhost:8888/react-demo-auth/'
 

export const login = async ({ email, password }) => {
 
  let user
  let response = await axios.post(`${link}login.php`,
    {
      email: email,
      password: password
    }
    , 
    { 
      //withCredentials: true,
      timeout: 3* 1000
    }
  ).catch (error => {
    console.log(error);
  })

  if(!response){
    var obj = {success: 0, msg: "Network Error. Check your internet connection and try again."}
    return obj
  }

  //whos responsibility should that be?
  if (await response.data.success === 1) {
    user = response.data.user
    sessionStorage.setItem('userData', JSON.stringify(user));
  } 

  console.log(response.data);

  return await response.data
}


export const register = async ({ username, email, password }) => {
  let response = await axios.post(`${link}register.php`,
    {
      username: username,
      email: email,
      password: password
    }, 
    { 
      withCredentials: true,
      timeout: 3* 1000
    }
  ).catch (error => {
    console.log(error);
  })

  if(!response){
    var obj = {success: 0, msg: "Network Error. Check your internet connection and try again."}
    return obj
  }
  
  return await response.data
}

 