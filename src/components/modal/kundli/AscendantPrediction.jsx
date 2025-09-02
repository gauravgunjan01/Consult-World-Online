import React from 'react'

const AscendantPrediction = ({data}) => {

    console.log("AscendantPrediction:::", data);
    
  return (
    <div className='text-wrap text-justify' dangerouslySetInnerHTML={{ __html: data?.ascendant }} />
  )
}

export default AscendantPrediction