import React from 'react';
import { Table as AntdTable } from 'antd';

const Table = (props) => {
    return <>
        <AntdTable
            columns={props.ColumnsForm}
            dataSource={props.booksList} />
    </>
};

export default Table;