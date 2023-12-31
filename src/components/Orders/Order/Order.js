import React from "react"

const Order = props => {

    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '5px'
            }} key={item.type}>{item.amount}x <span style={{ textTransform: 'capitalize' }}>{item.type}</span></span>
        )
    })
    return (
        <div style={{
            border: '1px solid black',
            boxShadow: '1px 1px grey',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '5px'
        }}>
            <p>
                Order number: {props.order.id}
                <br />
                Delivery address: {props.order.customer.deliveryAddress}

            </p>
            <hr />
            {ingredientSummary}
            <hr />

            <p>
                Total: {props.order.price} BDT
            </p>
        </div >
    )
}

export default Order
