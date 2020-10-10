import React from 'react';
import {NavLink} from 'react-router-dom';

//A simple component that handles the creation of the different course previews
const Courseholder = (props) => {

    const url = `/courses/${props.data.id}`

    return (
        <div className="courseHolder">
	        <NavLink className="courseLink" to={url}>
	            <h4>Course: {props.data.title}</h4>
	        </NavLink>
        </div>
    )
}

export default Courseholder;