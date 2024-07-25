import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./button/Button";
import { Input, Label } from "./form/Form";

const Profile = ({profile,username,user,...rest}) => {
   return (
      <ProfileModal profile={profile} {...rest} username={username} user={user}/>
   );
}
export const ProfileModal = ({profile,username,user,classAppend,...rest}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [input, setInput] = useState(user);

   const showModal = ()=>{
      setIsOpen(true);
   }
   const hideModal = ()=>{
      setIsOpen(false);
   }

   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value})
   }
   const handleSubmit = (e) =>{
      e.preventDefault();
      if(!input.fname||!input.lname||!input.email||!input.password){
         alert('Enter all details');
         return;
      }
      console.log(input);
      setInput({});
      hideModal();
   }
  return (
    <>
      <div className={`flex cursor-pointer hover p-sm items-center ${classAppend}`} onClick={showModal} {...rest}>
         <img src={profile} alt="Profile" width={'30px'} height={'30px'} className={`mr-1 rounded-full`}/>
         {
            <figcaption className="xsHidden">{username}</figcaption>
         }
      </div>

      <Modal show={isOpen} onHide={hideModal} size='sm' centered={true} animation={true} className={`centered`} >
         <Modal.Header>
            {'Edit Profile'}
         </Modal.Header>
         <Modal.Body>
            <form action="" method='POST' onSubmit={(e)=>handleSubmit(e)}>
               <div className="form-control">
                  <Label name={'First Name'}></Label>
                  <Input prop={{type:'text',name:'fname',placeholder:'Enter First Name',value:input.fname}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Last Name'}></Label>
                  <Input prop={{type:'text',name:'lname',placeholder:'Enter Last Name',value:input.lname}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Email'}></Label>
                  <Input prop={{type:'email',name:'email',placeholder:'Enter Email',value:input.email}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Password'}></Label>
                  <Input prop={{type:'password',name:'password',placeholder:'Enter Password',value:input.password}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Confirm Password'}></Label>
                  <Input prop={{type:'password',name:'confirmPassword',placeholder:'Enter Confirm Password',value:input.confirmPassword}}  handleChange={handleChange}></Input>
               </div>
               <Modal.Footer>
                  <Button type={'submit'} onClick={(e)=>{}} name={'Save'}/>
                  <Button type={'button'} onClick={hideModal} name={'cancel'}/>
               </Modal.Footer>
            </form>
         </Modal.Body>
      </Modal>
    </>
   )
}
export default Profile;