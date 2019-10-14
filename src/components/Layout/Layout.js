import React from 'react'
import Auxillary from '../../hoc/Auxillary'
import classes from './layout.module.css'

const Layout = (props) => {
    return (
        <Auxillary>
            <div>navigation, sidebar, backdrop</div>
            <main className={classes.content}>
                {props.children}
            </main>
        </Auxillary>
    )
}

export default Layout