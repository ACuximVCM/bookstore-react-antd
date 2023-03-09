import React from 'react'
import { Button, Divider, Popconfirm, Table as AntdTable } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import removeAuthor from '../../apiRequest/removeAuthor';
import { getAuthorsList } from '../../apiRequest/getAuthorsList';

const Table = (props) => {

    const dataSource = props.dataSource;

    const columns = [
        {
            title: "Id",
            dataIndex: "value",
            key: (item) => `name_${item.value}`,
        },
        {
            title: "Nombre completo",
            dataIndex: "label",
            key: (item) => `name_${item.label}`,
        },
        {
            title: "Acciones",
            dataIndex: "value",
            key: (item) => `actions_${item.original.id}`,
            render: (item) => {
              return <>
                <EditOutlined style={{ marginRight: '10px' }} onClick={() => { console.log(item) }} />
                <Popconfirm
                  title="¿Desea eliminar el sig. registro?"
                  onConfirm={() => { {
                        removeAuthor(item)
                            .then(res => {
                                getAuthorsList();
                            }) 
                    } }}
                >
                  <Button type='large'>
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Button>
                </Popconfirm>
              </>
            }
          },
    ]

    return (
        <>
        <Divider>Lista de {props.label}</Divider>
        <AntdTable 
            columns={columns}
            dataSource={dataSource}
        />
        </>
    )
}

export default Table;