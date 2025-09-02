import React from 'react';

const KaalsarpDosha = ({data}) => {
    console.log('KaalsarpDosha::', data);
    
  return (
    <div className='text-wrap'>{data?.kaalsarpDosha?.info}</div>
  )
}

export default KaalsarpDosha;