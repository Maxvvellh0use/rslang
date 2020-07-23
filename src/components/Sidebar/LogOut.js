import React from 'react';

class LogOut extends React.Component {

    logout = () => {
        localStorage.clear()
        this.props.isAuthorization();
        this.props.history.push("/");
    }

    render = () => {
        return (
            <div className="logout">
                <div className="logout_box">
                    <div className="logout_title">Вы действительно хотите выйти?</div>
                    <div>
                        <button onClick={this.logout} type="button" className="btn btn-success btn-lg btn_yes">Да</button>
                        <button type="button" className="btn btn-danger btn-lg" onClick={this.props.history.goBack}>Нет</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogOut;