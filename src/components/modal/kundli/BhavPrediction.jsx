import React from 'react';

const BhavPrediction = ({ data }) => {
    console.log("BhavPrediction::::", data?.bhav);

    return (
        <div>
            {data?.bhav?.map((bhav, index) => (
                <div 
                    key={index}  className='text-wrap text-justify'
                    dangerouslySetInnerHTML={{ __html: bhav.prediction }} 
                    style={{ marginBottom: '16px' }} 
                />
            ))}
        </div>
    );
};

export default BhavPrediction;
