import {useState} from 'react';
import { flower } from '../assests';
import Form from '../components/form/Form';
import { useScreen } from '../components/ScreenProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
   const {screen} = useScreen();
   const [input, setInput] = useState({});
   const navigate = useNavigate();
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
         type:"email",
         label:"Email",
         name:"email",
         value:input.email,
         className:'rounded-sm'
      },
      {
         type:"password",
         label:"Password",
         name:"password",
         value:input.password,
         className:'rounded-sm'
      }
   ]
   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value})
   }
   const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post(`http://192.168.43.108:40000/user`,input).then((res)=>{
         console.log(res);
         if(res.status === 200){
            navigate(`/login`);
         }
      }).catch((err)=>console.error(err))
   }
   return ( 
      <>
         <Form heading={'Sign in'} showImage={true} elements={elements} handleChange={handleChange} handleSubmit={handleSubmit} image={flower}
            buttonName={'Register'} className={`bg-primary h-full p-sm rounded-sm`}></Form>
      </>
    );
}
 
export default Signup;