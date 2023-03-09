import * as Yup from 'yup';

const ValidationAuthor = Yup.object().shape({
    first_name: Yup.string().required('Requerido'),
    last_name: Yup.string().required('Requerido'),
});

export default ValidationAuthor;