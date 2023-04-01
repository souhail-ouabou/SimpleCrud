import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_TOKEN, GET_TOKEN_FAIL, GET_TOKEN_REQUEST } from './constants/userConstants'
//fetch data from db
//send the data to the DB so that it knows to signin the user
//log in the user ..
export const dispatchToken = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOKEN_REQUEST,
        })

        const res = await axios.post('/user/refresh_token', null)
        dispatch({
            type: GET_TOKEN,
            payload: res.data.access_token,
        })
        

    } catch (error) {
        dispatch({
            type: GET_TOKEN_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        })
        toast.dismiss()
        toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
    
}
