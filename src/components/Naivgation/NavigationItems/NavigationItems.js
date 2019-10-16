import React from 'react'
import classes from './NavigationItem.module.css'
import NavigationItem from './NavigationItem/navigationItem'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Burger Builder</NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>
    )
}

export default NavigationItems