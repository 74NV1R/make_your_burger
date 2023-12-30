import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}


class Checkout extends React.Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on delivery",

        }
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        //console.log(order)
        axios.post("https://burger-f360a-default-rtdb.firebaseio.com/orders.json", order)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <h4 style={{
                    border: "1px solid beige",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "10px"
                }}> Payment: {this.props.totalPrice} BDT
                </h4>
                <form style={{
                    border: "1px solid beige",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "10px"
                }}>
                    <textarea name='deliveryAddress' value={this.state.values.deliveryAddress} className='form-control' placeholder='your address' onChange={(e) => this.inputChangeHandler(e)}>
                    </textarea>
                    <br />
                    <input name='phone' className='form-control' value={this.state.values.phone} placeholder='phone number' onChange={(e) => this.inputChangeHandler(e)} />
                    <br />
                    <select name='paymentType' className='form-control' value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)}>
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="BKash">Bkash</option>

                    </select>
                    <br />
                    <Button style={{ backgroundColor: 'primary' }} className='mr-auto' onClick={this.submitHandler}>
                        Place order
                    </Button>

                    <Link to="/">
                        <Button color='danger' className='ml-1'>
                            Cancel
                        </Button>
                    </Link>

                </form>

            </div >
        )
    }
}

export default connect(mapStateToProps)(Checkout)