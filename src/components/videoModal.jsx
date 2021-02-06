import React from 'react';
import { Component } from 'react';
import close from "../images/close.png"

class videoModal extends Component {
    render() {
        const {url,videoDetails} = this.props;
        return (
            <div className="videoModal">
                <div className="videoModal__Container">
                    <div className="videoModal__Container--Header">
                        <div className="videoModal__Container--Header__Para">{videoDetails.name}</div>
                        <img className="videoModal__Container--Header__Close" onClick={this.props.closeModal} src={close} alt="close" />
                    </div>
                    <iframe className="videoModal__Container--Video" height="600"
                        src={`https://www.youtube.com/embed/${url}`} allowFullScreen>
                    </iframe>
                    <div className="videoModal__Container--Des">{videoDetails.des}</div>
                </div>
            </div>
        )
    }
}

export default videoModal;