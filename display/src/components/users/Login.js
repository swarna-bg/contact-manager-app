import React from 'react'
import axios from '../../config/axios'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        axios.post(`/users/login`,formData)
    .then(response=>{
        console.log(response)
        // if(response.data.hasOwnProperty('errors')){
        //     alert(response.data.errors)
        // }else{
        //     localStorage.setItem('authToken',response.data.token)
        //     console.log(response.data.token)
        //    // we are creating a dummy variable to check 
        // }
      
    })
    }




    render(){
        return(
            <div>
                <h2>Login Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>
                    </label><br/>
                    <label>
                        Password
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                    </label><br/>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}