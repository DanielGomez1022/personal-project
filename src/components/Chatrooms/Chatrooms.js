import React, {Component} from 'react'
import axios from 'axios'
import './Chatrooms.css';
import {Link} from 'react-router-dom';
import socketIOClient from 'socket.io-client'

const socket = socketIOClient()

class Chatrooms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatRoomlist: null,
            users: '',
            createChatName: '',
            mostUsedRooms: [],
            chatlist: [],
            image: '',
            subject: ''
        }
        socket.emit('get_user', 'userConnected')
        socket.on('user_room_count', (roomsAndUserCount) => {
        this.setState({mostUsedRooms: roomsAndUserCount})
    })
    }

    componentDidMount() {
        axios.get('/api/chatrooms').then(response => {
            console.log(response.data, 'res.data chatlist')
            this.setState({ chatlist: response.data })
        })
    }

    CreateChat = () => {
        const {image, subject} = this.state

        let newChat = {
            image: image,
            subject: subject
        }
        axios.post('/api/chatrooms', newChat).then(res => {
            this.setState({chatlist: res.data})
        })
    }

    createImage(val){
        this.setState({image: val})
    }

    createSubject(val){
        this.setState({subject: val})
    }

    changeHandler = (key, val) => {
        this.setState({[key]: val})
        this.search(val)
    }

    
    search = (val) => {
        axios.get(`api/get_room_search?search=${val}`).then(res => {
            this.setState({chatRoomList: res.data})
        })
    }

    deleteChat = (id) => {
        axios.delete(`/api/chatrooms/${id}`).then(res => {
            this.setState({chatList: res.data})
        })
    }
    
    privateRoom = () => {
        this.setState((prevState) => {
            let roomType = prevState.type == 'group' ? 'private' : 'group'
            return {
                private: !prevState.private,
                type: roomType
            }
        })
    }

    render(){
        let allChatRoomData = this.state.chatlist.map((e, i) => {
            console.log('Chatroon processing')
            return ( 
            <div className = 'chatroomBoxes'>
                <Link className = 'link-tag' to={`/chatroom/${e.subject}`}>
                <div key = {i}>
                        <img className = "chatroomImages" src = {e.image}/>
                        <div>Subject: {e.subject} </div>
                        <div>Creator: {e.username} </div>
                </div>
            </Link>
        <button className = "delete-button" onClick = {() => this.deleteChat(e.id)}>Delete</button>
        </div>
            )
        })
        return (
            <div>
                <div>Chatrooms</div>
                Image: <input className = "image-input" onChange = {e => this.createImage(e.target.value)}/>
                Subject: <input className = "subject-input" onChange = {e => this.createSubject(e.target.value)}/>
                <button className = "create-button" onClick ={this.CreateChat}>Create</button>
                <div className = 'chatroom-boxes'> {allChatRoomData} </div>
            </div>
        )
    }
}
export default Chatrooms