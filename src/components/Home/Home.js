import React, {Component} from 'react'
import axios from 'axios'
import './Home.css'
import UserImagePropTypes from './UserImagePropTypes'
import UserNameRenderProps from './UserNameRenderProps';

export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        axios.get('/api/get_logged_in_user').then(response => { 
            this.setState({user: response.data[0]})
            })
        }

    render(){
        const {user} = this.state
         return (
               <div className = 'nav'>
               {user 
                ? <UserImagePropTypes user={user} />
                : ''
                }
                <UserNameRenderProps>
                    {data => {
                        console.log('------------------dataInHome', data)
                        return <div className='usersUserName'>
                            Hello, {data.username}
                        </div>
                    }}
                </UserNameRenderProps>
              </div>
        )
    }
}