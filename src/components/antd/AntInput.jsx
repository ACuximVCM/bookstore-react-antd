import { Input } from 'antd'
import React from 'react'

export const AntInput = (props) => {
    return (
        <>
            <label htmlFor={props.name}> {props.label} </label>
            <Input
                {...props}
            />
        </>
    )
}
