import React from "react"
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap"
import './Header.css'
import { Route } from "react-router-dom"
import burger from '../../Assets/burger.png'
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#04670B",
                height: "70px",
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={burger} alt="Logo" width="80px" />
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink to="/" className="NavLink">
                            Make your Burger
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="orders" className="NavLink">
                            Orders
                        </NavLink>
                    </NavItem>

                </Nav>
            </Navbar>
        </div>
    )
}

export default Header