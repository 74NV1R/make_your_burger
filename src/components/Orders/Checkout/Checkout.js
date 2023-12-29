import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'


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
        console.log(this.state.values)
    }


    render() {
        return (
            <div>
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

export default Checkout