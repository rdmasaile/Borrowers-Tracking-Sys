import React from 'react'
import './button.css'
const Button = ({type,name,children,onClick,...rest}) => {
  return (
      <button type={type||"button"} name={name} onClick={()=>onClick(name)} {...rest}>{children||name}</button>
  )
}

export default Button;