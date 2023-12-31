import React, { Component } from "react"
import { Formik } from "formik"


class Auth extends Component {

    render() {
        return (
            <div>
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
                            console.log("Values", values)
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

                        if (!values.passwordConfirm) {
                            errors.passwordConfirm = 'Required'
                        }
                        else if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "Password doesn't match!"
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
                                <input name="passwordConfirm" placeholder="Confirm Password" className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange} />
                                <span style={{ color: "red" }}>
                                    {errors.passwordConfirm}
                                </span>
                                <br />

                                <button type="submit" className="btn btn-success">
                                    Sign up
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
            </div>
        )
    }
}


export default Auth