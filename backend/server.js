const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const path = require('path')

const port = process.env.PORT || 4000
const colors = require('colors')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

connectDB()
app.use(express.json({ limit: '20mb' }))
app.use(cors())
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))

//Routes (frontend to back)
app.use('/user', require('./routes/userRouter'))
app.use('/articles', require('./routes/articleRouter'))

__dirname = path.resolve()
console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is Runn....')
    })
}

__dirname = path.resolve()
console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is Runn....')
    })
}

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
