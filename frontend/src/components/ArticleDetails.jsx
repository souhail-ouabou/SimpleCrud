import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    CreateArticle,
    Getarticletdetails,
    UpdateArticle,
} from '../redux/actions/articleAction'
import { isEmpty, isEmail } from '../utils/validation/Validation'
import { PROJET_CREATE_RESET } from '../redux/actions/constants/articleConstants'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import ACTIONS, {
    PROJET_UPDATE_RESET,
    PROJECT_DETAILS_RESET,
} from '../redux/actions/constants/articleConstants'
const ArticleDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const articleDetailsReducer = useSelector(
        (state) => state.articleDetailsReducer
    )
    const { loading, error, article, success } = articleDetailsReducer

    const [data, setData] = useState([])
    const { title, price, type, surface, numberOfRooms, city, description } =
        data
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()

    //place of do that -> onChange={(e) => setEmail(e.target.value) for each field (input) we do that

    useEffect(() => {
        if (!article || article._id !== id) {
            dispatch(Getarticletdetails(id))
        } else {
            setData(article)
        }
    }, [dispatch, article, id, navigate])

    return (
        <div className="flex items-center justify-center px-1 py-1">
            <h1>{data.title}</h1>
        </div>
    )
}

export default ArticleDetails
