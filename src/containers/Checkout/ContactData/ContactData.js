import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    
    configElement = (elementType,type,placeholder,value,options) => {
        return ({
            elementType,
            elementConfig: {
                type,
                placeholder,
                options
            },
            value
        })
    } 

    state = {
        orderForm : {
            name: this.configElement('input','text','your name','',null),
            street: this.configElement('input','text','street','',null),
            zipcode: this.configElement('input','text','zipcode','',null),
            country: this.configElement('input','text','Country name','',null),
            email: this.configElement('input','email','your Email','',null),
            deliveryMethod: this.configElement('select',null,null,null,[
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'Cheapest', displayValue: 'Cheapest'} 
            ]),
        },
        loading: false
    }

    orderHandler = (event) => {
        // the default behaviour of submitting form is it sends request and hence our page is reloaded(instead we want to do this in background)
        event.preventDefault()
        this.setState({loading: true})
        const orderForm = this.state.orderForm
        const order = {}
        Object.keys(orderForm).forEach(key => {
            order[key] = orderForm[key].value
        })
        console.log(order)
        axios.post('/orders.json', order) 
            .then(res => {
                this.setState({loading: false})
            })
            .catch(e => {
                this.setState({loading:false})
                console.log('error',e)
            })
        console.log(this.props.ingredients)
    }

    inputChangeHandler = (inputIdentifier,event) => {
        const updatedInputForm = {...this.state.orderForm}
        const updatedInputElement = {...updatedInputForm[inputIdentifier]}
        updatedInputElement.value = event.target.value
        updatedInputForm[inputIdentifier] = updatedInputElement
        this.setState({orderForm: updatedInputForm})
    }

    render() {
        const formElements = Object.keys(this.state.orderForm).map(key => {
            const obj = this.state.orderForm[key]
            return(
                <Input elementType={obj.elementType} 
                    elementConfig={obj.elementConfig}  
                    value={obj.value}  
                    key={key}
                    changed={(event) => this.inputChangeHandler(key,event)}    
                />
            )
        }) 

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button type="Success">ORDER</Button>
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