import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggler from '../Sidedrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggler DrawerTogglerClicked={props.toggleSidedrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar


