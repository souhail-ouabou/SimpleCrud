import React, { useEffect, useState } from 'react'
import Article from './Article'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlusCircle } from 'react-icons/fa'
import { listAllArticles, listMyProjects } from '../redux/actions/articleAction'
import Search from './Search'
const Home = () => {
    const [first, setfirst] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUserReducer = useSelector((state) => state.getUserReducer)
    const { loading, user, isLogged } = getUserReducer

    const getAllProjectsReducer = useSelector(
        (state) => state.getAllProjectsReducer
    )
    const ListAllArticles = useSelector((state) => state.ListAllArticles)
    const {
        loading: loadingAllArticles,
        articles: AllArticles,
        error: errorAllArticles,
    } = ListAllArticles
    const articleDelete = useSelector((state) => state.projectDelete)
    const {
        loading: loadingArticleDelete,
        error: errorArticleDelete,
        success: SuccessArticleDelete,
    } = articleDelete
    const keyword = window.location.pathname.split('/')[2]
    useEffect(() => {
        if (isLogged || SuccessArticleDelete) {
            dispatch(listAllArticles(keyword))
        }
    }, [dispatch, SuccessArticleDelete, isLogged, keyword])

    return (
        <>
            <Search />
            {isLogged && (
                <div className="flex items-center justify-center h-28">
                    <Link to="add">
                        <button
                            className="flex items-center px-6 py-3 text-purple-100 bg-purple-600 rounded-md font-medium"
                            type="button"
                        >
                            <FaPlusCircle className="mr-2 text-white justify-center items-center" />
                            Add Room
                        </button>
                    </Link>
                </div>
            )}

            {loadingAllArticles ? (
                <div className="flex flex-col items-center justify-center mt-8">
                    <span>Loading...</span>
                </div>
            ) : errorAllArticles && errorAllArticles ? (
                <div>errorAllArticles</div>
            ) : AllArticles && AllArticles.length === 0 ? (
                <div className="text-white text-xl flex flex-col items-center justify-center mt-8">
                    There is No Articles to show
                </div>
            ) : (
                <div className="mx-auto container py-2 px-6">
                    <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
                        {AllArticles &&
                            AllArticles.map((article) => (
                                <Article key={article._id} article={article} />
                            ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
