import React from 'react';
import {BrowserRouter, Route, Link,Switch} from 'react-router-dom'
import { Navbar,Nav, NavItem, NavLink,} from 'reactstrap';
//import Register from './components/users/Register'
//  import Login from './components/users/Login'
import ContactList from './components/contacts/List';
import ContactNew  from './components/contacts/New'
import ContactShow from './components/contacts/Show'
import ContactEdit from './components/contacts/Edit'



function App(props) {
  return (
    <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">Contact-Manager
          <Nav className="ml-auto" navbar>
         
              <NavItem><NavLink href="/contacts">Contacts</NavLink></NavItem>
             
         
            
        
          </Nav> </Navbar>
          </div>
          <Route path="/contacts" component={ContactList} exact={true}/>
          <Route path="/contacts/new" component={ ContactNew}/>
          <Route path="/contacts/edit/:id" component={ContactEdit} exact={true}/>
          <Route path="/contacts/:id" component={ContactShow} exact={true}/>
          {/* <Recent  /> */}
          
    </BrowserRouter>
  );
}

export default App;
