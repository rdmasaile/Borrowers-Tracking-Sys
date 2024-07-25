import React from "react";
import axios from "../api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
   const {auth,setAuth} = useAuth();
   const refresh = async ()=>{
      try {
         const res = await axios.get('/refresh',{
            withCredentials:true,
            headers:{            
               authorization:`Bearer ${auth?.token}`,
            }
         });
         setAuth(prev => {
            console.log(prev);
            console.log(res.data.token);
            return {...prev,token:res.data.token};
         });
         return res.data.token; 
      } catch (error) {
         console.error(error);
      }
   }

   return refresh;
};

export default useRefreshToken;
