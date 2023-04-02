import {
    PROJET_CREATE_REQUEST,
    PROJET_CREATE_SUCCESS,
    PROJET_CREATE_FAIL,
    MY_PROJECTS_REQUEST,
    MY_PROJECTS_SUCCESS,
    MY_PROJECTS_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJET_UPDATE_REQUEST,
    PROJET_UPDATE_SUCCESS,
    PROJET_UPDATE_FAIL,
    ALL_PROJECTS_REQUEST,
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL,
    ADD_COL_MOODBOARD_REQUEST,
    ADD_COL_MOODBOARD_FAIL,
    ADD_COL_MOODBOARD_SUCCESS,
    ADD_ABOUT_BRAND_SUCCESS,
    ADD_ABOUT_BRAND_FAIL,
    DELETE_MOODB_IMG_REQUEST,
    DELETE_MOODB_IMG_SUCCESS,
    DELETE_MOODB_IMG_FAIL,
    DELETE_BRIEF_FILE_REQUEST,
    DELETE_BRIEF_FILE_SUCCESS,
    DELETE_BRIEF_FILE_FAIL,
    ADD_ABOUT_BRAND_REQUEST,
} from './constants/articleConstants'
import { toast } from 'react-toastify'

import axios from 'axios'
export const CreateArticle = (creds) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJET_CREATE_REQUEST,
        })
        //      console.log('before token')

        const { token } = getState()
        //     console.log('after token')

        //    console.log("ha token mn l action :",token)
        const config = {
            headers: {
                Authorization: token,
            },
        }
        const { data } = await axios.post(`/articles/addarticle`, creds, config)
        dispatch({
            type: PROJET_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROJET_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
        toast.dismiss()
        toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const Getarticletdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_DETAILS_REQUEST,
        })
        //     console.log("before token");

        const { token } = getState()
        console.log('after token')

        console.log(token)
        const config = {
            headers: {
                Authorization: token,
            },
        }

        const { data } = await axios.get(`/articles/details/${id}`, config)
        console.log(data)

        dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const UpdateArticle = (article) => async (dispatch) => {
    try {
        dispatch({ type: PROJET_UPDATE_REQUEST })
        const { data } = await axios.put(
            `/articles/updatearticle/${article._id}`,
            article
        )
        dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PROJET_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const UpdateTaskssClient = (id, taskss) => async (dispatch) => {
    try {
        dispatch({ type: PROJET_UPDATE_REQUEST })

        const { data } = await axios.put(`/projets/updatetasks/${id}`, {
            taskss,
            id,
        })

        dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PROJET_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const UpdateSpecProject =
    (id, index, specification) => async (dispatch) => {
        try {
            dispatch({ type: PROJET_UPDATE_REQUEST })

            const { data } = await axios.put(`/projets/updatespecprj/${id}`, {
                specification,
                index,
                id,
            })

            dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })
        } catch (error) {
            dispatch({
                type: PROJET_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const UpdateColorsProject = (id, colorsState) => async (dispatch) => {
    try {
        dispatch({ type: PROJET_UPDATE_REQUEST })

        toast.dismiss()
        toast.loading('Please wait...', {
            position: toast.POSITION.TOP_CENTER,
        })

        const { data } = await axios.put(`/projets/updateprjcolors/${id}`, {
            colorsState,
            id,
        })

        dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })

        toast.dismiss()
        toast.success('Colors saved with success !', {
            position: toast.POSITION.TOP_CENTER,
        })
    } catch (error) {
        dispatch({
            type: PROJET_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const UpdateFontsProject = (id, fontStyles) => async (dispatch) => {
    try {
        dispatch({ type: PROJET_UPDATE_REQUEST })
        toast.dismiss()
        toast.loading('Please wait...', {
            position: toast.POSITION.TOP_CENTER,
        })

        const { data } = await axios.put(`/projets/updateprjfonts/${id}`, {
            fontStyles,
            id,
        })

        dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })

        toast.dismiss()
        toast.success('Font styles saved with success !', {
            position: toast.POSITION.TOP_CENTER,
        })
    } catch (error) {
        dispatch({
            type: PROJET_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const UpdateContentsProject =
    (id, Contents, success = false) =>
    async (dispatch) => {
        try {
            dispatch({ type: PROJET_UPDATE_REQUEST })

            if (success) {
                toast.dismiss()
                toast.loading('Please wait...', {
                    position: toast.POSITION.TOP_CENTER,
                })
            }

            const { data } = await axios.put(
                `/projets/updateprjcontents/${id}`,
                { Contents, id }
            )

            dispatch({ type: PROJET_UPDATE_SUCCESS, payload: data })
            if (success) {
                toast.dismiss()
                toast.success('Contents saved with success !', {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
        } catch (error) {
            dispatch({
                type: PROJET_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const listAllArticles =
    (keyword = '') =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: ALL_PROJECTS_REQUEST,
            })
            const { token } = getState()
            console.log('after token')

            console.log(token)
            const config = {
                headers: {
                    Authorization: token,
                },
            }

            const { data } = await axios.get(
                `/articles/allarticles?keyword=${keyword}`,
                config
            )
            console.log(data)
            dispatch({
                type: ALL_PROJECTS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: ALL_PROJECTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }
export const DeleteArticle = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROJECT_DELETE_REQUEST })
        const { token } = getState()

        const config = {
            headers: {
                Authorization: token,
            },
        }
        const { data } = await axios.delete(
            `/articles/deletearticle/${id}`,
            config
        )

        dispatch({ type: PROJECT_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PROJECT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
