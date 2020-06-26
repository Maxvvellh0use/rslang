import React from "react";
import './Account.scss'

export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        userName: this.props.userName,
        email: this.props.email,
        englishLvl: this.props.englishLvl
    }

    logout = () => {
        console.log('logout!')
    }

    render() {
        return (
            <section className="account_section">
                <div className="wrapper account_wrapper">
                    <div className="account">
                        <h2 className="account_title">Account</h2>
                        <div className="account_information">
                            <ul className="account_information_list">
                                <li className="account_information__username item_account">
                                    <label className="account_information__label" htmlFor="userName">UserName:</label>
                                    <span className="account_information__span" id="userName">{'this.props.username'}</span>
                                </li>
                                <li className="account_information__email item_account">
                                    <label className="account_information__label" htmlFor="email">Email:</label>
                                    <span className="account_information__span" id="email">{'this.props.email'}</span>
                                </li>
                                <li className="account_information__english_lvl item_account">
                                    <label className="account_information__label" htmlFor="englishLvl">English Level:</label>
                                    <span className="account_information__span" id="englishLvl">{'this.props.englishLvl'}</span>
                                </li>
                            </ul>
                        </div>
                        <button onClick={this.logout} className="account__logout_button">Logout</button>
                    </div>
                </div>
            </section>
        )
    }
}
