import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you will like the taste</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type='Danger' clicked={props.cancelled}>Cancel</Button>
            <Button type='Success' clicked={props.continued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary