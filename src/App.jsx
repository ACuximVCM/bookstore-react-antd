import { Button, Col, Divider, Row, Table } from 'antd';
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import './App.css'
import { Field, Form, Formik } from 'formik';
import { AntInput } from './components/antd/AntInput';
import { AntSelect } from './components/antd/AntSelect';
import { AntDatePicker } from './components/antd/AntDatePicker';
import { AntTextarea } from './components/antd/AntTextarea';
import ValidationSchema from './schema/ValidationSchema';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const App = () => {
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
      responsive:['lg'] 
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
          <DeleteOutlined style={{ color: 'red' }} onClick={() => { { removeBook(item) } }} />
        </>
      }
    },
  ]

  const obtainAuthorsList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/authors-list')
      .then(res => res.json());

    setAuthorsList(res);
  };

  const obtainBooksList = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/book')
      .then(res => res.json());

    setBooksList(response);
  };

  const removeBook = async (item) => {
    const deleteBook = {
      method: 'DELETE',
    };

    await fetch(`http://127.0.0.1:8000/api/book/${item}`, deleteBook)
      .then(res => {
        console.log(res);
        obtainBooksList();
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
        validationSchema={ValidationSchema}

        onSubmit={async (values, { resetForm }) => {
          let payload = {
            ...values,
            release_date: values.release_date.format('YYYY-MM-DD')
          }

          const post = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          };

          await fetch('http://127.0.0.1:8000/api/books', post)
            .then(res => {
              obtainBooksList();
              if (res.status >= 200 && res.status <= 200) {
                toast.success("Libro insertado correctamente");
              } else {
                toast.error('Ha ocurrido un error');
              }
            })
            .catch(err => {
              toast.error('Ha ocurrido un error');
            });

          resetForm();
        }}
      >
        {({
          values,
          submitCount,
          handleSubmit,
          setFieldValue,
          handleChange,
          handleBlur,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit} autoComplete='off'>
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

            <Row gutter={24} type="flex" style={{ marginTop: '10px'}} justify="end">
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
        pagination={{position: ['bottomCenter']}}
        columns={ColumnsForm}
        dataSource={booksList} />
    </>
  )
}

export default App;

