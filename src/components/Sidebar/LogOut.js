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
                    <h1>Вы действительно хотите выйти?</h1>
                    <div>
                        <button onClick={this.logout} type="button" className="btn btn-success">Да</button>
                        <button type="button" className="btn btn-danger" onClick={this.props.history.goBack}>Нет</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogOut;