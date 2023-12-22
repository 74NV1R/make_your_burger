import React from "react"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"
import './Header.css'
import burger from '../../Assets/burger.png'


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
                        <NavLink href="#" className="NavLink">Something</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header