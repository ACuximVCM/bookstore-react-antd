import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import ValidationAuthor from '../../schema/ValidacionAuthor';
import { Button, Col, Row } from 'antd';
import { AntInput } from '../antd/AntInput';
import { toast, Toaster } from 'react-hot-toast';
import { getAuthorsList } from '../../apiRequest/getAuthorsList';
import Table from '../authors/Table';
import postAuthors from '../../apiRequest/postAuthors';

const FormAuthor = () => {
    const [authorsList, setAuthorsList] = useState([]);

    useEffect(() => {
        const response = getAuthorsList();
        response
            .then(res => {
                setAuthorsList(res.data)
            })
    }, [])


    return (
        <>
            <div>Autores</div>
            <Toaster />
            <Formik
                initialValues={{}}

                validationSchema={ValidationAuthor}

                onSubmit={async (values, { resetForm }) => {
                    let response = postAuthors(values);
                    response
                        .then(function (res) {
                            if (res.data) {
                                toast.success('Autor insertado correctamente');
                                resetForm();
                                getAuthorsList().then(res => {
                                    setAuthorsList(res.data);
                                })
                            } else {
                                toast.error('Ha ocurrido un error')
                            }
                            console.log(res);
                        })
                }}
            >
                {
                    ({ values, handleChange, handleBlur }) => (
                        <Form>
                            <Row>
                                <Col span={24}>
                                    <Field
                                        label='Nombres'
                                        type="text"
                                        name='first_name'
                                        id='first_name'
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        component={AntInput}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Field
                                        label='Apellidos'
                                        type="text"
                                        name='last_name'
                                        id='last_name'
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        component={AntInput}
                                    />
                                </Col>
                            </Row>
                            <Button htmlType='submit' type='primary'>Enviar</Button>
                        </Form>
                    )
                }

            </Formik>

            <Table 
                label={'Autores'}
                dataSource={authorsList}
            />

        </>
    )
};

export default FormAuthor;