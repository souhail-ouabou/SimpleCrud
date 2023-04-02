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
const EditArticle = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const articleDetailsReducer = useSelector(
        (state) => state.articleDetailsReducer
    )
    const { loading, error, article, success } = articleDetailsReducer

    const updateArticleReducer = useSelector(
        (state) => state.updateArticleReducer
    )
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = updateArticleReducer

    const [data, setData] = useState([])
    const { title, price, type, surface, numberOfRooms, city, description } =
        data
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()

    const handleChange = (e) => {
        //place of do that -> onChange={(e) => setEmail(e.target.value) for each field (input) we do that
        setData({
            ...data,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
        })
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(UpdateArticle(data))
    }
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PROJET_UPDATE_RESET })
            dispatch({ type: PROJECT_DETAILS_RESET })
            navigate('/')
        } else if (!article || article._id !== id) {
            dispatch(Getarticletdetails(id))
        } else {
            setData(article)
        }
    }, [dispatch, article, id, successUpdate, navigate])

    return (
        <div className="flex items-center justify-center px-1 py-1">
            <form className="flex flex-col gap-4 w-1/3">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput
                        id="title"
                        name="title"
                        placeholder="title"
                        defaultValue={title}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="price"
                        type="number"
                        name="price"
                        defaultValue={price}
                        placeholder="price"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="type" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="type"
                        name="type"
                        placeholder="type"
                        defaultValue={type}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="surface" value="Surface" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="surface"
                        name="surface"
                        defaultValue={surface}
                        placeholder="surface"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="City" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="city"
                        name="city"
                        placeholder="city"
                        defaultValue={city}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="numberOfRooms"
                            value="Number of rooms"
                        />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="numberOfRooms"
                        type="number"
                        name="numberOfRooms"
                        placeholder="Number Of Rooms"
                        defaultValue={numberOfRooms}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <TextInput
                        onChange={handleChange}
                        id="description"
                        name="description"
                        placeholder="description"
                        defaultValue={description}
                        required={true}
                    />
                </div>

                <Button onClick={handleUpdate} type="submit">
                    Update
                </Button>
            </form>
        </div>
    )
}

export default EditArticle
