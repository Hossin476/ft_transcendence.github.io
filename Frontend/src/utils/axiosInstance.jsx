import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment'

const baseURL = "http://localhost:8000/api"

const tokens = localStorage.getItem('tokens')
const refresh_token = tokens ? JSON.parse(tokens).refresh : null
const access_token = tokens ? JSON.parse(tokens).access : null


if (access_token === "")
    console.log("No token found")

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': access_token ? `JWT ${access_token}` : null,
    },
})

axiosInstance.interceptors.request.use(async req => {

    if (tokens) {
        req.headers.Authorization = `JWT ${access_token}`
        const user = jwtDecode(access_token)
        const isExpired = moment.unix(user.exp).diff(moment()) < 1;    
        
        if (isExpired) {
            try {
                const res = await axios.post(`${baseURL}/auth/token/refresh/`, { refresh: refresh_token })
                if (res.ok) {
                    const data = await res.json()   
                    localStorage.setItem('tokens', JSON.stringify(data))
                    req.headers.Authorization = `JWT ${access_token}`
                    console.log(res.data)
                }
                else {
                    await axios.post(`${baseURL}/auth/logout/`, { refresh_token })
                    localStorage.removeItem('tokens')
                }
            } catch (error) {
                console.error('Error refreshing token:', error)
                await axios.post(`${baseURL}/auth/logout/`, { refresh_token })
                localStorage.removeItem('tokens')

            }
        }
    }
    return req
})

export default axiosInstance