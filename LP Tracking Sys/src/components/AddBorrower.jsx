import {useState} from 'react';
import Form from './form/Form';
import { useScreen } from './ScreenProvider';
import usePrivateAxios from "../hooks/usePrivateAxios";
import {useNavigate} from 'react-router-dom';

const AddBorower = () => {
   const {screen} = useScreen();
   const [input, setInput] = useState({});
   const navigate = useNavigate();
   const privateAxios = usePrivateAxios();
   const elements = [ 
      {
         type:"text",
         label:"First Name",
         name:"fname",
         value:input.fname,
         className:'rounded-sm'
      },
      {
         type:"text",
         label:"Last Name",
         name:"lname",
         value:input.lname,
         className:'rounded-sm'
      },
      {
         type:"text",
         label:"Village",
         name:"village",
         value:input.village,
         className:'rounded-sm'
      },
      {
         type:"tel",
         label: "Contacts",
         name:"contacts",
         value:input.contacts,
         className:'rounded-sm'
      },
      // {
      //    type:"number",
      //    label: "Amount",
      //    name:"amount",
      //    value:input.amount,
      //    className:'rounded-sm'
      // },
      // {
      //    type:"text",
      //    label: "description",
      //    name:"description",
      //    value:input.description,
      //    className:'rounded-sm'
      // },
      // {
      //    type:"checkbox",
      //    label: "Owing",
      //    name:"owing",
      //    value:input.owing,
      //    className:'rounded-sm'
      // },
   ]
   const handleChange = (target) =>{
      let {name,value} = target;
      if(name === 'owing'){
         value = target.checked;
      }
      setInput({...input,[name]:value});
   }
   const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log(input);
      if(!input.owing){
         alert('Enter all details');
         return;
      }
      const borrower = {fname:input.fname,lname:input.lname,village:input.village,contacts:input.contacts}
      try{
         const res = await privateAxios.post(`/borrower`,borrower);
         console.log(res.data);
         const transaction = {borrower_id:res.data.borrower.id,amount:input.amount,status:(input.owing)?1:2,description:input.description}

         const res2 = await privateAxios.post(`/transaction`,transaction);
         console.log(res);
         console.log(res2);
         if(res.status === 200){
            navigate(`/transactions`);
         }
      }catch(e){
         console.error(e);
      }
   }
   return (
      <>
         <Form heading={'Add Borrower'} showImage={true} elements={elements} handleChange={handleChange} handleSubmit={handleSubmit}
            buttonName={'Add'} className={`w-40 h-full bg-primary p-sm rounded-sm`}></Form>
      </>
    );
}
 
export default AddBorower;
