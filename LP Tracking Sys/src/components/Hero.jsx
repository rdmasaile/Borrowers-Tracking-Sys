import { useScreen } from "./ScreenProvider";
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";
const Hero = () =>  { 
   const {screen,screenWidth,setWidth} = useScreen()
   const navigate = useNavigate();
   return (
      <section className={`${screenWidth<600?'flex-col':'flex'} p-1 justify-center m-auto items-center`} style={(screen==='xs')?setWidth('98%'):setWidth('80%')}>
         <div className={`${screenWidth<600?'h-full': 'h-30'} flex-col justify-center`} 
            style={(screenWidth<600)?setWidth('98%'):setWidth('50%')}>
            <p className={`${screen==='xs'||screen==='ss'?'text-1':'text-3'} text-bold text-white-gradient`} 
               >
               The Best <br />
               <span className={`mb-2 text-gradient`}> Expense Tracker.</span> <br />
            </p>
            <p className={`flex flex-wrap mt-sm`} style={screen==='xs'?setWidth('100%'):setWidth('80%')}>
               Lets take a better track of our Money so that we can make a better decisions.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet odit eius cupiditate minima
               assumenda.
            </p>
            <Button type={'button'} name={'Get Started'} onClick={(name)=>navigate(`/signin`)} className={`${screenWidth<600?'mt-2':'mt-1'}`}></Button>
         </div>   
         <div className={`${screenWidth<600?'mt-2':''} rounded-xs relative ${screenWidth<600?'h-20': 'h-30'}`}
            style={(screenWidth<600)?setWidth('98%'):setWidth('50%')}>
            <p style={setWidth('5rem')} className={`bubble h-5 rounded-full left-3 top-0`} ></p> 
            <p style={setWidth('5rem')} className={`absolute bg-transperant rounded-full left-50 top-50 blue-shadow`} ></p> 
            <p style={setWidth('8rem')} className={`bubble h-8 rounded-full top-30 ${screen==='xs'||screen==='ss'?'right-0':'right-1'}`}></p>
            <p style={setWidth('5rem')} className={`bubble h-5 ${screen==='sm'?'hidden':''} rounded-full left-30 top-30`}></p>
            <p style={setWidth('5rem')} className={`bubble h-5 rounded-full left-3 bottom-10`}></p>  
         </div>
      </section>
   );
};

export default Hero;