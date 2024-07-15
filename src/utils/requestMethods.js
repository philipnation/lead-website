import axios from 'axios'


export const BASE_URL = 'http://192.168.1.179:5000/api'
const userInfo = localStorage.getItem('userInfo')


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",        
        Authorization: `Bearer ${userInfo?.token}`
    },
})
export const publicRequest = axios.create({
    baseURL: BASE_URL,
    header: {
        "Content-Type": "application/json"
    },
})