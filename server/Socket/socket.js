module.exports = (io, Users) => {
    const users = new Users()

    io.sockets.on('connection', (socket) => {

        socket.on('room', (connectionObj) => {
            if (socket.handshake.session.user){

                switch(connectionObj.type) {
                    case 'group' :
                    users.AddUserData(socket.handshake.session.user[0].id, socket.id, socket.handshake.session.user[0].name, socket.handshake.session.user[0].image, connectionObj.room, connectionObj.type)
                    socket.join(connectionObj.room)
                    break;
                    case 'private' :
                    users.addUserData(socket.handshake.session.user[0].id, socket.id, socket.handshake.session.user[0].name, socket.handshake.session.user[0].image, connectionObj.room, connectionObj.type)
                    socket.join(connectionObj.room)
                    case 'random' :
                    let randomRooms = users.getRandomRoomsAndUserCount().filter(room => room.users < 2)
                    if (randomRooms.length){

                    connectionObj.room = randomRooms[0].name

                    socket.join(randomRooms[0].name)
                    io.emit('random', randomRooms[0].name)
                    let userslist = users.getRandomUserList(randomRooms[0].name, randomRoomPairs)

                    io.in(availableRooms[0].name).emit('users_list', userslist)
                    } else {
                        socket.join(connectionObj.room)
                    }
                    break;
                default:
                    console.log('default')
                }
                users.AddUserData(socket.handshake.session.user[0].id, socket.id, socket.handshake.user[0].name, socket.handshake.session.user[0].picture, connectionObj.room, connectionObj.type)
            }

            let userslist = users.getUserList(connectionObj.room)
            let groupeRooms = users.getRoomsAndUnderCount().filter(rooms => rooms.type != 'private' && rooms.type != 'random' )

            io.emit('user_room_count', groupeRooms)
            io.in(connectionObj.room).emit('users_list', userslist)
        })

        socket.on('message', (messageObj) => {
            messageObj.color = socket.handshake.session.user.color;
            io.in(messageObj.room).emit('message', messageObj)
        })

        socket.on('left', (left) => {
            let room = users.RemoveUser(socket.id)
            let userslist = users.getUserList(room)
            let groupRooms = users.getRoomsAndUserCount().filter(rooms => rooms.type != 'private' && rooms.type != 'random')
            io.emit('user_room_count', groupRooms)
            io.in(room).emit('users_list', userslist)
        })

        socket.on('dissconnect', () => {
            let room = users.RemoveUser(socket.id)
            let userslist = users.getUserList(room)
            io.in(room).emit('users_list', userslist)
        })
    })
}