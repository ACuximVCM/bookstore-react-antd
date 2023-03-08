import TextArea from 'antd/es/input/TextArea'
import React from 'react'

export const AntTextarea = (props) => {
    return (
        <>
            <label htmlFor={props.name}> {props.label} </label>
            <TextArea
                {...props}
            />
        </>
    )
}
