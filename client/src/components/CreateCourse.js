import React, {Component} from 'react';
import axios from 'axios';
import Form from './Form';

export default class CreateCourse extends Component  {
    // Info we need for creating a course
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
      }

    render() {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          errors,
        } = this.state;

    return (
        <div>
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div className='course--header'>
                    <h4 className='course--label'>Course</h4>
                </div>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                    <React.Fragment>
                        <div className='grid-66'>
                            <div>
                                <input 
                                className="input-title course--title--input" 
                                id="title" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} 
                                placeholder="Course title" />
                            </div>
                            <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
                            <div className='course--description'>
                                <textarea 
                                className=''
                                id="description" 
                                name="description" 
                                value={description} 
                                onChange={this.change} 
                                placeholder="Course Description" 
                                />
                            </div>
                        </div>

                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input
                                        className="course--time--input"
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text"
                                        value={estimatedTime} 
                                        onChange={this.change} 
                                        placeholder="Estimated Time" />
                                    </div>

                                    </li>
                                    <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea                                                 
                                        className=''
                                        id="materialsNeeded" 
                                        name="materialsNeeded"
                                        type="textarea"
                                        value={materialsNeeded} 
                                        onChange={this.change} 
                                        placeholder="Materials Needed" />
                                    </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                )} />  
            </div>
        </div>
    )}

//When the submit button is clicked, gather the necessary information and send a post request to the API to create a new cours
    submit = async () => {
        const {context} = this.props;
        const userId = context.authenticatedUser.id;

        const {
            title, 
            description, 
            estimatedTime, 
            materialsNeeded
        } = this.state;

        const courseInfo = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
          };


        context.actions.createCourse(courseInfo, context.authenticatedUser)
          .then( errors => {
             // IF THERE ARE ERRORS update the errors state.
             if (errors.length) {
               this.setState({ errors });
             }
             else {
               // Else success
               console.log(errors)
               console.log(`Course "${courseInfo.title}": was succesfully created!`);
               this.props.history.push('/')
             }

          })
          .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
          }); 
    }
//Anytime there is a change in the text fields, update state 
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }
    
//Send the user to the home root when "Cancel" is clicked
    cancel = () => {
        this.props.history.push('/')
      }
}