import {useState} from 'react';
import Form from '../components/form/Form';
import { useScreen } from '../components/ScreenProvider';
import axios from '../api/axios';
import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
   const {screen} = useScreen();
   const [input, setInput] = useState({});
   const navigate = useNavigate();
   const {auth,setAuth} = useAuth() 
   const elements = [ 
      {
         type:"email",
         label:"Email",
         name:"email",
         value:input.email,
         className:'rounded-sm'
      },
      {
         type:"password",
         label: "Password",
         name:"password",
         value:input.password,
         className:'rounded-sm'
      }
   ]
   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value});
   }
   const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(input);
      axios.post(`/login`,input).then((res)=>{
         console.log(res);
         if(res.status === 200){
            const {user,token} = res.data            
            setAuth({user,token})
            navigate(`/dashboard`);
         }
      }).catch((err)=>console.error(err))
   }
   return (
      <>
         <Form heading={'Login'} showImage={true} elements={elements} handleChange={handleChange} handleSubmit={handleSubmit}
            buttonName={'Log in'} className={`w-40 h-full bg-primary p-sm rounded-sm`}></Form>
      </>
    );
}
 
export default Login;
