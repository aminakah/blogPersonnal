/* eslint-disable prettier/prettier */



  const getLocalAccessToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  
  
//   const updateLocalAccessToken = (token) => {
//     let user = JSON.parse(localStorage.getItem("user"));
//     user.accessToken = token;
//     localStorage.setItem("user", JSON.stringify(user));
//   };
  
//   const getUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
//   };
  
//   const setToken = (user) => {
//     console.log(JSON.stringify(user));
//     localStorage.setItem("user", JSON.stringify(token));
//   };
  
//   const removeUser = () => {
//     localStorage.removeItem("user");
//   };
  
  const TokenService = {
    // getLocalRefreshToken,
    getLocalAccessToken,
    // updateLocalAccessToken,
    // getUser,
    // setUser,
    // removeUser,
  };
  
  export default TokenService;