import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosPricetags } from 'react-icons/io'
import { MdPlace } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteArticle } from '../redux/actions/articleAction'
import ModalComp from './ModalComp'
const Article = ({ article }) => {
    const [show, setShow] = useState(false)

    let dispatch = useDispatch()
    const getUserReducer = useSelector((state) => state.getUserReducer)
    const { loading, user, isLogged } = getUserReducer
    const deletehandler = (id) => {
        if (window.confirm('Are You Sure?')) {
            dispatch(DeleteArticle(id))
        }
    }

    const handleModal = () => {
        setShow(true)
    }
    const onClose = () => {
        setShow(false)
    }
    useEffect(() => {}, [])

    return (
        <Link className={`cursor-pointer`}>
            <Card
                onClick={handleModal}
                className="cursor-pointer"
                imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
            >
                <div className="flex ">
                    <div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {article.title}
                        </h5>
                    </div>
                    {isLogged && (
                        <div className="flex ml-auto">
                            <Link
                                to="/"
                                onClick={() => deletehandler(article._id)}
                            >
                                <div className="bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto">
                                    <FaTrash className="m-auto text-white justify-center items-center" />
                                </div>
                            </Link>
                            <Link to={`/edit/${article._id}`}>
                                <div className="bg-blue-600 rounded  w-10 h-10  flex ml-auto">
                                    <FaEdit className="m-auto text-white justify-center items-center" />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="flex ">
                        <span className="flex items-center justify-start font-semibold text-gray-700 dark:text-gray-400">
                            <MdPlace className="justify-center items-center" />{' '}
                            {article.city}
                        </span>
                        <span className="flex ml-auto items-center justify-start font-semibold text-gray-700 dark:text-gray-400">
                            <IoIosPricetags className="justify-center items-center" />{' '}
                            {article.price}$
                        </span>
                    </div>

                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {article.description}
                    </p>
                </div>
            </Card>
            <ModalComp show={show} article={article} close={onClose} />
        </Link>
    )
}

export default Article
