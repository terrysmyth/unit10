import React from 'react';
import config from './config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import SignIn from './components/UserSignIn';
import SignUp from './components/UserSignUp';
import SignOut from './components/UserSignOut';

// WITH CONTEXT (wrap)
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(SignUp);
const UserSignInWithContext = withContext(SignIn);
const UserSignOutWithContext = withContext(SignOut);

const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);




export default () => (
    <Router>
    <div>
      <HeaderWithContext />
      <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <Route exact path='/signin' component={UserSignInWithContext} />
          <Route exact path='/signup' component={UserSignUpWithContext} />
          <Route exact path='/signout' component={UserSignOutWithContext} />
      </Switch>

    </div>
  </Router>
);