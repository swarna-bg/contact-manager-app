import React from "react";
import axios from "../../config/axios";
import ContactForm from "./Form";

export default class ContactEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: {}
    };
  }

  handleContactSubmit = contact => {
    console.log("edit", contact);
    axios.put(`/contacts/${contact.id}`, contact, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.errors) {
          window.alert(response.data.message);
          console.log("validation error", response.data.errors);
        } else {
          console.log("success", response.data);
          this.props.history.push(`/contacts`);
        }
      });
  };

  componentDidMount() {
    console.log("edit contact component did mount");
    const id = this.props.match.params.id;
    axios
      .get(`contacts/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        const contact = response.data;
        this.setState({ contact });
      });
  }
  render() {
    return (
      <div>
        <h2>
           Edit Contact 
        </h2>

        <ContactForm
          contact={this.state.contact}
          handleContactSubmit={this.handleContactSubmit}
        />
      </div>
    );
  }
}