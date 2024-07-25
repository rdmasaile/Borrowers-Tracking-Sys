import React from 'react';

const Table = ({tittle,head,data,options,children,parent,...rest}) => {
   const {heading,table,thead,th,tbody,tr} = (options)?options:'';
   return (
      <>
         <div className={`rounded-sm bg-primary w-full overflow-scroll p-1`} {...parent}>
            <TTittle heading={tittle} {...heading}/>
            <table {...table} {...rest}>
            {(children)?children:(
               <>
                  <Thead thead={head} th={th} {...thead}/>
                  <TBody {...tbody}>
                     {
                        data.map((data,index)=>(<TRow key={index} tRow={data} tr={tr} />))
                     }
                  </TBody>
               </>)}
            </table>
         </div>
      </>
   )
}
export const TTittle = ({heading,children,...rest})=>{
   return (
      <div {...rest}>
         {
            (children)?children:(<p {...rest} style={{fontSize:'1.5rem',fontWeight:'bold'}}>{heading}</p>)
         }
      </div>
   );
}
export const TBody = ({children,...rest})=>{
   return (
      <tbody {...rest}>
         {children}
      </tbody>
   );
}
export const Thead = ({thead,th,children,...rest})=>{
   return (
      <thead {...rest}>
         {(children)?children:(
            <tr>
               <Theading th={th} thead={thead}/>
            </tr>
         )}
      </thead>
   );
}
export const TRow = ({tRow,children,...rest})=>{
   return (
      <tr {...rest}>
         {(children)?children:(
            <TData tdata={tRow}/>
         )}
      </tr>
   );
}
export const Theading = ({thead,...rest})=>{
   return (
      <>
         { thead.map((th,index)=>(<th key={index} {...rest}>{th}</th>)) }
      </>
   );
}
export const TData = ({tdata,...rest})=>{
   return (
      <>
         { tdata.map((td,index)=>(<td key={index} {...rest}>{td}</td>)) }
      </>
   );
}
export default Table;