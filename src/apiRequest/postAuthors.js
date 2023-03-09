import axios from "axios";

const postAuthors = async (values) =>{
    return await axios.post('http://127.0.0.1:8000/api/authors', values);
}

export default postAuthors;