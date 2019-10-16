import React from 'react'
import classes from './sidedrawer.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Auxillary from '../../../hoc/Auxillary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Sidedrawer = (props) => {

    let styles = [classes.Sidedrawer]
    if(props.showBackdrop) {
        styles.push(classes.open)
    }else {
        styles.push(classes.close)
    }

    return (
        <Auxillary>
            <Backdrop show={props.showBackdrop} clicked={props.closeBackdrop} />
            <div class={styles.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    )
}

export default Sidedrawer