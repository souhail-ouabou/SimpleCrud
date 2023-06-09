import {
    PROJET_CREATE_REQUEST,
    PROJET_CREATE_SUCCESS,
    PROJET_CREATE_FAIL,
    PROJET_CREATE_RESET,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_DETAILS_RESET,
    PROJET_UPDATE_REQUEST,
    PROJET_UPDATE_SUCCESS,
    PROJET_UPDATE_FAIL,
    PROJET_UPDATE_RESET,
    ALL_PROJECTS_REQUEST,
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,
    ALL_PROJECTS_RESET,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL,
   
} from '../actions/constants/articleConstants'
export const ArticleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROJET_CREATE_REQUEST:
            return { loading: true }
        case PROJET_CREATE_SUCCESS:
            return { loading: false, success: true, project: action.payload }
        case PROJET_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PROJET_CREATE_RESET:
            return { success: false }
        default:
            return state
    }
}

export const articleDetailsReducer = (
    state = {
        article: {},
    },
    action
) => {
    switch (action.type) {
        case PROJECT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PROJECT_DETAILS_SUCCESS:
            return {
                loading: false,
                article: action.payload,
                success: true,
            }
        case PROJECT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PROJECT_DETAILS_RESET:
            return {}
        default:
            return state
    }
}

export const updateArticleReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case PROJET_UPDATE_REQUEST:
            return { loading: true }
        case PROJET_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                article: action.payload,
            }
        case PROJET_UPDATE_FAIL:
            return { loading: false, err: action.payload }
        case PROJET_UPDATE_RESET:
            return {  success: false }
        default:
            return state
    }
}
export const ListAllArticlesReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ALL_PROJECTS_REQUEST:
            return {
                loading: true,
            }
        case ALL_PROJECTS_SUCCESS:
            return {
                loading: false,
                articles: action.payload,
            }
        case ALL_PROJECTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ALL_PROJECTS_RESET:
            return { articles: [] }
        default:
            return state
    }
}

export const projectDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROJECT_DELETE_REQUEST:
            return { loading: true }
        case PROJECT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PROJECT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
