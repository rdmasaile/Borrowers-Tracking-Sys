import React, { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import  { privateAxios } from "../api/axios";

const usePrivateAxios = () => {
   const refresh = useRefreshToken();
   const {auth,setAuth} = useAuth();

   useEffect(()=>{
      const requestInterceptor = privateAxios.interceptors.request.use(
         config => {
            if (!config.headers['Authorization']) {
               config.headers['Authorization'] = `Bearer ${auth?.token}`;
               console.log(config.headers['Authorization']);
            }
            return config;
         },error =>Promise.reject(error)
      );

      const resposeInterceptor = privateAxios.interceptors.response.use(
         res => res,
         async(error)=>{
            const prevRequest = error?.config;
            if(error?.response?.status === 403 && !prevRequest?.sent){
               prevRequest.sent = true
               const newToken = await refresh();
               prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
               console.log("New token : ",newToken);
               return privateAxios(prevRequest);
            }
            return Promise.eject(error);
         }
      ) 

      return () => {
         privateAxios.interceptors.request.eject(requestInterceptor);
         privateAxios.interceptors.response.eject(resposeInterceptor);
      }
   },[auth,refresh]);
   return privateAxios;
};

export default usePrivateAxios;
