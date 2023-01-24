import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {email: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }


    habdleSubmit(event) {
        this.props.get_token(this.state.email, this.state.password)
        event.preventDefault()
    }

    render() {
        return (

            <div className="section">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-one-third">
                        <form onSubmit={(event) => this.habdleSubmit(event)}>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <input className="input" type="text" name="email" placeholder="email"
                                   value={this.state.email} onChange={(event) => this.handleChange(event)}/>
                            <span className="icon is-small is-left">
                                <i className="fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input className="input" type="password" name="password" placeholder="password"
                                   value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <input className="button is-success" type="submit" value="Login"/>
                    </div>
                </form>
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        )
    }
}

export default LoginForm

