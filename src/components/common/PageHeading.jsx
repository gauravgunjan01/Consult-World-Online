import React from 'react';

const PageHeading = ({ title }) => {
    return (
        <>
            {/* <div className='text-black text-2xl font-medium max-md:px-10 font-[500]rounded-full flex items-center justify-center self-start text-nowrap'>{title}</div> */}
            <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded"></div>
                <h2 className="text-lg font-semibold text-primary">{title}</h2>
            </div>
        </>
    )
}

export default PageHeading;