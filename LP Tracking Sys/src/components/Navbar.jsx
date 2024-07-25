import '../css/navbar.css';
import {logo,menu,close} from '../assests/index';
import {navlinks} from '../constants/index'
import Toggle from './Toggle';
import { useScreen } from './ScreenProvider';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
   const {screen,screenWidth,setWidth} = useScreen();
   const navigate = useNavigate();

   return ( 
      <>
      <nav className={'w-full navbar flex shadow-xs'}>
         <div className={`flex logo ${screenWidth<450?'mlr-auto':'w-20'} justify-center items-center cursor-pointer`} 
           onClick={()=>navigate(`/`)}>
            <img src={logo} alt="logo" />
            <figcaption>BORROWERS</figcaption>
         </div>
         <div style={screen ==='xs'?setWidth('40rem'):setWidth('40%')}></div>
         <ul className={`${(screenWidth<500) ? 'hidden' : 'flex'} `} style={setWidth('40rem')}>
            {
               navlinks.map((navlink,index)=>(
                  <div key={index} 
                     className={'cursor-pointer hover p-sm rounded-sm'}
                     onClick={()=> navigate(navlink.navigate)}>
                     {navlink.tittle}
                     </div>))
            }
         </ul>
         {
            (screenWidth<500) && <Toggle trigger={<img icon={[menu,close]} alt="menu" />} menu={navlinks}></Toggle>
         }
      </nav>
      <nav className={'w-full bg-black z-2 flex'} style={{height:(screenWidth<500)?'4.406rem':'5rem'}}>

      </nav>
      </>
    );
}
 
export default Navbar;