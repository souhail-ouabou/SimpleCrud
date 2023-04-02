const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//@desc  Get goals
//@route  Get /api/test
//@acces  Get Private

const { CLIENT_URL } = process.env

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
function isEmpty(value) {
    if (!value) return true
    return false
}

const userCtrl = {
    register: async (req, res) => {
        try {
            // http://localhost:5000/user/register
            const { name, email, password } = req.body
            //console.log(isTeacher)
            if (!name || !email || !password)
                return res
                    .status(400)
                    .json({ msg: 'Please fill in all fields.' })

            if (!validateEmail(email))
                return res.status(400).json({ msg: 'Invalid email' })

            const user = await Users.findOne({ email })
            if (user)
                return res
                    .status(400)
                    .json({ msg: 'This email already exists.' })

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: 'Password must be at least 6 characters.' })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({ name, email, password: passwordHash })
            await newUser.save()
            return res.json({
                msg: 'Register Succès!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) => {
        try {
            //http://localhost:5000/user/login
            const { email, password } = req.body
            const user = await Users.findOne({
                email: { $regex: email, $options: 'i' },
            })
            if (!email || !password)
                return res
                    .status(400)
                    .json({ msg: 'Please fill in all fields.' })
            if (!validateEmail(email))
                return res.status(400).json({ msg: 'Invalid email' })
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "That Email doesn't exist." })

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            )
            if (!isPasswordCorrect)
                return res.status(400).json({ msg: 'Invalid credentials' })

            //     console.log(existingUser);
            // http://localhost:5000/user/refresh_token

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days
            })
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                token: refresh_token,
            })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    getAccessToken: async (req, res) => {
        try {
            //http://localhost:5000/user/refresh_token
            //get theCookie value
            const rf_token = req.cookies.refreshtoken
            console.log(rf_token)
            if (!rf_token)
                return res.status(500).json({ msg: 'Please login now!1' })

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(500)
                            .json({ msg: 'Please login now!2' })
                    console.log(user)
                    // if user login in create a token to stay loged in
                    const access_token = createAccessToken({ id: user.id })
                    res.json({ access_token })
                }
            )
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: 'Logged out.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async (req, res) => {
        try {
            console.log(req.user.id)
            const user = await Users.findById(req.user.id).select('-password')
            //    console.log('finded user', user)
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // getUserDetails: async (req, res) => {
    //     try {
    //         let user = await Users.findById(req.params.id)
    //             .populate('projets')
    //             .select('-password')

    //         if (user) {
    //             res.json(user)
    //         }
    //     } catch (error) {
    //         console.log('------------user details error----------')
    //         console.log(error)
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },
    updateUsersRole: async (req, res) => {
        try {
            const { id, role, client } = req.body
            await Users.findOneAndUpdate(
                { _id: req.params.id },
                {
                    role,
                    client,
                }
            )

            res.json({ msg: 'Update Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({ msg: 'Deleted Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, {
        expiresIn: '5m',
    })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '31d',
    })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
        expiresIn: '365d',
    })
}
module.exports = userCtrl
