import React, { useState } from 'react';
import './userpage.css'
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button'
// import Dashboard from '../../components/dashboard/Dashboard';
import Billing from '../../components/Billing';
import { search, Rd1 } from '../../assests';
import { Outlet } from 'react-router-dom';
import { useScreen } from '../../components/ScreenProvider';
import Profile from '../../components/Profile';
import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

axios.defaults.withCredentials = true;
let firstRender = true;

const UserPage = () => {
   const {screen,screenWidth} = useScreen();
   const {auth,setAuth} = useAuth()
   const {user} = auth
   // const user = {fname:'Reatile',lname:'Masaile',email:'rdmasaile@gmail.com',password:'12345678'}

   const refreshToken = async ()=>{
      const res = await axios.get(`http://192.168.43.108:40000/refresh`,{
         withCredentials:true,
      }).catch(err=>{
         console.log(err);
         return;
      });
      console.log(res.data);
      return res.data;
   }

   useEffect(()=>{
      if(firstRender){
         firstRender=false;
         // sendRequest().then(data=>{setUser(data.user)}).catch(err=>console.log(err));
      }
      // let interval = setInterval(()=>{
      //    refreshToken().then(data=>{setUser(data.user)})
      // },1000*50);

      // return ()=>clearInterval(interval);
   })
   return (
      <div className={`layout bg-black ${screen === 'xs'?'':''} flex`}>
         <Sidebar user={user} />
         <section className={`flex-col bg-black w-full mlr-auto`} style={{width:screenWidth<=450?'100%':'99%'}}>
            <section className={`head w-full bg-black p-1 shadow-xs flex ${screenWidth<=450?'justify-center':'justify-between'}`}>
               <form action="" className={`overflow-hidden bg-blue`}>
                  <div className={`h-3 flex overflow-hidden items-center`}>
                     <input type="text" className={`h-3 p-sm rounded-md`}/>
                     <Button type={'submit'} name={`search`} onClick={()=>{}}>
                        <img src={search} alt="" />
                     </Button>
                  </div>
               </form>
               <Profile profile={Rd1} user={user} username={user.fname} classAppend={`xsHidden`}/>
            </section>
            
            <section className={`content w-full h-full`}>
               {/* <Billing/> */}
               <Outlet/>
            </section>
         </section>

      </div>
   )
}

export default UserPage;