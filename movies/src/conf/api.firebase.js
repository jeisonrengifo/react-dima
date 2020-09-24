import * as axios from 'axios'

const apiFirebase = axios.create({
    baseURL: 'https://films-7a99e.firebaseio.com/'
});

export default apiFirebase;