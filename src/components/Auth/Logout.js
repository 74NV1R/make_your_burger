import React, { Component } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { connect } from "react-redux"
import { logOut } from "../../redux/AuthActionCreators"

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logOut())
    }
}

class Logout extends Component {

    componentDidMount() {
        this.props.logout()
    }
    render() {

        return (
            <Routes>
                <Route path="/" element={<Navigate to="/" />} />
            </Routes>

        )
    }
}

export default connect(null, mapDispatchToProps)(Logout)