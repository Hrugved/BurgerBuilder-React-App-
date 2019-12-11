import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import {NavLink} from 'react-router-dom'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(props) {
        axios.get('/orders.json')
            .then(Orders => {
                if(Orders.data){
                    const orders = Object.keys(Orders.data).map(order => {
                        return { ...Orders.data[order] , id:order }
                    })
                    this.setState({orders,loading:false})
                }
                else{
                    this.setState({...this.state, loading: false})
                }
            })
            .catch(e => console.log('error',e))
    }

    render() {
        // console.log(this.state.loading)
        let orders = <Spinner />
        if(!this.state.loading) {
            if(this.state.orders.length){
                orders = this.state.orders.map(order => {
                    console.log(order)
                    return (
                        <Order 
                            ingredients={order.ingredients}
                            price={order.price}
                            key={order.id}
                        />
                    )
                })
            }
            else {
                // const style= {
                //     marginTop: '5rem',
                //     textAlign: 'center',
                //     fontSize: '3rem',
                // }
                const style= {
                    marginTop: '5rem',
                    textAlign: 'center'
                }
                orders = (
                    <div style={style}>
                        <p style={{fontSize: '3rem'}}>You have no orders to display</p>
                        <NavLink to='/'>Order a Delcious burger now</NavLink>
                    </div>
                )
            }
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default WithErrorHandler(Orders,axios)