import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    const Ingredients = Object.keys(props.ingredients).map(item => 
        <span className={classes.item} key={item}>{item} : {props.ingredients[item]}</span>
    )
    return(
        <div className={classes.Order}>
            <div className={classes.ingredients}> 
                <span><strong>Ingredients</strong> : </span>
                {Ingredients}
            </div>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order