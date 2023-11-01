/* eslint-disable prettier/prettier */

import api from "./api"
const getPostsById=(id)=>{
 return api.get(`/posts/${id}`)
    
}
const saveComment=(id,data)=>{
   return api.post(`/posts/${id}/comments`,data)
  }
  
const listUser=()=>{
   return api.get(`/user`)
} 
const postPublic=()=>{
   return api.get(`/rechercherUser?search=${searchTerms}`)

}
const rechercherUser=(searchTerm)=>{
   return api.get(`/rechercherUser?search=${searchTerm}`)
   
}

const addFriend=(friendId)=>{
   return api.post(`addFriend/${friendId}`)
   
}
const listFriends=()=>{
   return api.post(`/friends`)

}
const getFriendArticles=()=>{
   return api.post(`/friends`)

}
export const  PostService={
   getPostsById,
   saveComment,
   listUser,
   rechercherUser,
   listFriends,
   addFriend,
   postPublic,
   getFriendArticles
  }
  