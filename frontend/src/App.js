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

    // when refresh the token exsit but the logged change to false so we logged out so that's we do that

    useEffect(() => {
        if (token) {
            dispatch(dispatchLogin()) //WE GOT  logged change to false so we transfer it to true
            //Get user information cuz after get token useeffecr re compile and get error mn dispatchLogin

            dispatch(dispatchGetUser(token))
        }
    }, [token, dispatch])
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add" element={<FormArticle />} />
                    <Route path="/edit/:id" element={<EditArticle />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
