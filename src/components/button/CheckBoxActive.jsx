import React from 'react'

const CheckBoxActive = ({ w = 'w-4', h = 'h-4' }) => {
    return (
        <div className={`rounded-[50%] border border-secondary bg-secondary ${w} ${h}`}></div>
    )
}

export default CheckBoxActive;