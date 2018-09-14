require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const bcrypt = require('bcrypt');
const controller = require('./controller')
const saltRounds = 12

const app = express()

massive(process.env.CONNECTION_STRING).then(database => app.set('db', database))

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/register', (req, res) => {
    const db = app.get('db')
    const { username, password, image, email } = req.body
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
       db.create_user([username, hashedPassword, image, email]).then(() => {
           req.session.user = { username }
           res.json({ user: req.session.user })
       }).catch(error => {console.log('error', error)
            res.status(500).json({ message: 'Something Bad Happened!' })
        })
    })
})

app.post('/login', (req, res) => {
    const db = app.get('db')
    const { username, password } = req.body
    db.find_user([username]).then(users => {
      if (users.length){
        bcrypt.compare(password, users[0].password).then(matched => {
            if(matched){
                req.session.user = { username: users[0].username }
            res.json({ user: req.session.user })
        } else {
            res.status(403).json({ message: 'Wrong Password' })
        }
    })
    }
})
})
app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).send()
})

app.get('/api/chatrooms', controller.read)
app.post('/api/chatrooms/:id', controller.create)

const PORT = 4000
app.listen(PORT, () => console.log(`Server is UP AND RUNNING on port ${PORT}`))