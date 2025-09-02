import React from 'react'

const NakshatraPrediction = ({data}) => {
    console.log("NakshatraPrediction:::", data?.nakshatra);
    
  return (
    <div className='text-wrap text-justify' dangerouslySetInnerHTML={{ __html: data?.nakshatra }} />
  )
}

export default NakshatraPrediction