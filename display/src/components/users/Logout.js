import React from 'react'
import axios from '../../config/config'

class Logout extends React.Component{
    
    componentDidMount(){
        console.log('am in logout')
        axios.delete(`/users/logout`,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
        })
        .then(response=>{
            localStorage.removeItem('authToken')
            console.log(response.data)
            //this.props.handleAuth(false)
            this.props.history.push('/users/login')
        })
    }
    render(){
        return(
            <div><p>logging out..</p></div>
        )
    }
}

export default Logout