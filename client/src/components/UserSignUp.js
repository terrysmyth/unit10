import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="email" 
                  name="email" 
                  type="text"
                  value={email} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;

    const {
      firstName, 
      lastName, 
      email, 
      password
    } = this.state;

    // New user payload
    const user = {
      firstName, 
      lastName, 
      emailAddress: email,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
         // IF THERE ARE ERRORS update the errors state.
         if (errors.length) {
           this.setState({ errors });
         }
         else {
           // Else success
           console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
           context.actions.signIn(email, password)
             .then(() => {
               this.props.history.push('/');    
             });
         }

      })
      .catch( err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      }); 

  }

  cancel = () => {
    this.props.history.push('/');
  }


  // END
}
