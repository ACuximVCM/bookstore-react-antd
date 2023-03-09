import { Button, Col, Divider, Popconfirm, Row, Table } from 'antd';
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import './App.css'
import { Field, Form, Formik } from 'formik';
import { AntInput } from './components/antd/AntInput';
import { AntSelect } from './components/antd/AntSelect';
import { AntDatePicker } from './components/antd/AntDatePicker';
import { AntTextarea } from './components/antd/AntTextarea';
import ValidationBook from './schema/ValidationBook';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';

const FormBook = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  
  const ColumnsForm = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: (item) => `name_${item.original.id}`,
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: (item) => `author_${item.original.id}`,
      render: (item) => <b> {item.full_name} </b>
    },
    {
      title: "Fecha de lanzamiento",
      dataIndex: "release_date",
      key: (item) => `release_date_${item.original.id}`,
      responsive: ['lg']
    },
    {
      title: "Detalles",
      dataIndex: "details",
      key: (item) => `details_${item.original.id}`,
      responsive: ['md'],
    },
    {
      title: "Editorial",
      dataIndex: "editorial",
      key: (item) => `editorial_${item.original.id}`,
      responsive: ['lg']
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: (item) => `price_${item.original.id}`,
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: (item) => `actions_${item.original.id}`,
      render: (item) => {
        return <>
          <EditOutlined style={{ marginRight: '10px' }} onClick={() => { console.log(item) }} />
          <Popconfirm
            title="¿Desea eliminar el registro?"
            onConfirm={() => { { removeBook(item) } }}
          >
            <Button type='large'>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Popconfirm>
        </>
      }
    },
  ]

  // Request para obtener los libros
  const obtainBooksList = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/book')
      .then(res => res)
      .catch(err => { console.log(err) })

    if (response.data) {
      setBooksList(response.data);
    }
  };

  //Request para obtener los autores
  const obtainAuthorsList = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/authors-list')
      .then(res => res)
      .catch(err => console.log(err));

    if (res.data) {
      setAuthorsList(res.data);
    }
  };

  //Request para eliminar un libro
  const removeBook = async (item) => {
    await axios.delete(`http://127.0.0.1:8000/api/book/${item}`)
      .then(res => {
        obtainBooksList();
        toast.success('El registro se eliminó correctamente');
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    obtainAuthorsList();
    obtainBooksList();
  }, []);

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{}}
        style={{ width: '100%' }}

        //validacion con Yup
        validationSchema={ValidationBook}

        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          let payload = {
            ...values,
            release_date: values.release_date.format('YYYY-MM-DD')
          }

          let response = await axios.post('http://127.0.0.1:8000/api/books', payload)
            .then(res => res)
            .catch(err => { console.log(err) });

          if (response.data) {
            resetForm();
            obtainBooksList();
            toast.success("Libro insertado correctamente");
          } else {
            toast.error('Ha ocurrido un error');
          }
        }}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          /* and other goodies */
        }) => (
          <Form autoComplete='off'>
            {/* Nombre del libro */}
            <Row gutter={24}>
              <Col xs={24} md={24}>
                <Field
                  style={{ width: '100%' }}
                  component={AntInput}
                  type="text"
                  name="name"
                  id="name"
                  label="Nombre"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={values.name}
                  min="5"
                />
              </Col>
            </Row>

            {/* Nombre del autor */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  type="text"
                  label="Autor"
                  name="author_id"
                  id="author_id"
                  placeholder="Nombre del autor"
                  onChange={(value) => setFieldValue('author_id', value)}
                  min="5"
                  component={AntSelect}
                  options={authorsList}
                />
              </Col>
            </Row>

            {/* Fecha de lanzamiento */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  name="release_date"
                  id="release_date"
                  label="Fecha de lanzamiento"
                  placeholder="Selecciona una fecha"
                  onChange={(value) => setFieldValue("release_date", value)} min="5"
                  component={AntDatePicker}
                />
              </Col>
            </Row>

            {/* Detalles */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  name="details"
                  id="details"
                  label="Detalles"
                  placeholder="Detalles del libro"
                  onChange={handleChange}
                  component={AntTextarea}
                />
              </Col>
            </Row>

            {/* Editorial */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  name="editorial"
                  id="editorial"
                  label="Editorial"
                  placeholder="Editorial del libro"
                  onChange={handleChange}
                  component={AntInput}
                />
              </Col>
            </Row>

            {/* Precio */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  component={AntInput}
                  type="text"
                  name="price"
                  id="price"
                  label="Precio"
                  placeholder="Precio"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {/* Idioma */}
            <Row gutter={24}>
              <Col xs={24}>
                <Field
                  style={{ width: '100%' }}
                  type="text"
                  label="Idioma"
                  name="language"
                  id="language"
                  placeholder="Idioma"
                  onChange={(value) => setFieldValue("language", value)}
                  min="5"
                  component={AntSelect}
                  options={[{
                    value: 'Es', 'label': 'Español',
                  }, {
                    value: 'En', 'label': 'Inglés'
                  }]}
                />
              </Col>
            </Row>

            <Row gutter={24} type="flex" style={{ marginTop: '10px' }} justify="end">
              <Col>
                <Button htmlType='submit' type='primary' size='large'>
                  <SaveOutlined /> Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      <Divider>Lista de libros</Divider>

      <Table
        pagination={{ position: ['bottomCenter'] }}
        columns={ColumnsForm}
        dataSource={booksList} />
    </>
  )
}

export default FormBook;

