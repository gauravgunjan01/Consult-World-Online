import React from 'react';

const PlanetConsideration = ({ data }) => {
    console.log("PlanetConsideration::::", data?.planets);

    return (
        <div>
            {data?.planets?.map((planet, index) => (
                <div className='text-wrap text-justify'
                    key={index}
                    dangerouslySetInnerHTML={{ __html: planet.prediction }}
                    style={{ marginBottom: '16px' }}
                />
            ))}
        </div>
    );
};

export default PlanetConsideration;
