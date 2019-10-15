import React from 'react'
import classes from './Modal.module.css'   
import Backdrop from '../Backdrop/Backdrop'
import Auxillary from '../../../hoc/Auxillary'

const Modal = (props) => {

    return (
        <Auxillary>
            <Backdrop show={props.show} clicked={props.backdropClicked}/>
            <div className={classes.Modal} 
                style={{
                    transform: props.show ? 'scale(1)' : 'scale(0)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxillary>    
    )
}

export default Modal 