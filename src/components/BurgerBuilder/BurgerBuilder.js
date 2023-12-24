import React, { Component } from "react"
import Burger from './Burger/Burger.js'
import Controls from "./Controls/Controls.js"
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import Summary from "./summary/Summary.js"

const ingredient_prices = {
    salad: 20,
    cheese: 40,
    meat: 90,
}
export default class BurgerBuilder extends Component {

    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 }
        ],
        totalPrice: 80,
        modalOpen: false,
        purchasable: false

    }

    addIngredient = type => {
        const ingredients = [...this.state.ingredients]
        const newPrice = this.state.totalPrice + ingredient_prices[type]
        for (let item of ingredients) {
            if (item.type === type) item.amount++
        }

        this.setState({ ingredients: ingredients, totalPrice: newPrice })
        this.updatePurchasable(ingredients)
    }

    updatePurchasable = ingredients => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount
        }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    removeIngreident = type => {
        const ingredients = [...this.state.ingredients]
        const newPrice = this.state.totalPrice - ingredient_prices[type]
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) return
                item.amount--
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: newPrice })
        this.updatePurchasable(ingredients)

    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredient}
                        ingredientRemoved={this.removeIngreident}
                        price={this.state.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.state.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Your order summary
                    </ModalHeader>
                    <ModalBody>
                        <h5>
                            Total price: {this.state.totalPrice.toFixed(0)} BDT
                        </h5>
                        <Summary ingredients={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleModal}>
                            Continue to checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}