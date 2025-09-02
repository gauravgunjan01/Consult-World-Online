import React from 'react'

const CheckBoxInactive = ({ w = 'w-4', h = 'h-4' }) => {
    return (
        <div className={`rounded-[50%] border-2 border-secondary ${w} ${h}`}></div>
    )
}

export default CheckBoxInactive;