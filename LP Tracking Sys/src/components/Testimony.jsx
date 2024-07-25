import { testimonies } from "../constants/index";
import { useScreen } from "./ScreenProvider";
const Testimony = () => {
   const {screen,setWidth} = useScreen();
   
   return ( 
      <section style={(screen==='xs')?setWidth('98%'):setWidth('80%')} className={`p-1 m-auto items-center`}>
         <div className={`w-full`}>
            <h1>TESTIMONIES</h1>
            <div className={`${screen === 'xs'?`flex-col `:
               screen === 'ss'?`grid justify-items-center`:`flex justify-evenly` }
               m-auto items-center `}>
            {
               testimonies.map((testimony,index)=>(<Testmony key={index} index={index} testimoniesLength={testimonies.length} testimony={testimony}/>))
            }
            </div>
         </div>
      </section>
    );
}
const Testmony = ({testimony,testimoniesLength,index})=>{
   const {image,discription} = testimony;
   const {screen,setWidth} = useScreen();
   return (
      <div className={`flex-col items-center mt-1 rounded-sm bg-black-gradient 
         ${(index%2 === 0 && index+1===testimoniesLength)?`grid-col-1`:''}`} 
         style={screen === 'xs'?setWidth('98%'):screen === 'ss' ? setWidth('98%'):setWidth(`${100/testimoniesLength-0.5}%`)}>
         <img src={image} className={`rounded-full `} style={setWidth('70%')} alt="profile" />
         <figcaption className={`h-5 mt-1 bg-black-gradient w-full rounded-sm p-1`}>{discription}</figcaption>
      </div>
   );
}
export default Testimony;