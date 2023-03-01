import { Button, DatePicker, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Formik } from 'formik';
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import './App.css'

const App = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [booksList, setBooksList] = useState([]);

  const obtainAuthorsList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/authors_list')
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
        initialValues={{}}
        onSubmit={async (values, { setSubmitting }) => {
          console.table([values]);

          const post = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          };

          await fetch('http://127.0.0.1:8000/api/books', post)
            .then(res => {
              obtainBooksList();
              if (res.status >= 200 && res.status <= 200) {
                toast.success("LIBRO INSERTADO CORRECTAMENTE");
              } else {
                toast.error('ha ocurrido un error');
              }
            })
            .catch(err => {
              toast.error('ha ocurrido un error');
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} autoComplete='off'>
            <label>Nombre del Libro</label>
            <Input placeholder="Nombre de libro..." name='name' /> <br />
            <label>Fecha de lanzamiento</label>
            <DatePicker style={{ width: '100%' }} name='release_date' placeholder='Elige una fecha' /> <br />
            <label htmlFor="">Autor</label>
            <Select
              name="author_id"
              id="author"
              style={{ width: '100%' }}
              showSearch
              optionFilterProp='label'
            >
              {
                authorsList.map((item, index) => {
                  return <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.first_name + ' ' + item.last_name}
                  >
                    {item.first_name} {item.last_name}
                  </Select.Option>
                })
              }
            </Select>
            <br />
            <label>Detalles</label>
            <TextArea name="details" cols="30" rows="10" />
            <br />
            <label>Editorial</label>
            <Input placeholder="Nombre de editorial..." name='editorial' />
            <br />
            <label>Precio</label>
            <InputNumber style={{ width: '100%' }} name='price' /> <br />
            <br />
            <label>Lenguaje</label>
            <Input name='language' type="text" /><br />
            <br />
            <Button htmlType='submit'>Enviar</Button>

            <hr />
            <p>{JSON.stringify(errors)}</p>
          </form>

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
