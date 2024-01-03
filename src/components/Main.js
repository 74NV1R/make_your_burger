import React, { Component } from "react"
import Header from "./Header/Header"
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder"
import { Routes, Route, Switch, Redirect, Navigate } from "react-router-dom"
import Orders from "./Orders/Orders"
import Checkout from './Orders/Checkout/Checkout'
import Auth from "./Auth/Auth"
import { connect } from "react-redux"
import Checkout2 from "./Orders/Checkout/Checkout2"
import { authCheck } from "../redux/AuthActionCreators"
import Logout from "./Auth/Logout"

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

class Main extends Component {

    componentDidMount() {
        this.props.authCheck()
    }

    render() {
        let routes = null
        if (this.props.token === null) {
            routes = (
                <Routes>
                    <Route path="/login" Component={Auth} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            )
        }
        else {
            routes = (

                <Routes>
                    <Route path='/' element={<BurgerBuilder />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/checkout2' element={<Checkout2 />} />
                    <Route path='/logout' element={<Logout />} />


                    <Route path="/" element={<Navigate to="/" />} />




                </Routes>
            )

        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}

                </div>
            </div>
        )
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(Main)