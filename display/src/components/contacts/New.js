import React from "react";
import axios from "../../config/axios";
import ContactForm from "./Form";
class ContactNew extends React.Component {
  constructor() {
    super();
    this.handleContactSubmit = this.handleContactSubmit.bind(this);
  }
  handleContactSubmit(contact) {
    console.log(contact);
    axios
      .post("/contacts", contact, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response, "response");
        // if(response.data.hasOwnProperty('errors')) or
        if (response.data.errors) {
          window.alert(response.data.message);
        } else {
          this.props.history.push(`/contacts`);
        }
      });
  }

  render() {
    return (
      <div>
        <h2>Add Contact</h2>
        <ContactForm handleContactSubmit={this.handleContactSubmit} />
      </div>
    );
  }
}
export default ContactNew;
