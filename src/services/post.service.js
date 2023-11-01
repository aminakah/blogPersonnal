/* eslint-disable prettier/prettier */

import api from "./api";

const getAllPosts=()=>{
   return api.get('/posts')
      
  }

  const addPost=(data)=>{
   return api.post('/post', data);
      
  }

const getPostsById=(id)=>{
 return api.get(`/posts/${id}`)
    
}
const saveComment=(id,data)=>{
   return api.post(`/posts/${id}/comments`,data)
  }

const getCommentSByPostId=(id)=>{
   return api.get(`/posts/${id}/comments`)
  }
  
  
const listUser=()=>{
   return api.get(`/user`)
} 
const postPublic=()=>{
   return api.get(`/rechercherUser?search=${searchTerms}`)

}


const addFriend=(friendId)=>{
   return api.post(`addFriend/${friendId}`)
   
}
const listFriends=()=>{
   return api.post(`/friends`)

}
const getFriendArticles=()=>{
   return api.get(`/postFriend`)

}
export const  PostService={
   getPostsById,
   saveComment,
   listUser,
   listFriends,
   addFriend,
   postPublic,
   getFriendArticles,
   getAllPosts,
   getCommentSByPostId,
   addPost
  }
  