import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    let inputElement = null
    
    const classNames = [classes.InputElement]
    if(props.Invalid && props.shouldValidate && props.touched) {
        classNames.push(classes.Invalid)
    }    

    switch(props.elementType) {
        case 'input':
            inputElement = <input className={classNames.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break
        case 'textarea':
            inputElement = <textarea className={classNames.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break
        case 'select':
            inputElement = (
                <select className={classNames.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = <input className={classNames.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.Label}</label>
            {inputElement}
        </div>
    )
}

export default Input