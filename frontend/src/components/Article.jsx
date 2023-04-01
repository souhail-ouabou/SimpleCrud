import { Card } from 'flowbite-react'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteArticle } from '../redux/actions/articleAction'
const Article = ({ article }) => {
    let dispatch = useDispatch()
    const getUserReducer = useSelector((state) => state.getUserReducer)
    const { loading, user, isLogged } = getUserReducer
    const deletehandler = (id) => {
        if (window.confirm('Are You Sure?')) {
            dispatch(DeleteArticle(id))
        }
    }

    return (
        <Card
            className="cursor-pointer"
            imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
        >
            {isLogged && (
                <div className="flex ml-auto">
                    <Link to="/" onClick={() => deletehandler(article._id)}>
                        <div className="bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto">
                            <FaTrash className="m-auto text-white justify-center items-center" />
                        </div>
                    </Link>
                    <div className="bg-blue-600 rounded  w-10 h-10  flex ml-auto">
                        <FaEdit className="m-auto text-white justify-center items-center" />
                    </div>
                </div>
            )}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
            </p>
        </Card>
    )
}

export default Article
