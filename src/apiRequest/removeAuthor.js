import axios from 'axios';

const removeAuthor = async (id) => {
    return await axios.delete(`http://127.0.0.1:8000/api/author/${id}`)
}

export default removeAuthor;