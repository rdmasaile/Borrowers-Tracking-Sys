import { useState } from "react";

const Tooltip = ({tittle,children,show,position,...rest}) => {
   const {top,left} = position;
   const [showTooltip, setShowTooltip] = useState(false);

   return (
      <div {...rest} onMouseOver={()=>setShowTooltip(true)} onMouseOut={()=>setShowTooltip(false)} style={{position:"relative"}}>
         {children}
         { 
            (showTooltip && show)&&(<div className="absolute left-3 bg-inherit top-0" style={{top:top,left:left}}>
               {tittle}
            </div>)
         }
      </div>
   )
}

export default Tooltip;