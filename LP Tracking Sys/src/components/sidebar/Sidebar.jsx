import React from 'react';
import './sidebar.css';
import { sidebarLinks } from '../../constants';
import { dleft, dright, home, Rd, Rd1 } from '../../assests';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Image from '../image/Image';
import { useScreen } from '../ScreenProvider';
import Profile from '../Profile';
import Tooltip from '../Tooltip';

const Sidebar = ({user}) => {
   const {screenWidth} = useScreen();
   const navigate = useNavigate();
   const [expandSidebar,setExpandSidebar] = useState(true);
   // const user = {fname:'Reatile',lname:'Masaile',email:'rdmasaile@gmail.com',password:'12345678'}
   
   return (
      <>
      <div className={`bg-primary sidebar z-3`}>
         <div className='flex flex-end'>
               <Image type={'icon'} src={expandSidebar?dleft:dright} alt={'Left arrow'} className={`xsHidden ${expandSidebar?'w-15':'w-30'}`} onClick={()=>{setExpandSidebar(!expandSidebar)}}/>
         </div>
         <Tooltip tittle={user.fname} position={screenWidth<450?{top:"-2rem",left:'0rem'}:{top:'0.3rem',left:"3rem"}} 
           show={!expandSidebar} className={`cursor-pointer hover`}>
            <Profile username={expandSidebar?user.fname:''} profile={Rd1} user={user} style={{padding:'3px',marginTop:screenWidth<450?'0px':'.8rem'}}/>
         </Tooltip>
         
         <div className={`${screenWidth<450?'flex w-90':'flex-col'} justify-center items-center`}>
            {
               sidebarLinks.map((sLink,index)=>(
                  <Tooltip key={index} tittle={sLink.tittle} position={screenWidth<450?{top:"-2rem",left:'0rem'}:{top:"0.1rem",left:"2rem"}} 
                    show={!expandSidebar} className={`mt-1 cursor-pointer hover w-full`}>
                     <div  className={`flex relative w-full  hover p-xs`} 
                     onClick={()=>{navigate(`${(sLink.tittle === "Home")?sLink.navigate : sLink.navigate}`)}}>
                        <img src={sLink.icon} width='20px' height={'20px'} alt={sLink.tittle} className={`${expandSidebar?'mr-sm':''}`}/>
                        {
                           (expandSidebar)&&<figcaption className={`xsHidden`}>{sLink.tittle}</figcaption>
                        }
                     </div>
                  </Tooltip>
               ))
            }
         </div>
      </div>
      <div className={`${(screenWidth<=450)? 'sidebar':'xsHidden'}`} style={{marginRight:(expandSidebar)?'163px':'80px'}}>

      </div>
      </>
   )
}

export default Sidebar;
// const Profile = ({expandSidebar}) => {
//    return (
//       <div className={`flex xsHidden w-full items-center bg-black-gradient mb-2`} onClick={()=>{}}>
//          <img src={Rd} alt="Profile" width={'30px'} height={'30px'} className={`mr-1 rounded-full`}/>
//          {
//             (expandSidebar)&&<figcaption>{'Reatile'}</figcaption>
//          }
//       </div>
//    )
// }