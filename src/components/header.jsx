import React from 'react';
import { Component } from 'react';
import logo from "../images/logo2.png";
import searchImg from "../images/search.png";

class header extends Component {
    constructor(){
        super();
        this.state = {
            isClicked:false
        }
    }

    toggleSearch = () => {
        this.setState({isClicked:!this.state.isClicked});
    }

    render() {
        const {navBg,searchArray,search} = this.props;
        const {isClicked} = this.state;
        return (
            <div className={navBg?`header darkBg heigthAuto`:`header`}>
                <img className="header__Img" src={logo} alt="logo" />
                <div className="header__SearchBox">
                    <img className="header__SearchBox--Img" src={searchImg} alt="search" />
                    {isClicked ? 
                        <div className="inputDiv">
                            <input onChange={this.props.setSearchParams} className="header__SearchBox--Input" /> 
                            {search !== ""?
                                <div className="searchList">
                                    {searchArray.map((data,index)=>{
                                        let details = {
                                            name: data.title,
                                            des: data.overview
                                        }
                                        return(
                                            <div onClick={
                                                ()=>{
                                                    this.props.setMovieId(data.id,details);
                                                }
                                            } className="searchList__Para" key={index}>{data.title}</div>
                                        )
                                    })}
                                </div>
                            :""}
                        </div>
                    :""}
                     
                    <button onClick={this.toggleSearch} className="header__SearchBox--Para">
                        {!isClicked ?
                            "Search"
                        :
                            <span className="redColor">Close</span>
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default header;