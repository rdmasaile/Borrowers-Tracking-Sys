import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from './button/Button';
import { trash,plus,edit } from '../assests';
import Image from './image/Image';
import { useScreen } from './ScreenProvider';
import Table, { TBody, Thead } from './Table';
import { Input, Label } from './form/Form';
import Nothing from './Nothing';
import usePrivateAxios from "../hooks/usePrivateAxios";

const OwingBorrowers = () => {
   const [borrowers, setBorrowers] = useState([]);
   const privateAxios = usePrivateAxios();
   // const {screenWidth} = useScreen()
   let checkedBorrowers = [];

   const handleCheckChange = (e,borrower) => {
      if(e.target.checked){
         checkedBorrowers.push(borrower);
         console.log(checkedBorrowers);
      }
   }
   const deleteBorrower = (borrower)=>{
      if(borrower){
         console.log(`Deleted ${borrower.name}`);
      }
      else if(checkedBorrowers[0]){
         checkedBorrowers.forEach((borrower)=>{
            console.log(`Deleted ${borrower.name}`);
         })
      }else{
         console.log('Nothing to delete');
      }
   }
   
   useEffect( ()=>{
      const controller = new AbortController();
      const sendRequest = async ()=>{
         try {      
            const res = await privateAxios.get(`/borrower/owing`,{
               signal:controller.signal
            });
            setBorrowers(res.data.borrowers);
            console.log(res.data);
         } catch (error) {
            console.error(error)   
         }
      }   
      sendRequest();
      return () =>{
         controller.abort();
      }
   },[]);

   return (
         
         <div className={`flex justify-between`}>
            <div className={`rounded-ss w-full mr-xs overflow-hidden`}>
               <div className={`flex bg-grey items-center justify-evenly`}>
                  <h2>Borrowers</h2>
                  <div className={`w-50`}></div>
                  <div className={`group`}>
                     {/* <EditBorrowerModal button={plus} modalHeader={'Add Borrower'} borrower={''}/> */}
                     {/* <Button className={`bg-inherit`} onClick={()=>deleteBorrower()}><Image type={'icon'} src={trash} alt={'Trash icon'}/></Button> */}
                  </div>
               </div>
               {(borrowers.length == 0)?
                  <Nothing value={'Owing Borrowers'} className={'bg-primary'}>
                  </Nothing>:(
                     <Table tittle={""} className={`table b-collapse text-align-center w-full bg-grey`} 
                        parent={{className:`w-full overflow-scroll bg-primary mr-xs`}}>
                        <Thead thead={['First Name','Last Name','Amount Borrowed','Amount Paid','Amount Owing']} className={`bg-grey h-3`}/>
                        <TBody>
                           {
                              borrowers.map((borrower,index)=>(
                                 <Borrower key={index} index={index} deleteBorrower={deleteBorrower} borrower={borrower}/>
                              ))
                           }
                        </TBody>
                     </Table> 
                  )
               }
            </div>
         </div>
   )
}
const Borrower = ({borrower,index,deleteBorrower})=>{
   const {fname,lname,amount_borrowed,amount_paid} = borrower;
   return (
      <tr className={`${(index%2 !== 1)?'bg-primary':'bg-black'} h-2`}>
         <td>{fname}</td>
         <td>{lname}</td>
         <td>{amount_borrowed}</td>
         <td>{amount_paid}</td>
         <td>{amount_borrowed - amount_paid}</td>
      </tr>
   )
}
export default OwingBorrowers;