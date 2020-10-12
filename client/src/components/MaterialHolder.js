import React from 'react';
import {NavLink} from 'react-router-dom';

//A simple component that handles the creation of the different course previews
const MaterialHolder = (props) => {
    return (
        <li>{props.data}</li>
    )
}

export default MaterialHolder;