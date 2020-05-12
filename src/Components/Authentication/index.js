import axios from 'axios'


const link = 'http://localhost:8888/react-demo-auth/'
 

export const login = async ({ email, password }) => {
 
  let user
  let response = await axios.post(`${link}login.php`,
    {
      email: email,
      password: password
    }/*,
    { withCredentials: true }*/
  )

  if (await response.data.success === 1) {
    user = response.data.user.reverse()
    user = user[0]
    sessionStorage.setItem('userData', JSON.stringify(user));
  } 
    console.log ('response.data', response.data);
  return user
}


export const register = async ({ username, email, password }) => {
  let response = await axios.post(`${link}register.php`,
    {
      username: username,
      email: email,
      password: password
    }/*,
    { withCredentials: true }*/
  )
  
  return await response.data
}

 