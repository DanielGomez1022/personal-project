import React, {Component} from 'react'
import axios from 'axios'


class Chatrooms extends Component {
    constructor() {
        super()
        this.state = {
            chatroomlist: []
        }
    }

    componentDidMount() {
        axios.get('/api/chatrooms').then(response => {
            this.setState({ chatroomlist: response.data })
        }).catch(err => console.log('cannot get data', err))
    }
    render(){
        let allChatRoomData = this.state.chatroomlist.map((e, i) => {
            return(
                <div key={i}>
                   <div> {e.subject} </div>
                   <div> {e.creator} </div>
                </div>
            )
        })
        return (
            <div>
                <div>Chatrooms</div>
                <div> {allChatRoomData}</div>
            </div>
        )
    }
    
}
export default Chatrooms