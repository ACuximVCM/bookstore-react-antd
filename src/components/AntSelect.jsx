import { Select } from 'antd'
import React from 'react'

export const AntSelect = (props) => {
    return (
        <>
            <label>{props.label}</label>
            <Select
                {...props}
                style={{ width: '100%' }}
                optionLabelProp={'label'}
                optionFilterProp={'label'}
                allowClear
                showSearch
            />
        </>
    )
}
