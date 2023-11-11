import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:9000'
})

export const getPosts = async () => {
    const response = await api.get('/routes/doctors')
    return response.data
}