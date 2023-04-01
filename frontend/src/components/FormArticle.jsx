import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreateArticle, dispatchGetUser } from '../redux/actions/articleAction'
import { isEmpty, isEmail } from '../utils/validation/Validation'
import { useDispatch, useSelector } from 'react-redux'
import { PROJET_CREATE_RESET } from '../redux/actions/constants/articleConstants'

const FormArticle = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const initialState = {
        email: '',
        password: '',
        err: '',
        success: '',
    }
    const [creds, setCreds] = useState(initialState)
    const {
        title,
        image,
        price,
        type,
        surface,
        city,
        numberOfRooms,
        description,
        err,
        success,
    } = creds

    const auth = useSelector((state) => state.auth)
    const { error, userInfo, isLogged } = auth
    const handleChange = (e) => {
        //place of do that -> onChange={(e) => setEmail(e.target.value) for each field (input) we do that
        setCreds({
            ...creds,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEmpty(title) | isEmpty(price))
            return setCreds({
                ...creds,
                err: 'Please fill in all fields',
                success: '',
            })

        dispatch(CreateArticle(creds))
    }
    const ArticleCreateReducer = useSelector(
        (state) => state.ArticleCreateReducer
    )
    const { success: sucCreated } = ArticleCreateReducer
    useEffect(() => {
        if (sucCreated) {
            navigate('/')
            dispatch({ type: PROJET_CREATE_RESET })
        }
    }, [sucCreated, navigate, userInfo, dispatch])
    return (
        <div className="flex items-center justify-center px-1 py-1">
            <form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput
                        id="title"
                        onChange={handleChange}
                        name="title"
                        placeholder="title"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput
                        id="price"
                        type="number"
                        onChange={handleChange}
                        name="price"
                        placeholder="price"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="type" />
                    </div>
                    <TextInput
                        id="type"
                        onChange={handleChange}
                        name="type"
                        placeholder="type"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="surface" value="Surface" />
                    </div>
                    <TextInput
                        id="surface"
                        onChange={handleChange}
                        name="surface"
                        placeholder="surface"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="City" />
                    </div>
                    <TextInput
                        id="city"
                        onChange={handleChange}
                        name="city"
                        placeholder="city"
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
                        id="numberOfRooms"
                        type="number"
                        onChange={handleChange}
                        name="numberOfRooms"
                        placeholder="Number Of Rooms"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <TextInput
                        id="description"
                        onChange={handleChange}
                        name="description"
                        placeholder="description"
                        required={true}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default FormArticle
