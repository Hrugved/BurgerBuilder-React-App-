import React , { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            cheese: 0,
            bacon: 0,
            salad: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('Thanks for purchasing!')
    }

    render() {
        let disabledInfo = { ...this.state.ingredients }
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} backdropClicked={this.purchasingCancelerhandler}>
                    <OrderSummary summaryObj={this.state.ingredients} 
                        purchaseCancel={this.purchasingCancelerhandler}
                        purchaseContinue={this.purchasingContinuehandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
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
}

export default BurgerBuilder