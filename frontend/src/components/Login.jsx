import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dispatchLogin, dispatchGetUser } from '../redux/actions/authAction'
import { isEmpty, isEmail } from '../utils/validation/Validation'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const initialState = {
        email: '',
        password: '',
        err: '',
        success: '',
    }
    const [creds, setCreds] = useState(initialState)
    const { email, password, err, success } = creds

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
        if (isEmpty(email) | isEmpty(password))
            return setCreds({
                ...creds,
                err: 'Please fill in all fields',
                success: '',
            })

        if (!isEmail(email))
            return setCreds({
                ...creds,
                err: 'Invalid email',
                success: '',
            })
        // console.log(creds)
        dispatch(dispatchLogin(creds))
    }
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo, dispatch])
    return (
        <div className="flex items-center justify-center px-1 py-1">
            <form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        onChange={handleChange}
                        name="email"
                        placeholder="name@flowbite.com"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Your password"
                        required={true}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Login
