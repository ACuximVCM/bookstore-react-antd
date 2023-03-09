import axios from "axios";

const getAuthorsList = async () => {
    return await axios
        .get('http://127.0.0.1:8000/api/authors-list');
};

export {
    getAuthorsList
};