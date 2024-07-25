import React from 'react';
import { plus } from '../assests';
import Image from './image/Image';

const Widgets = () => {
  return (
    <div className={`h-full w-full center`}>
      <Image type={'icon'} src={plus} alt={'plus'}/>
    </div>
  )
}

export default Widgets;