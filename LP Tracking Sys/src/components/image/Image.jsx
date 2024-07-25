import React from 'react';
import './image.css';

const Image = ({src,alt,type,...rest}) => {
   return (
      <img src={src} alt={alt} 
         className={`${(type==='icon')?'icon':(type==='normal')?'normal':''}`} {...rest}/>
   )
}

export default Image;