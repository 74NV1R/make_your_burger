import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder } from '../../redux/actionCreators'
import Order from './Order/Order'
import Spinner from '../spinner/Spinner'

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(fetchOrder(token, userId)),
    }
}

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrder(this.props.token, this.props.userId)
    }

    componentDidUpdate() {
        console.log(this.props)
    }
    render() {
        let orders = null
        if (this.props.orderErr) {
            orders = <p style={{
                border: '1px solid black',
                boxShadow: '1px 1px grey',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '5px'
            }}>
                Failed to load orders
            </p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: '1px solid black',
                    boxShadow: '1px 1px grey',
                    borderRadius: '5px',
                    padding: '20px',
                    marginBottom: '5px'
                }}>
                    No orders!
                </p>
            }
            else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }

        }
        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)