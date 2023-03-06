import { Button, Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import './App.css'
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { AntInput } from './components/AntInput';
import { AntSelect } from './components/AntSelect';
import { AntDatePicker } from './components/AntDatePicker';
import moment from 'moment';
import { AntTextarea } from './components/AntTextarea';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  author_id: Yup.string().required('Requerido'),
  release_date: Yup.string().required('Requerido'),
  details: Yup.string().required('Requerido'),
  price: Yup.string().required('Requerido'),
  language: Yup.string().required('Requerido'),
});

const App = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [booksList, setBooksList] = useState([]);

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

  useEffect(() => {
    obtainAuthorsList();
    obtainBooksList();
  }, []);

  return (
    <>
      <Toaster />
      <Formik
      enableReinitialize
      initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          console.log(values);
        }}
      >
        {({
          values,
          submitCount
          /* and other goodies */
        }) => (
          <Form>
            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  component={AntInput}
                  type="text"
                  name="name"
                  id="name"
                  label="Nombre"
                  placeholder="Nombre"
                  onChange={(e) => { console.log(e.target.value) }}
                  min="5"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  type="text"
                  label="Autor"
                  name="author_id"
                  id="author_id"
                  placeholder="Nombre del autor"
                  onChange={(e) => { console.log(e) }}
                  min="5"
                  component={AntSelect}
                  options={authorsList}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  name="release_date"
                  id="release_date"
                  label="Fecha de lanzamiento"
                  placeholder="Selecciona una fecha"
                  onChange={(e) => { console.log(e) }}
                  component={AntDatePicker}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  name="details"
                  id="details"
                  label="Detalles"
                  placeholder="Detalles del libro"
                  onChange={(e) => { console.log(e.target.value) }}
                  component={AntTextarea}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  component={AntInput}
                  type="text"
                  name="price"
                  id="price"
                  label="Precio"
                  placeholder="Precio"
                  onChange={(e) => { console.log(e.target.value) }}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Field
                  style={{ width: '100%' }}
                  type="text"
                  label="Idioma"
                  name="language"
                  id="language"
                  placeholder="Idioma"
                  onChange={(e) => { console.log(e) }}
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

            <Row>
              <Col xs={12}>
                <Button htmlType='submit' type='primary'>
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>


      <hr />
      <hr />
      <table>
        <thead>
          <tr>
            <td>Titulo</td>
            <td>Autor</td>
            <td>Fecha de lanzamiento</td>
            <td>Detalles</td>
            <td>Editorial</td>
            <td>Precio</td>
            <td>Lenguaje</td>
          </tr>
        </thead>
        <tbody>
          {
            booksList.length > 0 && booksList.map((item, index) => {
              return <tr key={item.id}>
                <td>{item?.name}</td>
                <td>
                  {item?.author.first_name} {item.author.last_name}
                </td>
                <td>{item?.release_date}</td>
                <td>{item?.details}</td>
                <td>{item?.editorial}</td>
                <td>{item?.price}</td>
                <td>{item?.language}</td>
              </tr>
            })
          }
        </tbody>
      </table>


    </>
  )
}

export default App