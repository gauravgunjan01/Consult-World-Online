import React from 'react'

const SectionHeading = ({ title, paragraph }) => {
    return (
        <div className='space-y-1'>
            <h4 className='text-lg lg:text-xl font-medium text-center tracking-tight uppercase'>{title}</h4>
            <p className='text-[13px] lg:text-sm font-medium text-center'>{paragraph}</p>
        </div>
    )
}

export default SectionHeading