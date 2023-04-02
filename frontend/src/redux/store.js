import React from 'react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import {
    authReducer,
    userRegisterReducer,
    getUserReducer,
    userDetailsReducer,
} from './reducers/userReducer'

import {
    articleDetailsReducer,
    ArticleCreateReducer,
    updateArticleReducer,
    ListAllArticlesReducer,
    projectDeleteReducer,
} from './reducers/articleReducer'
import token from './reducers/tokenReducer'

const reducer = combineReducers({
    auth: authReducer,
    userRegister: userRegisterReducer,
    token,
    getUserReducer,
    ArticleCreateReducer,

    articleDetailsReducer,
    updateArticleReducer,

    userDetailsReducer,

    ListAllArticles: ListAllArticlesReducer,
    projectDelete: projectDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
const initialState = {
    auth: { userInfo: userInfoFromStorage },
}
const middelware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middelware))
)

const DataProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default DataProvider
