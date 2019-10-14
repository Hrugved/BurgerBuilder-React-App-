import React , { Component } from 'react'
import Auxillary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    }

    removeIngredientHandler = (type) => { 
        const updatedCount = this.state.ingredients[type] - 1
        if(updatedCount < 0) { return; } 
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    }

    render() {
        let disabledInfo = { ...this.state.ingredients }
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        return(
            <Auxillary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientsAdded={this.addIngredientHandler} 
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Auxillary>
        )
    }
}

export default BurgerBuilder