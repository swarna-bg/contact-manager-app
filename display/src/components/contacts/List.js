import React from 'react'
import axios from '../../config/axios'
//import ListItem from './ListItem'
import { Link } from 'react-router-dom'
class ContactList extends React.Component {
    constructor() {
        super()
        this.state = {
            contacts: []
        }
        this.handleRemove = this.handleRemove.bind(this)
    }
    handleRemove(id) {
        axios.delete(`/contacts/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        // .then(response=>{
            
        //})
    }
    componentDidMount() {
        axios.get('/contacts', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState({ contacts: response.data })
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        console.log(this.state)
        return (
            <div>
                <h2>listing of contacts-{this.state.contacts.length}</h2>
                {(this.state.contacts.length > 0) && <ul>
                    {this.state.contacts.map(contact => {
                        return(
                            <li key={contact._id}> <Link to={`/contacts/${contact._id}`}>{contact.name}</Link> <button onClick={() => {
                                const confirmRemove = window.confirm("Are You Sure?")
                                if (confirmRemove) {
                                    this.handleRemove(contact._id)
                                }
                            }}>remove</button>
                            </li>
                        )
                    })}
                </ul>}
                <Link to='/contacts/new'>Add Contact</Link>
            </div>

        )
    }


}

export default ContactList