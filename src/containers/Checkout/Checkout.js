import React , {Component} from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    constructor(props){
        super(props)
        this.state = {
            ingredients : {
                salad: 0,
                meat: 0,
                cheese: 0,
                bacon: 0,
            },
            price: 0
        }
        console.log(this.state)
        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search)
        // const ingredients = {}
        // let price = 0
        for (let param of query){ // ['salad', '1']
            if(param[0] === 'price') {
                this.state.price = param[1]
                continue
            }
            this.state.ingredients[param[0]] = Number(param[1])
        }
        // this.setState({ingredients, price})
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.state.ingredients)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelled = {this.checkoutCancelHandler}
                    continued = {this.checkoutContinueHandler}
                />  
                <Route path='/checkout/contact-data' 
                    render={(props) => <ContactData 
                                    {...props}
                                    ingredients={this.state.ingredients} 
                                    price={parseInt(this.state.price).toFixed(2)}
                                    />} />
            </div>
        )
    }
}

export default Checkout