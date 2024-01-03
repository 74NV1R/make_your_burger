import React from "react"
import { Formik, Field } from "formik"
import { Button, Modal, ModalBody } from 'reactstrap'
import { Component } from "react"
import { Link } from "react-router-dom"
import { resetIngredients } from "../../../redux/actionCreators"
import { connect } from "react-redux"
import axios from "axios"
import Spinner from "../../spinner/Spinner"

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout2 extends Component {

    state = {
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    submitHandler = (values) => {
        this.setState({ isLoading: true })
        const order = {
            ingredients: this.props.ingredients,
            customer: values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId
        }
        axios.post("https://burger-f360a-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!",
                    })
                    this.props.resetIngredients()
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Order Again!",
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Order Again!",
                })
            })
    }

    render() {

        let form = (<div>
            <Formik
                initialValues={
                    {
                        address: "",
                        phoneNumber: "",
                        paymentType: ""
                    }
                }
                onSubmit={
                    (values) => {
                        //console.log("Values", values)
                        this.submitHandler(values)

                    }
                }


                validate={(values) => {
                    const errors = {}
                    if (!values.address) {
                        errors.email = 'Required'
                    }
                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Required'
                    }
                    return errors
                }}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <div style={{
                        border: '1px solid black',
                        boxShadow: '1px 1px grey',
                        borderRadius: '5px',
                        padding: '20px',
                        marginBottom: '5px'
                    }}>

                        <h4 style={{
                            border: "1px solid grey",
                            boxShadow: "1px 1px #888888",
                            borderRadius: "5px",
                            padding: "20px",
                        }}>Payment: {this.props.totalPrice} BDT</h4>
                        <form onSubmit={handleSubmit}>
                            <textarea name="address" placeholder="Enter your address" className="form-control"
                                value={values.address}
                                onChange={handleChange}>
                            </textarea>
                            <span style={{ color: "red" }}>
                                {errors.address}
                            </span>
                            <br />
                            <input name="phoneNumber" placeholder="your phone number" className="form-control" value={values.phoneNumber}
                                onChange={handleChange} />
                            <span style={{ color: "red" }}>
                                {errors.phoneNumber}
                            </span>
                            <br />
                            <Field as="select" name="paymentType">
                                <option value="BKash">BKash</option>
                                <option value="cash">Cash</option>

                            </Field>
                            <br />
                            <br />

                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                            <Link to='/'>
                                <button type="cancel" className="btn btn-danger">
                                    Cancel
                                </button>
                            </Link>

                        </form>
                    </div>
                )}


            </Formik>
        </div>)

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                        <Link to='/'>
                            <button type="cancel" className="btn btn-danger">
                                Go back
                            </button>
                        </Link>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout2)