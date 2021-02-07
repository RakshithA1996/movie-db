import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class topRatedMovies extends Component {
    constructor() {
        super();
        this.state = {
          topRatedArray : [],
          videoArray:[],
        };
      }

    componentDidMount(){
        this.getTopRatedMovieDetails();
    }

    getPosterImage = (id) => {
        let api_key = "dcd90828f3169240a4e9b818d289b221";
        var vKey;
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState(previousState => ({
                videoArray: [...previousState.videoArray, res.results[0] && res.results[0].key]
            }));
        })
        .catch((err) => toast.error(err.message));
    }

    getTopRatedMovieDetails = () => {
        let api_key = "dcd90828f3169240a4e9b818d289b221"
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          })
          .then((res) => res.json())
          .then((res) => {
            if(res.results && res.results){
                this.setState({topRatedArray:res.results},()=>{
                    this.state.topRatedArray.slice(0,4).map((data, index)=>{
                        return this.getPosterImage(data.id)
                    })
                });
            }else{
                toast.error("Error in api");
            }
          })
          .catch((err) => toast.error(err.message));
    }

    seeMore = () => {
        this.props.history.push("/fullDetails");
        localStorage.setItem("DataValue","topRated");
    }

    render() {
        const {topRatedArray,videoArray} = this.state;
        return (
            <div className="topRatedMovies">
                <div className="topRatedMovies__Header">Top Rated Movies</div>
                <div className="topRatedMovies__Content">
                    {topRatedArray.slice(0,4).map((data, index)=>{
                        return(
                            <div className="topRatedMovies__Content--Card">
                                <iframe className="topRatedMovies__Content--Card__Video" height="215"
                                    src={`https://www.youtube.com/embed/${videoArray[index]}`}>
                                </iframe>
                                <div className="padding1rem">
                                    <div className="topRatedMovies__Content--Card__Name"><span className="label1">Name : </span>{data.title}</div>
                                    <div className="topRatedMovies__Content--Card__Overview"><span className="label1">Overview : </span>{data.overview}</div>
                                    <div className="topRatedMovies__Content--Card__Release"><span className="label1">Release Date : </span>{data.release_date}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="topRatedMovies__SeeMore">
                    <button onClick={this.seeMore} className="topRatedMovies__SeeMore--Btn">{`See More >`}</button>
                </div>
            </div>
        )
    }
}

export default withRouter(topRatedMovies);