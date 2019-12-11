import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    
    configElement = (elementType,type,placeholder,value,options,validation,isValid) => {
        return ({
            elementType,
            elementConfig: {
                type,
                placeholder,
                options
            },
            value,
            validation,
            isValid,
            touched: false
        })
    } 

    state = {
        orderForm : {
            name: this.configElement('input','text','your name','',null,{
                required: true
            }, false),
            street: this.configElement('input','text','street','',null,{
                required: true
            }, false),
            zipcode: this.configElement('input','text','zipcode','',null,{
                required: true,
                len: 6
            }, false),
            country: this.configElement('input','text','Country name','',null,{
                required: true
            }, false),
            email: this.configElement('input','email','your Email','',null,{
                required: true
            }, false),
            deliveryMethod: this.configElement('select',null,null,'Fastest',[
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'Cheapest', displayValue: 'Cheapest'} 
            ]),
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        // the default behaviour of submitting form is it sends request and hence our page is reloaded(instead we want to do this in background)
        event.preventDefault()
        this.setState({loading: true})
        const orderForm = this.state.orderForm
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer : {}
        }
        Object.keys(orderForm).forEach(key => {
            order.customer[key] = orderForm[key].value
        })
        console.log('order', order)
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

    checkValidity(value,validation) { 
        let isValid = true
        value = value.trim()
        if(validation.required){
            isValid = value !== '' && isValid
        }
        if(validation.len){
            isValid = value.length === validation.len && isValid
        }
        return isValid
    }

    inputChangeHandler = (inputIdentifier,event) => {
        const updatedInputForm = {...this.state.orderForm}
        const updatedInputElement = {...updatedInputForm[inputIdentifier]}
        updatedInputElement.value = event.target.value
        if(updatedInputElement.validation){
            updatedInputElement.isValid = this.checkValidity(updatedInputElement.value,updatedInputElement.validation)
        }
        updatedInputElement.touched = true
        updatedInputForm[inputIdentifier] = updatedInputElement

        let formIsValid = true
        for(let InputElement in updatedInputForm){
            if(updatedInputForm[InputElement].validation){   
                formIsValid = updatedInputForm[InputElement].isValid && formIsValid  
            }
        }
        
        this.setState({orderForm: updatedInputForm, formIsValid})
    }

    render() {
        const formElements = Object.keys(this.state.orderForm).map(key => {
            const obj = this.state.orderForm[key]
            return(
                <Input elementType={obj.elementType} 
                    elementConfig={obj.elementConfig}  
                    value={obj.value}  
                    Invalid={!obj.isValid}
                    shouldValidate={obj.validation ? true : false}
                    touched={obj.touched}
                    key={key}
                    changed={(event) => this.inputChangeHandler(key,event)}    
                />
            )
        }) 

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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