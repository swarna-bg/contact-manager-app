import React from 'react'
class ContactForm extends React.Component{
      constructor(props){
          console.log('props', props)
          super(props)
          this.state={
            //  name:this.props.contact.name ? this.props.contact.name:'',
            //  email:this.props.contact.email ? this.props.contact.email:'',
            //  mobile:this.props.contact.mobile ? this.props.contact.mobile:''
             name:'',
             email:'',
             mobile:''
                
          }
          this.handleChange=this.handleChange.bind(this)
          this.handleSubmit=this.handleSubmit.bind(this)
      }
      handleChange(e){
          this.setState({[e.target.name]:e.target.value})
      }

      componentWillReceiveProps(nextProps){
        const {email,name,mobile}=nextProps.contact
        this.setState({email,name,mobile})
     }
      
      
     
      
      handleSubmit(e){
          e.preventDefault()
          const formData={
              name:this.state.name,
              email:this.state.email,
              mobile:this.state.mobile
          }
          console.log(formData)
        this.props.contact && (formData.id=this.props.contact._id)
          this.props.handleContactSubmit(formData)
      }
      render(){
       //  console.log(this.state)
          return(
               <div>
                  <form onSubmit={this.handleSubmit}>
                      Name:<input type='text' value={this.state.name} onChange={this.handleChange} name="name"/><br/>
                      email:<input type='text' value={this.state.email} onChange={this.handleChange} name="email"/><br/>
                      mobile:<input type='text' value={this.state.mobile} onChange={this.handleChange} name="mobile"/><br/>
                      <input type='submit'/>
                  </form>
              </div>
          )
      }
}
export default ContactForm



