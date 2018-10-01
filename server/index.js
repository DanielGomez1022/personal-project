require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const massive = require('massive')
const bcrypt = require('bcrypt');
const controller = require('./controller')
const server  = require("http").createServer(app)
const io = require('socket.io')(server)
const sharedsession = require("express-socket.io-session")
const saltRounds = 12
app.use( express.static( `${__dirname}/../build` ) );

massive(process.env.CONNECTION_STRING).then(database => app.set('db', database))

const session = require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 } // 14days
  })

  app.use(bodyParser.json())
  app.use(session)
  io.use(sharedsession(session))

app.post('/register', (req, res) => {
    console.log(req.body.image)
    console.log(req.body.username)
    const db = app.get('db')
    const { username, password, image, email } = req.body
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
       db.create_user([username, hashedPassword, image, email]).then((user) => {
           console.log(user)
           req.session.user = user[0]
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
                req.session.user = {id: users[0].id,  username: users[0].username, image: users[0].image, email: users[0].email }
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

let messageID = 0;
let rooms = []

// async function getUserList(UsersInRooms, connectionObjRoom){
//     UsersInRooms.filter((user) => {
//         if(user.room == connectionObjRoom.room){
//             return user.username
//         }
//     })
// }

io.sockets.on("connection", (socket) => {
    console.log('socket is connected')
    socket.on('get_users', connectionObj => {
        console.log('conection object', connectionObj)
        rooms.push({room: connectionObj.room, username: connectionObj.username, image: connectionObj.image})
        socket.join(connectionObj.room)
        let userlist = rooms.filter((user) => {
            if(user.room == connectionObj.room){
                return user.username
            }
        })

        io.in(connectionObj.room).emit("user_list", userlist)
        // io.emit('user_list', {user: connectionObj.username, image: connectionObj.image})
    })

    socket.on("message", (messageObj) => {
        if(messageObj){
        console.log(messageObj)
        io.emit('message', {user: messageObj.username,  message: messageObj.message, id:  messageID}); 
        messageID++  
        }
    });

    socket.on('disconnect', () => {
       console.log('user disconnected')
       socket.leave('chatroom')
    })  
})

app.get('/api/chatrooms', controller.read)
app.post('/api/chatrooms', controller.create)
app.delete('/api/chatrooms/:creator_id', controller.delete)
app.get('/api/get_logged_in_user', controller.readUser)
app.get('/api/get_users_in_chatroom', controller.readUserInChatroom)

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4000
server.listen(PORT, () => console.log(`Server is UP AND RUNNING on port ${PORT}`))