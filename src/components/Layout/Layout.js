import React, {Component} from 'react'
import Auxillary from '../../hoc/Auxillary'
import classes from './layout.module.css'
import Toolbar from '../Naivgation/Toolbar/Toolbar'
import Sidedrawer from '../Naivgation/Sidedrawer/Sidedrawer'

class Layout extends Component {
    state={
        sidedrawerOpened: false
    }

    backdropClickedHandler = () => {
        this.setState({sidedrawerOpened:false})
    }

    drawerTogglerClickedHandler = () => {
        this.setState( (prevState) => { return {sidedrawerOpened: !prevState.sidedrawerOpened} } )
    }

    render(){
        return (
            <Auxillary>
                <Toolbar toggleSidedrawer={this.drawerTogglerClickedHandler} />
                <Sidedrawer showBackdrop={this.state.sidedrawerOpened} closeBackdrop={this.backdropClickedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
}

export default Layout