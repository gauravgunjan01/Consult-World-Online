import React from 'react';

const SignPrediction = ({data}) => {
  return (
    <div className='text-wrap text-justify' dangerouslySetInnerHTML={{ __html: data?.sign }} />
  )
}

export default SignPrediction;