class Users {
    constructor(){
        super()
        this.state = {
            users = []
        }
    }

    addUserData(id, socket_id, name, picture, room, type){
        let user = {id, socket_id, name, picture, room, type}
        let index = this.getRoomsAndUserCount().findIndex(e => e.name == room)
        if (index != -1) {
            if (this.getRoomsAndUserCount()[index].type != type){
                user.type = this.getRoomsAndUserCount()[index].type
            }
        }
        if (JSON.stringify(this.state.users).includes(`${id}`) && JSON.stringify(this.state.users).includes(`${name}`)){
            return
        } else {
            this.state.users.push(user)
            return user
        }

    }

        RemoveUser(socket_id){

            let indexOfUserToRemove = this.state.users.findIndex(user => user.socket_id == socket_id)
            if (indexOfUserToRemove !== -1){
                let room = this.state.users[indexOfUserToRemove].roomthis.users.splice(indexOfUserToRemove, 1)
                return room
            }
        }
        
        getUserList(room){
            let users = this.state.users.filter(user => user.room === room)
            let namesArray = users.map(user => {
                return user
            })
            let list = {
                names: namesArray,
                count: namesArray.length
            }
            return list
        }

        getRandomUserList(room, array){
            let users = array.filter(user => user.room === room)

            let namesArray = users.map(user => {
                return user
            })

            let list = {
                names: namesArray,
                count: namesArray.length
            }
            return list
        }

        getRoomCount(room){
            let userCount = [] 
        users.filter(e => {
            if(e.room == room){
                userCount.push(room)
            }
        })
        return userCount.length
    }
    getRandomRoomsAndUserCount(){
        let roomsArray = []
        for(let i = 0; i < this.state.users.length; i++){
            if (!roomsArray.includes(this.state.users[i].room)){
                roomsArray.push(this.state.users[i])
            }
        }
        let roomsAndCount = roomsArray.map(room => {
            let count = this.state.users.filter(user => user.room == room.room)
            return {
                name: room.room,
                users: count.length,
                type: room.type
            }
        })

        roomsAndCount.sort((a, b) => b.count - a.count)
        return roomsAndCount
    }
}

module.exports = {Users}