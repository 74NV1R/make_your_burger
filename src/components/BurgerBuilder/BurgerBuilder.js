import React, { Component } from "react"
import Burger from './Burger/Burger.js'
import Controls from "./Controls/Controls.js"
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import Summary from "./summary/Summary.js"
import { BrowserRouter, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators.js'

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable())
    }
}

class BurgerBuilder extends Component {

    state = {
        modalOpen: false
    }

    addIngredient = type => {
        this.props.addIngredient(type)
        this.props.updatePurchasable()
    }

    removeIngreident = type => {
        this.props.removeIngredient(type)
        this.props.updatePurchasable()
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {

        this.setState({
            onClickCheckout: true
        })
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredient}
                        ingredientRemoved={this.removeIngreident}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Your order summary
                    </ModalHeader>
                    <ModalBody>
                        <h5>
                            Total price: {this.props.totalPrice.toFixed(0)} BDT
                        </h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCheckout}>
                            Continue to checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {this.state.onClickCheckout && <Navigate to="/checkout" replace={"true"} />}
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)