import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                { authUser ?
                    <React.Fragment>
                      <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                      <NavLink className="signout" to="/signout">Sign Out</NavLink>
                    </React.Fragment>
                  :
                    <React.Fragment>
                        <NavLink className="signup" to="/signup">Sign Up</NavLink>
                        <NavLink className="signin" to="/signin">Sign In</NavLink>
                    </React.Fragment>

                }
                    
                </nav>
            </div>
        </div>
    );
  }
};
