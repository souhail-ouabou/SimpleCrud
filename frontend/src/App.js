import { Button, Card, Navbar } from 'flowbite-react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom/dist'
import Article from './components/Article'
import Login from './components/Login'
import Nav from './components/Nav'
import { dispatchToken } from './redux/actions/tokenAction'
import { useDispatch, useSelector } from 'react-redux'
import {
    dispatchLogin,
    dispatchGetUser,
    fetchUser,
} from './redux/actions/authAction'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Home from './components/Home'
import FormArticle from './components/FormArticle'
import EditArticle from './components/EditArticle'
import ArticleDetails from './components/ArticleDetails'

function App() {
    const getUserReducer = useSelector((state) => state.getUserReducer)
    const { user, isAdmin, isLogged: isLoggedgetuserReducer } = getUserReducer
    const auth = useSelector((state) => state.auth)
    const { userInfo, isLogged } = auth
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            dispatch(dispatchToken())
        }
    }, [auth.isLogged, dispatch])

    useEffect(() => {
        if (token) {
            dispatch(dispatchLogin())

            dispatch(dispatchGetUser(token))
        }
    }, [token, dispatch])
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add" element={<FormArticle />} />
                    <Route path="/details/:id" element={<ArticleDetails />} />
                    <Route path="/edit/:id" element={<EditArticle />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
