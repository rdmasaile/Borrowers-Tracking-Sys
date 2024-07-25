import Button from "./button/Button";

const Nothing = ({value,children,...rest}) => {
   return ( 
      <div style={{width:'100%',height:'10rem',display:'flex',justifyContent:'center',alignItems:'center'}} {...rest}>
         <p className={`mr-xs`}>
            There are no {value}.
         </p>
         <div className={`bg-blue flex justify-center h-2 rounded-xs items-center`}>
            {children}
         </div>
      </div>
   );
}
 
export default Nothing;