import { stats } from "../constants";
import { useScreen } from "./ScreenProvider";

const Stats = () => {
   const {screen,setWidth} = useScreen()

   return (
      <section style={screen==='xs'?setWidth('98%'):setWidth('80%') } 
         className={`m-auto p-1 ${screen === 'xs'||screen === 'ss'?` grid grid-col-2 grid-col-gap-1`:`flex `}`}>
         {
            stats.map((stat,index)=>(<Stat key={index} stat={stat}/>))
         }
      </section>
   );
}
const Stat = ({stat})=>{
   const {screen,screenWidth,setHeight} = useScreen()
   const {total,tittle} = stat
   return (
      <div className={`flex items-center ${(tittle==='Transactions'&&screenWidth<=450)&&'justify-center'} w-full flex-wrap`}>
         <p className={`${screen === 'xs'||screen === 'ss'?'text-1':'text-2'} mr-xs text-bold`}>{total}</p>
         <p className={`text-gradient` } style={setHeight('1.2rem') }>{tittle}</p>
      </div>
   )
}
export default Stats;