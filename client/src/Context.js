import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {

    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        createCourse: this.createCourse,
        deleteCourse: this.deleteCourse,
        updateCourse: this.updateCourse
      }
    };
    
    return (
      // value represents an object containing the context 
      // to be shared throughout the component tree.
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider> 
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    console.log(user)
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }


  createCourse = async (course, user) => {
    const newCourse = await this.data.createCourse(course, user.encodedCredentials);
    return newCourse;
  }

  deleteCourse = async ( course, user) => {

    const info = await this.data.deleteCourse(course, user);

    return info;

  }

  updateCourse = async (course, user) => {
    const info = await this.data.updateCourse(course, user);
    console.log(info)
    return info;
  }



}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

