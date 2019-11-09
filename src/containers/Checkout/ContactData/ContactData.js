import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'

class ContactData extends Component {
    
    state = {
        name: '',
        email:'',
        address: {
            street:'',
            postalCode:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'lindsey',
                address: {
                    street: 'pensylvinia',
                    zipcode: '208106',
                    country: 'USA'
                },
                email: 'leigh@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order) 
            .then(res => {
                this.setState({loading: false})
                // // this.setState({loading:false, purchasing: false, purchased:true})
                // console.log(this.props)
                // // this.props.history.push('/checkout')
                // this.props.history.push({
                //     pathname: '/checkout',
                //     state: this.state.ingredients
                // })
                // console.log('success')
            })
            .catch(e => {
                this.setState({loading:false})
                console.log('error',e)
            })
        console.log(this.props.ingredients)
    }

    render() {
        let form = (
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='email' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Street' />
                <input type='text' name='postalCode' placeholder='Postal code' />
                <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>)
        if(this.state.loading) {
            form = <Spinner />
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData