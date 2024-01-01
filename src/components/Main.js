import React from "react"
import Header from "./Header/Header"
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder"
import { Routes, Route } from "react-router-dom"
import Orders from "./Orders/Orders"
import Checkout from './Orders/Checkout/Checkout'
import Auth from "./Auth/Auth"
import Checkout2 from "./Orders/Checkout/Checkout2"

const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                <Routes>
                    <Route path='/' element={<BurgerBuilder />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/Login' element={<Auth />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/checkout2' element={<Checkout2 />} />


                </Routes>

            </div>


        </div>
    )
}

export default Main