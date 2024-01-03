import React, { Component } from "react"
import { Formik } from "formik"
import { auth } from '../../redux/AuthActionCreators'
import { connect } from "react-redux"
import Spinner from "../spinner/Spinner"
import { Alert } from "reactstrap"


const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMessage: state.authFailedMessage
    }
}

class Auth extends Component {

    state = {
        mode: "sign Up"
    }

    switchMode = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? 'Login' : 'Sign Up'
        })
    }

    render() {
        let error = null
        if (this.props.authFailedMessage !== null) {
            error = <Alert color="danger">{this.props.authFailedMessage}</Alert>
        }
        let form = null
        if (this.props.authLoading) {
            form = <Spinner />
        }
        else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: ""
                        }
                    }
                    onSubmit={
                        (values) => {
                            //console.log("Values", values)
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }
                    validate={(values) => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = 'Required'
                        }
                        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
                            errors.email = 'Invalid email address'
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        } else if (values.password.length < 4) {
                            errors.password = 'Must be at least 4 characters long'
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required'
                            }
                            else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password doesn't match!"
                            }
                        }


                        return errors
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{
                            border: '1px solid black',
                            boxShadow: '1px 1px grey',
                            borderRadius: '5px',
                            padding: '20px',
                            marginBottom: '5px'
                        }}>

                            <button style={{
                                width: '100%',
                                backgroundColor: 'green',
                                color: 'white'
                            }} className="btn btn-class" onClick={this.switchMode}>Switch to {this.state.mode === 'Sign Up' ? "Login" : "Sign up"}</button>
                            <br />
                            <br />

                            <form onSubmit={handleSubmit}>
                                <input name="email" placeholder="Enter your email" className="form-control"
                                    value={values.email}
                                    onChange={handleChange} />
                                <span style={{ color: "red" }}>
                                    {errors.email}
                                </span>

                                <br />
                                <input name="password" placeholder="Password" className="form-control"
                                    value={values.password}
                                    onChange={handleChange} />
                                <span style={{ color: "red" }}>
                                    {errors.password}
                                </span>
                                <br />

                                {this.state.mode === "Sign Up" ? <div><input name="passwordConfirm" placeholder="Confirm Password" className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange} />
                                    <span style={{ color: "red" }}>
                                        {errors.passwordConfirm}
                                    </span>
                                    <br /></div> : null}



                                <button type="submit" className="btn btn-success">
                                    {this.state.mode === 'Sign Up' ? 'Sign Up' : 'Login'}
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
            )
        }
        return (
            <div>
                {error}
                {form}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)