import { useContext, createContext, useState, useEffect } from "react";

const ScreenContext = createContext(null);

const ScreenProvider = ({children}) => {
   const [state, setState] = useState('idle');
   const [screen, setScreen] = useState();
   const [screenWidth, setScreenWidth] = useState({});

   const setScreenSize = (width)=>{
      if(width <= 450){
         setScreen('xs')
         setScreenWidth(width)
      }else if(width <= 600){
         setScreen('ss')
         setScreenWidth(width)
      }else if(width <= 768){
         setScreen('sm')
         setScreenWidth(width)
      }else if(width <= 1060){
         setScreen('md')
         setScreenWidth(width)
      }else if(width <= 1200){
         setScreen('lg')
         setScreenWidth(width)
      }else if(width <=1700){
         setScreen('xl')
         setScreenWidth(width)
      }
   }
   useEffect(()=>{
      if(state === 'idle'){
         setScreenSize(window.innerWidth) 
         setState('loaded')
      }

   },[screen,state]);

   window.addEventListener('resize', (e) =>{
      setScreenSize(window.innerWidth);
   })
   const setWidth = (value)=>{
      return {width:value}
   }
   const setHeight = (value)=>{
      return {height:value}
   }
   const value = {
      screen,
      screenWidth,
      setWidth,
      setHeight
   }
   return ( 
      <ScreenContext.Provider value={value}>
         {children}
      </ScreenContext.Provider>
    );
}

export const useScreen = ()=>{
   return useContext(ScreenContext);
}
export default ScreenProvider;