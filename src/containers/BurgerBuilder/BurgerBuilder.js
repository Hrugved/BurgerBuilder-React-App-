import React , { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error :false
    }

    componentDidMount = () => {
        axios.get('https://react-burger-builder-a6531.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients : res.data})
            })
            .catch(e => {
                this.setState({error: true})
            })
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => 
            ingredients[igKey]    
        ).reduce((sum,curr) => sum+curr, 0)
        this.setState({ purchasable: (sum > 0) })
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchasable(updatedIngredients) // calling with updatedIngredients because setState is async and hence its not gurranted to be in updated state when calling this method
    }

    removeIngredientHandler = (type) => { 
        const updatedCount = this.state.ingredients[type] - 1
        if(updatedCount < 0) { return; } 
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})    
        this.updatePurchasable(updatedIngredients)
    }

    purchasingHandler = () => {
        this.setState({purchasing:true})        
    }

    purchasingCancelerhandler = () => {
        this.setState({purchasing:false})        
    }

    purchasingContinuehandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading:false, purchasing: false})
                console.log('success')
            })
            .catch(e => {
                this.setState({loading:false, purchasing: false})
                console.log('error')
            })
    }

    render() {
        let disabledInfo = { ...this.state.ingredients }
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        let orderSummary = null
        let burger = this.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.state.ingredients) {
            orderSummary = <OrderSummary summaryObj={this.state.ingredients} 
                purchaseCancel={this.purchasingCancelerhandler}
                purchaseContinue={this.purchasingContinuehandler}
                price={this.state.totalPrice}
            />

            burger = (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientsAdded={this.addIngredientHandler} 
                        ingredientsRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchasingHandler}
                    />
                </Auxillary>
            )
        }

        if(this.state.loading) { 
            orderSummary = <Spinner />
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} backdropClicked={this.purchasingCancelerhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
}

export default WithErrorHandler(BurgerBuilder,axios)