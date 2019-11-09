import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(props) {
        axios.get('/orders.json')
            .then(Orders => {
                // console.log(orders.data)
                const orders = Object.keys(Orders.data).map(order => {
                    return { ...Orders.data[order] , id:order }
                })
                this.setState({orders,loading:false})
            })
            .catch(e => console.log('error',e))
    }

    render() {
        // console.log(this.state.loading)
        let orders = <Spinner />
        if(!this.state.loading) {
            orders = this.state.orders.map(order => {
                return (
                    <Order 
                        ingredients={order.ingredients}
                        price={order.price}
                        key={order.id}
                    />
                )
            })
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default WithErrorHandler(Orders,axios)