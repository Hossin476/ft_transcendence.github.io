import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom' 
import moment from 'moment'

const baseURL = "http://localhost:8000/api"

const token = localStorage.getItem('access') ? localStorage.getItem('access').replace(/"/g, '') : ""
const refresh_token = localStorage.getItem('refresh') ? localStorage.getItem('refresh').replace(/"/g, '') : ""

if (token === "")
    console.log("No token found")

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `JWT ${token}` : null,
    },
})

axiosInstance.interceptors.request.use(async req => {

    if (token) {
        req.headers.Authorization = `JWT ${token}`
        const user = jwtDecode(token)
        const isExpired = moment.unix(user.exp).diff(moment()) < 1;    
        
        if (isExpired) {
            try {
                const res = await axios.post(`${baseURL}/auth/token/refresh/`, { refresh: refresh_token })
                if (res.status === 200) {
                    localStorage.setItem('access', res.data.access)
                    req.headers.Authorization = `JWT ${res.data.access}`
                    console.log(res.data)
                }
                else {
                    await axios.post(`${baseURL}/auth/logout/`, { refresh_token })
                    localStorage.removeItem('user')
                    localStorage.removeItem('access')
                    localStorage.removeItem('refresh')
                }
            } catch (error) {
                console.error('Error refreshing token:', error)
                await axios.post(`${baseURL}/auth/logout/`, { refresh_token })
                localStorage.removeItem('user')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
            }
        }
    }
    return req
})

export default axiosInstance