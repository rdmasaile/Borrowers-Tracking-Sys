import React from 'react';
import { useScreen } from './ScreenProvider';

const Amount = ({tittle,amount,component,currency}) => {
   const {setWidth,screenWidth} = useScreen();
   return (
      <div className={`flex bg-primary h-5 mr-xs rounded-sm overflow-hidden`} style={setWidth("97%")}>
         <div className={`h-full ${screenWidth<768?'hidden':'flex items-center justify-center'} `}
          style={setWidth("40%")} >
            <h2 className={`text-align-center`}>{currency}</h2>
         </div>
         <div className={`flex-col w-full text-align-center bg-dark-grey justify-center h-full`}>
            <div className={`w-full `}>{tittle}</div>
            <div className={`w-full ${component==='income'||(amount>0&&component==='balance')?'color-green':'color-red'} 
               ${screenWidth<600?'':'text-1'}`}>
                  {`M`+ ((amount<0? (-1*amount):amount))}
            </div>
         </div>
      </div>
   )
}

export default Amount;
