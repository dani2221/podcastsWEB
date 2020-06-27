import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://podcastmk-efccc.firebaseio.com/'
});

export default instance;