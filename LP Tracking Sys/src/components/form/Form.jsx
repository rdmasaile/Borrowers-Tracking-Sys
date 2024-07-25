import './form.css';
import Button from '../button/Button';
import { useScreen } from '../ScreenProvider';

const Form = ({heading,elements,handleChange,handleSubmit,buttonName,image,showImage,...rest}) => {
   const {screen,screenWidth,setWidth} = useScreen();
   return ( 
      <div className={`center`} style={{height:'80vh'}}>
         
         <div className={`form ${screen==='xs'?'w-full':' w-40 bg-black-gradient'} rounded-sm overflow-hidden p-1 justify-center items-center`} 
            style={{width:screenWidth<450?'98%':screenWidth<1000?'80%':'60%'}} >
            {(showImage)&&(<div className={`form-image relative ${screen==='xs'?'h-20': 'h-20'}`} >
               <p style={setWidth('5rem')} className={`bubble h-5 rounded-full left-40 top-0`} ></p> 
               <p style={setWidth('5rem')} className={`absolute bg-transperant rounded-full left-50 top-50 blue-shadow`} ></p> 
               <p style={setWidth('8rem')} className={`bubble h-8 rounded-full top-30 ${screen==='xs'||screen==='ss'?'right-0':'right-1'}`}></p>
               <p style={setWidth('5rem')} className={`bubble h-5 rounded-full left-3 bottom-0`}></p>  
            </div>)}
            <form action="" {...rest} onSubmit={(e)=>handleSubmit(e)}>
               <div className={`bg-grey h-3 p-xs`}>
                  <h2 className={`m-auto`}>{heading}</h2>
               </div>
               <hr />
               {
                  elements.map((element,index)=>{
                     return (
                        <div className="form-control" key={index}>
                           <Label name={element.label||element.name}></Label>
                           <Input prop={element} handleChange={handleChange}></Input>
                        </div>
                     )
                  })
               }
               <Button type={"submit"} name={buttonName||'Submit'} onClick={()=>{}} className={'w-full'}/>
               {/* <button type="submit" className={'m-auto bg-blue cursor-pointer w-full hover btn'}>{buttonName||'Submit'}</button> */}
            </form>
         </div>
      </div>
    );
}

export const Label = ({name,...rest})=> {
   rest.style = (rest.style) ? rest.style : { marginBottom:'.2rem',display: 'block'};
   return (
      <>
         <label htmlFor={name} {...rest}>{name}:</label>
      </>
   )
}


export const Input = ({prop, handleChange})=>{
   const {type,value,name, label,...rest} = prop;
   rest.style = (rest.style) ? rest.style : {padding:".8rem", marginBottom:'.5rem',display: 'block'};
   return (
      <>
         <input type={type} name={name} value={value||""} placeholder={`Enter ${label || name}`}  onChange={(e)=>handleChange(e.target)} {...rest} />
      </>
   ) 
}


export default Form;