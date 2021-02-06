import React from 'react';
import { Component } from 'react';
import logo from "../images/logo2.png";
import back from "../images/back.png";
import { withRouter } from 'react-router-dom';

class header2 extends Component {
    render() {
        const {navBg} = this.props;
        return (
            <div className="header2">
                <img onClick={()=>{this.props.history.push("/")}} className="header2__Img2" src={back} alt="back" />
                <img className="header2__Img" src={logo} alt="logo" />
            </div>
        )
    }
}

export default withRouter(header2);