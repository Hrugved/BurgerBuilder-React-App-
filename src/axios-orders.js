import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a6531.firebaseio.com/'
})

export default instance