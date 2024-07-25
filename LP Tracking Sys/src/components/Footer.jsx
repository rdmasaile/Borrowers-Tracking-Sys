import { footerLinks } from "../constants";
import { useScreen } from "./ScreenProvider";
const Footer = () => {
   const {screen,setWidth} = useScreen();
   const {socialLinks,links} = footerLinks
   return (
      <section className={`m-auto p-1 flex justify-between ${screen==='xs'}`} style={screen==='xs'?setWidth('98%'):setWidth('80%')}  >
         <div >
            {
               socialLinks.map((link,index)=>(<FooterLink key={index} link={link}/>))
            }
         </div >
         <div>
            {
               links.map((link,index)=>(<FooterLink key={index} link={link}/>))
            }
         </div>
      </section>
   ); 
}
const FooterLink = ({link}) => {
   const {setWidth,setHeight} = useScreen();
   const {icon,tittle,onClick} = link;
   return (
      <div className={`flex cursor-pointer hover p-sm items-center mb-1`} style={setHeight('25px')} onClick={()=>onClick(tittle)}>
         {
            (icon)&& <img src={icon} style={setWidth('25px')} alt={tittle} />
         }       
         <figcaption>{tittle}</figcaption>
      </div>
   );
}
 
export default Footer;