import React, {Component} from 'react'
import classes from './Modal.module.css'   
import Backdrop from '../Backdrop/Backdrop'
import Auxillary from '../../../hoc/Auxillary/Auxillary'

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render(){
        return (
            <Auxillary>
                <Backdrop show={this.props.show} clicked={this.props.backdropClicked}/>
                <div className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'scale(1)' : 'scale(0)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>    
        )
    }    
}

export default Modal 