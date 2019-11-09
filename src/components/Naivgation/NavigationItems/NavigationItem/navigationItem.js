import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
        {/* to={prefix of path} => it decides wheteher the link is active or not */}
            <NavLink 
                exact
                to={props.link} 
                activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem