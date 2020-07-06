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
                    <h2>Вы действительно хотите выйти?</h2>
                    <div>
                        <button onClick={this.logout} type="button" className="btn btn-success btn-lg">Да</button>
                        <button type="button" className="btn btn-danger btn-lg" onClick={this.props.history.goBack}>Нет</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogOut;