/* eslint-disable prettier/prettier */

import api from "./api";

const getAllUsers=()=>{
   return api.get('/user')
      
  }



const addFriend=(friendId)=>{
   return api.post(`/addFriend/${friendId}`)
   
}

const getFriends=()=>{
   return api.get(`/get-friend`)
   
}

const getFriendRequests=()=>{
   return api.get(`/get-friend-request`)
   
}




const rechercherUser=(searchTerm)=>{
   return api.get(`/rechercherUser?search=${searchTerm}`)
   
}

export const  UserService={
   addFriend,
   getAllUsers,
   getFriends,
   rechercherUser,
   getFriendRequests
  }
  