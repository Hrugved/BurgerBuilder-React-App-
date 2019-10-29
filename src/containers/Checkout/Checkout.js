import React , {Component} from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

    state = {
        ingredients : {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        }
    }

    componentDidMount(){
        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query){
            // ['salad', '1']
            ingredients[param[0]] = Number(param[1])
        }
        this.setState({ingredients})
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
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                cancelled = {this.checkoutCancelHandler}
                continued = {this.checkoutContinueHandler}
            />
        )
    }
}

export default Checkout