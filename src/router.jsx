import { createBrowserRouter } from 'react-router-dom';
import FormAuthor from './components/form/FormAuthor';
import FormBook from './FormBook';

const router = createBrowserRouter([
    {
        path: '/books',
        element: <FormBook />,
        errorElement: 'La pagina no existe'
    },
    {
        path: '/authors',
        element: <FormAuthor />
    },
]);

export default router; 