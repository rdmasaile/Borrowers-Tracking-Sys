import React, { useEffect,useState } from "react";
import Button from "./button/Button";
import { Label,Input } from "./form/Form";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import './form/form.css'

const AddTransaction = (props) => {
   const [borrowers, setBorrowers] = useState([]);
   const [input, setInput] = useState(props.transaction||{borrower_id:'',status:1});
   const privateAxios = usePrivateAxios();
   const navigate = useNavigate(); 
   const {auth} = useAuth();

   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value})
   }
   
   useEffect(()=>{
      const controller = new AbortController();
      const getBorrowers = async()=>{
         try {
            const res = await privateAxios.get(`/borrower`,{
               signal:controller.signal
            });
            setBorrowers(res.data.borrowers);

         } catch (error) {
            console.error(error);
         }
      }

      getBorrowers();

      return ()=>{
         controller.abort();
      }
   },[]);
   const handleSubmit = async (e)=>{
      e.preventDefault();
      // console.log(input.keys);
      if(!input.amount||!input.borrower_id||!input.status){
         alert('Enter all details');
         return;
      }
      const res = await privateAxios.post(`/transaction`,input)
      if(res.status === 200){
         console.log(res.data);
         setInput({});
      }      
   }
  return (
      <div className="center p-1">         
         <form className="w-40 h-full bg-primary p-sm rounded-sm" action="" method='POST' onSubmit={(e)=>handleSubmit(e)}>
            <div className="heading">
               <h1>Add Transaction</h1>
            </div>
            <div className="form-control">
               <label htmlFor="borrower">Borrower:</label>
               <select name="borrower_id" className={`h-3 p-xs`} value={input?.borrower_id} onChange={(e)=>handleChange(e.target)}>
                  <>
                     <option value="">(none)</option>
                     {borrowers.map((borrower,index)=><option key={index} name={borrower.fname} value={borrower.id}>{`${borrower.fname} ${borrower.lname}`}</option>)}
                  </>
               </select>
            </div>
            <div className="form-control">
               <Label name={'Amount'}></Label>
               <Input prop={{type:'number',name:'amount',value:input?.amount}} handleChange={handleChange}></Input>
            </div>
            <div className="form-control">
               <Label name={'Type'}></Label>
               <select name="status" className={`h-3 p-xs`} value={input?.status} onChange={(e)=>handleChange(e.target)}>
                  <option name={'owing'} value={1}>Owing</option>
                  <option name={'payment'} value={2}>Payment</option>
               </select>
            </div>
            <div className="form-control">
               <legend>Discription</legend>
               <textarea style={{height:'5rem',outline:'none',padding:'.5rem'}} name={`description`} onChange={(e)=>handleChange(e.target)}>
               </textarea>
            </div>
            <div className={`w-full flex justify-center`}>
               <Button type={'submit'} onClick={(e)=>{}} className='w-full ' name={'Save'}/>
            </div>
         </form>
      </div>
  )
};

export default AddTransaction;
