import React, { Component } from 'react'
import { Button } from 'reactstrap'

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on delivery",

        }
    }


    goBack = () => {
        this.props.history.goBack("/")

    }





    render() {
        return (
            <div>
                <form>
                    <textarea name='deliveryAddress' value={this.state.values.deliveryAddress} className='form-control' placeholder='your address'>
                    </textarea>
                    <br />
                    <input name='phone' className='form-control' value={this.state.values.phone} placeholder='phone number' />
                    <br />
                    <select name='paymentType' className='form-control' value={this.state.values.paymentType}>
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="BKash">Bkash</option>

                    </select>
                    <br />
                    <Button style={{ backgroundColor: 'primary' }} className='mr-auto' >
                        Place order
                    </Button>
                    <Button color='danger' className='ml-1' onClick={this.goBack}>
                        Cancel
                    </Button>

                </form>

            </div >
        )
    }
}

export default Checkout