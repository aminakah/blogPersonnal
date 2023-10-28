/* eslint-disable prettier/prettier */

import api from "./api"
const getPostsById=(id)=>{
 return api.get(`/posts/${id}`)
    
}
const saveComment=(id,data)=>{
   return api.post(`/posts/${id}/comments`,data)
      
  }
  
export const  PostService={
   getPostsById,
   saveComment
  }
  