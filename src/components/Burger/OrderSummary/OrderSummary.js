import React from 'react'
import Auxillary from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {

    const summaryList = Object.keys(props.summaryObj)
        .map(igKey => 
            (<li key={igKey}>
                <span style={{textTransform: "capitalize"}} >{igKey}</span>: {props.summaryObj[igKey]} 
            </li>)
        )

    return (
        <Auxillary>
            <h3>Your Burger</h3>
            <p>A delicious order with following ingredients: </p>
            <ul>
                {summaryList}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button type="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxillary>        
    )
}

export default OrderSummary