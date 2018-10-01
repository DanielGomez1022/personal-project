import React, {Component} from 'react'
import axios from 'axios'
import './Home.css'

export default class Home extends Component {

        componentDidMount() {
            axios.get('/api/get_logged_in_user').then(response => {
                console.log(response.data)
            })
        }
        
        render(){
            return (
            <div className = 'background-Image' >
             </div>
        )
    }
}