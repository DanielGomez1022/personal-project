import React, {Component} from 'react'
import axios from 'axios'
import './Chatrooms.css';
import {Link} from 'react-router-dom';


class Chatrooms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatRoomlist: null,
            users: '',
            createChatName: '',
            chatlist: [],
            image: '',
            subject: ''
        }
    
    }

    componentDidMount() {
        axios.get('/api/chatrooms').then(response => {
        
            this.setState({ chatlist: response.data })
        })
    }

    updateImage = (image, id) => {
     axios.put(`/api/chatrooms/${id}`, {image}).then(res => {
         this.setState({image: res.data})
     })
    }

    deleteChat = (id) => {
        axios.delete(`/api/chatrooms/${id}`).then(res => {
            console.log('----------------------------delete' ,res)
            this.setState({chatlist: res.data})
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

    render(){
        let { chatlist } = this.state
        let allChatRoomData = chatlist.map((e, i) => {
            console.log(e)
            return ( 
            <div className = 'chatroomBoxes'>
                <Link className = 'link-tag' to={`/chatroom/${e.subject}`}>
                <div key = {i}>
                        <img className = "chatroomImages" src = {e.image}/>
                        <div>Subject: {e.subject} </div>
                        <div>Creator: {e.username} </div>
                </div>
            </Link>
        <button className = "delete-button" onClick = {() => this.deleteChat(e.chatroom_id)}>Delete</button>
        <input className = "update-input" onChange = {e => this.createImage(e.target.value)}/>
        <button className = "update-button" onClick = {this.updateImage}>Update</button>
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
