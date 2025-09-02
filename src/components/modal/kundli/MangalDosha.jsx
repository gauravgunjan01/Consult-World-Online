import React from 'react';

const MangalDosha = ({data}) => {
    console.log('MangalDosha', data);
    
  return (
    <div className='text-wrap'>{data?.mangalDosha?.info}</div>
  )
}

export default MangalDosha;