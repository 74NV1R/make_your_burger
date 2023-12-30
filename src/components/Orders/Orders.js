import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder } from '../../redux/actionCreators'

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: () => dispatch(fetchOrder()),
    }
}

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrder()
    }

    componentDidUpdate() {
        console.log(this.props)
    }
    render() {
        return (
            <div>
                Orders
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)