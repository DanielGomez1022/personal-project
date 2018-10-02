import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import './Chatroom.css'
import axios from 'axios'

const socket = socketIOClient('192.168.1.6:4000')

export class Chatroom extends Component {
    constructor(){
    super()
    this.state = {
        rooms: [],
        username:'',
        users: [],
        user:'',
        message: [],
        messageList: [],
        userMessage: ''
    }
   
    socket.on("user_list", (users) => {
      console.log(users)
      this.setState({users: users})
    })

   socket.on("message", (userMessage) => {
     console.log('in socket revieving end', userMessage)
      this.setState({
        messageList: [...this.state.messageList].concat({username: userMessage.user, message: userMessage.message})
      })
   })
}

  componentDidMount() {

    axios.get('/api/get_logged_in_user').then(user => {
      console.log('in console',user.data[0].username)
      socket.emit('get_users', {username: user.data[0].username, room: this.props.match.params.name})
      this.setState({
        username: user.data[0].username
      })
    })
    

    // axios.get('/api/chatrooms').then(res => {
    //   console.log(res.data)
    //   this.setState({
    //     users: res.data
    //   })
    // })

    // axios.get('/api/get_logged_in_user').then(username => {
    //   socket.emit('user_list', {username: username.data.username, image: username.data.image })
    //   this.setState({users: username.data, username: username.data.username, image: username.data.image })
    // })
   }
  
   componentWillUnmount(){
       socket.emit('left', {username: this.state.username, room: this.props.match.params.name})
   }

  changeHandler = (val) => {
    this.setState({message: val})
  }

  message = (id, message) => {
    axios.put(`/api/messages/&{id}`, {message}).then(res => {
      axios.get('/api/messages').then(res => {
        this.setState({messageList: res.data})
      })
    })
  }

render() { 
  console.log(this.state.message)
  console.log(this.state.users)
  console.log('from server', this.state.userMessage)
  console.log('from server user', this.state.user)
  let usersToDisplay = this.state.users.map((e, i) => {
  console.log(e, 'users in chat room')
  return (
    <div key = {i}>
      <div>{e.username}</div>
    </div>
  )
})

  console.log(this.props)

    let messageObj = {
      message: this.state.message,
      username: this.state.username
    }
    console.log(messageObj)
     const messageArray = this.state.messageList.map(message => {
       console.log(message, 'message')
       return (
       <div className = 'messagesInChat'>
          <p className='username'>{message.username}</p>:<p className='usermessage'>{message.message}</p>
      </div>
      )
     })
     console.log('message list =============',this.state.messageList)
    return (
      <div className = 'Chatroom'>
        <div className = 'user-container'>Users: {usersToDisplay}</div>
        <div className = 'chatBox'>
        <span className='subject-container'>Subject: {this.props.match.params.name}
        </span>
        <div className = 'message'>{messageArray}</div>
        <div className = 'message-container'>
        <input onKeyPress={(e) => {
          if(e.key === "Enter"){
          socket.emit("message", messageObj)
          }
          }} className = 'input-box' onChange = {(e) => this.changeHandler(e.target.value)} ></input>
        <button  onClick = {(e) => socket.emit("message", messageObj)}>Send</button>
        </div>
        </div>
      </div>
    )
  }
}

export default Chatroom
