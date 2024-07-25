import '../css/dropdown.css'
import { cloneElement, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useScreen } from './ScreenProvider';
const Toggle = ({trigger,menu}) => {
   const {setWidth} = useScreen();
   const [open,setOpen] = useState(false);
   const navigate = useNavigate();
   const handleOpen = ()=>{
      setOpen(!open);
   }

   return ( 
      <div className='dropdown'>
         {
            cloneElement(trigger,{
               src: (open)?trigger.props.icon[1]:trigger.props.icon[0],
               onClick: handleOpen
            })
         }
         {(open)&& (<div className='flex-col menu bg-black-gradient
          rounded-ss mr-4 items-center' style={setWidth('10rem')}>
            {
               (open)&&(
                  menu.map((menuItem,index)=>{
                     return (
                        <div key={index} className={'cursor-pointer hover w-5 p-1'} onClick={ () =>{
                           navigate(menuItem.navigate)
                           setOpen(false);
                        }}> {menuItem.tittle}</div>
                              
                     )
                  })
               )
            }
         </div>)}
      </div>
    );
}
 
export default Toggle;