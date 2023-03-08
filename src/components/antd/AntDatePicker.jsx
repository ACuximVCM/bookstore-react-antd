import { DatePicker } from 'antd'
import React from 'react'

export const AntDatePicker = (props) => {
    return (
        <>
            <label htmlFor={props.name}> {props.label} </label>
            <DatePicker
                {...props}
            />
        </>
    )
}
