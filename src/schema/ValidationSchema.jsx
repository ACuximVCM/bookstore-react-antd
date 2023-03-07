import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Requerido'),
    author_id: Yup.string().required('Requerido'),
    release_date: Yup.string().required('Requerido'),
    details: Yup.string().required('Requerido'),
    editorial: Yup.string().required('Requerido'),
    price: Yup.string().required('Requerido'),
    language: Yup.string().required('Requerido'),
});

export default ValidationSchema;